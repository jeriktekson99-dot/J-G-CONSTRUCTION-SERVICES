import { createClient } from '@supabase/supabase-js';

const rawUrl = ((import.meta as any).env?.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = ((import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '').trim();

// Sanitize URL to handle common configuration mistakes
function sanitizeSupabaseUrl(url: string): string {
  if (!url) return '';
  
  let cleanUrl = url.trim();
  
  // Remove trailing slashes
  cleanUrl = cleanUrl.replace(/\/+$/, '');
  
  // Strip duplicate /rest/v1 if the user mistakenly appended it
  cleanUrl = cleanUrl.replace(/\/rest\/v1$/, '');
  cleanUrl = cleanUrl.replace(/\/+$/, ''); // clean trailing slashes again just in case
  
  // Ensure it starts with http:// or https:// (unless it is a placeholder or database URI)
  if (cleanUrl && !cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://') && !cleanUrl.startsWith('postgresql://')) {
    cleanUrl = `https://${cleanUrl}`;
  }
  
  return cleanUrl;
}

export const supabaseUrl = sanitizeSupabaseUrl(rawUrl);
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

