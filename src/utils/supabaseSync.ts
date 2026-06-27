import { supabase, isSupabaseConfigured, supabaseUrl } from './supabaseClient';
import { 
  Project, 
  Lead, 
  ServiceItem,
  DEFAULT_PROJECTS,
  DEFAULT_LEADS,
  DEFAULT_SERVICES,
  DEFAULT_HISTORICAL_RECORDS
} from './dataStore';
import { HistoricalRecord } from '../types';

// KEY MAPPINGS FOR NORMALIZING DATABASE COLUMNS ON THE FLY
const KEY_MAPPINGS_TO_CAMEL: Record<string, string> = {
  // Projects and global fields
  completed_year: 'completedYear',
  completedyear: 'completedYear',
  compliance_ratio: 'complianceRatio',
  complianceratio: 'complianceRatio',
  is_deleted: 'isDeleted',
  isdeleted: 'isDeleted',

  // Leads
  full_name: 'fullName',
  fullname: 'fullName',
  company_email: 'companyEmail',
  companyemail: 'companyEmail',
  project_scope: 'projectScope',
  projectscope: 'projectScope',
  service_category: 'serviceCategory',
  servicecategory: 'serviceCategory',
  
  // Services
  metric_label: 'metricLabel',
  metriclabel: 'metricLabel',
  scope_items: 'scopeItems',
  scopeitems: 'scopeItems',
  
  // Historical Records
  month_index: 'monthIndex',
  monthindex: 'monthIndex',
  data_points: 'dataPoints',
  datapoints: 'dataPoints',
  total_leads: 'totalLeads',
  totalleads: 'totalLeads'
};

function normalizeToCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(normalizeToCamelCase);
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      const camelKey = KEY_MAPPINGS_TO_CAMEL[key] || key;
      result[camelKey] = normalizeToCamelCase(obj[key]);
    }
    return result;
  }
  return obj;
}

// Transform CamelCase keys to SnakeCase
function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

// Map keys to a specific format
function mapKeys(obj: any, transformFn: (key: string) => string): any {
  if (Array.isArray(obj)) {
    return obj.map(item => mapKeys(item, transformFn));
  }
  if (obj !== null && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      if (key === 'id' || key === 'created_at') {
        result[key] = obj[key];
      } else {
        const newKey = transformFn(key);
        result[newKey] = mapKeys(obj[key], transformFn);
      }
    }
    return result;
  }
  return obj;
}

export interface SupabaseSyncStatus {
  isConfigured: boolean;
  hasError: boolean;
  errorMessage: string | null;
  missingTables: string[];
}

let syncStatus: SupabaseSyncStatus = {
  isConfigured: isSupabaseConfigured,
  hasError: false,
  errorMessage: null,
  missingTables: []
};

// Tracks active mutations to prevent background pullAll races
let activeMutationsCount = 0;

interface LocalMutation {
  id: string;
  table: string;
  type: 'upsert' | 'delete';
  timestamp: number;
  data?: any;
}

const localMutations = new Map<string, LocalMutation>();

export function registerLocalMutation(table: string, id: string, type: 'upsert' | 'delete', data?: any) {
  localMutations.set(`${table}:${id}`, {
    id,
    table,
    type,
    timestamp: Date.now(),
    data
  });
}

function cleanAndGetActiveMutations(table: string): LocalMutation[] {
  const now = Date.now();
  const active: LocalMutation[] = [];
  for (const [key, mutation] of localMutations.entries()) {
    if (now - mutation.timestamp > 15000) {
      localMutations.delete(key);
    } else if (mutation.table === table) {
      active.push(mutation);
    }
  }
  return active;
}

function mergeRemoteWithLocalMutations(table: string, remoteData: any[]): any[] {
  const active = cleanAndGetActiveMutations(table);
  if (active.length === 0) return remoteData;

  // Clone remoteData
  let merged = [...remoteData];

  for (const mutation of active) {
    if (mutation.type === 'delete') {
      merged = merged.filter(item => item.id !== mutation.id);
    } else if (mutation.type === 'upsert') {
      const idx = merged.findIndex(item => item.id === mutation.id);
      if (idx >= 0) {
        merged[idx] = { ...merged[idx], ...mutation.data };
      } else {
        merged.unshift(mutation.data);
      }
    }
  }

  return merged;
}

