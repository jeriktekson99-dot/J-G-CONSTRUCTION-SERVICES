import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ServiceDetailPage from './ServiceDetailPage';
import { 
  X, 
  CheckCircle2, 
  Settings, 
  TrendingUp, 
  HardHat, 
  Activity, 
  MapPin, 
  Sliders, 
  HelpCircle,
  Hash,
  ArrowRight
} from 'lucide-react';

interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  metric: string;
  metricLabel: string;
  scopeItems: string[];
  equation?: string;
  equationDesc?: string;
}

interface ServicesPageProps {
  onScrollToSection: (id: string) => void;
}

export default function ServicesPage({ onScrollToSection }: ServicesPageProps) {
  const servicesList: ServiceDetail[] = [
    {
      id: "ser-1",
      title: "Architectural Planning & Drafting",
      tagline: "Excellent Workmanship & Aesthetic Space Utilization",
      description: "Detailed space planning, custom office/residence structural layouts, custom architectural renderings, and drafting tailored to total client satisfaction. We ensure spatial efficiency meets complete functional expectations.",
      image: "/src/assets/images/about_construction_site_1780503065020.png",
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
      image: "/src/assets/images/commercial_fitout_1780503646291.png",
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
      image: "/src/assets/images/commercial_development_1780500228422.png",
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
      image: "/src/assets/images/civil_infrastructure_1780500263690.png",
      metric: "F_s ≥ 1.5",
      metricLabel: "Soil Shear Safety Factor and Slope Stability Margin",
      scopeItems: [
        "Site volumetric balancing analysis and heavy earthworks grading.",
        "Storm drainage arrays, precast concrete box culverts, and channels.",
        "Concrete road networks, industrial parking spaces, and site paving.",
        "Slope erosion protection walls, bio-engineering layers, and soil checks."
      ],
      equation: "F_s = ∑τ_f / ∑τ_d",
      equationDesc: "Standard safety factor ratio evaluating soil shearing threshold against applied downforce shear patterns."
    },
    {
      id: "ser-5",
      title: "Structural Engineering & Design",
      tagline: "Uncompromising Concrete & Structural Steel Computations",
      description: "Rigid calculation models under building codes, structural steel truss detailing, finite element shear load analysis, and seismic stability guarantees to prevent structural vulnerabilities.",
      image: "/src/assets/images/field_excellence_operations_1780503096054.png",
      metric: "100%",
      metricLabel: "Calculation Success Rate on Initial Building Permit Reviews",
      scopeItems: [
        "Finite element calculations (FEA) and dynamic seismic shear-wall designs.",
        "Concrete framing computations, tie-bar details, and beam loads.",
        "Structural steel roof truss detailing, connection plates, and welding QA.",
        "Rigid wind-tunnel load computations and roof load distributions."
      ],
      equation: "M_u ≤ ɸ M_n",
      equationDesc: "In accordance with standard load resistance factor design criteria. Ultimate bending moment must remain strictly beneath nominal resistance capacity."
    },
    {
      id: "ser-6",
      title: "Foundations & Concrete Works",
      tagline: "Monolithic Foundations & Subgrade Stability Checking",
      description: "Ensuring structural permanence with monolithic slab pours, high-PSI concrete column pouring, soil shear suitability check, piling, and footing integrity certifications.",
      image: "/src/assets/images/rebar_foundation_1780503628161.png",
      metric: "f'_c ≥ Spec",
      metricLabel: "Concrete Strength Verification Curing Compliance Rate",
      scopeItems: [
        "High-strength monolithic footing pours and foundation mat setups.",
        "Deep micropiling checks, concrete grade beams, and retaining walls.",
        "Reinforcing steel rebar schedules and continuous on-site civil checkouts.",
        "Standard concrete cylinder specimen casting and 28-day compression checks."
      ],
      equation: "f'_c ≥ Specified PSI",
      equationDesc: "Core concrete structural validation checks; field testing standard cylinders at strict 7, 14, and 28-day curing points."
    },
    {
      id: "ser-7",
      title: "Electrical Systems Engineering",
      tagline: "Safe Power Distribution Paneling & Feeds",
      description: "Comprehensive electrical network design and installation. We craft distribution panel layouts, safe conduits and wire runs, lighting circuits, and emergency power setups.",
      image: "/src/assets/images/industrial_retrofit_1780500246965.png",
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
      image: "/src/assets/images/commercial_fitout_1780503646291.png",
      metric: "100%",
      metricLabel: "Hydrostatic Static Water Piping Defect-Free Pass Rate",
      scopeItems: [
        "Sewer connection line configurations and sanitary building vents.",
        "Thermal-welded PPR piping channels for safe domestic water loops.",
        "Rooftop drainage downspouts, collectors, and grease interceptors.",
        "High-efficiency sanitary fixtures installation and plumbing insulation."
      ]
    },
    {
      id: "ser-9",
      title: "Pre-Construction & Estimates",
      tagline: "Maximize Client Equity via Value Cost Engineering",
      description: "Accurate material takeoffs, design checks to minimize waste, detailed bidding, and transparent pricing. We provide customers with an adequate explanation of our bid.",
      image: "/src/assets/images/blueprint_cad_1780503663960.png",
      metric: "-15%",
      metricLabel: "Average Client Baseline Budget Outlay Restructuring",
      scopeItems: [
        "Thorough material takeoffs and exact quantities structural calculations.",
        "Cost estimation schedules matching specified milestones on tight budgets.",
        "Value engineering alternatives to satisfy architects and structural engineers.",
        "Feasibility checks, soil suitable profiles, and municipal permits review."
      ],
      equation: "V_E Ratio = Performance / Cost",
      equationDesc: "Mathematical model assessing that function remains equivalent or exceeds target constraints while minimizing direct project cost."
    }
  ];

  return (
    <div className="bg-white pt-24 pb-0 text-[#111111]">
      
      {/* SERVICES HERO HEADER */}
      <section className="relative py-14 border-b border-black overflow-hidden bg-gray-50">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/src/assets/images/blueprint_cad_1780503663960.png" 
            alt="Services specifications background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-[#1B49B8] uppercase tracking-widest">
                  OUR CAPABILITIES // DETAILED SPECIFICATIONS
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                Our Services
              </h1>
              <p className="font-mono text-xs text-gray-500 mt-2 uppercase tracking-wide">
                Comprehensive technical scope, key performance benchmarks, and mathematical delivery equations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE SPECIFICATIONS & SERVICES LIST */}
      <section className="py-16 bg-white" id="services-view">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="space-y-12">
            {servicesList.map((service, idx) => (
              <div 
                key={service.id}
                className="border-2 border-black bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#1B49B8] transition-all duration-300 text-left relative flex flex-col space-y-8 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8 rounded-none"
              >
                {/* Left Side: General Info & Performance Metric */}
                <div className="lg:col-span-6 flex flex-col justify-between">
                  <div>
                    {/* Index designation */}
                    <div className="font-mono text-[10px] text-gray-500 font-extrabold uppercase tracking-widest mb-2.5 flex items-center gap-2">
                      <span className="bg-black text-white px-2 py-0.5">CAPABILITY // 0{idx + 1}</span>
                      <span className="text-[#D41D1D]">// CORE_VERIFIED</span>
                    </div>

                    <h3 className="font-display font-black text-px sm:text-2xl lg:text-3xl text-black uppercase tracking-tight mb-2">
                      {service.title}
                    </h3>

                    <p className="font-mono text-xs font-bold text-industrial-red uppercase tracking-wider mb-4 leading-normal">
                      {service.tagline}
                    </p>

                    <p className="font-sans text-sm sm:text-base text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>


                </div>

                {/* Right Side: Execution Scope Checkpoints */}
                <div className="lg:col-span-6 border-t-2 border-dashed border-gray-200 pt-8 lg:border-t-0 lg:pt-0 lg:border-l-2 lg:border-dashed lg:pl-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="font-mono text-[10px] text-gray-500 font-extrabold tracking-widest uppercase block">// DELIVERABLE MATRIX BLUEPRINT</span>
                    <ul className="space-y-3.5">
                      {service.scopeItems.map((item, key) => (
                        <li key={key} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700 leading-relaxed">
                          <span className="flex-shrink-0 w-5 h-5 rounded-none border border-black bg-emerald-50 text-emerald-600 flex items-center justify-center font-mono text-[11px] font-black mt-0.5">
                            ✓
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Industrial Signature */}
                  <div className="pt-6 font-mono text-[9px] text-gray-400 flex items-center justify-between border-t border-gray-100 mt-8">
                    <span>SECTOR_VERIFY // SRV-0{idx + 1}</span>
                    <span className="text-[#1B49B8] font-bold">// COMPLIANCE CHECKED ✔</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BOTTOM CALL TO ACTION (CTA) */}
      <section className="bg-white py-16 border-t border-black relative overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/src/assets/images/blueprint_cad_1780503663960.png" 
            alt="Ready to work together background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.25] grayscale select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="max-w-3xl">
            
            {/* Column Text */}
            <div>
              <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-2">
                LET'S PARTNER // ESTIMATE REVIEW
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight uppercase">
                Ready to work together?
              </h2>
            </div>

            {/* Actions (Buttons placed below the statement of information) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={() => onScrollToSection('consultation')}
                className="inline-flex items-center justify-center bg-industrial-red hover:bg-[#B31717] text-white font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] cursor-pointer w-full sm:w-auto"
              >
                Get Started Now
              </button>
              <button
                onClick={() => onScrollToSection('services-view')}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                Back To Top
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
