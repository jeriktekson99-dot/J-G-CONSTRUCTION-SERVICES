import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  Users, 
  CheckSquare, 
  FileText, 
  Settings, 
  ArrowLeft, 
  Trash2, 
  RotateCcw, 
  TrendingUp, 
  Plus, 
  Edit, 
  Save, 
  X, 
  Calendar, 
  LogOut, 
  Compass, 
  Mail, 
  Phone, 
  MapPin, 
  Activity, 
  CheckCircle,
  Star,
  Layers,
  Search,
  Filter,
  Check,
  Upload,
  Image as ImageIcon,
  Eye,
  Link as LinkIcon,
  Menu,
  ExternalLink
} from 'lucide-react';
import { dataStore, Project, Lead } from '../utils/dataStore';
import { TestimonialItem, HistoricalRecord } from '../types';
import { supabaseSync, SupabaseSyncStatus } from '../utils/supabaseSync';
import { isSupabaseConfigured, supabase } from '../utils/supabaseClient';
import RichTextEditor from './RichTextEditor';
import SgLogo from './SgLogo';
import ProjectShowcasePage from './ProjectShowcasePage';

interface AdminPortalProps {
  onScrollToSection: (id: string) => void;
  setView: (view: 'home' | 'about' | 'services' | 'portfolio' | 'get-started' | 'privacy-policy' | 'terms-of-use' | 'safety-compliance') => void;
  onViewLiveProject?: (project: Project) => void;
}

type AdminTab = 'overview' | 'leads' | 'projects' | 'testimonials' | 'trash' | 'settings';