async function runMutation<T>(op: () => Promise<T>): Promise<T> {
  activeMutationsCount++;
  try {
    return await op();
  } finally {
    // Settle delay of 1200ms to allow Supabase index to update
    setTimeout(() => {
      activeMutationsCount = Math.max(0, activeMutationsCount - 1);
    }, 1200);
  }
}

function broadcastSyncMutation(tableName: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const channel = supabase.channel('public-db-changes');
      channel.send({
        type: 'broadcast',
        event: 'sync_mutation',
        payload: { table: tableName, timestamp: Date.now() }
      });
    } catch (e) {
      console.warn('Failed to send broadcast sync message:', e);
    }
  }
}

// Listeners/callbacks when sync status updates
const statusListeners = new Set<(status: SupabaseSyncStatus) => void>();

function notifyStatusChange() {
  statusListeners.forEach(listener => listener({ ...syncStatus }));
}

const TABLE_COLUMNS: Record<string, string[]> = {
  projects: [
    'id', 'title', 'category', 'location', 'image', 'images', 
    'scope', 'client', 'completedYear', 'complianceRatio', 
    'description', 'status', 'isDeleted'
  ],

  leads: [
    'id', 'fullName', 'companyEmail', 'phone', 'projectScope', 
    'timestamp', 'status', 'isDeleted', 'serviceCategory'
  ],
  services: [
    'id', 'title', 'tagline', 'description', 'image', 'metric', 
    'metricLabel', 'scopeItems', 'isDeleted'
  ],
  historical_records: [
    'id', 'label', 'type', 'year', 'monthIndex', 'dataPoints', 'totalLeads'
  ]
};

function sanitizePayload(tableName: string, data: any): any {
  const allowed = TABLE_COLUMNS[tableName];
  if (!allowed || !data || typeof data !== 'object') return data;
  
  const sanitized: any = {};
  for (const key of allowed) {
    if (data[key] !== undefined) {
      sanitized[key] = data[key];
    }
  }
  return sanitized;
}

// Helper to upsert with smart fallbacks for casing (corrected)
async function safeUpsert(tableName: string, originalData: any): Promise<void> {
  if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes(tableName)) return;

  const sanitizedData = sanitizePayload(tableName, originalData);

  try {
    // Attempt to save to Supabase using exact payload first
    const { error: directError } = await supabase.from(tableName).upsert(sanitizedData);
    if (!directError) return;

    // Check if table does not exist
    if (
      directError.message?.includes('Invalid path') || 
      directError.message?.includes('does not exist') ||
      directError.code === 'PGRST116' ||
      directError.code === '42P01'
    ) {
      if (!syncStatus.missingTables.includes(tableName)) {
        syncStatus.missingTables.push(tableName);
        syncStatus.hasError = true;
        notifyStatusChange();
      }
      return;
    }

    // Otherwise, try with lowercase mapping
    const lowercaseData = mapKeys(sanitizedData, k => k.toLowerCase());
    const { error: lowercaseError } = await supabase.from(tableName).upsert(lowercaseData);
    if (!lowercaseError) return;

    if (
      lowercaseError.message?.includes('Invalid path') || 
      lowercaseError.message?.includes('does not exist') ||
      lowercaseError.code === 'PGRST116' ||
      lowercaseError.code === '42P01'
    ) {
      if (!syncStatus.missingTables.includes(tableName)) {
        syncStatus.missingTables.push(tableName);
        syncStatus.hasError = true;
        notifyStatusChange();
      }
      return;
    }

    // Try with snake_case mapping
    const snakeData = mapKeys(sanitizedData, toSnakeCase);
    const { error: snakeError } = await supabase.from(tableName).upsert(snakeData);
    if (snakeError) {
      if (
        snakeError.message?.includes('Invalid path') || 
        snakeError.message?.includes('does not exist') ||
        snakeError.code === 'PGRST116' ||
        snakeError.code === '42P01'
      ) {
        if (!syncStatus.missingTables.includes(tableName)) {
          syncStatus.missingTables.push(tableName);
          syncStatus.hasError = true;
          notifyStatusChange();
        }
        return;
      }
      console.warn(`Upsert warning for ${tableName}:`, snakeError.message);
    }
  } catch (err: any) {
    console.warn(`Upsert caught warning for ${tableName}:`, err?.message || err);
  }
}

