import { TestimonialItem, HistoricalRecord } from '../types';
import { supabaseSync } from './supabaseSync';

export interface Lead {
  id: string;
  fullName: string;
  companyEmail: string;
  phone: string;
  projectScope: string;
  timestamp: string;
  status: 'Pending' | 'Reviewed' | 'Archived';
  isDeleted?: boolean;
  serviceCategory?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Structural Design' | 'Commercial Build' | 'Industrial Frameworks' | 'Civil Works' | string;
  location: string;
  image: string;
  images?: string[];
  scope: string;
  client: string;
  completedYear: string;
  complianceRatio: string;
  description: string;
  status: 'Completed' | 'Ongoing';
  isDeleted?: boolean;
  updatedAt?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  scopeItems: string[];
  isDeleted?: boolean;
}

// Default Projects
const DEFAULT_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "Steel Truss Logistics Warehouse",
    category: "Industrial Frameworks",
    location: "Cavite",
    image: "/assets/images/industrial_retrofit_1780500246965.png",
    scope: "Direct structural framework engineering, clear-span steel positioning, welding inspections, and gantry rail alignment.",
    client: "Universal Logistics Inc.",
    completedYear: "2025",
    complianceRatio: "100% Structural Safety Audit Passed",
    description: "Designed to bear severe typhonic wind loads up to 280 KPH. Utilizes highly-optimized rigid gusset plate connections to distribute sheer forces evenly across structural frames.",
    status: "Completed"
  },
  {
    id: "proj-2",
    title: "Prime Commercial Hub Shell & Core",
    category: "Commercial Build",
    location: "Lucena City",
    image: "/assets/images/commercial_development_1780500228422.png",
    scope: "Multistory steel framing, architectural curtain wall frame integrations, monolithic core column positioning, and turnkey concrete works.",
    client: "Lucena Holdings Corp.",
    completedYear: "2025",
    complianceRatio: "Unified Engineering Grade A Cert.",
    description: "A flagship multistory framework utilizing high-strength pre-tensioned structural concrete columns to limit space consumption and deliver beautiful column-free interior floor plates.",
    status: "Ongoing"
  },
  {
    id: "proj-3",
    title: "Seismic Retrofitting Project Alpha",
    category: "Structural Design",
    location: "Tayabas",
    image: "/assets/images/field_excellence_operations_1780503096054.png",
    scope: "Carbon-fiber column wrapping (CFRP), post-tension anchor placements, load recalculation distributions, and active in-process welding.",
    client: "Heritage Restoration Board",
    completedYear: "2024",
    complianceRatio: "National Building Safety Standard Approved",
    description: "Implemented structural carbon-fiber jacket laminates to raise older concrete frame shear tolerances by 140% without imposing noticeable weight dead-loads.",
    status: "Completed"
  },
  {
    id: "proj-4",
    title: "Heavy Industrial Foundation Works",
    category: "Civil Works",
    location: "Batangas",
    image: "/assets/images/rebar_foundation_1780503628161.png",
    scope: "Deep pile micro-piling, monolithic high-density concrete placement, deep retaining walls, and soil compaction verification checks.",
    client: "Batangas Port Terminals",
    completedYear: "2024",
    complianceRatio: "Zero Settlement Tolerance Metric Reached",
    description: "Bespoke foundation structures engineered specifically to resist extreme structural vibrations caused by high-power industrial cargo movement cranes.",
    status: "Ongoing"
  },
  {
    id: "proj-5",
    title: "Multi-Level Institutional Complex",
    category: "Commercial Build",
    location: "Imus",
    image: "/assets/images/commercial_fitout_1780503646291.png",
    scope: "Turnkey structural fabrication, load-bearing concrete staircases, fire exits integration, and mechanical/electrical sleeve positioning.",
    client: "St. Jude Educational Guild",
    completedYear: "2024",
    complianceRatio: "100% Fire & Safety Code Compliant",
    description: "Spacious layout optimization combining lightweight steel framing studs with high-performance soundproofing. Structured for maximum safety and high-traffic egress safety.",
    status: "Completed"
  },
  {
    id: "proj-6",
    title: "Specialized Steel Framework Fabrication",
    category: "Industrial Frameworks",
    location: "Laguna",
    image: "/assets/images/about_construction_site_1780503065020.png",
    scope: "High-accuracy truss design, heavy steel gusset structural stamp verification, automated machinery mounting, and vibration isolation.",
    client: "Apex Manufacturing Solutions",
    completedYear: "2023",
    complianceRatio: "Weld Defeat Testing Rated: 100% Solid",
    description: "A precision-built framework engineered specifically to resist mechanical fatigue patterns resulting from continuous automated robotics operation.",
    status: "Completed"
  },
  {
    id: "proj-7",
    title: "Municipal Drainage & Civil Infrastructure",
    category: "Civil Works",
    location: "Quezon",
    image: "/assets/images/civil_infrastructure_1780500263690.png",
    scope: "Site surveys, volume balance earthworks grading, high-flow storm-water cell construction, and reinforced precast culvert systems.",
    client: "Quezon Provincial Secretariat",
    completedYear: "2023",
    complianceRatio: "10-Year Severe Weather Rating Passed",
    description: "Integrated drainage network built using high-strength precast concrete to handle regional monsoonal precipitation rates safely.",
    status: "Completed"
  },
  {
    id: "proj-8",
    title: "High-Load Structural Slab Engineering",
    category: "Structural Design",
    location: "Manila",
    image: "/assets/images/blueprint_cad_1780503663960.png",
    scope: "Finite element shear evaluation drawings, rebar grid designs, heavy slab structural modeling, and strict compliance certification.",
    client: "Metropolitan Central Plaza",
    completedYear: "2023",
    complianceRatio: "Direct Structural Engineering Stamp Executed",
    description: "Calculated structural distribution model enabling heavy vehicle loading parking decks to sit safely above high-span retail units.",
    status: "Completed"
  }
];