export default function AdminPortal({ onScrollToSection, setView, onViewLiveProject }: AdminPortalProps) {
  // Authentication States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<'email' | 'password' | 'resetEmail' | 'recoveryPassword' | 'recoveryConfirmPassword' | null>(null);

  // Password Recovery and Forgot Password States
  const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
  const [isRecoveryMode, setIsRecoveryMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [recoveryPassword, setRecoveryPassword] = useState('');
  const [recoveryConfirmPassword, setRecoveryConfirmPassword] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [recoverySuccess, setRecoverySuccess] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  // Logged-in Change Password States (under Settings tab)
  const [oldPasswordVal, setOldPasswordVal] = useState('');
  const [changePasswordVal, setChangePasswordVal] = useState('');
  const [changeConfirmPasswordVal, setChangeConfirmPasswordVal] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [changePasswordLoading, setChangePasswordLoading] = useState(false);

  // Active Panel/View states inside Dashboard
  const [activeTab, setActiveTab] = useState<AdminTab>(() => {
    const saved = localStorage.getItem('jg_admin_active_tab');
    if (saved && ['overview', 'leads', 'projects', 'testimonials', 'trash', 'settings'].includes(saved)) {
      return saved as AdminTab;
    }
    return 'overview';
  });
  
  useEffect(() => {
    localStorage.setItem('jg_admin_active_tab', activeTab);
  }, [activeTab]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Social handles state
  const [facebookInput, setFacebookInput] = useState(() => localStorage.getItem('jg_facebook_url') || 'https://facebook.com');
  const [tiktokInput, setTiktokInput] = useState(() => localStorage.getItem('jg_tiktok_url') || 'https://tiktok.com');
  const [instagramInput, setInstagramInput] = useState(() => localStorage.getItem('jg_instagram_url') || 'https://instagram.com');

  // Performance Velocity active mode
  const [velocityMode, setVelocityMode] = useState<'YEARLY' | 'WEEKLY'>('YEARLY');

  // Dynamic Data States (Hydrated from local db)
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);

  // Search/Filters inside Panels
  const [leadSearch, setLeadSearch] = useState('');
  const [leadFilter, setLeadFilter] = useState<'All' | 'Pending' | 'Reviewed' | 'Archived'>('All');
  const [leadShowSoftDeleted, setLeadShowSoftDeleted] = useState(false);

  const [projectSearch, setProjectSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<'All' | 'Completed' | 'Ongoing'>('All');
  const [projShowSoftDeleted, setProjShowSoftDeleted] = useState(false);
  const [trashFilter, setTrashFilter] = useState<'all' | 'leads' | 'projects' | 'testimonials'>('all');

  // Secondary Filters
  const [leadCategoryFilter, setLeadCategoryFilter] = useState('All');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');
  const [trashSearch, setTrashSearch] = useState('');
  const [trashTimeFilter, setTrashTimeFilter] = useState<'All' | 'Recent' | 'Historic'>('All');

  // Multi-row selection systems
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [selectedTrashKeys, setSelectedTrashKeys] = useState<string[]>([]);

  // Detailed Modal Viewing states
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingTestimonial, setViewingTestimonial] = useState<TestimonialItem | null>(null);
  const [previewProjectDetails, setPreviewProjectDetails] = useState<Project | null>(null);

  // Edit/Create Modals
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'isDeleted'>>({
    id: '',
    title: '',
    category: 'Structural Design',
    location: '',
    image: '/assets/images/industrial_retrofit_1780500246965.png',
    images: [],
    scope: '',
    client: '',
    completedYear: '2026',
    complianceRatio: '100% Code Safety Certified',
    description: '',
    status: 'Completed'
  });

  const isOngoingMode = (editingProject ? editingProject.status : newProject.status) === 'Ongoing';

  // Testimonial Form States
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isCreatingTestimonial, setIsCreatingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<TestimonialItem>({
    id: '',
    quote: '',
    author: '',
    role: '',
    organization: '',
    stars: 5
  });

  // Action Feed State (Audit trail)
  const [auditLog, setAuditLog] = useState<string[]>([]);

  // Pagination States
  const [leadsCurrentPage, setLeadsCurrentPage] = useState(1);
  const [leadsPerPage, setLeadsPerPage] = useState(10);

  const [projectsCurrentPage, setProjectsCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(10);

  const [trashCurrentPage, setTrashCurrentPage] = useState(1);
  const [trashPerPage, setTrashPerPage] = useState(10);

  // Reset pagination to first page when search filters change
  useEffect(() => {
    setLeadsCurrentPage(1);
  }, [leadSearch, leadFilter, leadCategoryFilter, leadShowSoftDeleted]);

  useEffect(() => {
    setProjectsCurrentPage(1);
  }, [projectSearch, projectFilter, projectCategoryFilter, projShowSoftDeleted]);

  useEffect(() => {
    setTrashCurrentPage(1);
  }, [trashSearch, trashFilter, trashTimeFilter]);

  // Leads performance acquisition states
  const [perfViewMode, setPerfViewMode] = useState<'MONTHLY' | 'YEARLY'>('MONTHLY');
  const [perfMonth, setPerfMonth] = useState<number>(5); // Default to June (index 5, active month)
  const [perfYear, setPerfYear] = useState<number>(2026); // Default to 2026
  const [historicalRecords, setHistoricalRecords] = useState<HistoricalRecord[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; x: number; y: number; val: number } | null>(null);

  // Ref for yearly performance sub-grid horizontal scroll
  const yearlyScrollRef = useRef<HTMLDivElement>(null);

  const handleYearlyScrollDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const ele = yearlyScrollRef.current;
    if (!ele) return;
    
    const startX = e.pageX - ele.offsetLeft;
    const scrollLeft = ele.scrollLeft;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.pageX - ele.offsetLeft;
      const walk = (x - startX) * 1.5;
      ele.scrollLeft = scrollLeft - walk;
    };
    
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Real-time automatic telemetry update interval
  useEffect(() => {
    if (!isAuthenticated) return;
    
    const interval = setInterval(async () => {
      if (isSupabaseConfigured) {
        await supabaseSync.pullAll();
      }
      refreshDataCollections();
    }, 8000); // Poll and reload data in real-time every 8 seconds
    
    return () => clearInterval(interval);
  }, [isAuthenticated, isSupabaseConfigured]);

  // Dialog Overlay and alert banner state
  const [dialog, setDialog] = useState<{
    isOpen: boolean;
    type: 'alert' | 'confirm';
    title: string;
    message: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: ''
  });

  const triggerAlert = (title: string, message: string) => {
    setDialog({
      isOpen: true,
      type: 'alert',
      title,
      message
    });
  };

  const triggerConfirm = (title: string, message: string, onConfirm: () => void) => {
    setDialog({
      isOpen: true,
      type: 'confirm',
      title,
      message,
      onConfirm
    });
  };

  const [supabaseStatus, setSupabaseStatus] = useState<SupabaseSyncStatus>(() => supabaseSync.getSyncStatus());

  // Hydrate Sessions and Collections on mount
  useEffect(() => {
    const checkAuthSession = async () => {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session && session.user) {
            setIsAuthenticated(true);
            localStorage.setItem('jg_admin_session', 'active');
            addLogEntry('SES_RESTORE', `Active session restored for ${session.user.email} from cloud auth.`);
          } else {
            setIsAuthenticated(false);
            localStorage.removeItem('jg_admin_session');
          }
        } catch (err) {
          console.error("Error getting auth session on mount:", err);
          setIsAuthenticated(false);
          localStorage.removeItem('jg_admin_session');
        }
      } else {
        // Since local administrative credentials have been fully removed for security,
        // any legacy local active session is invalidated if Supabase isn't configured.
        setIsAuthenticated(false);
        localStorage.removeItem('jg_admin_session');
      }
    };

    checkAuthSession();
    refreshDataCollections();

    // Subscribe to Supabase synchronization updates
    const unsubscribeSync = supabaseSync.subscribe(status => {
      setSupabaseStatus(status);
    });

    return () => {
      unsubscribeSync();
    };
  }, [isSupabaseConfigured]);

  // Handle Supabase Authentication State Changes and Password Recovery
  useEffect(() => {
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const hasRecoveryType = hash.includes('type=recovery') || search.includes('type=recovery');
    
    if (hasRecoveryType) {
      setIsRecoveryMode(true);
      addLogEntry('AUTH_RECOV', 'Recovery link routing detected from external context.');
    }

    if (isSupabaseConfigured && supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setIsAuthenticated(true);
          localStorage.setItem('jg_admin_session', 'active');
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          localStorage.removeItem('jg_admin_session');
        } else if (event === 'PASSWORD_RECOVERY') {
          setIsRecoveryMode(true);
          addLogEntry('AUTH_RECOV', 'Captured Supabase password recovery authorization event.');
        }
      });
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isSupabaseConfigured]);

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError('');
    setResetSuccess('');
    
    if (!resetEmail) {
      setResetError('ERROR: EMAIL IS REQUIRED.');
      return;
    }
    
    if (!isSupabaseConfigured || !supabase) {
      setResetError('ERROR: SUPABASE AUTHENTICATION ENGINE IS NOT INITIALIZED.');
      return;
    }
    
    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim().toLowerCase(), {
        redirectTo: `${window.location.origin}${window.location.pathname}`,
      });
      
      if (error) {
        setResetError(`ERROR: ${error.message.toUpperCase()}`);
        addLogEntry('RECOV_FAIL', `Password reset request failed for ${resetEmail}: ${error.message}`);
      } else {
        setResetSuccess('SUCCESS: SECURE RECOVERY LINK DISPATCHED TO YOUR INBOX. PLEASE CHECK YOUR EMAIL.');
        addLogEntry('RECOV_REQ', `Secure password reset invitation dispatched to ${resetEmail}.`);
        setResetEmail('');
      }
    } catch (err: any) {
      setResetError('ERROR: EXCEPTION CAUGHT DURING RECOVERY ROUTING INITIATION.');
      console.error(err);
    } finally {
      setResetLoading(false);
    }
  };

  const handleRecoverySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    setRecoverySuccess('');
    
    if (!recoveryPassword) {
      setRecoveryError('ERROR: SECURE PASSPHRASE CANNOT BE EMPTY.');
      return;
    }
    
    if (recoveryPassword !== recoveryConfirmPassword) {
      setRecoveryError('ERROR: SECURITY VERIFICATION PHRASE DOES NOT ALIGN.');
      return;
    }
    
    if (recoveryPassword.length < 6) {
      setRecoveryError('ERROR: SYSTEM SECURITY RULES ENFORCE A MINIMUM OF 6 CHARACTERS.');
      return;
    }
    
    if (!isSupabaseConfigured || !supabase) {
      setRecoveryError('ERROR: SUPABASE ENGINE DISCONNECTED.');
      return;
    }
    
    setRecoveryLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: recoveryPassword,
      });
      
      if (error) {
        setRecoveryError(`ERROR: ${error.message.toUpperCase()}`);
        addLogEntry('RECOV_FAIL', `Failed to rotate credentials: ${error.message}`);
      } else {
        setRecoverySuccess('SUCCESS: ACCOUNT PASSWORD UPDATED. SYSTEM PRIVILEGES RE-ESTABLISHED.');
        addLogEntry('RECOV_PASS', 'Administrative credentials updated successfully via secure email link.');
        setRecoveryPassword('');
        setRecoveryConfirmPassword('');
        
        setTimeout(() => {
          setIsRecoveryMode(false);
          setIsForgotPasswordMode(false);
          window.history.replaceState({}, document.title, window.location.pathname);
        }, 3000);
      }
    } catch (err: any) {
      setRecoveryError('ERROR: SYSTEM EXCEPTION HANDLED DURING KEY ROTATION.');
      console.error(err);
    } finally {
      setRecoveryLoading(false);
    }
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    if (!oldPasswordVal) {
      setChangePasswordError('ERROR: RETYPE OLD PASSWORD FIELD CANNOT BE EMPTY.');
      return;
    }
    if (!changePasswordVal) {
      setChangePasswordError('ERROR: PASSWORD FIELD CANNOT BE EMPTY.');
      return;
    }
    if (changePasswordVal !== changeConfirmPasswordVal) {
      setChangePasswordError('ERROR: PASSWORD VERIFICATION PHRASE DOES NOT ALIGN.');
      return;
    }
    if (changePasswordVal.length < 6) {
      setChangePasswordError('ERROR: SYSTEM SECURITY RULES ENFORCE A MINIMUM OF 6 CHARACTERS.');
      return;
    }
    if (!isSupabaseConfigured || !supabase) {
      setChangePasswordError('ERROR: SUPABASE ENGINE DISCONNECTED.');
      return;
    }

    setChangePasswordLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !user.email) {
        setChangePasswordError('ERROR: NO ACTIVE SESSION DETECTED.');
        setChangePasswordLoading(false);
        return;
      }

      // Re-authenticate user to verify old password
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPasswordVal,
      });

      if (verifyError) {
        setChangePasswordError('ERROR: OLD PASSWORD VERIFICATION FAILED.');
        addLogEntry('CHG_PASS_FAIL', 'Failed to rotate password due to incorrect old password.');
        setChangePasswordLoading(false);
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: changePasswordVal,
      });

      if (error) {
        setChangePasswordError(`ERROR: ${error.message.toUpperCase()}`);
        addLogEntry('CHG_PASS_FAIL', `Failed to change password: ${error.message}`);
      } else {
        setChangePasswordSuccess('SUCCESS: SECURITY KEY UPDATED. ACCOUNT PASSWORD ROTATED SUCCESSFULLY.');
        addLogEntry('CHG_PASS_SUCCESS', 'Administrative password updated successfully via secure control panel.');
        setOldPasswordVal('');
        setChangePasswordVal('');
        setChangeConfirmPasswordVal('');
      }
    } catch (err: any) {
      setChangePasswordError('ERROR: SYSTEM EXCEPTION HANDLED DURING KEY ROTATION.');
      console.error(err);
    } finally {
      setChangePasswordLoading(false);
    }
  };

  const refreshDataCollections = () => {
    dataStore.checkAndApplyRollover();
    setLeads(dataStore.getLeads(true));
    setProjects(dataStore.getProjects(true));
    setTestimonials(dataStore.getTestimonials(true));
    setHistoricalRecords(dataStore.getHistoricalRecords());
  };

  const addLogEntry = (eventCode: string, description: string) => {
    const stamp = new Date().toLocaleTimeString();
    setAuditLog(prev => [`[${stamp}] ${eventCode}: ${description}`, ...prev.slice(0, 49)]);
  };

  // Secure Authentication Checkpoint handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (!email || !password) {
      setAuthError('ERROR: UNVERIFIED ADMINISTRATIVE PAYLOAD.');
      return;
    }

    setAuthLoading(true);

    // 1. Attempt Supabase Authentication if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password: password,
        });

        if (!error && data?.user) {
          setIsAuthenticated(true);
          localStorage.setItem('jg_admin_session', 'active');
          addLogEntry('AUTH_PASS', `User ${email} authenticated successfully via Supabase Auth.`);
          setAuthLoading(false);
          return;
        } else if (error) {
          setAuthError(`ERROR: ${error.message.toUpperCase()}`);
          addLogEntry('AUTH_FAIL', `Supabase Auth failure for ${email}: ${error.message}`);
          setAuthLoading(false);
          return;
        }
      } catch (supabaseErr: any) {
        console.error("Supabase sign-in caught exception:", supabaseErr);
        setAuthError('ERROR: INTERNAL SECURITY ROUTING FAULT.');
        addLogEntry('AUTH_FAIL', `Supabase connection exception for ${email}`);
        setAuthLoading(false);
        return;
      }
    } else {
      // Supabase is not configured
      setAuthError('ERROR: SUPABASE NOT CONFIGURED. PLEASE SET UP CREDENTIALS.');
      addLogEntry('AUTH_FAIL', `Login blocked for ${email}: Supabase is not configured.`);
      setAuthLoading(false);
      return;
    }

    // 2. Fallback failure response if nothing worked
    setAuthError('ERROR: UNVERIFIED ADMINISTRATIVE PAYLOAD.');
    addLogEntry('AUTH_FAIL', `Unconfirmed login attempt by ${email}`);
    setAuthLoading(false);
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error("Error invoking Supabase signOut:", err);
      }
    }
    localStorage.removeItem('jg_admin_session');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    addLogEntry('SES_CLOSED', 'Administration workspace signed out.');
  };

  // BULK LEAD ACTIONS
  const handleBulkReviewLeads = () => {
    selectedLeadIds.forEach(id => {
      dataStore.updateLeadStatus(id, 'Reviewed');
    });
    refreshDataCollections();
    setSelectedLeadIds([]);
    addLogEntry('LEAD_BULK_REV', `Bulk certified ${selectedLeadIds.length} inbound leads.`);
    triggerAlert("BULK PROCESS COMPLETE", `Successfully updated status for ${selectedLeadIds.length} records.`);
  };

  const handleBulkArchiveLeads = () => {
    selectedLeadIds.forEach(id => {
      dataStore.updateLeadStatus(id, 'Archived');
    });
    refreshDataCollections();
    setSelectedLeadIds([]);
    addLogEntry('LEAD_BULK_ARC', `Bulk archived ${selectedLeadIds.length} inbound file registers.`);
    triggerAlert("BULK PROCESS COMPLETE", `Successfully archived ${selectedLeadIds.length} records.`);
  };

  const handleBulkDeleteLeads = () => {
    triggerConfirm(
      "BULK SOFT-DELETION PROTOCOL",
      `Are you absolutely sure you want to soft-delete the ${selectedLeadIds.length} selected records?`,
      () => {
        selectedLeadIds.forEach(id => {
          dataStore.deleteLeadSoft(id);
        });
        refreshDataCollections();
        setSelectedLeadIds([]);
        addLogEntry('LEAD_BULK_DEL', `Bulk isolated ${selectedLeadIds.length} entries.`);
        triggerAlert("BULK DELETION COMPLETE", `Moved ${selectedLeadIds.length} records to the system vault binary dump.`);
      }
    );
  };

  // BULK PROJECT ACTIONS
  const handleBulkToggleProjects = () => {
    selectedProjectIds.forEach(id => {
      const p = dataStore.getProjectById(id);
      if (p) {
        const nextStatus = p.status === 'Completed' ? 'Ongoing' : 'Completed';
        dataStore.saveProject({ ...p, status: nextStatus });
      }
    });
    refreshDataCollections();
    setSelectedProjectIds([]);
    addLogEntry('PROJ_BULK_TGL', `Bulk cycled progress schedule of ${selectedProjectIds.length} projects.`);
    triggerAlert("BULK PROCESS COMPLETE", `Cycled progress status for ${selectedProjectIds.length} records.`);
  };

  const handleBulkDeleteProjects = () => {
    triggerConfirm(
      "BULK SOFT-DELETION PROTOCOL",
      `Are you absolutely sure you want to soft-delete the ${selectedProjectIds.length} selected project assets?`,
      () => {
        selectedProjectIds.forEach(id => {
          dataStore.deleteProjectSoft(id);
        });
        refreshDataCollections();
        setSelectedProjectIds([]);
        addLogEntry('PROJ_BULK_DEL', `Bulk isolated ${selectedProjectIds.length} designs.`);
        triggerAlert("BULK DELETION COMPLETE", `Moved ${selectedProjectIds.length} projects to the system vault dump.`);
      }
    );
  };

  // BULK TRASH ACTIONS
  const handleBulkRestoreTrash = async () => {
    const promises = selectedTrashKeys.map(async (key) => {
      const parts = key.split('-');
      const type = parts[1];
      const id = parts.slice(2).join('-');
      if (type === 'lead') {
        await dataStore.restoreLead(id);
      } else if (type === 'project') {
        await dataStore.restoreProject(id);
      } else if (type === 'testimonial') {
        await dataStore.restoreTestimonial(id);
      }
    });
    await Promise.all(promises);
    refreshDataCollections();
    setSelectedTrashKeys([]);
    addLogEntry('TRASH_BULK_RSTR', `Bulk restored ${selectedTrashKeys.length} records back to system pipelines.`);
    triggerAlert("BULK RECOVERED", `Successfully restored ${selectedTrashKeys.length} items back to active pipelines.`);
  };

  const handleBulkPurgeTrash = () => {
    triggerConfirm(
      "CONFIRM PERMANENT BULK PURGE",
      `SECURITY PROTOCOL: Are you absolutely certain you want to permanently delete these ${selectedTrashKeys.length} records from history? This action is mathematically irreversible.`,
      async () => {
        const promises = selectedTrashKeys.map(async (key) => {
          const parts = key.split('-');
          const type = parts[1];
          const id = parts.slice(2).join('-');
          if (type === 'lead') {
            await dataStore.hardDeleteLead(id);
          } else if (type === 'project') {
            await dataStore.hardDeleteProject(id);
          } else if (type === 'testimonial') {
            await dataStore.hardDeleteTestimonial(id);
          }
        });
        await Promise.all(promises);
        refreshDataCollections();
        setSelectedTrashKeys([]);
        addLogEntry('TRASH_BULK_PURG', `Bulk permanently purged ${selectedTrashKeys.length} items.`);
        triggerAlert("BULK REQUISITION COMPLETED", `Wiped selected records entirely from browser storage cache.`);
      }
    );
  };

  // LEAD ACTIONS
  const handleUpdateLeadStatus = (id: string, status: 'Pending' | 'Reviewed' | 'Archived') => {
    dataStore.updateLeadStatus(id, status);
    refreshDataCollections();
    const lead = dataStore.getLeads(true).find(l => l.id === id);
    addLogEntry('LEAD_STATE', `Lead (Ref: ${lead?.fullName}) updated to status: ${status.toUpperCase()}`);
  };

  const handleSoftDeleteLead = async (id: string) => {
    await dataStore.deleteLeadSoft(id);
    refreshDataCollections();
    addLogEntry('LEAD_S_DEL', `Lead ${id} flags marked as DELETED (isolated in soft-delete vault).`);
  };

  const handleRestoreLead = async (id: string) => {
    await dataStore.restoreLead(id);
    refreshDataCollections();
    addLogEntry('LEAD_REST', `Lead ${id} safely active state restored.`);
  };

  const handleHardDeleteLead = (id: string) => {
    const lead = dataStore.getLeads(true).find(l => l.id === id);
    triggerConfirm(
      "CONFIRM PERMANENT PURGE",
      `Are you absolutely sure you want to permanently purge lead file of "${lead?.fullName}"? This action cannot be reversed.`,
      async () => {
        await dataStore.hardDeleteLead(id);
        refreshDataCollections();
        addLogEntry('LEAD_H_DEL', `Lead reference ${id} permanently wiped from databases.`);
      }
    );
  };

  // PROJECT ACTIONS
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const projectToSave: Project = editingProject 
      ? { ...editingProject } 
      : { ...newProject, id: 'proj-' + Date.now() };

    const isOngoing = projectToSave.status === 'Ongoing';
    if (isOngoing) {
      projectToSave.completedYear = 'Ongoing';
      projectToSave.scope = projectToSave.scope || 'Ongoing Project';
    }

    if (!projectToSave.title || !projectToSave.location || !projectToSave.scope || !projectToSave.description) {
      triggerAlert('REQUISITION ERROR', 'Required parameters missing. Please inspect structural fields.');
      return;
    }

    dataStore.saveProject(projectToSave);
    refreshDataCollections();
    
    if (editingProject) {
      addLogEntry('PROJ_UPD', `Project files for "${projectToSave.title}" saved.`);
      setEditingProject(null);
    } else {
      addLogEntry('PROJ_NEW', `New project profile "${projectToSave.title}" successfully ingested.`);
      setIsCreatingProject(false);
      setNewProject({
        id: '',
        title: '',
        category: 'Structural Design',
        location: '',
        image: '/assets/images/industrial_retrofit_1780500246965.png',
        images: [],
        scope: '',
        client: '',
        completedYear: '2026',
        complianceRatio: '100% Code Safety Certified',
        description: '',
        status: 'Completed'
      });
    }
  };

  const handleImageFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        triggerAlert("INVALID ASSET", "Only valid image assets are permitted.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        if (base64) {
          if (editingProject) {
            setEditingProject(prev => {
              if (!prev) return null;
              const currentImages = prev.images || [];
              const updatedImages = [...currentImages, base64];
              const isDefaultImage = !prev.image || prev.image.startsWith('/src/assets/images');
              return {
                ...prev,
                image: isDefaultImage ? base64 : prev.image,
                images: updatedImages
              };
            });
          } else {
            setNewProject(prev => {
              const currentImages = prev.images || [];
              const updatedImages = [...currentImages, base64];
              const isDefaultImage = !prev.image || prev.image.startsWith('/src/assets/images');
              return {
                ...prev,
                image: isDefaultImage ? base64 : prev.image,
                images: updatedImages
              };
            });
          }
          addLogEntry('IMG_UP', `Custom project image "${file.name}" ingested.`);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleToggleProjectStatus = (id: string) => {
    const p = dataStore.getProjectById(id);
    if (p) {
      const nextStatus = p.status === 'Completed' ? 'Ongoing' : 'Completed';
      dataStore.saveProject({ ...p, status: nextStatus });
      refreshDataCollections();
      addLogEntry('PROJ_STAT', `Project "${p.title}" scheduling changed to ${nextStatus.toUpperCase()}`);
    }
  };

  const handleSoftDeleteProject = async (id: string) => {
    await dataStore.deleteProjectSoft(id);
    refreshDataCollections();
    const p = dataStore.getProjectById(id);
    addLogEntry('PROJ_S_DEL', `Project "${p?.title}" soft-deleted (retained in safety database folder).`);
  };

  const handleRestoreProject = async (id: string) => {
    await dataStore.restoreProject(id);
    refreshDataCollections();
    const p = dataStore.getProjectById(id);
    addLogEntry('PROJ_REST', `Project "${p?.title}" returned to active index listing.`);
  };

  const handleHardDeleteProject = (id: string) => {
    const p = dataStore.getProjects(true).find(item => item.id === id);
    triggerConfirm(
      "CONFIRM PERMANENT PURGE",
      `This will destroy records for "${p?.title}". Permanent deletion is irreversible. Confirm?`,
      async () => {
        await dataStore.hardDeleteProject(id);
        refreshDataCollections();
        addLogEntry('PROJ_H_DEL', `Database indexes and records of project ID ${id} wiped.`);
      }
    );
  };

  // TESTIMONIAL ACTIONS
  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const testimonialToSave = editingTestimonial
      ? { ...editingTestimonial }
      : { ...newTestimonial, id: 'cl-' + Date.now() };

    if (!testimonialToSave.quote || !testimonialToSave.author || !testimonialToSave.role) {
      triggerAlert('REQUISITION ERROR', 'Review forms require Author, Role, and Quote content fields.');
      return;
    }

    dataStore.saveTestimonial(testimonialToSave);
    refreshDataCollections();

    if (editingTestimonial) {
      addLogEntry('TEST_UPD', `Testimonial by "${testimonialToSave.author}" saved on indexes.`);
      setEditingTestimonial(null);
    } else {
      addLogEntry('TEST_NEW', `New customer perspective by "${testimonialToSave.author}" verified and added.`);
      setIsCreatingTestimonial(false);
      setNewTestimonial({
        id: '',
        quote: '',
        author: '',
        role: '',
        organization: '',
        stars: 5
      });
    }
  };

  const handleSoftDeleteTestimonial = async (id: string) => {
    await dataStore.deleteTestimonialSoft(id);
    refreshDataCollections();
    addLogEntry('TEST_S_DEL', `Testimonial reference ${id} marked as soft-deleted.`);
  };

  const handleRestoreTestimonial = async (id: string) => {
    await dataStore.restoreTestimonial(id);
    refreshDataCollections();
    addLogEntry('TEST_REST', `Testimonial reference ${id} successfully restored.`);
  };

  const handleHardDeleteTestimonial = (id: string) => {
    const t = dataStore.getTestimonials(true).find(item => item.id === id);
    triggerConfirm(
      "CONFIRM PERMANENT PURGE",
      `Are you absolutely sure you want to permanently remove of client review by ${t?.author}?`,
      async () => {
        await dataStore.hardDeleteTestimonial(id);
        refreshDataCollections();
        addLogEntry('TEST_H_DEL', `Review records corresponding to ${id} wiped entirely.`);
      }
    );
  };

  // Filter and Search Operations
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) || 
                          l.companyEmail.toLowerCase().includes(leadSearch.toLowerCase()) ||
                          l.projectScope.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesFilter = leadFilter === 'All' || l.status === leadFilter;
    const matchesCategory = leadCategoryFilter === 'All' || l.serviceCategory === leadCategoryFilter;
    const matchesSoftDeleted = !l.isDeleted;
    return matchesSearch && matchesFilter && matchesCategory && matchesSoftDeleted;
  });

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
                          p.client.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesFilter = projectFilter === 'All' || p.status === projectFilter;
    const matchesCategory = projectCategoryFilter === 'All' || p.category === projectCategoryFilter;
    const matchesSoftDeleted = !p.isDeleted;
    return matchesSearch && matchesFilter && matchesCategory && matchesSoftDeleted;
  });

  // Pagination calculations
  const totalLeadsPages = Math.ceil(filteredLeads.length / leadsPerPage);
  const activeLeadsPage = Math.min(leadsCurrentPage, Math.max(1, totalLeadsPages));
  const leadsStartIndex = (activeLeadsPage - 1) * leadsPerPage;
  const paginatedLeads = filteredLeads.slice(leadsStartIndex, leadsStartIndex + leadsPerPage);

  const totalProjectsPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const activeProjectsPage = Math.min(projectsCurrentPage, Math.max(1, totalProjectsPages));
  const projectsStartIndex = (activeProjectsPage - 1) * projectsPerPage;
  const paginatedProjects = filteredProjects.slice(projectsStartIndex, projectsStartIndex + projectsPerPage);

  // Calculate High-density Stats
  const activeLeadsCount = leads.filter(l => !l.isDeleted).length;
  const pendingLeadsCount = leads.filter(l => l.status === 'Pending' && !l.isDeleted).length;
  const activeProjectsCount = projects.filter(p => !p.isDeleted).length;
  const ongoingProjectsCount = projects.filter(p => p.status === 'Ongoing' && !p.isDeleted).length;
  const deletedProjectsCount = projects.filter(p => p.isDeleted).length;
  const deletedLeadsCount = leads.filter(l => l.isDeleted).length;
  const deletedTestimonialsCount = testimonials.filter((t: any) => t.isDeleted).length;

  // Dynamic Performance Telemetry Selection
  const getActivePerformanceData = () => {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    if (perfViewMode === 'MONTHLY') {
      const computedPoints = dataStore.getLeadsMetricsForMonth(perfYear, perfMonth);
      const isCurrentActive = perfYear === 2026 && perfMonth === 5;
      return {
        type: 'MONTHLY',
        label: isCurrentActive ? 'June 2026 (Active Month)' : `${monthNames[perfMonth]} ${perfYear}`,
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        dataPoints: computedPoints,
        totalLeads: computedPoints.reduce((a, b) => a + b, 0)
      };
    } else {
      // YEARLY view mode
      const yearlyPoints = Array.from({ length: 12 }, (_, mIdx) => {
        const points = dataStore.getLeadsMetricsForMonth(perfYear, mIdx);
        return points.reduce((sum, val) => sum + val, 0);
      });
      return {
        type: 'YEARLY',
        label: `${perfYear} Fiscal Year`,
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        dataPoints: yearlyPoints,
        totalLeads: yearlyPoints.reduce((a, b) => a + b, 0)
      };
    }
  };

  const perfData = getActivePerformanceData();
  const maxVal = Math.max(...perfData.dataPoints, 10);
  const yMax = Math.ceil(maxVal / 10) * 10;

  // Render SVG Path points
  const pointsPath = perfData.dataPoints.map((val, index) => {
    const x = 40 + (index / (perfData.dataPoints.length - 1)) * 440;
    const y = 20 + (1 - (val / yMax)) * 170;
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const areaPath = pointsPath ? `${pointsPath} L ${40 + 440} ${20 + 170} L 40 ${20 + 170} Z` : '';

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      
      {!isAuthenticated ? (
        /* ================== GATEWAY SECURE ENTRY LOGIN ================== */
        <div id="secure-login-gateway" className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden bg-white text-black grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Sector: Visual Anchor & Minimalist Welcoming Frame */}
          <div className="relative hidden md:flex items-center justify-center h-full w-full bg-cover bg-center select-none" style={{ backgroundImage: 'url(/assets/images/about_construction_site_1780503065020.png)' }}>
            {/* Ambient Dark Overlay */}
            <div className="absolute inset-0 bg-[#111111]/85 z-0"></div>
            
            {/* Stark Typographic layout */}
            <div className="absolute inset-0 flex flex-col justify-between p-12 lg:p-16 text-white z-10">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs tracking-widest text-gray-400 font-bold uppercase">
                  J/G CONSTRUCTION SERVICES
                </span>
              </div>
              
              <div className="space-y-4 max-w-lg text-left">
                <div className="w-12 h-1 bg-industrial-red"></div>
                <h1 className="font-display font-black text-4xl lg:text-5xl leading-none tracking-tighter uppercase">
                  WELCOME BACK. <br />
                  <span className="text-industrial-red">ADMIN</span> PORTAL
                </h1>
                <p className="font-sans text-sm text-gray-300 leading-relaxed">
                  Manage leads, publish portfolio case studies, and manage client reviews in one unified workspace.
                </p>
              </div>

              <div className="font-mono text-[10px] text-gray-500 uppercase text-left">
                Authorized Personnel Only • © {new Date().getFullYear()} J/G Construction
              </div>
            </div>
          </div>

          {/* Right Sector: Flat Surface Authentication Function */}
          <div className="w-full h-full bg-white text-black flex flex-col justify-center px-8 sm:px-16 md:px-20 lg:px-24 xl:px-32 relative">
            
            {/* Exit Button back to main website */}
            <button
              type="button"
              onClick={() => setView('home')}
              className="absolute top-6 right-6 text-black hover:text-industrial-red transition-colors cursor-pointer flex items-center justify-center"
              title="Exit Admin Portal"
            >
              <X className="h-6 w-6" />
            </button>

            {isRecoveryMode ? (
              <>
                {/* Header branding */}
                <div className="mb-10 text-left">
                  <h2 className="font-display font-black text-3xl tracking-tight uppercase leading-none text-black">
                    RE-KEY CREDENTIALS
                  </h2>
                  <p className="text-xs text-gray-500 mt-2 font-sans">
                    Establish your new secure administrative access passphrase below.
                  </p>
                </div>

                {/* Error & Success States */}
                {recoveryError && (
                  <div className="border border-industrial-red bg-red-50 p-4 mb-6 text-xs text-industrial-red text-left">
                    <strong>{recoveryError}</strong>
                  </div>
                )}
                {recoverySuccess && (
                  <div className="border border-green-600 bg-green-50 p-4 mb-6 text-xs text-green-700 text-left">
                    <strong>{recoverySuccess}</strong>
                  </div>
                )}

                <form onSubmit={handleRecoverySubmit} className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-wider text-black">
                      [ NEW SECURE PASSPHRASE ]
                    </label>
                    <input 
                      type="password" 
                      value={recoveryPassword}
                      disabled={recoveryLoading}
                      onChange={(e) => setRecoveryPassword(e.target.value)}
                      onFocus={() => setFocusedField('recoveryPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full bg-white px-3.5 py-3 text-xs font-mono placeholder-gray-400 text-black border outline-none transition-all duration-75 ${
                        focusedField === 'recoveryPassword' ? 'border-industrial-red' : 'border-black'
                      }`}
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-wider text-black">
                      [ CONFIRM NEW PASSPHRASE ]
                    </label>
                    <input 
                      type="password" 
                      value={recoveryConfirmPassword}
                      disabled={recoveryLoading}
                      onChange={(e) => setRecoveryConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField('recoveryConfirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full bg-white px-3.5 py-3 text-xs font-mono placeholder-gray-400 text-black border outline-none transition-all duration-75 ${
                        focusedField === 'recoveryConfirmPassword' ? 'border-industrial-red' : 'border-black'
                      }`}
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={recoveryLoading}
                    className={`w-full py-4 px-4 font-display font-black text-xs uppercase tracking-widest border transition-all duration-100 ${
                      recoveryLoading
                        ? 'bg-black text-engineering-blue border-black cursor-not-allowed'
                        : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black cursor-pointer'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {recoveryLoading ? (
                      <span className="font-mono text-[#1B49B8] animate-pulse">
                        [ ROTATING PASSWORD KEY... ]
                      </span>
                    ) : (
                      <span>ROTATE PASSKEY PROTOCOL</span>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRecoveryMode(false);
                        setIsForgotPasswordMode(false);
                        window.history.replaceState({}, document.title, window.location.pathname);
                      }}
                      className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-gray-500 hover:text-black uppercase transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Return to Sign In</span>
                    </button>
                  </div>
                </form>
              </>
            ) : isForgotPasswordMode ? (
              <>
                {/* Header branding */}
                <div className="mb-10 text-left">
                  <h2 className="font-display font-black text-3xl tracking-tight uppercase leading-none text-black">
                    Recover Account
                  </h2>
                  <p className="text-xs text-gray-500 mt-2 font-sans">
                    Transmits a secure administrative key recovery link to your registered email vector.
                  </p>
                </div>

                {/* Error & Success States */}
                {resetError && (
                  <div className="border border-industrial-red bg-red-50 p-4 mb-6 text-xs text-industrial-red text-left">
                    <strong>{resetError}</strong>
                  </div>
                )}
                {resetSuccess && (
                  <div className="border border-green-600 bg-green-50 p-4 mb-6 text-xs text-green-700 text-left">
                    <strong>{resetSuccess}</strong>
                  </div>
                )}

                <form onSubmit={handleForgotPasswordSubmit} className="space-y-6 text-left">
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-wider text-black">
                      [ REGISTERED EMAIL ADDRESS ]
                    </label>
                    <input 
                      type="email" 
                      value={resetEmail}
                      disabled={resetLoading}
                      onChange={(e) => setResetEmail(e.target.value)}
                      onFocus={() => setFocusedField('resetEmail')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full bg-white px-3.5 py-3 text-xs font-mono placeholder-gray-400 text-black border outline-none transition-all duration-75 ${
                        focusedField === 'resetEmail' ? 'border-industrial-red' : 'border-black'
                      }`}
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={resetLoading}
                    className={`w-full py-4 px-4 font-display font-black text-xs uppercase tracking-widest border transition-all duration-100 ${
                      resetLoading
                        ? 'bg-black text-engineering-blue border-black cursor-not-allowed'
                        : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black cursor-pointer'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {resetLoading ? (
                      <span className="font-mono text-[#1B49B8] animate-pulse">
                        [ DISPATCHING RECOVERY VECTOR... ]
                      </span>
                    ) : (
                      <span>TRANSMIT RECOVERY LINK</span>
                    )}
                  </button>

                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setIsForgotPasswordMode(false)}
                      className="inline-flex items-center gap-2 font-mono text-[10px] font-bold text-gray-500 hover:text-black uppercase transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="h-3 w-3" />
                      <span>Back to Sign In</span>
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                {/* Header branding */}
                <div className="mb-10 text-left">
                  <h2 className="font-display font-black text-3xl tracking-tight uppercase leading-none text-black">
                    Admin Sign In
                  </h2>
                  <p className="text-xs text-gray-500 mt-2 font-sans">
                    Please enter your credentials below to access the administrative panel.
                  </p>
                </div>

                {/* Fault Detection Layout */}
                {authError && (
                  <div className="border border-industrial-red bg-red-50 p-4 mb-6 text-xs text-industrial-red text-left">
                    <strong>{authError}</strong>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6 text-left">
                  
                  {/* User Identification Input */}
                  <div className="space-y-2">
                    <label className="block font-mono text-[10px] font-black uppercase tracking-wider text-black">
                      [ USER IDENTIFICATION ]
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      disabled={authLoading}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full bg-white px-3.5 py-3 text-xs font-mono placeholder-gray-400 text-black border outline-none transition-all duration-75 ${
                        focusedField === 'email' ? 'border-industrial-red' : 'border-black'
                      }`}
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  {/* Security Passphrase Input */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="block font-mono text-[10px] font-black uppercase tracking-wider text-black">
                        [ SECURITY PASSPHRASE ]
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPasswordMode(true);
                          setResetError('');
                          setResetSuccess('');
                        }}
                        className="font-mono text-[9px] font-bold text-gray-500 hover:text-industrial-red uppercase transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      disabled={authLoading}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder=""
                      className={`w-full bg-white px-3.5 py-3 text-xs font-mono placeholder-gray-400 text-black border outline-none transition-all duration-75 ${
                        focusedField === 'password' ? 'border-industrial-red' : 'border-black'
                      }`}
                      style={{ borderRadius: 0 }}
                    />
                  </div>

                  {/* Primary Action Switch */}
                  <button
                    type="submit"
                    disabled={authLoading}
                    className={`w-full py-4 px-4 font-display font-black text-xs uppercase tracking-widest border transition-all duration-100 ${
                      authLoading
                        ? 'bg-black text-engineering-blue border-black cursor-not-allowed'
                        : 'bg-black text-white border-black hover:bg-white hover:text-black hover:border-black cursor-pointer'
                    }`}
                    style={{ borderRadius: 0 }}
                  >
                    {authLoading ? (
                      <span className="font-mono text-[#1B49B8] animate-pulse">
                        [ VALIDATING CREDENTIALS... ]
                      </span>
                    ) : (
                      <span>INITIATE SESSION</span>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>

        </div>
      ) : (
        /* ================== OPERATIONAL COMPREHENSIVE CONTROL CENTER ================== */
        <div id="admin-workspace-cockpit" className="fixed inset-0 z-50 bg-white text-black flex flex-col lg:flex-row text-left font-sans h-screen overflow-x-hidden overflow-y-hidden select-none">
          
          <style>{`
            .invisible-scrollbar {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
            .invisible-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Sidebar Backdrop Overlay for Mobiles/Tablets */}
          {sidebarOpen && (
            <div 
              onClick={() => setSidebarOpen(false)} 
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
          )}

          {/* Left-Aligned Sidebar Menu */}
          <aside className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 h-full border-r-2 border-black bg-white flex flex-col justify-between shrink-0 overflow-y-auto invisible-scrollbar transition-transform duration-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}>
            
            {/* Top Branding Section */}
            <div className="p-5 border-b border-black">
              <div className="flex items-center gap-3">
                <SgLogo className="h-11 w-11 shrink-0" />
                <div>
                  <span className="font-mono text-[9px] text-black font-black block uppercase tracking-widest leading-none mb-1">
                    [SECURE SYSTEM]
                  </span>
                  <h2 className="font-display font-black text-sm tracking-tight text-black uppercase">
                    J/G CONTROL DESK
                  </h2>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Options */}
            <div className="flex-1 p-4 space-y-2">
              <span className="block font-mono text-[9px] text-gray-400 font-extrabold tracking-widest uppercase px-2 mb-2">
                MODULES & WORKSPACES
              </span>

              <button
                onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'overview' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="h-4 w-4" />
                  <span>Overview</span>
                </div>
              </button>
              
              <button
                onClick={() => { setActiveTab('leads'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'leads' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="h-4 w-4" />
                  <span>Leads Center</span>
                </div>
                {leads.filter(l => l.status === 'Pending' && !l.isDeleted).length > 0 && (
                  <span className="font-mono text-xs px-2.5 py-0.5 border bg-industrial-red text-white border-industrial-red font-black tracking-tighter animate-pulse">
                    +{leads.filter(l => l.status === 'Pending' && !l.isDeleted).length}
                  </span>
                )}
              </button>

              <button
                onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'projects' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className="h-4 w-4" />
                  <span>Projects Control</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('testimonials'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'testimonials' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Star className="h-4 w-4" />
                  <span>Client Reviews</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('trash'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'trash' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Trash2 className="h-4 w-4" />
                  <span>Archive / Trash</span>
                </div>
              </button>
            </div>

            {/* Bottom Profile & Exit Area */}
            <div className="p-4 border-t border-black bg-white space-y-2">
              <button
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  activeTab === 'settings' 
                    ? 'bg-black text-white border-black' 
                    : 'bg-white text-black border-transparent hover:bg-gray-100 hover:border-black'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="h-4 w-4" />
                  <span>Settings Config</span>
                </div>
              </button>

              <button
                onClick={() => { handleLogout(); setSidebarOpen(false); }}
                className="w-full flex items-center justify-start gap-2.5 px-3.5 py-3 font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer border bg-white text-industrial-red border-transparent hover:bg-red-50 hover:border-industrial-red"
              >
                <LogOut className="h-4 w-4 text-industrial-red" />
                <span>Logout</span>
              </button>
            </div>

          </aside>
          
          {/* Right-Aligned Main Content Workspace Container */}
          <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
            
            {/* Mobile Header Bar */}
            <div className="lg:hidden w-full bg-white border-b border-black p-4 flex items-center justify-between z-30 shrink-0">
              <div className="flex items-center gap-3">
                <SgLogo className="h-8 w-8 shrink-0" />
                <h2 className="font-display font-black text-xs tracking-tight text-black uppercase">
                  J/G CONTROL DESK
                </h2>
              </div>
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-black hover:text-industrial-red transition-colors cursor-pointer select-none flex items-center justify-center"
                title="Open Navigation Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

            {/* Right-Aligned Main Content Workspace */}
            <main className="flex-1 h-full overflow-y-auto bg-white p-6 sm:p-8 flex flex-col justify-between">
              <div className="space-y-6">
              
              {/* Workspace Inner Top Row */}
              <div className="border border-black p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div>
                  <span className="font-mono text-[9px] text-[#1B49B8] block font-extrabold uppercase tracking-widest">// SECURE DYNAMIC WORKSPACE</span>
                  <h1 className="font-display font-black text-xl sm:text-2xl tracking-tight text-black uppercase mt-1">
                    {activeTab === 'overview' && "Dashboard Control Desk"}
                    {activeTab === 'leads' && "Inbound Leads Management"}
                    {activeTab === 'projects' && "Projects Control Room"}
                    {activeTab === 'testimonials' && "Testimonials & Reviews Portfolio"}
                    {activeTab === 'trash' && "System Vault / Archive & Trash"}
                    {activeTab === 'settings' && "System Configuration & Access Policies"}
                  </h1>
                </div>
                
                {/* Secondary status summary */}
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-gray-400">STATUS MONITOR:</span>
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 font-mono text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
                    ● SYSTEMS IN_SYNC
                  </span>
                </div>
              </div>

              {/* Dynamic Stats for active modules */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                <div className="border border-black p-4 bg-white relative">
                  <span className="font-mono text-[9px] text-gray-400 font-bold tracking-widest block uppercase">INBOUND LEADS</span>
                  <span className="font-display font-black text-2xl text-black block mt-1">
                    {activeLeadsCount}
                  </span>
                  <span className="font-mono text-[9px] text-[#1B49B8] block font-bold">
                    ({pendingLeadsCount} PENDING ACTION)
                  </span>
                </div>

                <div className="border border-black p-4 bg-white relative">
                  <span className="font-mono text-[9px] text-gray-400 font-bold tracking-widest block uppercase">COMMITTED PROJECTS</span>
                  <span className="font-display font-black text-2xl text-black block mt-1">
                    {activeProjectsCount}
                  </span>
                  <span className="font-mono text-[9px] text-industrial-red block font-bold">
                    ({ongoingProjectsCount} ONGOING)
                  </span>
                </div>

                <div className="border border-black p-4 bg-white relative">
                  <span className="font-mono text-[9px] text-gray-400 font-bold tracking-widest block uppercase">VERIFIED REVIEWS</span>
                  <span className="font-display font-black text-2xl text-black block mt-1">
                    {testimonials.filter(t => !(t as any).isDeleted).length}
                  </span>
                  <span className="font-mono text-[9px] text-green-600 block font-bold">
                    100% EXCELLENCE INDEX
                  </span>
                </div>

                <div className="border border-black p-4 bg-[#111111] text-white relative">
                  <span className="font-mono text-[9px] text-[#999999] font-bold tracking-widest block uppercase">TRASH VAULT</span>
                  <span className="font-display font-black text-2xl text-industrial-red block mt-1">
                    {deletedProjectsCount + deletedLeadsCount + deletedTestimonialsCount}
                  </span>
                  <span className="font-mono text-[9px] text-gray-400 block font-bold">
                    DELETED RECORDS IN POOL
                  </span>
                </div>
              </div>

              {/* Active Desk Render Container */}
              <div className="space-y-6">

            {/* TAB OVERVIEW: GENERAL BLUEPRINT STATUS MONITOR */}
            {activeTab === 'overview' && (
              <div className="space-y-6 text-left">
                
                {/* Tier 2: Asymmetric Split Grid Layout */}
                <div id="overview-tier-2-asymmetric-split" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Workspace Container (65% Width) - LEADS PERFORMANCE CONTROL BLOCK */}
                  <div id="leads-performance-control-block" className="lg:col-span-2 border border-black p-5 bg-white flex flex-col justify-between shadow-[4px_4px_0px_#000000]">
                    <div>
                      {/* Header row with Title & Category Dropdown */}
                      <div className="flex flex-col xl:flex-row xl:items-center justify-between border-b border-black pb-4 mb-5 gap-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <TrendingUp className="h-4 w-4 text-industrial-red animate-pulse" />
                          <h3 className="font-display font-black text-xs uppercase tracking-wider text-black">
                            LEADS ACQUISITION PERFORMANCE
                          </h3>
                          <div className="flex items-center gap-1.5 px-1.5 py-0.5 bg-emerald-50 border border-emerald-400 text-emerald-800 text-[8px] font-mono font-bold tracking-widest uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                            <span>REAL TIME</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Granular drop-downs depending on mode */}
                          <div className="flex items-center gap-3">
                            {perfViewMode === 'MONTHLY' && (
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono text-[9px] uppercase font-bold text-gray-500">MONTH:</span>
                                <select
                                  id="perf-month-select"
                                  value={perfMonth}
                                  onChange={(e) => setPerfMonth(parseInt(e.target.value, 10))}
                                  className="bg-white border border-black text-[10px] font-mono font-black py-1 px-1.5 cursor-pointer focus:outline-none"
                                >
                                  <option value={0}>JANUARY</option>
                                  <option value={1}>FEBRUARY</option>
                                  <option value={2}>MARCH</option>
                                  <option value={3}>APRIL</option>
                                  <option value={4}>MAY</option>
                                  <option value={5}>JUNE</option>
                                  <option value={6}>JULY</option>
                                  <option value={7}>AUGUST</option>
                                  <option value={8}>SEPTEMBER</option>
                                  <option value={9}>OCTOBER</option>
                                  <option value={10}>NOVEMBER</option>
                                  <option value={11}>DECEMBER</option>
                                </select>
                              </div>
                            )}

                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[9px] uppercase font-bold text-gray-500">YEAR:</span>
                              <select
                                  id="perf-year-select"
                                  value={perfYear}
                                  onChange={(e) => setPerfYear(parseInt(e.target.value, 10))}
                                  className="bg-white border border-black text-[10px] font-mono font-black py-1 px-1.5 cursor-pointer focus:outline-none"
                                >
                                <option value={2026}>2026</option>
                                <option value={2025}>2025</option>
                                <option value={2024}>2024</option>
                              </select>
                            </div>
                          </div>

                          {/* Segmented Button (Last 30 Days or Yearly) */}
                          <div className="flex items-center border border-black p-0.5 bg-gray-100">
                            <button
                              type="button"
                              onClick={() => setPerfViewMode('MONTHLY')}
                              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                                perfViewMode === 'MONTHLY'
                                  ? 'bg-black text-[#A3E635]'
                                  : 'bg-transparent text-black hover:bg-gray-200'
                              }`}
                            >
                              Last 30 Days
                            </button>
                            <button
                              type="button"
                              onClick={() => setPerfViewMode('YEARLY')}
                              className={`px-3 py-1 text-[10px] font-mono font-bold uppercase transition-all cursor-pointer ${
                                perfViewMode === 'YEARLY'
                                  ? 'bg-black text-[#A3E635]'
                                  : 'bg-transparent text-black hover:bg-gray-200'
                              }`}
                            >
                              Yearly
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Line Chart */}
                      <div className="relative bg-gray-50 border border-black p-4 mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                            // REAL-TIME ANALYTICAL LEAD PLOT ({perfData.label}) //
                          </p>
                          <span className="font-mono text-[10px] font-black uppercase text-industrial-red">
                            Total volume: {perfData.totalLeads} Leads
                          </span>
                        </div>

                        {/* Interactive Custom SVG Line Chart */}
                        <div className="w-full relative h-[230px]">
                          <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
                            <defs>
                              <linearGradient id="chart-glow" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0" />
                              </linearGradient>
                            </defs>

                            {/* Background Grid Lines & Y-Axis Labels */}
                            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                              const yVal = Math.round(yMax * ratio);
                              const yPos = 20 + (1 - ratio) * 170;
                              return (
                                <g key={idx} className="opacity-40">
                                  <line 
                                    x1="40" 
                                    y1={yPos} 
                                    x2="480" 
                                    y2={yPos} 
                                    stroke="#000" 
                                    strokeWidth="1" 
                                    strokeDasharray="2 4" 
                                  />
                                  <text 
                                    x="30" 
                                    y={yPos + 3} 
                                    textAnchor="end" 
                                    className="font-mono text-[9px] fill-gray-500"
                                  >
                                    {yVal}
                                  </text>
                                </g>
                              );
                            })}

                            {/* Area Gradient Under the Curve */}
                            <path 
                              d={areaPath} 
                              fill="url(#chart-glow)" 
                            />

                            {/* The Main Plot Line */}
                            <path 
                              d={pointsPath} 
                              fill="none" 
                              stroke="#ef4444" 
                              strokeWidth="2.5" 
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />

                            {/* Interactive Data Points (Dots) */}
                            {perfData.dataPoints.map((val, idx) => {
                              const xPos = 40 + (idx / (perfData.dataPoints.length - 1)) * 440;
                              const yPos = 20 + (1 - (val / yMax)) * 170;
                              const label = perfData.labels[idx];
                              const isHovered = hoveredPoint?.index === idx;

                              return (
                                <g key={idx}>
                                  <circle 
                                    cx={xPos} 
                                    cy={yPos} 
                                    r={isHovered ? "6" : "4"} 
                                    fill={isHovered ? "#000000" : "#ef4444"} 
                                    stroke="#ffffff" 
                                    strokeWidth="1.5"
                                    className="cursor-pointer transition-all duration-150"
                                    onMouseEnter={() => setHoveredPoint({ index: idx, x: xPos, y: yPos, val })}
                                    onMouseLeave={() => setHoveredPoint(null)}
                                  />
                                  {/* X-Axis labels */}
                                  <text 
                                    x={xPos} 
                                    y="205" 
                                    textAnchor="middle" 
                                    className="font-mono text-[8px] font-bold fill-black uppercase"
                                  >
                                    {label}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>

                          {/* Smooth HTML Floating Tooltip Box */}
                          {hoveredPoint !== null && (
                            <div 
                              className="absolute bg-black text-white px-2 py-1 border border-white font-mono text-[9px] font-bold pointer-events-none shadow-md flex flex-col items-center z-25"
                              style={{
                                left: `${(hoveredPoint.x / 500) * 100}%`,
                                top: `${(hoveredPoint.y / 220) * 100 - 15}%`,
                                transform: 'translate(-50%, -100%)'
                              }}
                            >
                              <span className="text-[#A3E635]">{perfData.labels[hoveredPoint.index]}</span>
                              <span>{hoveredPoint.val} Inbounds</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Conditional Breakdown Sub-Grid */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="font-mono text-[9px] text-gray-500 uppercase tracking-wider">
                            // BREAKDOWN SUB-GRID MATRIX ({perfData.type} SCOPE) //
                          </p>
                          {perfData.type === 'YEARLY' && (
                            <span className="font-mono text-[8px] text-industrial-red font-bold uppercase tracking-wider animate-pulse">
                              ← SWIPE / DRAG TO VIEW ALL MONTHS →
                            </span>
                          )}
                        </div>
                        
                        {perfData.type === 'MONTHLY' ? (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {perfData.dataPoints.map((val, idx) => (
                              <div key={idx} className="border border-black p-3 bg-white shadow-[2px_2px_0px_#000000] flex flex-col justify-between min-h-[70px]">
                                <span className="font-mono text-[9px] font-black uppercase text-gray-400">
                                  [ WEEK {idx + 1} ]
                                </span>
                                <div className="flex justify-between items-baseline mt-1">
                                  <span className="font-display font-black text-lg text-black">{val}</span>
                                  <span className="font-mono text-[8px] text-emerald-700 font-bold">Inbounds</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div 
                            ref={yearlyScrollRef}
                            onMouseDown={handleYearlyScrollDrag}
                            className="flex gap-3 overflow-x-auto no-scrollbar pb-1 cursor-grab active:cursor-grabbing select-none"
                            style={{ scrollSnapType: 'x mandatory' }}
                          >
                            {perfData.labels.map((label, idx) => {
                              const val = perfData.dataPoints[idx];
                              return (
                                <div 
                                  key={idx} 
                                  className="border border-black p-3 bg-white shadow-[2px_2px_0px_#000000] flex flex-col justify-between min-h-[70px] min-w-[130px] sm:min-w-[160px] shrink-0"
                                  style={{ scrollSnapAlign: 'start' }}
                                >
                                  <span className="font-mono text-[9px] font-black uppercase text-gray-400">
                                    [ {label.toUpperCase()} ]
                                  </span>
                                  <div className="flex justify-between items-baseline mt-1">
                                    <span className="font-display font-black text-lg text-black">{val}</span>
                                    <span className="font-mono text-[8px] text-emerald-700 font-bold">Inbounds</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer telemetry */}
                    <div className="mt-8 pt-4 border-t border-dashed border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50 p-3 border border-black font-mono">
                      <div className="text-[10px] text-gray-500 leading-relaxed uppercase">
                        // ALL PERFORMANCE RECORDS CACHED LOCALLY & ARCHIVED AUTOMATICALLY AT END-OF-MONTH.
                      </div>
                      <span className="text-[10px] font-bold text-gray-800">
                        METRICS STATUS: CALIBRATED
                      </span>
                    </div>
                  </div>

                  {/* Right Workspace Container (35% Width) */}
                  <div id="recent-inbounds-container" className="border border-black p-5 bg-white flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-black pb-4 mb-5">
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-4 w-4 text-emerald-600" />
                          <h3 className="font-display font-black text-xs uppercase tracking-wider text-black">
                            INBOUND INQUIRIES
                          </h3>
                        </div>
                        <button
                          id="view-all-leads-anchor"
                          onClick={() => setActiveTab('leads')}
                          className="font-mono text-[9px] font-black underline text-black hover:text-industrial-red uppercase cursor-pointer"
                        >
                          [ VIEW ALL LEADS ]
                        </button>
                      </div>

                      {/* Display Stack of 5 most recent unread contact forms */}
                      <div className="space-y-3">
                        {leads.filter(l => l.status === 'Pending' && !l.isDeleted).slice(0, 5).length === 0 ? (
                          <div className="py-12 text-center text-gray-400 font-mono text-xs uppercase bg-[#FAFABA] border border-dashed border-gray-300">
                            No unread inquiries currently pending.
                          </div>
                        ) : (
                          leads.filter(l => l.status === 'Pending' && !l.isDeleted).slice(0, 5).map((l) => (
                            <div 
                              key={l.id} 
                              id={`recent-lead-card-${l.id}`}
                              onClick={() => setViewingLead(l)}
                              className="border border-black p-3 hover:bg-gray-50 cursor-pointer transition-all space-y-1 relative group text-left"
                            >
                              <div className="flex justify-between items-start gap-2">
                                <strong className="font-display font-black text-xs uppercase text-black line-clamp-1 group-hover:text-industrial-red">
                                  {l.fullName}
                                </strong>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="font-mono text-[8px] text-gray-400 whitespace-nowrap pt-0.5">
                                    {new Date(l.timestamp).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                                  </span>
                                  {/* Quick Actions overlay */}
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUpdateLeadStatus(l.id, 'Reviewed');
                                      }}
                                      className="p-1 border border-black bg-white hover:bg-[#1B49B8] hover:text-white text-black cursor-pointer h-5 w-5 flex items-center justify-center transition-colors"
                                      title="Acknowledge & Mark Reviewed"
                                    >
                                      <Check className="h-3 w-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSoftDeleteLead(l.id);
                                      }}
                                      className="p-1 border border-black bg-white hover:bg-red-50 hover:text-industrial-red text-black cursor-pointer h-5 w-5 flex items-center justify-center transition-colors"
                                      title="Discard Lead to Trash"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                <span className="bg-[#f0f0f0] text-black border border-black font-mono text-[8px] font-semibold px-1 py-0.5 tracking-tight uppercase">
                                  {l.serviceCategory || "Structural Consulting"}
                                </span>
                                <span className="bg-red-50 text-industrial-red border border-red-300 font-mono text-[8px] font-semibold px-1 py-0.5 tracking-tight uppercase">
                                  PENDING
                                </span>
                              </div>
                              <p className="font-mono text-[10px] text-gray-600 line-clamp-2 leading-relaxed pt-0.5">
                                {l.projectScope}
                              </p>
                              <div className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                <Eye className="h-3 w-3" />
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                      <p className="font-mono text-[9px] text-gray-500 leading-normal uppercase">
                        // TOTAL DIRECT REQUEST RECORDS: <strong className="text-black">{leads.filter(l => !l.isDeleted).length} ACTIVE</strong> INSIDE PERSISTENCY.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* TAB SETTINGS: SECURITY AND SOCIAL ROUTING CONTROLS */}
            {activeTab === 'settings' && (
              <div className="space-y-6 text-left">
                <div id="settings-split-containers" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Container 1: Security Controls (Supabase Auth) */}
                  <div id="security-control-box" className="border border-black p-6 bg-white space-y-4">
                    <div className="flex items-center gap-2 border-b border-black pb-3">
                      <Lock className="h-4 w-4 text-industrial-red" />
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-black">
                        SECURITY & ACCESS CONTROL
                      </h3>
                    </div>
                    
                    <p className="font-mono text-[10px] text-gray-500 uppercase leading-relaxed">
                      // ROTATE CURRENT ADMINISTRATIVE ACCESS CREDENTIALS //
                    </p>

                    <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                      {changePasswordError && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 font-mono text-[10px] uppercase">
                          {changePasswordError}
                        </div>
                      )}
                      
                      {changePasswordSuccess && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[10px] uppercase">
                          {changePasswordSuccess}
                        </div>
                      )}

                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          RETYPE OLD PASSWORD
                        </label>
                        <input
                          id="change-password-old"
                          type="password"
                          placeholder=""
                          value={oldPasswordVal}
                          onChange={(e) => setOldPasswordVal(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          NEW ACCESS PASSWORD
                        </label>
                        <input
                          id="change-password-input"
                          type="password"
                          placeholder=""
                          value={changePasswordVal}
                          onChange={(e) => setChangePasswordVal(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          CONFIRM NEW PASSWORD
                        </label>
                        <input
                          id="change-password-confirm"
                          type="password"
                          placeholder=""
                          value={changeConfirmPasswordVal}
                          onChange={(e) => setChangeConfirmPasswordVal(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <button
                        id="submit-password-rotation"
                        type="submit"
                        disabled={changePasswordLoading}
                        className="w-full bg-industrial-red hover:bg-[#B31717] disabled:opacity-50 text-white py-2.5 px-4 font-mono font-black text-[10px] uppercase tracking-wider border border-black transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        {changePasswordLoading ? 'ROTATING SECURITY KEY...' : 'ROTATE CREDENTIALS'}
                      </button>
                    </form>
                  </div>

                  {/* Container 2: Social Media Link Integrations */}
                  <div id="social-integration-box" className="border border-black p-6 bg-white space-y-4">
                    <div className="flex items-center gap-2 border-b border-black pb-3">
                      <LinkIcon className="h-4 w-4 text-emerald-600" />
                      <h3 className="font-display font-black text-sm uppercase tracking-wider text-black">
                        SOCIAL HYPER-LINK ROUTING
                      </h3>
                    </div>

                    <p className="font-mono text-[10px] text-gray-500 uppercase leading-relaxed">
                      // RE-MAP OUTBOUND SOCIAL GRAPH ROUTING DESTINATIONS LINKED LOCALLY BY PUBLIC SITE FOOTERS //
                    </p>

                    <form onSubmit={(e) => {
                      e.preventDefault();
                      localStorage.setItem('jg_facebook_url', facebookInput);
                      localStorage.setItem('jg_tiktok_url', tiktokInput);
                      localStorage.setItem('jg_instagram_url', instagramInput);
                      
                      // Notify document to trigger a local custom event or state refresh
                      window.dispatchEvent(new Event('jg_social_routing_updated'));

                      addLogEntry('SOC_ROUTE_UPD', 'Public footer social hyper-media destination tables modified.');
                      triggerAlert('ROUTING HYPER-LINKS SAVED', 'Public site hyper-destination endpoints updated. The footer references have been configured.');
                    }} className="space-y-3 pt-2">
                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          FACEBOOK DESTINATION URL
                        </label>
                        <input
                          id="input-facebook-url"
                          type="url"
                          value={facebookInput}
                          onChange={(e) => setFacebookInput(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          TIKTOK DESTINATION URL
                        </label>
                        <input
                          id="input-tiktok-url"
                          type="url"
                          value={tiktokInput}
                          onChange={(e) => setTiktokInput(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[9px] font-bold uppercase tracking-wider mb-1.5 text-black">
                          INSTAGRAM DESTINATION URL
                        </label>
                        <input
                          id="input-instagram-url"
                          type="url"
                          value={instagramInput}
                          onChange={(e) => setInstagramInput(e.target.value)}
                          className="w-full bg-white border border-black px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red text-black"
                        />
                      </div>

                      <button
                        id="submit-social-routing"
                        type="submit"
                        className="w-full bg-[#1B49B8] hover:bg-[#12368D] text-white py-2.5 px-4 font-mono font-black text-[10px] uppercase tracking-wider border border-black transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Save className="h-3.5 w-3.5" />
                        <span>UPDATE SOC_NET ROUTING</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* TAB A: LEADS PIPELINE */}
            {activeTab === 'leads' && (
              <div className="space-y-6 text-left">
                
                {/* Panel head controls */}
                <div className="border border-black p-4 bg-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                    {/* Search lead */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={leadSearch}
                        onChange={(e) => setLeadSearch(e.target.value)}
                        placeholder="Search inbound leads (e.g. email, scope, name)..."
                        className="w-full bg-white border border-black pl-9 pr-4 py-2 text-xs font-mono placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    {/* Filter 1: Status Select Filter */}
                    <div className="relative">
                      <select
                        value={leadFilter}
                        onChange={(e) => setLeadFilter(e.target.value as any)}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="All">All Inbounds</option>
                        <option value="Pending">Pending Scopes</option>
                        <option value="Reviewed">Reviewed Files</option>
                        <option value="Archived">Archived Indexes</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>

                    {/* Filter 2: Service category */}
                    <div className="relative">
                      <select
                        value={leadCategoryFilter}
                        onChange={(e) => setLeadCategoryFilter(e.target.value)}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="All">All Sectors</option>
                        {dataStore.getServices().map((service) => (
                          <option key={service.id} value={service.title}>{service.title}</option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>
                  </div>
                </div>

                {/* Structured Admin Data Table */}
                <div className="border border-black bg-white shadow-[4px_4px_0px_#111111] flex flex-col">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                      <thead>
                        <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider border-b border-black">
                          <th className="p-4 w-12 text-center border-r border-gray-800">
                            <input 
                              type="checkbox" 
                              checked={paginatedLeads.length > 0 && paginatedLeads.every(l => selectedLeadIds.includes(l.id))}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedLeadIds(prev => {
                                    const pageIds = paginatedLeads.map(l => l.id);
                                    const updated = [...prev];
                                    pageIds.forEach(id => {
                                      if (!updated.includes(id)) {
                                        updated.push(id);
                                      }
                                    });
                                    return updated;
                                  });
                                } else {
                                  setSelectedLeadIds(prev => {
                                    const pageIds = paginatedLeads.map(l => l.id);
                                    return prev.filter(id => !pageIds.includes(id));
                                  });
                                }
                              }}
                              className="w-4 h-4 border border-white accent-black cursor-pointer"
                            />
                          </th>
                          <th className="p-4 border-r border-gray-800 w-36">Identifier / Ingest Time</th>
                          <th className="p-4 border-r border-gray-800 w-44">Client Name</th>
                          <th className="p-4 border-r border-gray-800 w-48">Company Email</th>
                          <th className="p-4 border-r border-gray-800 w-36">Phone Number</th>
                          <th className="p-4 border-r border-gray-800">Assigned Sector & Scope Summary</th>
                          <th className="p-4 border-r border-gray-800 w-36">Status</th>
                          <th className="p-4 w-32 text-center">Dispatch</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black font-mono text-xs">
                        {paginatedLeads.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="p-12 text-center text-gray-500 font-mono text-xs uppercase bg-[#fafafa]">
                              No corresponding lead files located.
                            </td>
                          </tr>
                        ) : (
                          paginatedLeads.map((lead) => {
                          const isPending = lead.status === 'Pending';
                          const isReviewed = lead.status === 'Reviewed';
                          const isArchived = lead.status === 'Archived';
                          const isSelected = selectedLeadIds.includes(lead.id);

                          return (
                            <tr 
                              key={lead.id} 
                              className={`transition-colors hover:bg-gray-50 ${isSelected ? 'bg-yellow-50/70' : ''}`}
                            >
                              {/* Selection checkbox */}
                              <td className="p-4 text-center border-r border-gray-200">
                                <input 
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedLeadIds(prev => [...prev, lead.id]);
                                    } else {
                                      setSelectedLeadIds(prev => prev.filter(id => id !== lead.id));
                                    }
                                  }}
                                  className="w-4 h-4 border border-black accent-black cursor-pointer"
                                  id={`lead-select-${lead.id}`}
                                />
                              </td>

                              {/* Identification/Date */}
                              <td className="p-4 border-r border-gray-200 align-top space-y-1">
                                <span className="font-bold text-black block bg-gray-100 border border-black/10 px-1 py-0.5 text-[10px] w-fit">
                                  {lead.id}
                                </span>
                                <span className="text-[9px] text-gray-400 block leading-tight">
                                  {new Date(lead.timestamp).toLocaleDateString()}<br/>
                                  {new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </td>

                              {/* Client Name */}
                              <td className="p-4 border-r border-gray-200 align-top">
                                <div className="font-sans font-black text-xs text-black uppercase tracking-tight break-words max-w-[150px]">
                                  {lead.fullName}
                                </div>
                              </td>

                              {/* Company Email */}
                              <td className="p-4 border-r border-gray-200 align-top">
                                <span className="font-mono text-xs text-gray-600 truncate block max-w-[170px]" title={lead.companyEmail}>
                                  {lead.companyEmail}
                                </span>
                              </td>

                              {/* Phone Number */}
                              <td className="p-4 border-r border-gray-200 align-top">
                                <span className="font-mono text-xs text-gray-600 block truncate max-w-[124px]">
                                  {lead.phone || "—"}
                                </span>
                              </td>

                              {/* Category & Scope Preview */}
                              <td className="p-4 border-r border-gray-200 align-top space-y-1.5 max-w-[280px]">
                                {lead.serviceCategory && (
                                  <span className="inline-flex items-center gap-1 bg-blue-50 border border-blue-200 text-[#1B49B8] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                                    <Layers className="h-2.5 w-2.5 shrink-0" />
                                    <span>{lead.serviceCategory}</span>
                                  </span>
                                )}
                                <p className="font-sans text-[11px] text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap block" title={lead.projectScope}>
                                  {lead.projectScope.length > 45 ? lead.projectScope.substring(0, 45) + "..." : lead.projectScope}
                                </p>
                              </td>

                              {/* Status Flag with togglable select dropdown */}
                              <td className="p-4 border-r border-gray-200 align-top min-w-[130px] w-36">
                                <div className="relative">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as 'Pending' | 'Reviewed' | 'Archived')}
                                    className={`font-mono text-xs font-black uppercase tracking-wider px-2.5 py-1.5 pr-6 border text-left w-full cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-black ${
                                      isPending 
                                        ? 'border-red-300 bg-red-50 text-industrial-red' 
                                        : isReviewed 
                                          ? 'border-blue-300 bg-blue-50 text-[#1B49B8]' 
                                          : 'border-gray-300 bg-gray-100 text-gray-500'
                                    }`}
                                  >
                                    <option value="Pending" className="bg-white text-black font-bold">Pending</option>
                                    <option value="Reviewed" className="bg-white text-black font-bold">Reviewed</option>
                                    <option value="Archived" className="bg-white text-black font-bold">Archived</option>
                                  </select>
                                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none opacity-80 text-current">
                                    ▼
                                  </span>
                                </div>
                              </td>

                              {/* Action controls column */}
                              <td className="p-4 align-top text-center space-y-1.5 pt-4">
                                <div className="flex items-center justify-center gap-1">
                                  {/* View Detail Toggle */}
                                  <button
                                    onClick={() => setViewingLead(lead)}
                                    className="p-1.5 border border-black hover:bg-gray-100 text-black cursor-pointer transition-colors"
                                    title="View Full Scope Details"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>

                                  {!lead.isDeleted ? (
                                    <>
                                      {/* Cycle Status to Reviewed / Archived */}
                                      <button
                                        onClick={() => {
                                          const nextStatus = isPending ? 'Reviewed' : 'Archived';
                                          handleUpdateLeadStatus(lead.id, nextStatus);
                                        }}
                                        disabled={isArchived}
                                        className="p-1.5 border border-black hover:bg-blue-50 hover:text-blue-700 text-black cursor-pointer disabled:opacity-50 disabled:bg-gray-100 transition-colors"
                                        title={isPending ? "Mark as Reviewed" : isReviewed ? "Move to Archive" : "Archived Index"}
                                      >
                                        <Check className="h-3.5 w-3.5" />
                                      </button>

                                      {/* Soft delete */}
                                      <button
                                        onClick={() => handleSoftDeleteLead(lead.id)}
                                        className="p-1.5 border border-black text-industrial-red hover:bg-red-50 hover:border-industrial-red cursor-pointer transition-colors"
                                        title="Delete Lead"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {/* Restore file */}
                                      <button
                                        onClick={() => handleRestoreLead(lead.id)}
                                        className="p-1.5 border border-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-colors"
                                        title="Restore Lead"
                                      >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                      </button>
                                      
                                      {/* Hard delete */}
                                      <button
                                        onClick={() => handleHardDeleteLead(lead.id)}
                                        className="p-1.5 border border-black text-white bg-industrial-red hover:bg-red-700 hover:text-white cursor-pointer transition-colors"
                                        title="Delete Permanently"
                                      >
                                        <X className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-black bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs select-none">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span>
                      Showing {filteredLeads.length === 0 ? 0 : leadsStartIndex + 1}–{Math.min(leadsStartIndex + leadsPerPage, filteredLeads.length)} of {filteredLeads.length} entries
                    </span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500">Show:</span>
                      <select
                        value={leadsPerPage}
                        onChange={(e) => {
                          setLeadsPerPage(Number(e.target.value));
                          setLeadsCurrentPage(1);
                        }}
                        className="bg-white border border-black px-1.5 py-0.5 text-xs font-bold font-mono cursor-pointer focus:outline-none"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>

                  {totalLeadsPages > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setLeadsCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={activeLeadsPage === 1}
                        className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                        title="Previous Page"
                      >
                        ◀ PREV
                      </button>

                      {Array.from({ length: totalLeadsPages }, (_, i) => i + 1).map((pageNum) => {
                        const isCurrent = pageNum === activeLeadsPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setLeadsCurrentPage(pageNum)}
                            className={`px-2.5 py-1 border border-black font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                              isCurrent 
                                ? 'bg-black text-white' 
                                : 'bg-white hover:bg-gray-100 text-black'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setLeadsCurrentPage(prev => Math.min(prev + 1, totalLeadsPages))}
                        disabled={activeLeadsPage === totalLeadsPages}
                        className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                        title="Next Page"
                      >
                        NEXT ▶
                      </button>
                    </div>
                  )}
                </div>
              </div>

                {/* Multi selection floating actions */}
                {selectedLeadIds.length > 0 && (
                  <div className="bg-black text-white p-4 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs shadow-[4px_4px_0px_#A3E635]">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#A3E635] text-black font-extrabold px-2 py-1 select-none font-bold uppercase text-[10px]">
                        {selectedLeadIds.length} Leads Selected
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button 
                        onClick={handleBulkReviewLeads}
                        className="bg-white hover:bg-blue-50 hover:text-blue-700 text-black font-black uppercase px-3 py-1.5 cursor-pointer border border-black transition-colors text-[11px]"
                      >
                        Mark Reviewed
                      </button>
                      <button 
                        onClick={handleBulkArchiveLeads}
                        className="bg-white hover:bg-gray-100 text-black font-black uppercase px-3 py-1.5 cursor-pointer border border-black transition-colors text-[11px]"
                      >
                        Archive
                      </button>
                      <button 
                        onClick={handleBulkDeleteLeads}
                        className="bg-industrial-red hover:bg-red-700 text-white font-black uppercase px-3 py-1.5 cursor-pointer border border-transparent transition-colors flex items-center gap-1.5 text-[11px]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                      <button 
                        onClick={() => setSelectedLeadIds([])}
                        className="text-gray-400 hover:text-white uppercase font-black px-2 py-1 flex items-center justify-center cursor-pointer"
                        title="Deselect All"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB B: PROJECTS MANAGER */}
            {activeTab === 'projects' && (
              <div className="space-y-6 text-left">
                
                {/* Control Panel Header Row */}
                <div className="border border-black p-4 bg-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                    
                    {/* Add project button */}
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setIsCreatingProject(true);
                      }}
                      className="bg-black hover:bg-gray-900 border border-black text-white text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4 text-industrial-red" />
                      <span>Ingest Project File</span>
                    </button>

                    {/* Search Project */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text" 
                        value={projectSearch}
                        onChange={(e) => setProjectSearch(e.target.value)}
                        placeholder="Search projects (e.g. Client, Title, Location)..."
                        className="w-full bg-white border border-black pl-9 pr-4 py-2 text-xs font-mono placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    {/* Filter Status */}
                    <div className="relative">
                      <select
                        value={projectFilter}
                        onChange={(e) => setProjectFilter(e.target.value as any)}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="All">All Schedules</option>
                        <option value="Completed">Completed Works</option>
                        <option value="Ongoing">Ongoing Works</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>

                    {/* Filter Category */}
                    <div className="relative">
                      <select
                        value={projectCategoryFilter}
                        onChange={(e) => setProjectCategoryFilter(e.target.value)}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="All">All Sectors</option>
                        <option value="Structural Design">Structural Design</option>
                        <option value="Commercial Build">Commercial Build</option>
                        <option value="Industrial Frameworks">Industrial Frameworks</option>
                        <option value="Civil Works">Civil Works</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>

                  </div>
                </div>

                {/* Projects List Structured Admin Data Table */}
                <div className="border border-black bg-white shadow-[4px_4px_0px_#111111] flex flex-col">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[950px]">
                      <thead>
                        <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider border-b border-black">
                          <th className="p-4 w-12 text-center border-r border-gray-800">
                            <input 
                              type="checkbox" 
                              checked={paginatedProjects.length > 0 && paginatedProjects.every(p => selectedProjectIds.includes(p.id))}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedProjectIds(prev => {
                                    const pageIds = paginatedProjects.map(p => p.id);
                                    const updated = [...prev];
                                    pageIds.forEach(id => {
                                      if (!updated.includes(id)) {
                                        updated.push(id);
                                      }
                                    });
                                    return updated;
                                  });
                                } else {
                                  setSelectedProjectIds(prev => {
                                    const pageIds = paginatedProjects.map(p => p.id);
                                    return prev.filter(id => !pageIds.includes(id));
                                  });
                                }
                              }}
                              className="w-4 h-4 border border-white accent-black cursor-pointer"
                            />
                          </th>
                          <th className="p-4 border-r border-gray-800 w-44">Identifier / Asset Year</th>
                          <th className="p-4 border-r border-gray-800">Project title & Designated Field</th>
                          <th className="p-4 border-r border-gray-800 w-56">Client / Operational Location</th>
                          <th className="p-4 border-r border-gray-800 w-36">Status Schedule</th>
                          <th className="p-4 w-40 text-center">Operation Dispatch</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black font-mono text-xs">
                        {paginatedProjects.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-12 text-center text-gray-500 font-mono text-xs uppercase bg-[#fafafa]">
                              No dynamic project profiles located.
                            </td>
                          </tr>
                        ) : (
                          paginatedProjects.map((p) => {
                          const isCompleted = p.status === 'Completed';
                          const isSelected = selectedProjectIds.includes(p.id);

                          return (
                            <tr 
                              key={p.id} 
                              className={`transition-colors hover:bg-gray-50 ${isSelected ? 'bg-yellow-50/70' : ''}`}
                            >
                              {/* Selection checkbox */}
                              <td className="p-4 text-center border-r border-gray-200">
                                <input 
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedProjectIds(prev => [...prev, p.id]);
                                    } else {
                                      setSelectedProjectIds(prev => prev.filter(id => id !== p.id));
                                    }
                                  }}
                                  className="w-4 h-4 border border-black accent-black cursor-pointer"
                                />
                              </td>

                              {/* ID, Stamp & Thumbnail */}
                              <td className="p-4 border-r border-gray-200 align-top space-y-2">
                                <div className="flex items-center gap-2">
                                  <div className="w-10 h-10 border border-black bg-gray-100 flex items-center justify-center overflow-hidden shrink-0 select-none">
                                    {p.image ? (
                                      <img 
                                        src={p.image} 
                                        alt={p.title} 
                                        className="w-full h-full object-cover" 
                                        referrerPolicy="no-referrer"
                                      />
                                    ) : (
                                      <ImageIcon className="h-4 w-4 text-gray-405" />
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-bold text-black block bg-gray-100 border border-black/10 px-1 py-0.5 text-[9px] w-fit">
                                      {p.id.toUpperCase()}
                                    </span>
                                    <span className="text-[10px] text-gray-500 block font-semibold mt-0.5">
                                      Compl. {p.completedYear}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* Title & Field */}
                              <td className="p-4 border-r border-gray-200 align-top space-y-2">
                                <div className="font-sans font-black text-xs text-black uppercase tracking-tight line-clamp-1 leading-tight break-words" title={p.title}>
                                  {p.title}
                                </div>
                                {p.category && (
                                  <span className="inline-flex items-center gap-1 bg-[#1B49B8]/5 border border-[#1B49B8]/20 text-[#1B49B8] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider">
                                    <Layers className="h-2.5 w-2.5 shrink-0" />
                                    <span>{p.category}</span>
                                  </span>
                                )}
                              </td>

                              {/* Client & Location */}
                              <td className="p-4 border-r border-gray-200 align-top space-y-1">
                                <div className="text-[11px] text-black">
                                  Client: <strong className="font-black text-black">{p.client}</strong>
                                </div>
                                <div className="text-[10px] text-gray-500">
                                  Loc: {p.location}
                                </div>
                              </td>

                              {/* Status Flag */}
                              <td className="p-4 border-r border-gray-200 align-top pt-4">
                                <span className={`inline-block font-mono text-[9px] font-black uppercase tracking-wider px-2 py-1 border text-center w-full ${
                                  isCompleted 
                                    ? 'border-green-300 bg-green-50 text-green-700' 
                                    : 'border-yellow-300 bg-yellow-50 text-yellow-700'
                                }`}>
                                  {p.status}
                                </span>
                              </td>

                              {/* Action controls column */}
                              <td className="p-4 align-top text-center space-y-1.5 pt-4">
                                <div className="flex items-center justify-center gap-1">
                                  {/* Preview Details Page */}
                                  <button
                                    onClick={() => setPreviewProjectDetails(p)}
                                    className="p-1.5 border border-[#1B49B8] text-[#1B49B8] hover:bg-blue-50 cursor-pointer transition-colors"
                                    title="Preview Details Page"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                  </button>

                                  {/* View Live Page */}
                                  <button
                                    onClick={() => {
                                      if (onViewLiveProject) {
                                        onViewLiveProject(p);
                                      } else {
                                        setView('home');
                                      }
                                    }}
                                    className="p-1.5 border border-black hover:bg-black hover:text-white text-black cursor-pointer transition-colors"
                                    title="View Live Page"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </button>

                                  {!p.isDeleted ? (
                                    <>
                                      {/* Edit button */}
                                      <button
                                        onClick={() => setEditingProject({ ...p, images: p.images || (p.image ? [p.image] : []) })}
                                        className="p-1.5 border border-black text-black hover:bg-gray-100 cursor-pointer transition-colors"
                                        title="Modify Configuration Layout"
                                      >
                                        <Edit className="h-3.5 w-3.5" />
                                      </button>

                                      {/* Soft delete */}
                                      <button
                                        onClick={() => handleSoftDeleteProject(p.id)}
                                        className="p-1.5 border border-black text-industrial-red hover:bg-red-50 hover:border-industrial-red cursor-pointer transition-colors"
                                        title="Delete Project"
                                      >
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      {/* Restore file */}
                                      <button
                                        onClick={() => handleRestoreProject(p.id)}
                                        className="p-1.5 border border-black text-emerald-700 bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-colors"
                                        title="Restore Project"
                                      >
                                        <RotateCcw className="h-3.5 w-3.5" />
                                      </button>
                                      
                                      {/* Hard delete */}
                                      <button
                                        onClick={() => handleHardDeleteProject(p.id)}
                                        className="p-1.5 border border-black text-white bg-industrial-red hover:bg-red-700 hover:text-white cursor-pointer transition-colors"
                                        title="Delete Permanently"
                                      >
                                        <X className="h-3.5 w-3.5 animate-pulse" />
                                      </button>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-black bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs select-none">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <span>
                      Showing {filteredProjects.length === 0 ? 0 : projectsStartIndex + 1}–{Math.min(projectsStartIndex + projectsPerPage, filteredProjects.length)} of {filteredProjects.length} entries
                    </span>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-500">Show:</span>
                      <select
                        value={projectsPerPage}
                        onChange={(e) => {
                          setProjectsPerPage(Number(e.target.value));
                          setProjectsCurrentPage(1);
                        }}
                        className="bg-white border border-black px-1.5 py-0.5 text-xs font-bold font-mono cursor-pointer focus:outline-none"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>

                  {totalProjectsPages > 1 && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setProjectsCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={activeProjectsPage === 1}
                        className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                        title="Previous Page"
                      >
                        ◀ PREV
                      </button>

                      {Array.from({ length: totalProjectsPages }, (_, i) => i + 1).map((pageNum) => {
                        const isCurrent = pageNum === activeProjectsPage;
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setProjectsCurrentPage(pageNum)}
                            className={`px-2.5 py-1 border border-black font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                              isCurrent 
                                ? 'bg-black text-white' 
                                : 'bg-white hover:bg-gray-100 text-black'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}

                      <button
                        onClick={() => setProjectsCurrentPage(prev => Math.min(prev + 1, totalProjectsPages))}
                        disabled={activeProjectsPage === totalProjectsPages}
                        className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                        title="Next Page"
                      >
                        NEXT ▶
                      </button>
                    </div>
                  )}
                </div>
              </div>

                {/* Multi selection projects actions */}
                {selectedProjectIds.length > 0 && (
                  <div className="bg-black text-white p-4 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs shadow-[4px_4px_0px_#A3E635]">
                    <div className="flex items-center gap-3">
                      <span className="bg-[#A3E635] text-black font-extrabold px-2 py-1 select-none font-bold uppercase text-[10px]">
                        {selectedProjectIds.length} Projects Selected
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button 
                        onClick={handleBulkDeleteProjects}
                        className="bg-industrial-red hover:bg-red-700 text-white font-black uppercase px-3 py-1.5 cursor-pointer border border-transparent transition-colors flex items-center gap-1.5 text-[11px]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                      <button 
                        onClick={() => setSelectedProjectIds([])}
                        className="text-gray-400 hover:text-white uppercase font-black px-2 py-1 flex items-center justify-center cursor-pointer"
                        title="Deselect All"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* TAB C: TESTIMONIALS */}
            {activeTab === 'testimonials' && (
              <div className="space-y-6 text-left">
                
                {/* Control Panel actions */}
                <div className="border border-black p-4 bg-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingTestimonial(null);
                        setIsCreatingTestimonial(true);
                      }}
                      className="bg-black hover:bg-gray-900 border border-black text-white text-xs font-mono font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <Plus className="h-4 w-4 text-industrial-red" />
                      <span>Ingest Customer Review</span>
                    </button>
                    <span className="font-mono text-xs text-gray-500">// TOTAL INDEXED REVIEWS: {testimonials.length}</span>
                  </div>
                </div>

                {/* Review listings */}
                <div className="space-y-4">
                  {testimonials.map((t: any) => {
                    return (
                      <div 
                        key={t.id}
                        className={`border-2 p-5 bg-white relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${
                          t.isDeleted ? 'border-dashed border-red-400 opacity-80' : 'border-black'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-1.5 mb-2.5">
                            <span className="font-mono text-[9px] text-[#1B49B8] font-bold bg-gray-50 border px-1.5 py-0.5">JG_{t.id.toUpperCase()}</span>
                            <div className="flex items-center gap-0.5">
                              {[...Array(t.stars)].map((_, idx) => (
                                <Star key={idx} className="h-3.5 w-3.5 fill-industrial-red text-industrial-red" />
                              ))}
                            </div>
                          </div>

                          <blockquote className="font-sans text-xs sm:text-sm text-gray-750 font-bold mb-3 italic break-words w-full">
                            "{t.quote}"
                          </blockquote>

                          <div className="font-display font-extrabold text-sm text-black">
                            {t.author} 
                            <span className="font-mono text-[10px] text-gray-400 font-normal uppercase tracking-normal ml-2">
                              — {t.role} @ {t.organization}
                            </span>
                          </div>
                        </div>

                        {/* Actions block */}
                        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                          {!t.isDeleted ? (
                            <>
                              <button
                                onClick={() => setEditingTestimonial(t)}
                                className="p-1 px-2 border border-black hover:bg-gray-50 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                              >
                                Edit Review
                              </button>
                              <button
                                onClick={() => handleSoftDeleteTestimonial(t.id)}
                                className="p-1 px-2 border border-black text-industrial-red hover:bg-red-50 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                              >
                                Soft Delete
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleRestoreTestimonial(t.id)}
                                className="p-1 px-2 border border-black bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                              >
                                RESTORE
                              </button>
                              <button
                                onClick={() => handleHardDeleteTestimonial(t.id)}
                                className="p-1 px-2 border border-black bg-red-100 text-industrial-red text-[10px] font-mono font-bold uppercase transition-colors cursor-pointer"
                              >
                                HARD PURGE
                              </button>
                            </>
                          )}
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>
            )}


            {/* TAB E: ARCHIVE & TRASH CENTRE */}
            {activeTab === 'trash' && (
              <div className="space-y-6 text-left">
                {/* Search & Double Filter Controls */}
                <div className="border border-black p-4 bg-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
                    {/* Search bar */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="text"
                        value={trashSearch}
                        onChange={(e) => setTrashSearch(e.target.value)}
                        placeholder="Search system vault (ID, client name, email, project category, title)..."
                        className="w-full bg-white border border-black pl-9 pr-4 py-2 text-xs font-mono placeholder-gray-400 focus:outline-none"
                      />
                    </div>

                    {/* Filter 1: Record Type selection */}
                    <div className="relative">
                      <select
                        value={trashFilter}
                        onChange={(e) => {
                          setTrashFilter(e.target.value as any);
                          setSelectedTrashKeys([]);
                        }}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="all">All Registries</option>
                        <option value="leads">Leads Only</option>
                        <option value="projects">Projects Only</option>
                        <option value="testimonials">Reviews Only</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>

                    {/* Filter 2: Archive Temporal Class */}
                    <div className="relative">
                      <select
                        value={trashTimeFilter}
                        onChange={(e) => {
                          setTrashTimeFilter(e.target.value as any);
                          setSelectedTrashKeys([]);
                        }}
                        className="bg-white border border-black pl-3 pr-8 py-2 text-xs font-mono appearance-none cursor-pointer focus:outline-none text-black font-bold"
                      >
                        <option value="All">All Intervals</option>
                        <option value="Recent">Recent Isolation</option>
                        <option value="Historic">Historic Vault</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[9px] pointer-events-none">▼</div>
                    </div>
                  </div>
                </div>

                {/* Structured Vault Data Table */}
                <div className="border border-black bg-white shadow-[4px_4px_0px_#111111] flex flex-col">
                  {(() => {
                    // Collect deleted records
                    const deletedLeads = (trashFilter === 'all' || trashFilter === 'leads')
                      ? leads.filter(l => l.isDeleted).map(l => ({ ...l, type: 'lead' as const }))
                      : [];
                    const deletedProjects = (trashFilter === 'all' || trashFilter === 'projects')
                      ? projects.filter(p => p.isDeleted).map(p => ({ ...p, type: 'project' as const }))
                      : [];
                    const deletedTestimonials = (trashFilter === 'all' || trashFilter === 'testimonials')
                      ? testimonials.filter(t => (t as any).isDeleted).map(t => ({ ...t, type: 'testimonial' as const }))
                      : [];

                    const combined = [...deletedLeads, ...deletedProjects, ...deletedTestimonials].filter(item => {
                      // Apply search query
                      const matchesSearch = !trashSearch ? true : (
                        item.id.toLowerCase().includes(trashSearch.toLowerCase()) ||
                        (item.type === 'lead' && (
                          (item as any).fullName.toLowerCase().includes(trashSearch.toLowerCase()) || 
                          (item as any).companyEmail.toLowerCase().includes(trashSearch.toLowerCase()) ||
                          (item as any).projectScope.toLowerCase().includes(trashSearch.toLowerCase())
                        )) ||
                        (item.type === 'project' && (
                          (item as any).title.toLowerCase().includes(trashSearch.toLowerCase()) ||
                          ((item as any).category || '').toLowerCase().includes(trashSearch.toLowerCase()) ||
                          ((item as any).client || '').toLowerCase().includes(trashSearch.toLowerCase())
                        )) ||
                        (item.type === 'testimonial' && (
                          (item as any).author.toLowerCase().includes(trashSearch.toLowerCase()) ||
                          ((item as any).organization || '').toLowerCase().includes(trashSearch.toLowerCase()) ||
                          (item as any).quote.toLowerCase().includes(trashSearch.toLowerCase())
                        ))
                      );

                      // Apply temporal filter
                      let matchesTime = true;
                      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
                      // Use timestamp if exists, otherwise fallback to Date
                      const itemDateStr = (item as any).timestamp || (item as any).createdDate || (item as any).date;
                      const timestamp = itemDateStr ? new Date(itemDateStr).getTime() : Date.now();

                      if (trashTimeFilter === 'Recent') {
                        matchesTime = timestamp > thirtyDaysAgo;
                      } else if (trashTimeFilter === 'Historic') {
                        matchesTime = timestamp <= thirtyDaysAgo;
                      }

                      return matchesSearch && matchesTime;
                    });

                    const totalTrashPages = Math.ceil(combined.length / trashPerPage);
                    const activeTrashPage = Math.min(trashCurrentPage, Math.max(1, totalTrashPages));
                    const trashStartIndex = (activeTrashPage - 1) * trashPerPage;
                    const paginatedTrash = combined.slice(trashStartIndex, trashStartIndex + trashPerPage);

                    const pageKeys = paginatedTrash.map(item => `trash-${item.type}-${item.id}`);
                    const allPageChecked = paginatedTrash.length > 0 && pageKeys.every(key => selectedTrashKeys.includes(key));

                    return (
                      <>
                        <div className="overflow-x-auto w-full">
                          <table className="w-full text-left border-collapse min-w-[950px]">
                            <thead>
                              <tr className="bg-black text-white font-mono text-[10px] uppercase tracking-wider border-b border-black">
                                <th className="p-4 w-12 text-center border-r border-gray-800">
                                  <input 
                                    type="checkbox" 
                                    checked={allPageChecked}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedTrashKeys(prev => {
                                          const updated = [...prev];
                                          pageKeys.forEach(key => {
                                            if (!updated.includes(key)) {
                                              updated.push(key);
                                            }
                                          });
                                          return updated;
                                        });
                                      } else {
                                        setSelectedTrashKeys(prev => prev.filter(key => !pageKeys.includes(key)));
                                      }
                                    }}
                                    className="w-4 h-4 border border-white accent-black cursor-pointer"
                                  />
                              </th>
                              <th className="p-4 border-r border-gray-800 w-44">Vault Origin</th>
                              <th className="p-4 border-r border-gray-800 w-36">Stamp ID</th>
                              <th className="p-4 border-r border-gray-800">Register Entity Details</th>
                              <th className="p-4 w-40 text-center">Protocol Dispatch</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-black font-mono text-xs">
                            {paginatedTrash.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="p-12 text-center text-gray-500 font-mono text-xs uppercase bg-[#fafafa]">
                                  Vacuumed. No deleted records located in selected vault cache.
                                </td>
                              </tr>
                            ) : (
                              paginatedTrash.map((item) => {
                                const key = `trash-${item.type}-${item.id}`;
                                const isSelected = selectedTrashKeys.includes(key);

                                return (
                                  <tr 
                                    key={key} 
                                    className={`transition-colors hover:bg-gray-50 ${isSelected ? 'bg-yellow-50/70' : ''}`}
                                  >
                                    {/* Select cell */}
                                    <td className="p-4 text-center border-r border-gray-200">
                                      <input 
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={(e) => {
                                          if (e.target.checked) {
                                            setSelectedTrashKeys(prev => [...prev, key]);
                                          } else {
                                            setSelectedTrashKeys(prev => prev.filter(k => k !== key));
                                          }
                                        }}
                                        className="w-4 h-4 border border-black accent-black cursor-pointer"
                                        id={`trash-select-${key}`}
                                      />
                                    </td>

                                    {/* Vault Origin Badge */}
                                    <td className="p-4 border-r border-gray-200 align-top">
                                      {item.type === 'lead' && (
                                        <span className="inline-block bg-blue-50 text-[#1B49B8] border border-blue-200 text-[8px] font-black tracking-widest px-1.5 py-0.5 uppercase">
                                          [INBOUND LEAD]
                                        </span>
                                      )}
                                      {item.type === 'project' && (
                                        <span className="inline-block bg-red-50 text-industrial-red border border-red-200 text-[8px] font-black tracking-widest px-1.5 py-0.5 uppercase">
                                          [PORTFOLIO PROJ]
                                        </span>
                                      )}
                                      {item.type === 'testimonial' && (
                                        <span className="inline-block bg-yellow-50 text-yellow-800 border border-yellow-250 text-[8px] font-black tracking-widest px-1.5 py-0.5 uppercase">
                                          [CLIENT REVIEW]
                                        </span>
                                      )}
                                    </td>

                                    {/* Stamp ID & Date */}
                                    <td className="p-4 border-r border-gray-200 align-top space-y-1.5">
                                      <span className="font-bold text-black block bg-gray-100 border border-black/10 px-1 py-0.5 text-[9px] w-fit">
                                        ID: {item.id}
                                      </span>
                                      {((item as any).timestamp || (item as any).createdDate) && (
                                        <span className="text-[9px] text-gray-400 block leading-tight">
                                          Deleted Stamp:<br/>
                                          {new Date((item as any).timestamp || (item as any).createdDate).toLocaleDateString()}
                                        </span>
                                      )}
                                    </td>

                                    {/* Entity Details */}
                                    <td className="p-4 border-r border-gray-200 align-top">
                                      {item.type === 'lead' && (
                                        <>
                                          <div className="font-sans font-black text-xs text-black uppercase tracking-tight break-all">
                                            {(item as any).fullName}
                                          </div>
                                          <div className="text-[10px] text-gray-500 mt-1 font-mono space-y-0.5">
                                            <div className="truncate">Email: {(item as any).companyEmail}</div>
                                            <div>Phone: {(item as any).phone || "N/A"}</div>
                                          </div>
                                        </>
                                      )}
                                      {item.type === 'project' && (
                                        <>
                                          <div className="font-sans font-black text-xs text-black uppercase tracking-tight break-all">
                                            {(item as any).title}
                                          </div>
                                          <div className="text-[10px] text-gray-500 mt-1 font-mono space-y-0.5">
                                            <div>Sector: {(item as any).category}</div>
                                            <div>Client: {(item as any).client}</div>
                                          </div>
                                        </>
                                      )}
                                      {item.type === 'testimonial' && (
                                        <>
                                          <div className="font-sans font-black text-xs text-black uppercase tracking-tight break-all">
                                            {(item as any).author}
                                          </div>
                                          <div className="text-[10px] text-gray-500 mt-1 font-mono space-y-0.5">
                                            <div>Company: {(item as any).organization}</div>
                                            <div>Role: {(item as any).role}</div>
                                          </div>
                                        </>
                                      )}
                                    </td>

                                    {/* Dispatch Row controls */}
                                    <td className="p-4 align-top text-center space-y-1.5 pt-4">
                                      <div className="flex items-center justify-center gap-1.5">
                                        {/* Dynamic Detailed Inspect View */}
                                        <button
                                          onClick={() => {
                                            if (item.type === 'lead') setViewingLead(item as any);
                                            else if (item.type === 'project') setViewingProject(item as any);
                                            else if (item.type === 'testimonial') setViewingTestimonial(item as any);
                                          }}
                                          className="p-1.5 border border-black hover:bg-gray-100 text-black cursor-pointer transition-colors"
                                          title="Inspect Isolated Records"
                                        >
                                          <Eye className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Restore button */}
                                        <button
                                          onClick={async () => {
                                            if (item.type === 'lead') {
                                              await dataStore.restoreLead(item.id);
                                              addLogEntry('LEAD_RSTR', `Restored inbound lead for ${(item as any).fullName}`);
                                            } else if (item.type === 'project') {
                                              await dataStore.restoreProject(item.id);
                                              addLogEntry('PROJ_RSTR', `Restored portfolio project "${(item as any).title}"`);
                                            } else if (item.type === 'testimonial') {
                                              await dataStore.restoreTestimonial(item.id);
                                              addLogEntry('TEST_RSTR', `Restored client testimonial from ${(item as any).author}`);
                                            }
                                            refreshDataCollections();
                                            triggerAlert('RECORD RESTORED', `Record was successfully restored back to active database pipelines.`);
                                          }}
                                          className="p-1.5 border border-black text-emerald-800 bg-emerald-50 hover:bg-emerald-100 cursor-pointer transition-colors"
                                          title="Restore"
                                        >
                                          <RotateCcw className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Hard permanent purge */}
                                        <button
                                          onClick={() => {
                                            triggerConfirm(
                                              "SECURITY PROTOCOL: PERMANENT DESTRUCT",
                                              "Are you absolutely certain you want to permanently purge this file? This will completely wipe all footprints from browser local memory.",
                                              async () => {
                                                if (item.type === 'lead') {
                                                  await dataStore.hardDeleteLead(item.id);
                                                  addLogEntry('LEAD_PURG', `Permanently purged lead register ${(item as any).fullName}`);
                                                } else if (item.type === 'project') {
                                                  await dataStore.hardDeleteProject(item.id);
                                                  addLogEntry('PROJ_PURG', `Permanently purged project design record "${(item as any).title}"`);
                                                } else if (item.type === 'testimonial') {
                                                  await dataStore.hardDeleteTestimonial(item.id);
                                                  addLogEntry('TEST_PURG', `Permanently purged testimonial ledger ${(item as any).author}`);
                                                }
                                                refreshDataCollections();
                                                triggerAlert('RECORD PURGED', `System file has been permanently deleted from storage records.`);
                                              }
                                            );
                                          }}
                                          className="p-1.5 border border-black text-white bg-industrial-red hover:bg-red-700 hover:text-white cursor-pointer transition-colors"
                                          title="Delete Permanently"
                                        >
                                          <X className="h-3.5 w-3.5 animate-pulse" />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls */}
                      <div className="p-4 border-t border-black bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs select-none">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                          <span>
                            Showing {combined.length === 0 ? 0 : trashStartIndex + 1}–{Math.min(trashStartIndex + trashPerPage, combined.length)} of {combined.length} entries
                          </span>
                          <span className="hidden sm:inline text-gray-300">|</span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-gray-500">Show:</span>
                            <select
                              value={trashPerPage}
                              onChange={(e) => {
                                setTrashPerPage(Number(e.target.value));
                                setTrashCurrentPage(1);
                              }}
                              className="bg-white border border-black px-1.5 py-0.5 text-xs font-bold font-mono cursor-pointer focus:outline-none"
                            >
                              <option value={5}>5</option>
                              <option value={10}>10</option>
                              <option value={20}>20</option>
                              <option value={50}>50</option>
                            </select>
                          </div>
                        </div>

                        {totalTrashPages > 1 && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setTrashCurrentPage(prev => Math.max(prev - 1, 1))}
                              disabled={activeTrashPage === 1}
                              className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                              title="Previous Page"
                            >
                              ◀ PREV
                            </button>

                            {Array.from({ length: totalTrashPages }, (_, i) => i + 1).map((pageNum) => {
                              const isCurrent = pageNum === activeTrashPage;
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => setTrashCurrentPage(pageNum)}
                                  className={`px-2.5 py-1 border border-black font-mono text-[10px] font-bold cursor-pointer transition-colors ${
                                    isCurrent 
                                      ? 'bg-black text-white' 
                                      : 'bg-white hover:bg-gray-100 text-black'
                                  }`}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}

                            <button
                              onClick={() => setTrashCurrentPage(prev => Math.min(prev + 1, totalTrashPages))}
                              disabled={activeTrashPage === totalTrashPages}
                              className="px-2 py-1 border border-black bg-white hover:bg-gray-100 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed text-[10px] font-bold"
                              title="Next Page"
                            >
                              NEXT ▶
                            </button>
                          </div>
                        )}
                      </div>

                        {/* Bulked selection Trash commands panel */}
                        {selectedTrashKeys.length > 0 && (
                          <div className="bg-black text-white p-4 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs shadow-[4px_4px_0px_#A3E635] mt-4">
                            <div className="flex items-center gap-3">
                              <span className="bg-[#A3E635] text-black font-extrabold px-2 py-1 select-none font-bold uppercase text-[10px]">
                                {selectedTrashKeys.length} Items Selected
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <button 
                                onClick={handleBulkRestoreTrash}
                                className="bg-white hover:bg-emerald-50 text-black hover:text-emerald-800 font-black uppercase px-3 py-1.5 cursor-pointer border border-black transition-colors text-[11px]"
                              >
                                Restore
                              </button>
                              <button 
                                onClick={handleBulkPurgeTrash}
                                className="bg-industrial-red hover:bg-red-700 text-white font-black uppercase px-3 py-1.5 cursor-pointer border border-transparent transition-colors flex items-center gap-1.5 text-[11px]"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete Permanently</span>
                              </button>
                              <button 
                                onClick={() => setSelectedTrashKeys([])}
                                className="text-gray-400 hover:text-white uppercase font-black px-2 py-1 flex items-center justify-center cursor-pointer"
                                title="Deselect All"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  </div>
  )}

      {/* Custom Brutalist Dialogue Modal */}
      <AnimatePresence>
        {viewingLead && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] overflow-y-auto bg-black/60 backdrop-blur-xs p-4 sm:p-6 text-black flex justify-center items-start sm:items-center"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border-2 border-black p-6 shadow-[8px_8px_0px_#111111] relative text-left space-y-4 my-auto"
            >
              <button 
                onClick={() => setViewingLead(null)}
                className="absolute top-4 right-4 text-black hover:text-industrial-red font-mono font-bold text-xs uppercase border border-black px-2 py-0.5 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Dismiss details"
              >
                Close ×
              </button>
              
              <div className="flex items-center gap-2">
                <span className="bg-blue-50 text-[#1B49B8] border border-blue-200 text-[8px] font-black tracking-widest px-2 py-1 uppercase rounded-none">
                  INBOUND LEAD REGISTRY
                </span>
                <span className="font-mono text-[9px] text-gray-400">ID: {viewingLead.id}</span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl text-black uppercase tracking-tight break-all">
                  {viewingLead.fullName}
                </h3>
                <span className="font-mono text-[10.5px] text-gray-500 block mt-0.5">
                  Company Ledger: <strong className="text-black">{viewingLead.companyName}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-b border-black/10 py-3 font-mono text-[11px] bg-gray-50 p-3">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Email Contact:</span>
                  <span className="text-black font-semibold break-all">{viewingLead.companyEmail}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Phone Number:</span>
                  <span className="text-black font-semibold">{viewingLead.phone || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Stated Budget:</span>
                  <span className="text-emerald-800 font-bold">{viewingLead.budget || "Stated estimate"}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Date Received:</span>
                  <span className="text-black font-semibold">
                    {new Date(viewingLead.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <div className="col-span-2 border-t border-black/5 pt-2">
                  <span className="text-gray-400 block text-[9px] uppercase font-bold mb-1">Lead Status Category:</span>
                  <div className="relative w-full sm:w-1/2">
                    <select
                      value={viewingLead.status}
                      onChange={(e) => {
                        const nextStatus = e.target.value as 'Pending' | 'Reviewed' | 'Archived';
                        handleUpdateLeadStatus(viewingLead.id, nextStatus);
                        setViewingLead(prev => prev ? { ...prev, status: nextStatus } : null);
                      }}
                      className={`font-mono text-[10px] font-black uppercase tracking-wider px-2.5 py-1.5 pr-8 border text-left w-full cursor-pointer appearance-none focus:outline-none focus:ring-1 focus:ring-black ${
                        viewingLead.status === 'Pending' 
                          ? 'border-red-300 bg-red-50 text-industrial-red' 
                          : viewingLead.status === 'Reviewed' 
                            ? 'border-blue-300 bg-blue-50 text-[#1B49B8]' 
                            : 'border-gray-300 bg-gray-100 text-gray-500'
                      }`}
                    >
                      <option value="Pending" className="bg-white text-black font-bold">Pending</option>
                      <option value="Reviewed" className="bg-white text-black font-bold">Reviewed</option>
                      <option value="Archived" className="bg-white text-black font-bold">Archived</option>
                    </select>
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono text-[8px] pointer-events-none opacity-80 text-current">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-gray-400 block uppercase font-bold">// Dynamic Project Scope:</span>
                <div className="font-sans text-sm sm:text-base text-black border-l-2 border-black pl-3 py-2 bg-gray-50/50 leading-relaxed max-h-96 overflow-y-auto whitespace-pre-wrap break-words w-full">
                  {viewingLead.projectScope}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-end pt-3 border-t border-black/10">
                <button 
                  type="button"
                  onClick={() => setViewingLead(null)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-black font-mono text-[10px] font-bold uppercase border border-gray-300 cursor-pointer"
                >
                  Close
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    handleSoftDeleteLead(viewingLead.id);
                    setViewingLead(null);
                  }}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-industrial-red font-mono text-[10px] font-bold uppercase border border-industrial-red cursor-pointer"
                >
                  Discard Inquiry
                </button>
                {viewingLead.status === 'Pending' && (
                  <button 
                    type="button"
                    onClick={() => {
                      setNewProject({
                        id: '',
                        title: `${viewingLead.companyName || viewingLead.fullName} Construction Project`,
                        category: viewingLead.serviceCategory || 'Structural Design',
                        location: '',
                        image: '/assets/images/industrial_retrofit_1780500246965.png',
                        scope: viewingLead.projectScope,
                        client: viewingLead.fullName,
                        completedYear: '2026',
                        complianceRatio: '100% Code Safety Certified',
                        description: viewingLead.projectScope,
                        status: 'Completed'
                      });
                      handleUpdateLeadStatus(viewingLead.id, 'Reviewed');
                      setIsCreatingProject(true);
                      setActiveTab('projects');
                      setViewingLead(null);
                    }}
                    className="px-3 py-1.5 bg-blue-50 text-[#1B49B8] hover:bg-[#1B49B8] hover:text-white font-mono text-[10px] font-black uppercase border border-blue-300 cursor-pointer"
                  >
                    Promote to Project
                  </button>
                )}
                <button 
                  type="button"
                  onClick={() => {
                    handleUpdateLeadStatus(viewingLead.id, 'Reviewed');
                    setViewingLead(null);
                  }}
                  className="px-4 py-1.5 bg-black hover:bg-gray-850 text-white font-mono text-[10px] font-bold uppercase border border-black cursor-pointer shadow-[2px_2px_0px_#A3E635]"
                >
                  Acknowledge & Review
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {viewingProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] overflow-y-auto bg-black/60 backdrop-blur-xs p-4 sm:p-6 text-black flex justify-center items-start sm:items-center"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border-2 border-black p-6 shadow-[8px_8px_0px_#111111] relative text-left space-y-4 my-auto"
            >
              <button 
                onClick={() => setViewingProject(null)}
                className="absolute top-4 right-4 text-black hover:text-industrial-red font-mono font-bold text-xs uppercase border border-black px-2 py-0.5 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Dismiss details"
              >
                Close ×
              </button>
              
              <div className="flex items-center gap-2">
                <span className="bg-red-50 text-industrial-red border border-red-200 text-[8px] font-black tracking-widest px-2 py-1 uppercase">
                  PORTFOLIO DESIGN BLUEPRINT
                </span>
                <span className="font-mono text-[9px] text-gray-400">ID: {viewingProject.id}</span>
              </div>

              <div className="flex gap-4 items-start pb-2 border-b border-gray-100">
                <div className="w-20 h-20 border border-black bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
                  {viewingProject.image ? (
                    <img 
                      src={viewingProject.image} 
                      alt={viewingProject.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-black uppercase tracking-tight leading-tight break-all">
                    {viewingProject.title}
                  </h3>
                  {viewingProject.category && (
                    <span className="inline-flex items-center gap-1 bg-[#1B49B8]/5 border border-[#1B49B8]/10 text-[#1B49B8] px-1.5 py-0.5 text-[9px] font-black uppercase mt-1">
                      <Layers className="h-2.5 w-2.5" />
                      <span>{viewingProject.category}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px] bg-gray-50 p-3 border border-black/10">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Client Account:</span>
                  <span className="text-black font-semibold truncate block">{viewingProject.client}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Realized Location:</span>
                  <span className="text-black font-semibold truncate block">{viewingProject.location}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Calendar Stamp:</span>
                  <span className="text-black font-semibold">Compl. Year {viewingProject.completedYear}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase font-bold">Operational Phase:</span>
                  <span className={`inline-block font-mono text-[9px] font-black uppercase tracking-wider px-2 py-0.5 border mt-0.5 ${
                    viewingProject.status === 'Completed' 
                      ? 'border-green-300 bg-green-50 text-green-700' 
                      : 'border-yellow-300 bg-yellow-50 text-yellow-700'
                  }`}>
                    {viewingProject.status}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[9px] text-gray-400 block uppercase font-bold">// Technical Scope Description:</span>
                <p className="font-sans text-xs text-black border-l-2 border-black pl-3 py-1 bg-gray-50/50 leading-relaxed max-h-36 overflow-y-auto">
                  {viewingProject.description}
                </p>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button 
                  onClick={() => setViewingProject(null)}
                  className="px-5 py-2 bg-black hover:bg-gray-850 text-white font-mono text-xs font-bold uppercase border border-black cursor-pointer shadow-[2px_2px_0px_#A3E635]"
                >
                  Close Technical Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {previewProjectDetails && (
          <div className="fixed inset-0 z-[9995] bg-white overflow-y-auto">
            {/* Admin top warning banner */}
            <div className="bg-yellow-400 text-black border-b border-black font-mono text-xs font-black uppercase flex items-center justify-between px-4 sm:px-6 py-2.5 shrink-0 select-none sticky top-0 z-[10000]">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
                <span>[DESIGN BLUEPRINT SIMULATION ACTIVE — PORTFOLIO PREVIEW MODE]</span>
              </div>
              <button
                onClick={() => setPreviewProjectDetails(null)}
                className="bg-black hover:bg-gray-900 text-white font-sans font-bold uppercase px-3 py-1 text-xs border border-transparent transition-colors cursor-pointer"
              >
                Exit Preview Mode ×
              </button>
            </div>
            {/* The actual project details page layout */}
            <div className="relative">
              <ProjectShowcasePage 
                project={previewProjectDetails} 
                onBack={() => setPreviewProjectDetails(null)}
                onScrollToSection={() => {}}
                isPreview={true}
              />
            </div>
          </div>
        )}

        {viewingTestimonial && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9990] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 text-black"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-lg bg-white border-2 border-black p-6 shadow-[8px_8px_0px_#111111] relative text-left space-y-4"
            >
              <button 
                onClick={() => setViewingTestimonial(null)}
                className="absolute top-4 right-4 text-black hover:text-industrial-red font-mono font-bold text-xs uppercase border border-black px-2 py-0.5 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Dismiss details"
              >
                Close ×
              </button>
              
              <div className="flex items-center gap-2">
                <span className="bg-yellow-50 text-yellow-800 border border-yellow-250 text-[8px] font-black tracking-widest px-2 py-1 uppercase rounded-none">
                  CLIENT REVIEW LEDGER
                </span>
                <span className="font-mono text-[9px] text-gray-400">ID: {viewingTestimonial.id}</span>
              </div>

              <div>
                <h3 className="font-display font-black text-xl text-black uppercase tracking-tight break-all">
                  {viewingTestimonial.author}
                </h3>
                <span className="font-mono text-[10.5px] text-gray-500 block mt-0.5">
                  Organization: <strong className="text-black">{viewingTestimonial.organization}</strong> ({viewingTestimonial.role})
                </span>
              </div>

              <div className="space-y-1.5 border-t border-b border-black/10 py-3 bg-yellow-50/20 px-3">
                <span className="font-mono text-[9px] text-amber-800 block uppercase font-bold">// Attested Quote:</span>
                <blockquote className="font-sans text-xs italic text-black border-l-2 border-black pl-3 py-1 bg-white leading-relaxed max-h-40 overflow-y-auto whitespace-pre-wrap">
                  "{viewingTestimonial.quote}"
                </blockquote>
              </div>

              <div className="flex justify-end pt-2 border-t border-gray-100">
                <button 
                  onClick={() => setViewingTestimonial(null)}
                  className="px-5 py-2 bg-black hover:bg-gray-850 text-white font-mono text-xs font-bold uppercase border border-black cursor-pointer shadow-[2px_2px_0px_#A3E635]"
                >
                  Acknowledge Testimonial
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Root-Level Pop-up modal widget for Project Ingestion/Editing */}
        {(isCreatingProject || editingProject) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 text-black"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border-2 border-black shadow-[8px_8px_0px_#111111] w-full max-w-6xl max-h-[92vh] flex flex-col relative"
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-black flex items-center justify-between bg-gray-50 shrink-0">
                <div>
                  <span className="font-mono text-xs text-industrial-red font-black uppercase tracking-wider block">JG_ESTIMATOR_FORM_VAL // DIRECT SCHEMA INPUT</span>
                  <h3 className="font-display font-extrabold text-[#111111] text-lg sm:text-xl uppercase">
                    {editingProject ? `EDIT FILES: ${editingProject.title}` : 'INGEST NEW PORTFOLIO PROJECT'}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setIsCreatingProject(false);
                    setEditingProject(null);
                  }}
                  className="p-1.5 border border-black bg-white cursor-pointer hover:bg-industrial-red hover:text-white transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Scrollable content area */}
              <div className="overflow-y-auto p-6 sm:p-8 flex-1 text-left">
                {/* Editing fields layout */}
                <form onSubmit={handleSaveProject} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Project Case Title</label>
                    <input 
                      type="text" 
                      required
                      value={editingProject ? editingProject.title : newProject.title}
                      onChange={(e) => {
                        if (editingProject) setEditingProject({ ...editingProject, title: e.target.value });
                        else setNewProject({ ...newProject, title: e.target.value });
                      }}
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Sector Category</label>
                    <select
                      value={editingProject ? editingProject.category : newProject.category}
                      onChange={(e) => {
                        if (editingProject) setEditingProject({ ...editingProject, category: e.target.value });
                        else setNewProject({ ...newProject, category: e.target.value });
                      }}
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono cursor-pointer"
                    >
                      <option value="Structural Design">Structural Design</option>
                      <option value="Commercial Build">Commercial Build</option>
                      <option value="Industrial Frameworks">Industrial Frameworks</option>
                      <option value="Civil Works">Civil Works</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Contract Client Corporate</label>
                    <input 
                      type="text"
                      required
                      value={editingProject ? editingProject.client : newProject.client}
                      onChange={(e) => {
                        if (editingProject) setEditingProject({ ...editingProject, client: e.target.value });
                        else setNewProject({ ...newProject, client: e.target.value });
                      }}
                      placeholder="e.g. Universal Logistics Inc."
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Municipal Location Address</label>
                    <input 
                      type="text" 
                      required
                      value={editingProject ? editingProject.location : newProject.location}
                      onChange={(e) => {
                        if (editingProject) setEditingProject({ ...editingProject, location: e.target.value });
                        else setNewProject({ ...newProject, location: e.target.value });
                      }}
                      placeholder="e.g. Cavite City"
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono"
                    />
                  </div>

                  {!isOngoingMode && (
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Completed Year / Calendar Stamp</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. 2026, Ongoing"
                        value={editingProject ? editingProject.completedYear : newProject.completedYear}
                        onChange={(e) => {
                          if (editingProject) setEditingProject({ ...editingProject, completedYear: e.target.value });
                          else setNewProject({ ...newProject, completedYear: e.target.value });
                        }}
                        className="bg-white border border-black w-full px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Operation Status</label>
                    <select
                      value={editingProject ? editingProject.status : newProject.status}
                      onChange={(e) => {
                        if (editingProject) setEditingProject({ ...editingProject, status: e.target.value as any });
                        else setNewProject({ ...newProject, status: e.target.value as any });
                      }}
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono cursor-pointer"
                    >
                      <option value="Completed">Completed</option>
                      <option value="Ongoing">Ongoing / In Progress</option>
                    </select>
                  </div>

                  {!isOngoingMode && (
                    <div className="md:col-span-2 border border-black p-4 bg-gray-100 flex flex-col md:flex-row items-stretch gap-4 min-w-0 w-full">
                      {/* Image preview box */}
                      <div className="shrink-0 w-28 h-28 border border-black bg-white flex items-center justify-center relative overflow-hidden select-none">
                        {(editingProject ? editingProject.image : newProject.image) ? (
                          <img 
                            src={editingProject ? editingProject.image : newProject.image} 
                            alt="Project Ingestion preview" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="text-center p-2">
                            <ImageIcon className="h-7 w-7 mx-auto text-gray-400 mb-1" />
                            <span className="block font-mono text-[8px] text-gray-400 uppercase tracking-widest">// NO CORE IMAGE</span>
                          </div>
                        )}
                      </div>

                      {/* Dynamic Drag and drop Zone */}
                      <div className="flex-1 flex flex-col justify-center min-w-0">
                        <div>
                          <span className="block font-mono text-[9px] text-gray-500 font-bold uppercase mb-1">
                            Drag & Drop or Click to Upload Project Image (Multiple Uploads Fully Allowed)
                          </span>
                          <div 
                            onDragOver={(e) => {
                              e.preventDefault();
                              setIsDraggingImage(true);
                            }}
                            onDragLeave={() => setIsDraggingImage(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setIsDraggingImage(false);
                              if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                handleImageFiles(e.dataTransfer.files);
                              }
                            }}
                            className={`border border-dashed p-3.5 text-center cursor-pointer transition-all flex flex-col items-center justify-center rounded-none ${
                              isDraggingImage 
                                ? 'bg-blue-50 border-engineering-blue text-engineering-blue' 
                                : 'bg-white border-black hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              document.getElementById('project-image-file-input')?.click();
                            }}
                          >
                            <input 
                              id="project-image-file-input"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0) {
                                  handleImageFiles(e.target.files);
                                }
                              }}
                            />
                            <div className="flex items-center gap-2">
                              <Upload className="h-4 w-4 text-industrial-red shrink-0" />
                              <span className="font-display font-black text-[10px] uppercase tracking-wider block">
                                { ((editingProject ? editingProject.images : newProject.images) || []).length > 0 ? 'Upload More Project Images' : 'Select Project Schematics' }
                              </span>
                            </div>
                            <span className="font-mono text-[8px] text-gray-400 uppercase mt-0.5">
                              Support multi-select! Drag multiple files or click to add
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Displaying Uploaded Gallery Items */}
                  {!isOngoingMode && ((editingProject ? editingProject.images : newProject.images) || []).length > 0 && (
                    <div className="md:col-span-2 border-2 border-black p-4 bg-gray-50 space-y-3 min-w-0 w-full">
                      <div className="flex items-center justify-between gap-2 border-b border-black pb-2">
                        <span className="block font-mono text-[10px] text-black font-black uppercase tracking-widest">// UPLOADED SCHEMATICS GALLERY ({((editingProject ? editingProject.images : newProject.images) || []).length} ASSETS)</span>
                        <span className="font-mono text-[8.5px] text-gray-500 uppercase">// CHOOSE PRIMARY & VIEW ORDER</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 min-w-0 w-full">
                        {((editingProject ? editingProject.images : newProject.images) || []).map((imgUrl, imgIdx) => {
                          const isPrimary = (editingProject ? editingProject.image : newProject.image) === imgUrl;
                          return (
                            <div key={imgIdx} className={`relative border p-1 bg-white group/thumb flex flex-col justify-between ${isPrimary ? 'border-industrial-red shadow-[2px_2px_0px_#111111]' : 'border-black'}`}>
                              <div className="aspect-square w-full overflow-hidden border border-gray-100 bg-gray-50 relative select-none">
                                <img src={imgUrl} className="object-cover w-full h-full" referrerPolicy="no-referrer" />
                                {isPrimary && (
                                  <span className="absolute top-1 left-1 bg-industrial-red text-white text-[7px] font-mono font-bold px-1 py-0.5 uppercase tracking-wide">
                                    PRIMARY
                                  </span>
                                )}
                                <span className="absolute bottom-1 right-1 bg-black text-white text-[7px] font-mono px-1 py-0.2">
                                  #{imgIdx + 1}
                                </span>
                              </div>
                              <div className="mt-2 flex flex-col gap-1 text-[8.5px] font-mono uppercase">
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (editingProject) {
                                      setEditingProject(prev => prev ? { ...prev, image: imgUrl } : null);
                                    } else {
                                      setNewProject(prev => ({ ...prev, image: imgUrl }));
                                    }
                                  }}
                                  className={`w-full py-0.5 border text-center font-bold text-[8px] cursor-pointer ${isPrimary ? 'bg-industrial-red text-white border-industrial-red' : 'bg-gray-100 border-black hover:bg-black hover:text-white'}`}
                                >
                                  SET AS MAIN
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    if (editingProject) {
                                      setEditingProject(prev => {
                                        if (!prev) return null;
                                        const updated = (prev.images || []).filter((_, idx) => idx !== imgIdx);
                                        // Fallback main image if current primary was deleted
                                        let nextPrimary = prev.image;
                                        if (prev.image === imgUrl) {
                                          nextPrimary = updated.length > 0 ? updated[0] : '/assets/images/industrial_retrofit_1780500246965.png';
                                        }
                                        return { ...prev, images: updated, image: nextPrimary };
                                      });
                                    } else {
                                      setNewProject(prev => {
                                        const updated = (prev.images || []).filter((_, idx) => idx !== imgIdx);
                                        let nextPrimary = prev.image;
                                        if (prev.image === imgUrl) {
                                          nextPrimary = updated.length > 0 ? updated[0] : '/assets/images/industrial_retrofit_1780500246965.png';
                                        }
                                        return { ...prev, images: updated, image: nextPrimary };
                                      });
                                    }
                                  }}
                                  className="w-full py-0.5 border border-black bg-white text-black hover:bg-red-600 hover:text-white hover:border-red-600 font-bold text-[8px] cursor-pointer"
                                >
                                  DELETE
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!isOngoingMode && (
                    <div className="md:col-span-2">
                      <RichTextEditor 
                        label="Core Deliverable Scope description"
                        placeholder="Deliverable details and scope components..."
                        value={editingProject ? editingProject.scope : newProject.scope}
                        onChange={(val) => {
                          if (editingProject) setEditingProject({ ...editingProject, scope: val });
                          else setNewProject({ ...newProject, scope: val });
                        }}
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="md:col-span-2">
                    <RichTextEditor 
                      label={isOngoingMode ? "Short Project Description" : "Profile Specifications Description"}
                      placeholder={isOngoingMode ? "Enter short project description..." : "General case study details or engineering problems solved..."}
                      value={editingProject ? editingProject.description : newProject.description}
                      onChange={(val) => {
                        if (editingProject) setEditingProject({ ...editingProject, description: val });
                        else setNewProject({ ...newProject, description: val });
                      }}
                      rows={5}
                    />
                  </div>

                  <div className="md:col-span-2 pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingProject(false);
                        setEditingProject(null);
                      }}
                      className="border border-black bg-white hover:bg-gray-100 text-black px-5 py-2.5 font-mono text-xs font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#1B49B8] border border-black text-white hover:bg-opacity-90 px-6 py-2.5 font-display font-black text-xs uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Ingested Index</span>
                    </button>
                  </div>

                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Root-Level Pop-up modal widget for Testimonial Ingestion/Editing */}
        {(isCreatingTestimonial || editingTestimonial) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9995] flex items-center justify-center p-4 sm:p-6 md:p-10 text-black"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white border-2 border-black shadow-[8px_8px_0px_#111111] w-full max-w-7xl max-h-[92vh] flex flex-col relative"
            >
              {/* Header */}
              <div className="p-6 border-b-2 border-black flex items-center justify-between bg-gray-50 shrink-0">
                <div>
                  <span className="font-mono text-xs text-industrial-red font-black uppercase tracking-wider block">TESTIMONIAL INPUT GRID // FULL CONTAINER INSERTION</span>
                  <h3 className="font-display font-black text-[#111111] text-lg uppercase">
                    {editingTestimonial ? `EDIT CUSTOMER REVIEW: ${editingTestimonial.author}` : 'ADD CUSTOMER TESTIMONY REFERENCE'}
                  </h3>
                </div>
                <button 
                  onClick={() => {
                    setIsCreatingTestimonial(false);
                    setEditingTestimonial(null);
                  }}
                  className="p-1.5 border border-black bg-white cursor-pointer hover:bg-industrial-red hover:text-white transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Scrollable content area */}
              <div className="overflow-y-auto p-6 sm:p-8 flex-1 text-left">
                <form onSubmit={handleSaveTestimonial} className="space-y-6 w-full">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Author Name</label>
                      <input 
                        type="text" 
                        required
                        value={editingTestimonial ? editingTestimonial.author : newTestimonial.author}
                        onChange={(e) => {
                          if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, author: e.target.value });
                          else setNewTestimonial({ ...newTestimonial, author: e.target.value });
                        }}
                        className="bg-white border border-black w-full px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Client Official Role</label>
                      <input 
                        type="text" 
                        required
                        value={editingTestimonial ? editingTestimonial.role : newTestimonial.role}
                        onChange={(e) => {
                          if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, role: e.target.value });
                          else setNewTestimonial({ ...newTestimonial, role: e.target.value });
                        }}
                        placeholder="e.g. Operations Head"
                        className="bg-white border border-black w-full px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Company / Organization</label>
                      <input 
                        type="text" 
                        required
                        value={editingTestimonial ? editingTestimonial.organization : newTestimonial.organization}
                        onChange={(e) => {
                          if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, organization: e.target.value });
                          else setNewTestimonial({ ...newTestimonial, organization: e.target.value });
                        }}
                        placeholder="e.g. Nexus Corp"
                        className="bg-white border border-black w-full px-3 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-industrial-red"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-[10px] font-bold uppercase mb-1">Rating Stars (1-5)</label>
                      <select
                        value={editingTestimonial ? editingTestimonial.stars : newTestimonial.stars}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 5;
                          if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, stars: val });
                          else setNewTestimonial({ ...newTestimonial, stars: val });
                        }}
                        className="bg-white border border-black w-full px-3 py-2 text-xs font-mono cursor-pointer focus:outline-none focus:ring-1 focus:ring-industrial-red"
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] font-bold uppercase mb-1">Quote Statement</label>
                    <textarea 
                      rows={4}
                      required
                      value={editingTestimonial ? editingTestimonial.quote : newTestimonial.quote}
                      placeholder="Positive feedback and recommendations block..."
                      onChange={(e) => {
                        if (editingTestimonial) setEditingTestimonial({ ...editingTestimonial, quote: e.target.value });
                        else setNewTestimonial({ ...newTestimonial, quote: e.target.value });
                      }}
                      className="bg-white border border-black w-full px-3 py-2 text-xs font-mono resize-y focus:outline-none focus:ring-1 focus:ring-industrial-red"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsCreatingTestimonial(false);
                        setEditingTestimonial(null);
                      }}
                      className="border border-black bg-white hover:bg-gray-100 text-black px-4 py-2.5 font-mono text-xs font-bold uppercase cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-black hover:bg-gray-900 text-white px-5 py-2.5 font-display font-bold text-xs uppercase tracking-wider cursor-pointer border border-black flex items-center gap-1.5"
                    >
                      <Check className="h-4 w-4 text-industrial-red" />
                      <span>Confirm Review Index</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {dialog.isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-white border-2 border-black p-6 shadow-[8px_8px_0px_#111111] relative text-left space-y-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black text-white shrink-0">
                  <Shield className="h-5 w-5 text-industrial-red" />
                </div>
                <div>
                  <span className="font-mono text-[9px] text-industrial-red font-black block uppercase tracking-widest leading-none mb-1">
                    SYSTEM DIALOGUE // CONSTRAINED PROTOCOL
                  </span>
                  <h3 className="font-display font-black text-base text-black uppercase tracking-tight">
                    {dialog.title}
                  </h3>
                </div>
              </div>

              <div className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-b border-gray-100 py-3">
                {dialog.message}
              </div>

              <div className="flex justify-end gap-2.5 font-mono text-xs">
                {dialog.type === 'confirm' ? (
                  <>
                    <button 
                      onClick={() => setDialog(prev => ({ ...prev, isOpen: false }))}
                      className="px-4 py-2 bg-white hover:bg-gray-100 border border-black text-black font-bold uppercase cursor-pointer"
                    >
                      Bypass / Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setDialog(prev => ({ ...prev, isOpen: false }));
                        if (dialog.onConfirm) dialog.onConfirm();
                      }}
                      className="px-4 py-2 bg-black hover:bg-industrial-red hover:text-white border border-black text-white font-bold uppercase cursor-pointer"
                    >
                      Confirm Action
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setDialog(prev => ({ ...prev, isOpen: false }))}
                    className="px-5 py-2 bg-black hover:bg-gray-850 border border-black text-white font-bold uppercase cursor-pointer"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
