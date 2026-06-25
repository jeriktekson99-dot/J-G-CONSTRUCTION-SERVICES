import React, { useRef } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Settings, 
  ShieldCheck, 
  UserSquare2, 
  FileCheck,
  Zap,
  FolderLock
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

interface ServiceDetailPageProps {
  service: ServiceDetail;
  onBack: () => void;
  onScrollToSection: (id: string) => void;
}

export default function ServiceDetailPage({ service, onBack, onScrollToSection }: ServiceDetailPageProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleDownloadBrochure = () => {
    alert(`SYSTEM STATEMENT: Generating secure dynamic service brochure for [${service.title.toUpperCase()}] - Complete layout profiles, concrete matrix rules, and compliance standards stored.`);
  };

  // Specific Sector Featured Projects depending on selected service category
  const sectorProjects = [
    {
      id: "project-1",
      title: "Steel Truss Logistics Warehouse",
      location: "Cavite",
      desc: "High-clearance truss fabrication and rapid industrial erection timeline controls.",
      image: "/src/assets/images/industrial_retrofit_1780500246965.png"
    },
    {
      id: "project-2",
      title: "Prime Commercial Hub Shell & Core",
      location: "Lucena City",
      desc: "Multi-level reinforced core structural stabilization matching municipal guidelines.",
      image: "/src/assets/images/commercial_development_1780500228422.png"
    },
    {
      id: "project-3",
      title: "High-Load Structural Slab Project",
      location: "Manila",
      desc: "Massive monolithic pours featuring anti-deflection steel grids and strict inspection.",
      image: "/src/assets/images/rebar_foundation_1780503628161.png"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-24 pb-0 text-[#111111] font-sans selection:bg-industrial-red selection:text-white">
      
      {/* Back Button Line */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-black text-black hover:text-industrial-red uppercase tracking-widest cursor-pointer group transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>
      </div>

      {/* [SERVICE HERO HEADER] */}
      <header className="relative py-14 border-b border-black overflow-hidden mt-2">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={service.image} 
            alt="Service background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-2">
              CORE CAPABILITY PROFILE
            </span>
            <h1 className="font-display font-extrabold text-[#111111] text-2.5xl sm:text-3.5xl lg:text-[40px] leading-tight uppercase tracking-tight">
              {service.title}
            </h1>
            <p className="font-sans text-gray-600 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
              {service.tagline || "Advanced structural modeling, load verification, and precision engineering blueprints designed to stand indefinitely."}
            </p>
          </div>
        </div>
      </header>

      {/* [SECTION 1: SERVICE OVERVIEW] */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Media placeholder representing active layout engineering */}
            <div className="lg:col-span-5">
              <div className="border-2 border-black overflow-hidden shadow-[6px_6px_0px_#111111] aspect-[4/3] bg-gray-50 relative group">
                <img 
                  src={service.image} 
                  alt="On-site structural execution" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">
                  SITE_FILE // METADATA
                </div>
              </div>
            </div>

            {/* Right Column: Information Overview */}
            <div className="lg:col-span-7 text-left space-y-4">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block">
                01 / INTRODUCTION
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight border-b border-black pb-2">
                Excellence in {service.title}
              </h2>
              <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
                We provide extensive mechanical and {service.title.toLowerCase()} service blueprints designed to translate complex project visions into safe, constructible realities. Our professional executions factor in rigorous safety standards, environmental thresholds, and precise localized stress tolerances to guarantee long-term physical reliability from the ground up.
              </p>
              <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
                By maintaining a direct connection between field inspectors and engineering software models, our team guarantees zero discrepancy between the physical build and regulatory structural layouts.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* [SECTION 2: TECHNICAL SCOPE & CAPABILITIES] */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (The Technical Scope) */}
            <div className="lg:col-span-7 text-left order-2 lg:order-1 space-y-6">
              <div>
                <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-1">
                  02 / CORE CAPABILITIES
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight border-b border-black pb-2">
                  Comprehensive Structural Solutions
                </h2>
              </div>
              <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
                Our active technical envelope covers rigorous, calculations-oriented operations that ensure multi-tiered residential developments or high-bay warehouses clear safety parameters exactly:
              </p>
              
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.scopeItems.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 border border-black p-3 bg-gray-50/50 hover:shadow-[3px_3px_0px_#1B49B8] transition-shadow">
                    <CheckCircle2 className="h-4 w-4 text-industrial-red shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-gray-800 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Media placeholder showcasing blueprint / schematic */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="border-2 border-black overflow-hidden shadow-[6px_6px_0px_#1B49B8] aspect-[4/3] bg-gray-50 relative group">
                <img 
                  src="/src/assets/images/blueprint_cad_1780503663960.png" 
                  alt="Engineering CAD Schematic" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-engineering-blue text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">
                  CAD // DRAFT_VERIFIED
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [SECTION 3: PHASE-BY-PHASE EXECUTION PROCESS] */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Column: Industrial graphic/photo placeholder capturing builders */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="border-2 border-black overflow-hidden shadow-[6px_6px_0px_#111111] aspect-[1/1] w-full bg-gray-100 relative group h-full">
                <img 
                  src="/src/assets/images/about_construction_site_1780503065020.png" 
                  alt="Structural on-site safety execution" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0"
                />
                <div className="absolute top-4 left-4 bg-black text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">
                  EXECUTION_METRICS // FIELD
                </div>
              </div>
            </div>

            {/* Right Column (3 Stacked Process Cards with Clean Outlines) */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center space-y-6">
              <div>
                <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-1">
                  03 / WORKFLOW PIPELINE
                </span>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight">
                  Staged Blueprint Execution
                </h2>
                <p className="font-sans text-gray-500 text-xs sm:text-sm mt-1">
                  How our engineering crews guarantee quality control at every material transition point.
                </p>
              </div>

              <div className="space-y-4">
                {/* Phase 1 */}
                <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] transition-all flex gap-4 items-start">
                  <div className="bg-industrial-red text-white p-2.5 font-mono text-sm font-black leading-none shrink-0 border border-black">
                    01
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm uppercase text-black">
                      Phase 1: Assessment & Computational Modeling
                    </h4>
                    <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Complete evaluation of architectural blueprints, soil geotechnical diagnostics, and multi-axis load-path determinations to pre-empt material strain points.
                    </p>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] transition-all flex gap-4 items-start">
                  <div className="bg-engineering-blue text-white p-2.5 font-mono text-sm font-black leading-none shrink-0 border border-black">
                    02
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm uppercase text-black">
                      Phase 2: Structural Drafting & Blueprint Verification
                    </h4>
                    <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Rigorous structural math drafting and double peer-review calculation cycles. This eliminates critical design vulnerabilities in concrete/steel specifications before staging or material purchasing.
                    </p>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="border-2 border-black p-5 bg-white shadow-[4px_4px_0px_#111111] hover:shadow-[2px_2px_0px_#111111] transition-all flex gap-4 items-start">
                  <div className="bg-black text-white p-2.5 font-mono text-sm font-black leading-none shrink-0 border border-black">
                    03
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-sm uppercase text-black">
                      Phase 3: Construction Supervision & Quality Sign-Off
                    </h4>
                    <p className="font-sans text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Active field verification runs. Our licensed engineers perform continuous scaffolding checks and concrete pour stamp tracking, signing off on absolute compliance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [SECTION 4: VALUE ENGINEERING & COMPLIANCE STANDARDS] */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Information (Value Engineering & Benefits) */}
            <div className="lg:col-span-7 text-left space-y-4">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block">
                04 / COMPLIANCE & COST CONTROL
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight border-b border-black pb-2">
                Optimizing Material Budgets Without Sacrificing Safety
              </h2>
              <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
                Through optimized structural designs, calculating specific concrete dimensions, and utilizing alternative material routes, our engineering staff avoids wasteful layout structures. We deliver designs that strictly abide by municipal guidelines and local safety factor structures, saving on logistics and material costs from day one.
              </p>
              <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
                By verifying structural loading early, we optimize concrete and steel volumes to bypass procurement over-ordering. This guarantees cost effectiveness while maintaining premium physical safety factors at all levels.
              </p>
            </div>

            {/* Right Column: Media placeholder representing active quality compliance and certification */}
            <div className="lg:col-span-5">
              <div className="border-2 border-black overflow-hidden shadow-[6px_6px_0px_#111111] aspect-[4/3] bg-gray-50 relative group">
                <img 
                  src="/src/assets/images/rebar_foundation_1780503628161.png" 
                  alt="Engineering inspection compliance verification" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-industrial-red text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-widest">
                  COMPLIANCE // RECORD
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* [SECTION 5: FEATURED PROJECTS] */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header area aligned to Related Articles */}
          <div className="border-b border-black pb-4 mb-8">
            <div className="text-left">
              <span className="font-mono text-[10px] font-black text-industrial-red uppercase tracking-widest block mb-1">
                DEMONSTRATED FIELD EXCELLENCE
              </span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-black uppercase tracking-tight">
                Featured Projects in this Sector
              </h2>
            </div>
          </div>

          {/* Aligned 3-Column Grid matching Related Articles layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {sectorProjects.map((proj) => (
              <div 
                key={proj.id}
                className="w-full bg-white border border-black p-4 flex flex-col justify-between hover:shadow-[4px_4px_0px_#1B49B8] transition-all duration-300 group text-left cursor-pointer"
                onClick={onBack}
              >
                <div className="space-y-3">
                  <div className="aspect-[16/10] overflow-hidden border border-black bg-gray-100 bg-[#fafafa]">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <span className="font-mono text-[9px] font-black text-[#1B49B8] uppercase tracking-widest block pb-1 border-b border-gray-100">
                    LOCATION: {proj.location.toUpperCase()}
                  </span>
                  <h3 className="font-display font-extrabold text-xs sm:text-sm text-black group-hover:text-industrial-red transition-colors leading-tight line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
                
                <div className="pt-3 mt-4 border-t border-gray-100 flex items-center justify-between font-mono text-[10px] text-gray-400">
                  <span>SECTOR // JG_ST_CASE</span>
                  <span className="text-black font-extrabold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    PROJECT LOGS <ArrowRight className="h-3 w-3 text-black" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* [SECTION 6: MEET OUR EXPERTS] */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="mb-8 border-b border-black pb-4">
            <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-1">
              LICENSED STAFF DIRECTIVE
            </span>
            <h2 className="font-display font-extrabold text-2xl uppercase text-black">
              Specialized Technical Personnel
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile 1 */}
            <div className="border border-black p-5 bg-white flex flex-col sm:flex-row justify-between items-stretch gap-4 relative shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#1B49B8] transition-all duration-300">
              <div className="flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-[#D41D1D] font-bold block uppercase tracking-widest">
                    CHIEF CIVIL CALCULATOR
                  </span>
                  <h4 className="font-display font-black text-lg text-black uppercase">
                    Engr. Gregorio A. Lacay
                  </h4>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    Founder and General Manager with over a decade of experience in architectural, finishing, structural, and electrical/plumbing works.
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => onScrollToSection('consultation')}
                    className="font-mono text-[10px] font-black text-engineering-blue hover:text-industrial-red uppercase transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Consult Team
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
              
              <div className="w-full sm:w-[110px] aspect-square border border-black overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <UserSquare2 className="h-8 w-8 text-industrial-red" />
                </div>
              </div>
            </div>

            {/* Profile 2 */}
            <div className="border border-black p-5 bg-white flex flex-col sm:flex-row justify-between items-stretch gap-4 relative shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#1B49B8] transition-all duration-300">
              <div className="flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[9px] text-[#D41D1D] font-bold block uppercase tracking-widest">
                    PROJECT CONTROLS & COMPLIANCE
                  </span>
                  <h4 className="font-display font-black text-lg text-black uppercase">
                    Arch. Tech Supervisor
                  </h4>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">
                    Specialized Project Manager coordinating field tracking, structural concrete testing verification, and rigid safety timelines.
                  </p>
                </div>
                <div>
                  <button 
                    onClick={() => onScrollToSection('consultation')}
                    className="font-mono text-[10px] font-black text-engineering-blue hover:text-industrial-red uppercase transition-all flex items-center gap-1 cursor-pointer"
                  >
                    Consult Team
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
              
              <div className="w-full sm:w-[110px] aspect-square border border-black overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                <div className="flex flex-col items-center justify-center text-center p-2">
                  <UserSquare2 className="h-8 w-8 text-industrial-red" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* [BOTTOM CALL TO ACTION (CTA)] */}
      <section className="bg-white py-16 border-t border-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={service.image} 
            alt="Ready to work together background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.25] grayscale select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="max-w-3xl">
            
            <div>
              <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block mb-2">
                LET'S PARTNER // ESTIMATE REVIEW
              </span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-black leading-tight uppercase animate-pulse-slow">
                Ready to work together?
              </h2>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-start">
              <button
                onClick={() => onScrollToSection('consultation')}
                className="inline-flex items-center justify-center bg-industrial-red hover:bg-industrial-red-hover text-white font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] cursor-pointer w-full sm:w-auto"
              >
                Contact Our Engineers
              </button>
              <button
                onClick={handleDownloadBrochure}
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-black font-display font-extrabold text-xs uppercase tracking-widest py-4.5 px-10 rounded-none transition-all duration-300 border-2 border-black shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer w-full sm:w-auto"
              >
                Download Service Brochure
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