// Default Testimonials
const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "cl-1",
    quote: "J/G Construction Services brought unmatched clarity to our commercial development project. Their structural solutions saved us weeks on the timeline.",
    author: "Robert Vance",
    role: "Project Director",
    organization: "Corporate Logistics Group",
    stars: 5
  },
  {
    id: "cl-2",
    quote: "Professional, precise, and completely transparent. The site management team maintained a spotless safety record throughout construction.",
    author: "Elena Rostova",
    role: "Operations Head",
    organization: "Urban Infrastructure Alliance",
    stars: 5
  },
  {
    id: "cl-3",
    quote: "Their value engineering phase cut down material waste significantly while strengthening the overall design integrity. Absolute masterclass.",
    author: "Marcus Aurelius",
    role: "Lead Architect",
    organization: "Nexus Architectural Syndicate",
    stars: 5
  }
];

// Default Leads
const DEFAULT_LEADS: Lead[] = [
  {
    id: "lead-1",
    fullName: "Arthur Pendragon",
    companyEmail: "arthur@excalibur.org",
    phone: "+63 (0915) 777-1234",
    projectScope: "Need structural calculations and wet-seal drafting templates for an industrial hangar revamp in Cavite.",
    timestamp: "2026-06-20T10:30:00Z",
    status: "Pending"
  },
  {
    id: "lead-2",
    fullName: "Sarah Connor",
    companyEmail: "sconnor@cyberdyne.corp",
    phone: "+63 (0921) 888-4321",
    projectScope: "Seismic retrofitting evaluation of reinforced concrete columns and load transfer structures.",
    timestamp: "2026-06-21T14:15:00Z",
    status: "Reviewed"
  }
];

