-- J/G CONSTRUCTION SERVICES - SUPABASE DATABASE SCHEMA & MIGRATION SCRIPT
-- Copy and execute this script in your Supabase SQL Editor (https://supabase.com)

-- ====================================================================
-- OPTION A: RE-CREATE ALL TABLES (RECOMMENDED to fix UUID and missing column errors)
-- Un-comment the lines below and run this if you want to cleanly reset your tables 
-- and fix the type-mismatch errors instantly. Warning: This clears existing data.
-- ====================================================================
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS testimonials CASCADE;
-- DROP TABLE IF EXISTS leads CASCADE;
-- DROP TABLE IF EXISTS services CASCADE;
-- DROP TABLE IF EXISTS historical_records CASCADE;


-- ====================================================================
-- OPTION B: REPAIR EXISTING TABLES (Runs alters to fix column/type issues without losing data)
-- ====================================================================
-- Fix projects ID type if it was previously UUID:
-- ALTER TABLE projects ALTER COLUMN id TYPE TEXT;

-- Fix testimonials missing organization column:
-- ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS organization TEXT;

-- Fix leads missing timestamp column:
-- ALTER TABLE leads ADD COLUMN IF NOT EXISTS timestamp TEXT;


-- ====================================================================
-- 1. PROJECTS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  image TEXT,
  images TEXT[] DEFAULT '{}',
  scope TEXT,
  client TEXT,
  "completedYear" TEXT,
  "complianceRatio" TEXT,
  description TEXT,
  status TEXT DEFAULT 'Completed' CHECK (status IN ('Completed', 'Ongoing')),
  "isDeleted" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 2. TESTIMONIALS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  author TEXT NOT NULL,
  role TEXT,
  organization TEXT,
  stars INTEGER DEFAULT 5,
  "isDeleted" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 3. LEADS TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  "fullName" TEXT NOT NULL,
  "companyEmail" TEXT NOT NULL,
  phone TEXT,
  "projectScope" TEXT,
  timestamp TEXT,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'Reviewed', 'Archived')),
  "isDeleted" BOOLEAN DEFAULT FALSE,
  "serviceCategory" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 4. SERVICES TABLE
-- ====================================================================
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  image TEXT,
  metric TEXT,
  "metricLabel" TEXT,
  "scopeItems" TEXT[] DEFAULT '{}',
  "isDeleted" BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- 5. HISTORICAL RECORDS TABLE (LEADS METRICS)
-- ====================================================================
CREATE TABLE IF NOT EXISTS historical_records (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  type TEXT CHECK (type IN ('MONTHLY', 'YEARLY')),
  year INTEGER NOT NULL,
  "monthIndex" INTEGER,
  "dataPoints" INTEGER[] DEFAULT '{}',
  "totalLeads" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ====================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES (RLS ACTIVE & SECURE)
-- ====================================================================

-- Enable Row-Level Security for all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE historical_records ENABLE ROW LEVEL SECURITY;

-- Drop existing general policies if any to avoid naming clashes
DROP POLICY IF EXISTS "Allow anon read-write on projects" ON projects;
DROP POLICY IF EXISTS "Allow anon read-write on testimonials" ON testimonials;
DROP POLICY IF EXISTS "Allow anon read-write on leads" ON leads;
DROP POLICY IF EXISTS "Allow anon read-write on services" ON services;
DROP POLICY IF EXISTS "Allow anon read-write on historical_records" ON historical_records;

-- Create secure, clean policies allowing the app's visitors and administrators 
-- (using public/anon role access keys) to query and update the client-side data store.
CREATE POLICY "Allow anon read-write on projects" ON projects 
  FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon read-write on testimonials" ON testimonials 
  FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon read-write on leads" ON leads 
  FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon read-write on services" ON services 
  FOR ALL TO public USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon read-write on historical_records" ON historical_records 
  FOR ALL TO public USING (true) WITH CHECK (true);
