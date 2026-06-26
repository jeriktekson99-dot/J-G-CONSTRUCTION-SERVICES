import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Warehouse, 
  School, 
  Home as HomeIcon, 
  Wrench, 
  Layers, 
  Hammer, 
  FolderGit, 
  TrendingUp, 
  ShieldAlert, 
  Clock, 
  Award, 
  Zap, 
  Briefcase, 
  CornerDownRight, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Paintbrush,
  Compass,
  Droplets,
  X,
  ZoomIn,
  Activity,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface AboutProps {
  onScrollToSection: (id: string) => void;
}

export default function About({ onScrollToSection }: AboutProps) {
  // Section 2 Sectors of Operation Grid Items (ARCHITECTURAL, CIVIL, STRUCTURAL, ELECTRICAL & PLUMBING)
  const sectors = [
    {
      id: "ser-1",
      title: "Architectural Planning & Drafting",
      icon: Compass,
      accent: "border-t-4 border-t-industrial-red",
      scope: "Bespoke schematic spatial design, custom layouts, 3D renderings, and precise CAD elevations."
    },
    {
      id: "ser-2",
      title: "Interior Fit-Out & Finishing",
      icon: Paintbrush,
      accent: "border-t-4 border-t-engineering-blue",
      scope: "Drywall partition structures, acoustical false ceilings, raised floor tiling, and custom carpentry."
    },
    {
      id: "ser-3",
      title: "General Building Renovation",
      icon: Activity,
      accent: "border-t-4 border-t-industrial-red",
      scope: "Corporate office modernizations, load-bearing transfers, facade cladding, and structural repairs."
    },
    {
      id: "ser-4",
      title: "Civil Works & Infrastructure",
      icon: MapPin,
      accent: "border-t-4 border-t-engineering-blue",
      scope: "Heavy site layout grading, volumetric balancing, storm drainage channels, and concrete roads."
    },
    {
      id: "ser-5",
      title: "Structural Engineering & Design",
      icon: Building2,
      accent: "border-t-4 border-t-industrial-red",
      scope: "Finite element load modeling, dynamic seismic design, roof truss shop details, and wind computations."
    },
    {
      id: "ser-6",
      title: "Foundations & Concrete Works",
      icon: Layers,
      accent: "border-t-4 border-t-engineering-blue",
      scope: "Monolithic concrete mat footings, subgrade suitability profiling, pile caps, and curing audits."
    },
    {
      id: "ser-7",
      title: "Electrical Systems Engineering",
      icon: Zap,
      accent: "border-t-4 border-t-industrial-red",
      scope: "Balanced power panel calculations, fire-rated conduit runs, auxiliary systems, and riser schemes."
    },
    {
      id: "ser-8",
      title: "Plumbing & Sanitary Engineering",
      icon: Droplets,
      accent: "border-t-4 border-t-engineering-blue",
      scope: "Thermal PPR domestic water loops, sanitary stack venting, grease interceptors, and storm drainage."
    }
  ];

  // Section 5 Core Values Stack
  const values = [
    {
      num: "01",
      title: "Competence",
      desc: "We entrust our engineering projects to engineers who have exhibited solid experience in the field, and thus know the intricacies of preparing and completing the job within the specified timetables.",
      bulletColor: "bg-industrial-red"
    },
    {
      num: "02",
      title: "Transparency",
      desc: "We give the customer an adequate explanation of our bid, and try to give them as much value for their money as possible.",
      bulletColor: "bg-[#1B49B8]"
    },
    {
      num: "03",
      title: "Dependability",
      desc: "We do not promise more than we can deliver. When we make a commitment to complete work on a specific deadline we do so unless there is an impediment which is beyond our control.",
      bulletColor: "bg-black"
    },
    {
      num: "04",
      title: "Quality Orientation",
      desc: "We make sure we follow the specifications of the architect and structural engineers and consultants unless we can recommend alternatives to the satisfaction of customer through value engineering.",
      bulletColor: "bg-industrial-red"
    }
  ];

  const founders = [
    {
      name: "Engr. Gregorio A. Lacay",
      role: "Founder & General Manager",
      tag: "FOUNDER",
      image: "/assets/images/leadership_j_santos_portrait_1780503110023.png",
      bio: "Engr. Lacay recently founded J/G Construction Services to realize his dream of providing architectural, structural, and civil works through excellent workmanship. With extensive professional experience and a tradition of integrity and excellence, he guides our design and finishing teams with solid expertise."
    },
    {
      name: "Arch. G. Reyes, UAP",
      role: "Senior Architectural & Interior Fit-Out Lead",
      tag: "KEY PROFESSIONAL",
      image: "/assets/images/leadership_g_reyes_portrait_1780763344158.png",
      bio: "A multi-disciplined professional with over a decade of career involvement in engineering and construction. Arch. Reyes specializes in architectural, finishing, renovation, and interior fit-out design, assuring total client satisfaction."
    },
    {
      name: "Engr. E. Mendoza, PEE",
      role: "Senior MEP (Electrical & Plumbing) Engineer",
      tag: "KEY PROFESSIONAL",
      image: "/assets/images/leadership_e_tan_portrait_1780763363499.png",
      bio: "With over a decade of career involvement in engineering, Engr. Mendoza oversees complex electrical, plumbing, and mechanical works, aligning design plans with high technical requirements and on-time delivery constraints."
    }
  ];

  const [activeFounderIdx, setActiveFounderIdx] = React.useState(0);

  const [cert2ImageIdx, setCert2ImageIdx] = React.useState(0);

  const certs = [
    {
      id: "cert-1",
      badge: "PCAB LICENSE",
      title: "Category A Contractor Licence",
      desc: "Licensed under the Philippine Contractors Accreditation Board to execute comprehensive civil, structural, electrical, and plumbing engineering works nationwide.",
      image: "https://lh3.googleusercontent.com/d/1tfZiq3pKzCAjXlYb89iOpFgjZfkAy9jW"
    },
    {
      id: "cert-2",
      badge: "ASEP MEMBER",
      title: "Structural Engineering Code Compliance",
      desc: "Design and engineering computations rigorously generated to withstand severe typhonic forces up to 280 KPH & regional seismic criteria under the NSCP.",
      images: [
        "https://lh3.googleusercontent.com/d/1VpI7qILnvcJ9cueiD8oPkrmKT929ucNB",
        "https://lh3.googleusercontent.com/d/1GzWpu0yt08ADJ0xXyocvYdcJKkR4rzaV"
      ]
    },
    {
      id: "cert-3",
      badge: "PEZA REGISTERED",
      title: "Accredited Economic Zone Contractor",
      desc: "Duly registered contractor authorized to carry out high-standard factory engineering, structural refits, and commercial fitouts inside Economic Zones.",
      image: "https://lh3.googleusercontent.com/d/1-HKTbtak1SZ7_RUwP0wjMvfx55fuycND"
    },
    {
      id: "cert-4",
      badge: "OSH & MEP COMPLIANT",
      title: "Safety Clearance & Systems Standard",
      desc: "Construction Safety and Health Program fully verified by DOLE, alongside complete plumbing, mechanical, and electrical structural standard certifications.",
      image: "https://lh3.googleusercontent.com/d/1EbzW6f4L4fyg0lh-Pw4Rvn4cZ0Misg8L"
    }
  ];

  const [selectedCert, setSelectedCert] = React.useState<any | null>(null);

  const prevFounder = () => {
    setActiveFounderIdx((prev) => (prev === 0 ? founders.length - 1 : prev - 1));
  };

  const nextFounder = () => {
    setActiveFounderIdx((prev) => (prev === founders.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white pt-24 pb-0 text-[#111111]">
      
      {/* PAGE HERO HEADER */}
      <section className="relative py-14 border-b border-black overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/images/about_construction_site_1780503065020.png" 
            alt="About J/G J/G site operations" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 text-left">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-industrial-red uppercase tracking-widest">
                  WHO WE ARE // EXCELLENT WORKMANSHIP
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                ABOUT OUR FIRM
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 0.5: OUR ORIGINS */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Text */}
            <div className="lg:col-span-6 text-left">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-3">
                OUR ORIGINS // FOUNDED BY ENGR. GREGORIO A. LACAY
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-tight mb-6">
                Specialized Craftsmanship.<br/>Built on a Foundation of Trust.
              </h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6">
                Founded by <strong>Engr. Gregorio A. Lacay</strong>, <strong>J/G Construction Services</strong> is a dynamic new entrant in the construction and engineering industry, driven by a strict commitment to quality, integrity, and exceptional workmanship. Backed by solid professional experience, the firm delivers dependable building and engineering solutions—including general construction, civil works, renovation, and interior fit-outs—across corporate offices, retail outlets, and residential units.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 font-mono text-xs text-black space-y-1">
                <div className="font-bold text-engineering-blue">// INDUSTRIAL REGISTRY DETAILS</div>
                <div>FOUNDER: ENGR. GREGORIO A. LACAY</div>
                <div>SCOPE: ARCHITECTURAL, FINISHING, STRUCTURAL, ELECTRICAL & PLUMBING</div>
              </div>
            </div>

            {/* Right Column Custom Framed Image */}
            <div className="lg:col-span-6">
              <div className="border border-black p-3 bg-white shadow-[8px_8px_0px_#111111]">
                <div className="aspect-16/10 bg-gray-50 overflow-hidden border border-gray-100">
                  <img 
                    src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAE533yjB7GYRdibTnKQGBnBwcwra53uc0h4ylzc0gHl5giFGMBldYf-8JQRxKEHv_CheVBwtiQstMfIUgQv1WulXe3PJaSzOQJVb3Gd-27RFC4vdoiVlGxQF1wx-15Suxtc3wcyUsDK0q_Z=s1360-w1360-h1020-rw" 
                    alt="Founding blueprint and design concepts of J/G Services" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block" 
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span>REG_DRAFT // SEC_A</span>
                  <span>FOUNDING INTEGRITY CHARTER APPROVED [✔]</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 1: HOW WE BUILD */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column Custom Framed Image */}
            <div className="lg:col-span-6">
              <div className="border border-black p-3 bg-white shadow-[8px_8px_0px_#111111]">
                <div className="aspect-16/10 bg-gray-50 overflow-hidden border border-gray-100">
                  <img 
                    src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAEEZMoPkiHPX-7DaQKjl2gXukLBQVDueYqKL6g_k1yUpvdlt-K8Tmh405-fMtGPCtIXHXZKrC2vkGFCWc0EJknndyEgOHg-PfjiiHa7Pz5ZrpXNB2t3bC2vVYvN89bycae8zFcS3jg-DT5c=s1360-w1360-h1020-rw" 
                    alt="Active on-site J/G engineering finishing operations" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover block" 
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span>MGT_LOG_9021 // SEC_B</span>
                  <span>OPERATIONAL COMPLIANCE ESTABLISHED [✔]</span>
                </div>
              </div>
            </div>

            {/* Right Column Text */}
            <div className="lg:col-span-6 text-left">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-3">
                OUR MANAGEMENT TEAM // SOLID PROFESSIONAL BACKGROUNDS
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-black tracking-tight leading-tight mb-6">
                Expert Project Managers.<br/>Hands-On Operational Touch.
              </h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6">
                <strong>J/G Construction Services</strong> is ably supported by a team of professionals and operating managers who have solid backgrounds in construction. Our management team is comprised not only of certified professionals with prestigious corporate credentials, but also hands-on, dedicated project builders who bring a highly personal touch, extreme technical precision, and absolute structural compliance to all projects that they handle.
              </p>
              <div className="p-4 bg-gray-50 border border-gray-200 font-mono text-xs text-black space-y-1">
                <div className="font-bold text-engineering-blue">// MANAGEMENT REGISTRY</div>
                <div>KEY OFFICERS: GENERAL FOREMAN, TRADE FOREMEN, CIVIL ENGINEERS</div>
                <div>OPERATIONAL METHODOLOGY: RIGOROUS SITE VISITS & DIRECT SUPERVISION</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: WHAT WE BUILD */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-black pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div className="text-left">
              <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-1">
                Sectors of Operation
              </span>
              <h2 className="font-display font-black text-3xl text-black tracking-tight">
                Diverse Technical Expertise
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-500">
              OPERATIONAL_SPECTRUM_MATRIX // [8 KEY PILLARS]
            </div>
          </div>

          {/* 4x2 Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {sectors.map((sc, idx) => {
              const IconComp = sc.icon;
              return (
                <div 
                  key={sc.id}
                  onClick={() => onScrollToSection?.(sc.id)}
                  className={`bg-white border border-black p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[6px_6px_0px_#111111] hover:-translate-y-1 group relative cursor-pointer ${sc.accent}`}
                >
                  {/* Structural Grid lines background overlay on hover to simulate engineering charts */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-300" style={{
                    backgroundImage: 'radial-gradient(#111111 1px, transparent 1px), radial-gradient(#111111 1px, transparent 1px)',
                    backgroundSize: '12px 12px',
                    backgroundPosition: '0 0, 6px 6px'
                  }} />

                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-gray-50 border border-gray-200 text-black">
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-[10px] text-gray-400 font-bold">
                        0{idx + 1} // SYS_SVC
                      </span>
                    </div>

                    <h3 className="font-display font-extrabold text-[#111111] text-lg tracking-tight mb-2 text-left group-hover:text-industrial-red transition-colors">
                      {sc.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between font-mono text-[10px] text-black font-bold">
                    <span className="text-gray-400 group-hover:text-engineering-blue transition-colors">
                      STRUCTURAL_ASSURE_OK
                    </span>
                    <div className="flex items-center gap-1 group-hover:text-industrial-red transition-colors text-xs">
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* SECTION 4: MISSION AND VISION */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Mission Card */}
            <div className="border border-black p-8 text-left bg-white flex flex-col justify-between hover:shadow-[6px_6px_0px_#1B49B8] transition-shadow duration-300">
              <div>
                <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-4">
                  OUR MISSION // SERVICE COMMITMENT
                </span>
                <h3 className="font-display font-black text-2xl text-black mb-4">
                  Premium Construction Services
                </h3>
                <div className="font-sans text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>
                    Committed to total customer satisfaction and nation-building, we deliver premium architectural, civil, structural, electrical, and plumbing construction services on time and at competitive prices.
                  </p>
                  <p>
                    Grounded in a foundation of absolute client trust and high ethical standards, we leverage advanced technology and efficient management to maximize equity value.
                  </p>
                  <p>
                    Simultaneously, we maintain a secure, performance-driven environment where our employees are empowered to develop to their fullest potential.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-8 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span>JG_SPEC_MISSION // AUTH_A</span>
                <span>SYSTEM CORE OK</span>
              </div>
            </div>

            {/* Vision Card */}
            <div className="border border-black p-8 text-left bg-white flex flex-col justify-between hover:shadow-[6px_6px_0px_#D41D1D] transition-shadow duration-300">
              <div>
                <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-4">
                  OUR VISION // PRIMARY GOAL
                </span>
                <h3 className="font-display font-black text-2xl text-black mb-4">
                  Your Satisfaction is Our Goal
                </h3>
                <div className="font-sans text-gray-600 text-sm leading-relaxed space-y-4">
                  <p>
                    Driven by our Trust Pledge, your absolute satisfaction stands as our primary goal. We measure our ultimate success by the ongoing confidence you place in our team. Our physical engineering schedules are optimized daily to meet strict project timelines.
                  </p>
                  <p>
                    Every architectural finish is executed to align directly with your precise design vision. Material procurement is tightly managed with precision to maximize total cost-efficiency. Ultimately, we focus our entire operational capability on delivering your ideal build safely.
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-4 mt-8 flex items-center justify-between font-mono text-[10px] text-gray-400">
                <span>JG_SPEC_VISION // AUTH_B</span>
                <span>SYSTEM TARGET OK</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: OUR QUALITY POLICY */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Graphic Column */}
            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col">
              <div className="border-2 border-black p-3 bg-white shadow-[8px_8px_0px_#1B49B8] h-full flex flex-col justify-between">
                <div className="aspect-[10/11] bg-gray-50 overflow-hidden border border-gray-100 flex-1">
                  <img 
                    src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAE50VW8A_69lI06KGmt4VV1EnTtIziQWD6G9hTUifBaAewOIhfMmivyOGMHm0rGyqoL3uxvu8i5gvrvyoOXo5sEBJ-jeMIWy7M-qeRFbzGiUtlwq4wiJPDNawSgvv_Np9nIS96sRg6PrgLK=s1360-w1360-h1020-rw" 
                    alt="Inspection of on-site engineering workmanship" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-gray-500 shrink-0">
                  <span>WORKMANSHIP_ANALYSIS // CO_STAMP_F5</span>
                  <span>100% RELIABLE EXECUTION</span>
                </div>
              </div>
            </div>

            {/* Right Value Stack Column */}
            <div className="lg:col-span-7 text-left order-1 lg:order-2 flex flex-col justify-between py-1">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-3">
                OUR QUALITY POLICY // SATISFACTION EARNED
              </span>
              <h2 className="font-display font-black text-3xl text-black tracking-tight leading-tight mb-4">
                We Commit to Quality and Customer Satisfaction
              </h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6">
                Quality and customer satisfaction is not imposed but earned. We want our customers to be satisfied through the quality of our works. This sentiment can only be obtained through high standards of technical competence, performance, and compliance with all laws. We lay down the groundwork for trust through our professional handling of work commitments.
              </p>

              <div className="space-y-6">
                {values.map((v) => (
                  <div key={v.num} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="font-mono text-sm font-black text-industrial-red bg-gray-50 px-3 py-1 border border-gray-200 shrink-0">
                        {v.num}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-black mb-1.5 flex items-center gap-2">
                          {v.title}
                        </h4>
                        <p className="font-sans text-sm text-gray-600 leading-relaxed">
                          {v.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: CERTIFICATIONS AND LICENSES */}
      <section className="py-16 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-black pb-6 mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div className="text-left">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-1">
                Compliance & Licensing
              </span>
              <h2 className="font-display font-black text-3xl text-black tracking-tight">
                Certifications and Licenses
              </h2>
            </div>
            <div className="font-mono text-xs text-gray-500">
              COMPLIANCE_STANDARDS // REGISTERED_LICENSES
            </div>
          </div>

          {/* Grid Layout containing Interactive Image Gallery */}
          <div className="space-y-6 lg:space-y-8">
            {/* ROW 1: 3-column layout where image 1 is md:col-span-2, image 2 is md:col-span-1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                
              {/* ROW 1 - Item 1 (Double Width Length: equivalent of two image lengths) */}
              <div 
                onClick={() => setSelectedCert(certs[0])}
                className="col-span-1 md:col-span-2 group border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#111111] cursor-pointer transition-all duration-300 relative h-auto w-full"
              >
                <img 
                  src={certs[0].image} 
                  alt={certs[0].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto group-hover:scale-[1.02] transition-all duration-500 block"
                />
                {/* Overlay with ENLARGE text and a graphic icon */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none p-4">
                  <ZoomIn className="h-10 w-10 stroke-[2] mb-3 text-white animate-pulse" />
                  <span className="font-mono text-sm font-black tracking-widest uppercase text-white">
                    Enlarge View
                  </span>
                  <span className="font-mono text-[10px] text-gray-200 mt-1 uppercase tracking-wider text-center">
                    {certs[0].badge} // {certs[0].title}
                  </span>
                </div>
              </div>

              {/* ROW 1 - Item 2 (Normal Width - Clicking enlarges it to view slides) */}
              <div 
                onClick={() => {
                  setSelectedCert(certs[1]);
                  setCert2ImageIdx(0); // Reset to first slide when clicked
                }}
                className="col-span-1 group border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#111111] relative h-auto w-full cursor-pointer transition-all duration-300"
              >
                <img 
                  src={certs[1].images[0]} 
                  alt={certs[1].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto group-hover:scale-[1.02] transition-all duration-500 block"
                />
                {/* Overlay with ENLARGE text and a graphic icon */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none p-4">
                  <ZoomIn className="h-10 w-10 stroke-[2] mb-3 text-white animate-pulse" />
                  <span className="font-mono text-sm font-black tracking-widest uppercase text-white">
                    Enlarge View
                  </span>
                  <span className="font-mono text-[10px] text-gray-200 mt-1 uppercase tracking-wider text-center">
                    {certs[1].badge} // {certs[1].title}
                  </span>
                </div>
              </div>

            </div>

            {/* ROW 2: exactly 2 images row side-by-side (2-column layout) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
              {/* ROW 2 - Item 3 (Normal Width) */}
              <div 
                onClick={() => setSelectedCert(certs[2])}
                className="col-span-1 group border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#111111] cursor-pointer transition-all duration-300 relative h-auto w-full"
              >
                <img 
                  src={certs[2].image} 
                  alt={certs[2].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto group-hover:scale-[1.02] transition-all duration-500 block"
                />
                {/* Overlay with ENLARGE text and a graphic icon */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none p-4">
                  <ZoomIn className="h-10 w-10 stroke-[2] mb-3 text-white animate-pulse" />
                  <span className="font-mono text-sm font-black tracking-widest uppercase text-white">
                    Enlarge View
                  </span>
                  <span className="font-mono text-[10px] text-gray-200 mt-1 uppercase tracking-wider text-center">
                    {certs[2].badge} // {certs[2].title}
                  </span>
                </div>
              </div>

              {/* ROW 2 - Item 4 (Normal Width) */}
              <div 
                onClick={() => setSelectedCert(certs[3])}
                className="col-span-1 group border-2 border-black bg-white overflow-hidden shadow-[6px_6px_0px_#111111] hover:shadow-[10px_10px_0px_#111111] cursor-pointer transition-all duration-300 relative h-auto w-full"
              >
                <img 
                  src={certs[3].image} 
                  alt={certs[3].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto group-hover:scale-[1.02] transition-all duration-500 block"
                />
                {/* Overlay with ENLARGE text and a graphic icon */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none p-4">
                  <ZoomIn className="h-10 w-10 stroke-[2] mb-3 text-white animate-pulse" />
                  <span className="font-mono text-sm font-black tracking-widest uppercase text-white">
                    Enlarge View
                  </span>
                  <span className="font-mono text-[10px] text-gray-200 mt-1 uppercase tracking-wider text-center">
                    {certs[3].badge} // {certs[3].title}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Fuller Interactive Lightbox Modal Overlay */}
          {selectedCert && (() => {
            const isMultiImage = !!selectedCert.images;
            const activeImageUrl = isMultiImage 
              ? selectedCert.images[cert2ImageIdx] 
              : selectedCert.image;

            return (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in"
                onClick={() => setSelectedCert(null)}
              >
                <div 
                  className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center bg-[#111111] border-4 border-black"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Close Button top-right */}
                  <button 
                    onClick={() => setSelectedCert(null)}
                    className="absolute right-4 top-4 z-20 bg-white hover:bg-gray-100 border-2 border-black p-2 text-black cursor-pointer transition transform active:scale-95"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 stroke-[2.5]" />
                  </button>

                  {/* Enlarged image in full view */}
                  <img 
                    src={activeImageUrl} 
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="max-w-full max-h-full object-contain block select-none"
                  />

                  {/* Directional slider controls & indicator visible only when enlarged */}
                  {isMultiImage && (
                    <>
                      {/* Indicator Badge */}
                      <div className="absolute top-4 left-4 bg-black text-white text-[10px] font-mono font-bold px-3 py-1.5 border border-white uppercase tracking-widest z-10 select-none">
                        SLIDE {cert2ImageIdx + 1}/{selectedCert.images.length}
                      </div>

                      {/* Directional Arrow Buttons */}
                      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCert2ImageIdx((prev) => (prev === 0 ? selectedCert.images.length - 1 : prev - 1));
                          }}
                          className="bg-white hover:bg-black text-black hover:text-white border-2 border-black p-2 transition-all cursor-pointer"
                          title="Previous Image"
                        >
                          <ChevronLeft className="h-4 w-4 stroke-[3]" />
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCert2ImageIdx((prev) => (prev === selectedCert.images.length - 1 ? 0 : prev + 1));
                          }}
                          className="bg-white hover:bg-black text-black hover:text-white border-2 border-black p-2 transition-all cursor-pointer"
                          title="Next Image"
                        >
                          <ChevronRight className="h-4 w-4 stroke-[3]" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })()}

        </div>
      </section>

      {/* SECTION 7: CALL TO ACTION (ABOUT CTA) */}
      <section className="bg-white py-16 border-t border-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/images/about_construction_site_1780503065020.png" 
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
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight uppercase animate-pulse-slow">
                Ready to work together?
              </h2>
            </div>

            {/* Actions (Buttons placed below the statement of information) */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={() => onScrollToSection('consultation')}
                className="inline-flex items-center justify-center bg-industrial-red hover:bg-industrial-red-hover text-white font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] cursor-pointer w-full sm:w-auto"
              >
                Get Started Now
              </button>
              <button
                onClick={() => onScrollToSection('services-view')}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                Explore Our Services
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