// Default Services Detail
const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "ser-1",
    title: "Architectural Planning & Drafting",
    tagline: "Excellent Workmanship & Aesthetic Space Utilization",
    description: "Detailed space planning, custom office/residence structural layouts, custom architectural renderings, and drafting tailored to total client satisfaction. We ensure spatial efficiency meets complete functional expectations.",
    image: "/assets/images/about_construction_site_1780503065020.png",
    metric: "100%",
    metricLabel: "Client Satisfaction Approval on Drafting Concepts",
    scopeItems: [
      "Bespoke schematic spatial design and interior layout drafting.",
      "3D model architectural renderings and visualization structures.",
      "Space utilization surveys to maximize square footage and layout efficiency.",
      "Detailed CAD elevation drawings and regulatory zoning documentation."
    ]
  },
  {
    id: "ser-2",
    title: "Interior Fit-Out & Finishing Works",
    tagline: "Premium Quality Finishings for Commercial & Corporate Spaces",
    description: "High-grade finishing, custom partition walls, false ceilings, architectural trims, surface detailing, and cabinetry designed with exacting structural standards to ensure beautiful and durable interiors.",
    image: "/assets/images/commercial_fitout_1780503646291.png",
    metric: "45 Days",
    metricLabel: "Average Completion Timeline for Corporate Store Outlets",
    scopeItems: [
      "Drywall framing, acoustical partition structures, and decorative columns.",
      "Acoustical false ceilings, raised floor tiling, and tailored carpentry.",
      "Premium painting, custom wood veneer application, and surface treatments.",
      "Final fit-out inspections, equipment mounting, and detailing schedules."
    ]
  },
  {
    id: "ser-3",
    title: "General Building Renovation",
    tagline: "Transformative Modernizations & Extension Architectures",
    description: "Modernizing corporate spaces and private residences. We execute structural repairs, spatial extensions, structural load transfers, and facade renovations to renew functional utilities without safety compromise.",
    image: "/assets/images/commercial_development_1780500228422.png",
    metric: "₱0.00",
    metricLabel: "Unapproved Budget Spillover in Scope Upgrades",
    scopeItems: [
      "Complete electrical/plumbing strip-outs and safe load-bearing transfers.",
      "Structural floor mezzanine installations and safety staircases.",
      "Modern facade cladding, exterior sealant works, and waterproofing coatings.",
      "Structural rehabilitation of aging columns and historical elements."
    ]
  },
  {
    id: "ser-4",
    title: "Civil Works & Site Infrastructure",
    tagline: "High-Grade Earthworks, Roads & Demarcations",
    description: "Heavy site layout grading, site volume clearing, robust drainage pipes, concrete roadways, and retaining systems designed for regional slope and soil stability.",
    image: "/assets/images/civil_infrastructure_1780500263690.png",
    metric: "Factor Safety >= 1.5",
    metricLabel: "Soil Shear Safety Factor and Slope Stability Margin",
    scopeItems: [
      "Site volumetric balancing analysis and heavy earthworks grading.",
      "Storm drainage arrays, precast concrete box culverts, and channels.",
      "Concrete road networks, industrial parking spaces, and site paving.",
      "Slope erosion protection walls, bio-engineering layers, and soil checks."
    ]
  },
  {
    id: "ser-5",
    title: "Structural Engineering & Design",
    tagline: "Uncompromising Concrete & Structural Steel Computations",
    description: "Rigid calculation models under building codes, structural steel truss detailing, finite element shear load analysis, and seismic stability guarantees to prevent structural vulnerabilities.",
    image: "/assets/images/field_excellence_operations_1780503096054.png",
    metric: "100%",
    metricLabel: "Calculation Success Rate on Initial Building Permit Reviews",
    scopeItems: [
      "Finite element calculations (FEA) and dynamic seismic shear-wall designs.",
      "Concrete framing computations, tie-bar details, and beam loads.",
      "Structural steel roof truss detailing, connection plates, and welding QA.",
      "Rigid wind-tunnel load computations and roof load distributions."
    ]
  },
  {
    id: "ser-6",
    title: "Foundations & Concrete Works",
    tagline: "Monolithic Foundations & Subgrade Stability Checking",
    description: "Ensuring structural permanence with monolithic slab pours, high-PSI concrete column pouring, soil suitability check, piling, and footing integrity certifications.",
    image: "/assets/images/rebar_foundation_1780503628161.png",
    metric: "f'_c ≥ Spec",
    metricLabel: "Concrete Strength Verification Curing Compliance Rate",
    scopeItems: [
      "High-strength monolithic footing pours and foundation mat setups.",
      "Deep micropiling checks, concrete grade beams, and retaining walls.",
      "Reinforcing steel rebar schedules and continuous on-site civil checkouts.",
      "Standard concrete cylinder specimen casting and 28-day compression checks."
    ]
  },
  {
    id: "ser-7",
    title: "Electrical Systems Engineering",
    tagline: "Safe Power Distribution Paneling & Feeds",
    description: "Comprehensive electrical network design and installation. We craft distribution panel layouts, safe conduits and wire runs, lighting circuits, and emergency power setups.",
    image: "/assets/images/industrial_retrofit_1780500246965.png",
    metric: "0",
    metricLabel: "On-Site Mechanical-Electrical Clashes during execution",
    scopeItems: [
      "Balanced power panel layouts and circuit load calculations.",
      "Fire-rated conduit paths and electrical riser configurations.",
      "Energy-efficient indoor/outdoor industrial lighting distribution networks.",
      "Auxiliary system integration, fire detection alerts, and CCTV setups."
    ]
  },
  {
    id: "ser-8",
    title: "Plumbing & Sanitary Engineering",
    tagline: "Hygienic Waste Piping & Pressure Clean Water Loops",
    description: "Expert design and plumbing layout execution. We plan sanitary vents, booster-fed clean water networks, storm rooftop drainage downspouts, and high-efficiency sanitary fixtures installation.",
    image: "/assets/images/commercial_fitout_1780503646291.png",
    metric: "100%",
    metricLabel: "Hydrostatic Static Water Piping Defect-Free Pass Rate",
    scopeItems: [
      "Sewer connection line configurations and sanitary building vents.",
      "Thermal-welded PPR piping channels for safe domestic water loops.",
      "Rooftop drainage downspouts, collectors, and grease interceptors.",
      "High-efficiency sanitary fixtures installation and plumbing insulation."
    ]
  }
];