export const supabaseSync = {
  getSyncStatus(): SupabaseSyncStatus {
    return { ...syncStatus };
  },

  subscribe(listener: (status: SupabaseSyncStatus) => void): () => void {
    statusListeners.add(listener);
    listener({ ...syncStatus });
    return () => {
      statusListeners.delete(listener);
    };
  },

  /**
   * Synchronizes all tables from Supabase into localStorage.
   * If Supabase has data, it overwrites the local storage.
   * If Supabase is empty, it seeds Supabase with the local storage's default/current data.
   */
  async pullAll(): Promise<boolean> {
    if (!isSupabaseConfigured || !supabase) {
      console.log('Supabase is not configured yet. Using localStorage.');
      return false;
    }

    if (activeMutationsCount > 0) {
      console.log('Skipping pullAll because a database mutation (insert/update/delete) is currently in progress...');
      return false;
    }

    // Diagnostic Check 1: Dashboard URL pasted by mistake
    if (supabaseUrl.includes('supabase.com/dashboard') || supabaseUrl.includes('supabase.com/project')) {
      syncStatus = {
        isConfigured: true,
        hasError: true,
        errorMessage: "Your VITE_SUPABASE_URL is set to the Supabase Dashboard page URL. Please use your Project API URL instead (found under 'Project Settings' -> 'API' in Supabase, labeled as Project URL), which should look like 'https://your-project-id.supabase.co'.",
        missingTables: ['projects', 'testimonials', 'leads', 'services', 'historical_records']
      };
      notifyStatusChange();
      console.error('❌ Supabase Sync Error: VITE_SUPABASE_URL is set to the Dashboard URL instead of the API URL.');
      console.warn('💡 Solution: Go to Supabase -> Project Settings -> API -> Copy the "Project URL" and paste it into your AI Studio Settings.');
      return false;
    }

    // Diagnostic Check 2: Database connection string pasted by mistake
    if (supabaseUrl.startsWith('postgresql://') || supabaseUrl.startsWith('postgres://') || supabaseUrl.includes(':5432')) {
      syncStatus = {
        isConfigured: true,
        hasError: true,
        errorMessage: "Your VITE_SUPABASE_URL is set to a database connection string (postgresql://). Please use your HTTP Project API URL instead (found under 'Project Settings' -> 'API' in Supabase, labeled as Project URL), which should look like 'https://your-project-id.supabase.co'.",
        missingTables: ['projects', 'testimonials', 'leads', 'services', 'historical_records']
      };
      notifyStatusChange();
      console.error('❌ Supabase Sync Error: VITE_SUPABASE_URL is set to a database connection string instead of the API URL.');
      console.warn('💡 Solution: Go to Supabase -> Project Settings -> API -> Copy the "Project URL" (https://...) and paste it into your AI Studio Settings.');
      return false;
    }

    // Diagnostic Check 3: Swapped URL & Anon Key
    const anonKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '').trim();
    if (anonKey.startsWith('http://') || anonKey.startsWith('https://')) {
      syncStatus = {
        isConfigured: true,
        hasError: true,
        errorMessage: "Your Supabase credentials seem to be swapped! VITE_SUPABASE_URL should be set to your Project URL (https://your-project-id.supabase.co) and VITE_SUPABASE_ANON_KEY should be set to your long API key (anon public).",
        missingTables: ['projects', 'testimonials', 'leads', 'services', 'historical_records']
      };
      notifyStatusChange();
      console.error('❌ Supabase Sync Error: Swapped credentials detected (the anon key looks like a URL).');
      console.warn('💡 Solution: Swapping the values of VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your AI Studio Settings.');
      return false;
    }

    let hasError = false;
    let missingTables: string[] = [];
    let firstGeneralError: string | null = null;

    // Syncing data in parallel (silenced log to keep terminal clean)

    // Fetch all tables in parallel to optimize load speeds
    let dbProjects: any[] | null = null;
    let dbLeads: any[] | null = null;
    let dbServices: any[] | null = null;
    let dbHistory: any[] | null = null;

    try {
      const [resP, resL, resS, resH] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('leads').select('*'),
        supabase.from('services').select('*'),
        supabase.from('historical_records').select('*')
      ]);

      if (resP.error) {
        if (resP.error.message?.includes('Invalid path') || resP.error.code === 'PGRST116' || resP.error.code === '42P01') {
          missingTables.push('projects');
        } else {
          firstGeneralError = firstGeneralError || resP.error.message;
        }
        console.warn('Could not sync projects table:', resP.error.message);
      } else {
        dbProjects = resP.data;
      }



      if (resL.error) {
        if (resL.error.message?.includes('Invalid path') || resL.error.code === 'PGRST116' || resL.error.code === '42P01') {
          missingTables.push('leads');
        } else {
          firstGeneralError = firstGeneralError || resL.error.message;
        }
        console.warn('Could not sync leads table:', resL.error.message);
      } else {
        dbLeads = resL.data;
      }

      if (resS.error) {
        if (resS.error.message?.includes('Invalid path') || resS.error.code === 'PGRST116' || resS.error.code === '42P01') {
          missingTables.push('services');
        } else {
          firstGeneralError = firstGeneralError || resS.error.message;
        }
        console.warn('Could not sync services table:', resS.error.message);
      } else {
        dbServices = resS.data;
      }

      if (resH.error) {
        if (resH.error.message?.includes('Invalid path') || resH.error.code === 'PGRST116' || resH.error.code === '42P01') {
          missingTables.push('historical_records');
        } else {
          firstGeneralError = firstGeneralError || resH.error.message;
        }
        console.warn('Could not sync historical_records table:', resH.error.message);
      } else {
        dbHistory = resH.data;
      }
    } catch (err: any) {
      console.warn('Error during parallel select queries:', err);
      hasError = true;
    }

    // Run synchronization for all tables independently and robustly
    const syncSingleTable = async (
      tableName: string,
      localStorageKey: string,
      remoteData: any[] | null,
      defaultData: any[]
    ) => {
      if (remoteData === null) {
        return;
      }

      // Sync the dynamic social settings if this is projects table
      if (tableName === 'projects' && remoteData) {
        const socialSetting = remoteData.find(p => p.id === 'sys_social_links');
        if (socialSetting) {
          try {
            const urls = JSON.parse(socialSetting.description);
            if (urls && typeof urls === 'object') {
              if (urls.facebook) localStorage.setItem('jg_facebook_url', urls.facebook);
              if (urls.tiktok) localStorage.setItem('jg_tiktok_url', urls.tiktok);
              if (urls.instagram) localStorage.setItem('jg_instagram_url', urls.instagram);
              window.dispatchEvent(new Event('jg_social_routing_updated'));
            }
          } catch (e) {
            console.warn('Failed to parse remote social settings:', e);
          }
        }
      }

      // Merge remote data with active local mutations to prevent race conditions or overwriting!
      const mergedRemote = mergeRemoteWithLocalMutations(tableName, remoteData);

      if (mergedRemote.length > 0) {
        localStorage.setItem(localStorageKey, JSON.stringify(normalizeToCamelCase(mergedRemote)));
      } else {
        // Remote table has 0 records. Check if localStorage has records.
        const localRaw = localStorage.getItem(localStorageKey);
        let localData: any[] = [];
        try {
          localData = localRaw ? JSON.parse(localRaw) : [];
        } catch (e) {
          localData = [];
        }

        if (localData.length === 0) {
          // Both remote and local are completely empty -> load default records and attempt to upload them.
          localStorage.setItem(localStorageKey, JSON.stringify(defaultData));
          if (isSupabaseConfigured && supabase) {
            for (const item of defaultData) {
              await safeUpsert(tableName, item);
            }
          }
        } else {
          // If we have active delete mutations, we do not seed the empty database again!
          const activeDeletes = cleanAndGetActiveMutations(tableName).filter(m => m.type === 'delete');
          if (activeDeletes.length > 0) {
            localStorage.setItem(localStorageKey, JSON.stringify([]));
            return;
          }

          // Otherwise, local storage has records but remote has 0 records. Seeding.
          if (isSupabaseConfigured && supabase) {
            try {
              for (const item of localData) {
                await safeUpsert(tableName, item);
              }
            } catch (err: any) {
              console.warn(`[Sync] Seeding remote table ${tableName} failed:`, err?.message || err);
            }
          }
        }
      }
    };

    await Promise.all([
      syncSingleTable('projects', 'jg_projects', dbProjects, DEFAULT_PROJECTS),
      syncSingleTable('leads', 'jg_leads', dbLeads, DEFAULT_LEADS),
      syncSingleTable('services', 'jg_services', dbServices, DEFAULT_SERVICES),
      syncSingleTable('historical_records', 'jg_historical_records', dbHistory, DEFAULT_HISTORICAL_RECORDS)
    ]);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('jg_database_sync_updated'));
    }

    // Compute status
    const isMissingTables = missingTables.length > 0;
    syncStatus = {
      isConfigured: true,
      hasError: hasError || isMissingTables || !!firstGeneralError,
      errorMessage: isMissingTables
        ? `Tables [${missingTables.join(', ')}] are missing in your Supabase schema. Please apply the schema in your Supabase SQL Editor.`
        : firstGeneralError,
      missingTables
    };
    notifyStatusChange();

    // Silenced terminal output for phase completion to maintain a pristine, quiet environment
    if (syncStatus.hasError) {
      console.warn('⚠️ SUPABASE SYNC TROUBLESHOOTING GUIDE:');
      console.warn('Your app has a Supabase configuration, but the connection or tables are not fully set up.');
      if (isMissingTables) {
        console.warn(`👉 The following tables are missing or inaccessible: [${missingTables.join(', ')}]`);
        console.warn('💡 Have you executed the SQL schema script in Supabase?');
        console.warn('   1. Open your Supabase Dashboard (https://supabase.com)');
        console.warn('   2. Go to your Project -> SQL Editor (in the left sidebar)');
        console.warn('   3. Open the "supabase_schema.sql" file at the root of your project directory in AI Studio');
        console.warn('   4. Copy the entire SQL contents of "supabase_schema.sql"');
        console.warn('   5. Paste the SQL query into the Supabase SQL Editor and click "Run"');
        console.warn('   6. After the tables are successfully provisioned, refresh this page or re-test the connection.');
      } else if (firstGeneralError) {
        console.warn(`👉 Error details: ${firstGeneralError}`);
        console.warn('💡 Tip: Please verify your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are fully correct with no extra spaces or quotes.');
      }
    }

    return !syncStatus.hasError;
  },

  async pushProject(project: Project): Promise<void> {
    registerLocalMutation('projects', project.id, 'upsert', project);
    broadcastSyncMutation('projects');
    if (syncStatus.missingTables.includes('projects')) return;
    return runMutation(async () => {
      try {
        await safeUpsert('projects', project);
      } catch (err: any) {
        console.warn('Error pushing project to Supabase:', err?.message || err);
      }
    });
  },

  async deleteProject(id: string): Promise<void> {
    registerLocalMutation('projects', id, 'delete');
    broadcastSyncMutation('projects');
    if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes('projects')) return;
    return runMutation(async () => {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) throw error;
      } catch (err: any) {
        console.warn('Error deleting project from Supabase:', err?.message || err);
      }
    });
  },



  async pushLead(lead: Lead): Promise<void> {
    registerLocalMutation('leads', lead.id, 'upsert', lead);
    broadcastSyncMutation('leads');
    if (syncStatus.missingTables.includes('leads')) return;
    return runMutation(async () => {
      try {
        await safeUpsert('leads', lead);
      } catch (err: any) {
        console.warn('Error pushing lead to Supabase:', err?.message || err);
      }
    });
  },

  async deleteLead(id: string): Promise<void> {
    registerLocalMutation('leads', id, 'delete');
    broadcastSyncMutation('leads');
    if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes('leads')) return;
    return runMutation(async () => {
      try {
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (error) throw error;
      } catch (err: any) {
        console.warn('Error deleting lead from Supabase:', err?.message || err);
      }
    });
  },

  async pushService(service: ServiceItem): Promise<void> {
    registerLocalMutation('services', service.id, 'upsert', service);
    broadcastSyncMutation('services');
    if (syncStatus.missingTables.includes('services')) return;
    return runMutation(async () => {
      try {
        await safeUpsert('services', service);
      } catch (err: any) {
        console.warn('Error pushing service to Supabase:', err?.message || err);
      }
    });
  },

  async pushHistoricalRecord(record: HistoricalRecord): Promise<void> {
    registerLocalMutation('historical_records', record.id, 'upsert', record);
    broadcastSyncMutation('historical_records');
    if (syncStatus.missingTables.includes('historical_records')) return;
    return runMutation(async () => {
      try {
        await safeUpsert('historical_records', record);
      } catch (err: any) {
        console.warn('Error pushing historical record to Supabase:', err?.message || err);
      }
    });
  }
};
