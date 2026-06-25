import { supabase, isSupabaseConfigured, supabaseUrl } from './supabaseClient';
import { Project, Lead, ServiceItem } from './dataStore';
import { TestimonialItem, HistoricalRecord } from '../types';

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

// Listeners/callbacks when sync status updates
const statusListeners = new Set<(status: SupabaseSyncStatus) => void>();

function notifyStatusChange() {
  statusListeners.forEach(listener => listener({ ...syncStatus }));
}

// Helper to upsert with smart fallbacks for casing (corrected)
async function safeUpsert(tableName: string, originalData: any): Promise<void> {
  if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes(tableName)) return;

  try {
    // Attempt to save to Supabase using exact payload first
    const { error: directError } = await supabase.from(tableName).upsert(originalData);
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
    const lowercaseData = mapKeys(originalData, k => k.toLowerCase());
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
    const snakeData = mapKeys(originalData, toSnakeCase);
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

    console.log('Syncing data with Supabase...');

    // 1. Sync Projects
    try {
      const { data: dbProjects, error: pErr } = await supabase.from('projects').select('*');
      if (pErr) {
        if (pErr.message?.includes('Invalid path') || pErr.code === 'PGRST116') {
          missingTables.push('projects');
        } else {
          firstGeneralError = firstGeneralError || pErr.message;
        }
        console.warn('Could not sync projects table:', pErr.message);
      } else if (dbProjects) {
        if (dbProjects.length > 0) {
          localStorage.setItem('jg_projects', JSON.stringify(normalizeToCamelCase(dbProjects)));
        } else {
          // Supabase empty - seed from localStorage
          const localRaw = localStorage.getItem('jg_projects');
          if (localRaw) {
            const localProjects = JSON.parse(localRaw);
            for (const item of localProjects) {
              await safeUpsert('projects', item);
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Projects sync failed:', err);
      hasError = true;
    }

    // 2. Sync Testimonials
    try {
      const { data: dbTestimonials, error: tErr } = await supabase.from('testimonials').select('*');
      if (tErr) {
        if (tErr.message?.includes('Invalid path') || tErr.code === 'PGRST116') {
          missingTables.push('testimonials');
        } else {
          firstGeneralError = firstGeneralError || tErr.message;
        }
        console.warn('Could not sync testimonials table:', tErr.message);
      } else if (dbTestimonials) {
        if (dbTestimonials.length > 0) {
          localStorage.setItem('jg_testimonials', JSON.stringify(normalizeToCamelCase(dbTestimonials)));
        } else {
          const localRaw = localStorage.getItem('jg_testimonials');
          if (localRaw) {
            const localTestimonials = JSON.parse(localRaw);
            for (const item of localTestimonials) {
              await safeUpsert('testimonials', item);
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Testimonials sync failed:', err);
      hasError = true;
    }

    // 3. Sync Leads
    try {
      const { data: dbLeads, error: lErr } = await supabase.from('leads').select('*');
      if (lErr) {
        if (lErr.message?.includes('Invalid path') || lErr.code === 'PGRST116') {
          missingTables.push('leads');
        } else {
          firstGeneralError = firstGeneralError || lErr.message;
        }
        console.warn('Could not sync leads table:', lErr.message);
      } else if (dbLeads) {
        if (dbLeads.length > 0) {
          localStorage.setItem('jg_leads', JSON.stringify(normalizeToCamelCase(dbLeads)));
        } else {
          const localRaw = localStorage.getItem('jg_leads');
          if (localRaw) {
            const localLeads = JSON.parse(localRaw);
            for (const item of localLeads) {
              await safeUpsert('leads', item);
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Leads sync failed:', err);
      hasError = true;
    }

    // 4. Sync Services
    try {
      const { data: dbServices, error: sErr } = await supabase.from('services').select('*');
      if (sErr) {
        if (sErr.message?.includes('Invalid path') || sErr.code === 'PGRST116') {
          missingTables.push('services');
        } else {
          firstGeneralError = firstGeneralError || sErr.message;
        }
        console.warn('Could not sync services table:', sErr.message);
      } else if (dbServices) {
        if (dbServices.length > 0) {
          localStorage.setItem('jg_services', JSON.stringify(normalizeToCamelCase(dbServices)));
        } else {
          const localRaw = localStorage.getItem('jg_services');
          if (localRaw) {
            const localServices = JSON.parse(localRaw);
            for (const item of localServices) {
              await safeUpsert('services', item);
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Services sync failed:', err);
      hasError = true;
    }

    // 5. Sync Historical Records
    try {
      const { data: dbHistory, error: hErr } = await supabase.from('historical_records').select('*');
      if (hErr) {
        if (hErr.message?.includes('Invalid path') || hErr.code === 'PGRST116') {
          missingTables.push('historical_records');
        } else {
          firstGeneralError = firstGeneralError || hErr.message;
        }
        console.warn('Could not sync historical_records table:', hErr.message);
      } else if (dbHistory) {
        if (dbHistory.length > 0) {
          localStorage.setItem('jg_historical_records', JSON.stringify(normalizeToCamelCase(dbHistory)));
        } else {
          const localRaw = localStorage.getItem('jg_historical_records');
          if (localRaw) {
            const localHistory = JSON.parse(localRaw);
            for (const item of localHistory) {
              await safeUpsert('historical_records', item);
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Historical records sync failed:', err);
      hasError = true;
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

    console.log('Supabase sync phase ended.', syncStatus);

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
    } else {
      console.log('✅ SUCCESS: Supabase is fully connected, synchronized, and all tables are live!');
    }

    return !syncStatus.hasError;
  },

  async pushProject(project: Project): Promise<void> {
    if (syncStatus.missingTables.includes('projects')) return;
    try {
      await safeUpsert('projects', project);
    } catch (err: any) {
      console.warn('Error pushing project to Supabase:', err?.message || err);
    }
  },

  async deleteProject(id: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes('projects')) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      console.warn('Error deleting project from Supabase:', err?.message || err);
    }
  },

  async pushTestimonial(testimonial: TestimonialItem & { isDeleted?: boolean }): Promise<void> {
    if (syncStatus.missingTables.includes('testimonials')) return;
    try {
      await safeUpsert('testimonials', testimonial);
    } catch (err: any) {
      console.warn('Error pushing testimonial to Supabase:', err?.message || err);
    }
  },

  async deleteTestimonial(id: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes('testimonials')) return;
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      console.warn('Error deleting testimonial from Supabase:', err?.message || err);
    }
  },

  async pushLead(lead: Lead): Promise<void> {
    if (syncStatus.missingTables.includes('leads')) return;
    try {
      await safeUpsert('leads', lead);
    } catch (err: any) {
      console.warn('Error pushing lead to Supabase:', err?.message || err);
    }
  },

  async deleteLead(id: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase || syncStatus.missingTables.includes('leads')) return;
    try {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (error) throw error;
    } catch (err: any) {
      console.warn('Error deleting lead from Supabase:', err?.message || err);
    }
  },

  async pushService(service: ServiceItem): Promise<void> {
    if (syncStatus.missingTables.includes('services')) return;
    try {
      await safeUpsert('services', service);
    } catch (err: any) {
      console.warn('Error pushing service to Supabase:', err?.message || err);
    }
  },

  async pushHistoricalRecord(record: HistoricalRecord): Promise<void> {
    if (syncStatus.missingTables.includes('historical_records')) return;
    try {
      await safeUpsert('historical_records', record);
    } catch (err: any) {
      console.warn('Error pushing historical record to Supabase:', err?.message || err);
    }
  }
};