const DEFAULT_HISTORICAL_RECORDS: HistoricalRecord[] = [
  {
    id: "2026-05",
    label: "May 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 4,
    dataPoints: [14, 19, 11, 23],
    totalLeads: 67
  },
  {
    id: "2026-04",
    label: "April 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 3,
    dataPoints: [10, 15, 18, 12],
    totalLeads: 55
  },
  {
    id: "2026-03",
    label: "March 2026",
    type: "MONTHLY",
    year: 2026,
    monthIndex: 2,
    dataPoints: [8, 12, 14, 16],
    totalLeads: 50
  },
  {
    id: "2025-fiscal",
    label: "2025 Fiscal Year",
    type: "YEARLY",
    year: 2025,
    dataPoints: [12, 15, 18, 22, 25, 20, 24, 28, 30, 26, 24, 29],
    totalLeads: 273
  },
  {
    id: "2024-fiscal",
    label: "2024 Fiscal Year",
    type: "YEARLY",
    year: 2024,
    dataPoints: [10, 11, 14, 15, 18, 16, 19, 21, 20, 18, 17, 22],
    totalLeads: 201
  }
];

// Helper to check if running in browser
const isClient = typeof window !== 'undefined';

export const dataStore = {
  // PROJECTS CRUD
  getProjects(includeDeleted = false): Project[] {
    if (!isClient) return DEFAULT_PROJECTS;
    const raw = localStorage.getItem('jg_projects');
    if (!raw) {
      localStorage.setItem('jg_projects', JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    let projects: Project[] = JSON.parse(raw);
    
    // Auto-migrate stale path prefixes to "/assets/images/"
    let migrated = false;
    const cleanPath = (pStr: string | undefined): string | undefined => {
      if (!pStr) return pStr;
      let cleaned = pStr;
      if (cleaned.startsWith('/src/assets/images/')) {
        cleaned = cleaned.replace('/src/assets/images/', '/assets/images/');
      } else if (cleaned.startsWith('src/assets/images/')) {
        cleaned = '/' + cleaned.replace('src/assets/images/', 'assets/images/');
      } else if (cleaned.startsWith('/public/assets/images/')) {
        cleaned = cleaned.replace('/public/assets/images/', '/assets/images/');
      } else if (cleaned.startsWith('public/assets/images/')) {
        cleaned = '/' + cleaned.replace('public/assets/images/', 'assets/images/');
      } else if (cleaned.startsWith('assets/images/')) {
        cleaned = '/' + cleaned;
      }
      return cleaned;
    };

    projects = projects.map(p => {
      let pMigrated = false;
      const img = cleanPath(p.image);
      if (img !== p.image) {
        pMigrated = true;
      }
      let imgs = p.images || [];
      if (imgs.length > 0) {
        const cleanedImgs = imgs.map(item => cleanPath(item) || '');
        if (JSON.stringify(cleanedImgs) !== JSON.stringify(imgs)) {
          imgs = cleanedImgs;
          pMigrated = true;
        }
      }
      if (pMigrated) {
        migrated = true;
        return { ...p, image: img || '', images: imgs };
      }
      return p;
    });

    if (migrated) {
      localStorage.setItem('jg_projects', JSON.stringify(projects));
    }

    return includeDeleted ? projects : projects.filter(p => !p.isDeleted);
  },

  getProjectById(id: string): Project | undefined {
    return this.getProjects(true).find(p => p.id === id);
  },

  saveProject(project: Project): void {
    if (!isClient) return;
    const projects = this.getProjects(true);
    const index = projects.findIndex(p => p.id === project.id);
    const updatedProject = { ...project, updatedAt: Date.now() };
    if (index >= 0) {
      projects[index] = updatedProject;
    } else {
      projects.unshift(updatedProject);
    }
    localStorage.setItem('jg_projects', JSON.stringify(projects));
    supabaseSync.pushProject(updatedProject);
  },

  async deleteProjectSoft(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true);
    const index = projects.findIndex(p => p.id === id);
    if (index >= 0) {
      projects[index].isDeleted = true;
      localStorage.setItem('jg_projects', JSON.stringify(projects));
      await supabaseSync.pushProject(projects[index]);
    }
  },

  async restoreProject(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true);
    const index = projects.findIndex(p => p.id === id);
    if (index >= 0) {
      projects[index].isDeleted = false;
      localStorage.setItem('jg_projects', JSON.stringify(projects));
      await supabaseSync.pushProject(projects[index]);
    }
  },

  async hardDeleteProject(id: string): Promise<void> {
    if (!isClient) return;
    const projects = this.getProjects(true).filter(p => p.id !== id);
    localStorage.setItem('jg_projects', JSON.stringify(projects));
    await supabaseSync.deleteProject(id);
  },

  // TESTIMONIALS CRUD
  getTestimonials(includeDeleted = false): TestimonialItem[] {
    if (!isClient) return DEFAULT_TESTIMONIALS;
    const raw = localStorage.getItem('jg_testimonials');
    if (!raw) {
      localStorage.setItem('jg_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    const testimonials: (TestimonialItem & { isDeleted?: boolean })[] = JSON.parse(raw);
    return includeDeleted ? testimonials : testimonials.filter(t => !t.isDeleted);
  },

  saveTestimonial(testimonial: TestimonialItem & { isDeleted?: boolean }): void {
    if (!isClient) return;
    const testimonials = this.getTestimonials(true);
    const index = testimonials.findIndex(t => t.id === testimonial.id);
    if (index >= 0) {
      testimonials[index] = testimonial;
    } else {
      testimonials.push(testimonial);
    }
    localStorage.setItem('jg_testimonials', JSON.stringify(testimonials));
    supabaseSync.pushTestimonial(testimonial);
  },

  async deleteTestimonialSoft(id: string): Promise<void> {
    if (!isClient) return;
    const testimonials = this.getTestimonials(true);
    const index = testimonials.findIndex(t => t.id === id);
    if (index >= 0) {
      (testimonials[index] as any).isDeleted = true;
      localStorage.setItem('jg_testimonials', JSON.stringify(testimonials));
      await supabaseSync.pushTestimonial(testimonials[index]);
    }
  },

  async restoreTestimonial(id: string): Promise<void> {
    if (!isClient) return;
    const testimonials = this.getTestimonials(true);
    const index = testimonials.findIndex(t => t.id === id);
    if (index >= 0) {
      (testimonials[index] as any).isDeleted = false;
      localStorage.setItem('jg_testimonials', JSON.stringify(testimonials));
      await supabaseSync.pushTestimonial(testimonials[index]);
    }
  },

  async hardDeleteTestimonial(id: string): Promise<void> {
    if (!isClient) return;
    const testimonials = this.getTestimonials(true).filter(t => t.id !== id);
    localStorage.setItem('jg_testimonials', JSON.stringify(testimonials));
    await supabaseSync.deleteTestimonial(id);
  },

  // LEADS (Inbound Data capture) CRUD
  getLeads(includeDeleted = false): Lead[] {
    if (!isClient) return DEFAULT_LEADS;
    const raw = localStorage.getItem('jg_leads');
    if (!raw) {
      localStorage.setItem('jg_leads', JSON.stringify(DEFAULT_LEADS));
      return DEFAULT_LEADS;
    }
    const leads: Lead[] = JSON.parse(raw);
    return includeDeleted ? leads : leads.filter(l => !l.isDeleted);
  },

  addLead(lead: Omit<Lead, 'id' | 'timestamp' | 'status'>): Lead {
    const leads = this.getLeads(true);
    const newLead: Lead = {
      ...lead,
      id: 'lead-' + Date.now(),
      timestamp: new Date().toISOString(),
      status: 'Pending'
    };
    leads.unshift(newLead);
    if (isClient) {
      localStorage.setItem('jg_leads', JSON.stringify(leads));
      supabaseSync.pushLead(newLead);
    }
    return newLead;
  },

  updateLeadStatus(id: string, status: 'Pending' | 'Reviewed' | 'Archived'): void {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].status = status;
      localStorage.setItem('jg_leads', JSON.stringify(leads));
      supabaseSync.pushLead(leads[index]);
    }
  },

  async deleteLeadSoft(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].isDeleted = true;
      localStorage.setItem('jg_leads', JSON.stringify(leads));
      await supabaseSync.pushLead(leads[index]);
    }
  },

  async restoreLead(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true);
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].isDeleted = false;
      localStorage.setItem('jg_leads', JSON.stringify(leads));
      await supabaseSync.pushLead(leads[index]);
    }
  },

  async hardDeleteLead(id: string): Promise<void> {
    if (!isClient) return;
    const leads = this.getLeads(true).filter(l => l.id !== id);
    localStorage.setItem('jg_leads', JSON.stringify(leads));
    await supabaseSync.deleteLead(id);
  },

  // SERVICES CRUD
  getServices(): ServiceItem[] {
    if (!isClient) return DEFAULT_SERVICES;
    const raw = localStorage.getItem('jg_services');
    if (!raw) {
      localStorage.setItem('jg_services', JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    const parsed = JSON.parse(raw);
    if (parsed.length < DEFAULT_SERVICES.length) {
      localStorage.setItem('jg_services', JSON.stringify(DEFAULT_SERVICES));
      return DEFAULT_SERVICES;
    }
    return parsed;
  },

  saveService(service: ServiceItem): void {
    if (!isClient) return;
    const services = this.getServices();
    const index = services.findIndex(s => s.id === service.id);
    if (index >= 0) {
      services[index] = service;
    } else {
      services.push(service);
    }
    localStorage.setItem('jg_services', JSON.stringify(services));
    supabaseSync.pushService(service);
  },

  getHistoricalRecords(): HistoricalRecord[] {
    if (!isClient) return DEFAULT_HISTORICAL_RECORDS;
    const raw = localStorage.getItem('jg_historical_records');
    if (!raw) {
      localStorage.setItem('jg_historical_records', JSON.stringify(DEFAULT_HISTORICAL_RECORDS));
      return DEFAULT_HISTORICAL_RECORDS;
    }
    return JSON.parse(raw);
  },

  saveHistoricalRecord(record: HistoricalRecord): void {
    if (!isClient) return;
    const records = this.getHistoricalRecords();
    const index = records.findIndex(r => r.id === record.id);
    if (index >= 0) {
      records[index] = record;
    } else {
      records.push(record);
    }
    localStorage.setItem('jg_historical_records', JSON.stringify(records));
    supabaseSync.pushHistoricalRecord(record);
  },

  getLeadsMetricsForMonth(year: number, monthIndex: number): number[] {
    const leads = this.getLeads(true);
    const basePoints = [0, 0, 0, 0];
    const monthPrefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const monthlyLeads = leads.filter(l => !l.isDeleted && l.timestamp.startsWith(monthPrefix));
    
    monthlyLeads.forEach(lead => {
      const day = new Date(lead.timestamp).getDate();
      if (day <= 7) basePoints[0]++;
      else if (day <= 14) basePoints[1]++;
      else if (day <= 21) basePoints[2]++;
      else basePoints[3]++;
    });
    return basePoints;
  },

  checkAndApplyRollover(): void {
    if (!isClient) return;
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const lastActiveMonth = localStorage.getItem('jg_last_active_month');

    if (lastActiveMonth && lastActiveMonth !== currentMonthKey) {
      const [lastYear, lastMonth] = lastActiveMonth.split('-').map(Number);
      const monthIndex = lastMonth - 1;
      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      
      const dataPoints = this.getLeadsMetricsForMonth(lastYear, monthIndex);
      const totalLeads = dataPoints.reduce((a, b) => a + b, 0);

      const archivedRecord: HistoricalRecord = {
        id: lastActiveMonth,
        label: `${monthNames[monthIndex]} ${lastYear}`,
        type: 'MONTHLY',
        year: lastYear,
        monthIndex: monthIndex,
        dataPoints: dataPoints,
        totalLeads: totalLeads
      };

      this.saveHistoricalRecord(archivedRecord);
    }
    
    localStorage.setItem('jg_last_active_month', currentMonthKey);
  }
};
