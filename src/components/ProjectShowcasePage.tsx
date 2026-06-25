import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Layers, 
  CheckCircle,
  FileSpreadsheet, 
  Building2, 
  Sparkles, 
  UserSquare2, 
  FileCheck,
  Send,
  X
} from 'lucide-react';
import { dataStore } from '../utils/dataStore';

interface Project {
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
}

interface ProjectShowcasePageProps {
  project: Project;
  onBack: () => void;
  onScrollToSection: (id: string) => void;
  isPreview?: boolean;
}

export default function ProjectShowcasePage({ project, onBack, onScrollToSection, isPreview = false }: ProjectShowcasePageProps) {
  // Input states for form
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [serviceCategory, setServiceCategory] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Fallback data mapping to match requested specifications
  const clientName = project.client || "Industrial Logistics Corp.";
  const locationText = project.location ? `${project.location} Industrial Zone, PH` : "Cavite Industrial Zone, PH";
  const projectSector = project.category || "Industrial Frameworks & Infrastructure";
  const totalFootage = project.id === 'proj-1' ? "12,500 Sq.M." : "8,200 Sq.M.";
  const valSavings = "14% Material Optimization";

  // Thumbnail configurations
  const thumbnailOptions = [
    {
      title: "Foundation works & piling analysis",
      description: "Initial core boreholes, geological verification, and friction micro-pile layout analysis.",
      icon: "① Foundation"
    },
    {
      title: "Steel truss framing installation",
      description: "Erecting high-clearance main structure joints with certified crane staging.",
      icon: "② Framing"
    },
    {
      title: "Interior floor slab structural reinforcement",
      description: "Heavy rebar grid spacing configurations mapped prior to concrete placement.",
      icon: "③ Slab Reinforcing"
    },
    {
      title: "Final interior fit-out and safety overview",
      description: "Stress testing and post-tension deflection checks confirming alignment.",
      icon: "④ Integration Check"
    }
  ];

  const [activeThumbIndex, setActiveThumbIndex] = useState(0);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !serviceCategory) return;
    
    dataStore.addLead({
      fullName: name,
      companyEmail: email,
      phone: phone,
      projectScope: message ? `[Inquiry on ${project.title}] ${message}` : `Inquiry regarding similar project structure to: ${project.title}`,
      serviceCategory: serviceCategory
    });

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setEmail('');
      setMessage('');
      setServiceCategory('');
    }, 2000);
  };

  const handleDownloadProfile = () => {
    alert("SYSTEM STATEMENT: Downloading J/G Engineering Services Corporate Profile [PDF] - High-Resolution Workmanship Portfolio & Capabilities Spec Sheets.");
  };

  return (
    <div className={`bg-white min-h-screen ${isPreview ? 'pt-6' : 'pt-24'} pb-0 text-[#111111] font-sans selection:bg-industrial-red selection:text-white`}>
      
      {/* Back button tier */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono font-black text-black hover:text-industrial-red uppercase tracking-widest cursor-pointer group transition-colors focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Portfolio Matrix
        </button>
        <span className="font-mono text-[9px] text-gray-400 select-none">
          CASE STUDY REVIEW // STABILIZED_STATE
        </span>
      </div>

      {/* PROJECT DEEP DIVE LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        
        {/* PROJECT HERO HEADER & TECHNICAL SPECIFICATION GRID */}
        <section className="mb-12 min-w-0 w-full">
          <div className="text-left space-y-4 min-w-0 w-full">
            <span className="inline-block text-xs font-mono font-black text-industrial-red uppercase tracking-widest">
              // CASE STUDY / PROJECT BUILD
            </span>
            <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4.5xl lg:text-5.5xl leading-none uppercase tracking-tight break-words break-all whitespace-normal">
              {project.title}
            </h1>
            
            {/* 3-Column Technical Specifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 mt-6 border-t border-black min-w-0 w-full">
              
              {/* Column 1 */}
              <div className="group border-l-2 border-[#1B49B8] pl-3 min-w-0">
                <span className="block font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  CLIENT REPRESENTATIVE
                </span>
                <span className="block font-display font-bold text-sm sm:text-base text-black uppercase mt-1 break-words break-all whitespace-normal">
                  {clientName}
                </span>
              </div>

              {/* Column 2 */}
              <div className="group border-l-2 border-black pl-3 min-w-0">
                <span className="block font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  SECTOR CATEGORIZATION
                </span>
                <span className="block font-display font-bold text-sm sm:text-base text-black uppercase mt-1 break-words break-all whitespace-normal">
                  {projectSector}
                </span>
              </div>

              {/* Column 3 */}
              <div className="group border-l-2 border-industrial-red pl-3 min-w-0">
                <span className="block font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  MUNICIPAL LOCATION
                </span>
                <span className="block font-display font-bold text-sm sm:text-base text-black uppercase mt-1 break-words break-all whitespace-normal">
                  {locationText}
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* PROJECT NARRATIVE & SIDEBAR SPLIT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start text-left min-w-0 w-full">
          
          {/* Left Column (Project Deep-Dive - 70% Width) */}
          <div className="w-full lg:w-[70%] space-y-8 min-w-0">
            
            {/* Interactive Preview Gallery (Sharp Custom Mockup Style) */}
            <div className="space-y-4">
              {/* Main Featured Image - Large Screen Sharp Geometric Frame */}
              <div className="border-2 border-black bg-gray-50 overflow-hidden shadow-[6px_6px_0px_#111111] aspect-[16/10] relative group">
                <img 
                  key={activeThumbIndex}
                  src={
                    (project.images && project.images.length > 0)
                      ? (project.images[activeThumbIndex] || project.image)
                      : (
                          activeThumbIndex === 0 ? project.image : 
                          activeThumbIndex === 1 ? "/src/assets/images/blueprint_cad_1780503663960.png" :
                          activeThumbIndex === 2 ? "/src/assets/images/rebar_foundation_1780503628161.png" :
                          "/src/assets/images/about_construction_site_1780503065020.png"
                        )
                  } 
                  alt={`${project.title} - Structural phase ${activeThumbIndex + 1}`} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-all duration-300 transform"
                />
                
                {/* Embedded Phase Mini tag overlay */}
                <span className="absolute top-4 left-4 bg-black text-white text-[9px] font-mono font-black px-2 py-0.5 tracking-wider uppercase">
                  {thumbnailOptions[activeThumbIndex % thumbnailOptions.length]?.icon || `Phase ${activeThumbIndex + 1}`}
                </span>
              </div>

              {/* Row of Interactive Thumbnail Grid - Sharp landscape frame aspect */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {(project.images && project.images.length > 0 ? project.images : [
                  project.image,
                  "/src/assets/images/blueprint_cad_1780503663960.png",
                  "/src/assets/images/rebar_foundation_1780503628161.png",
                  "/src/assets/images/about_construction_site_1780503065020.png"
                ]).map((thumbSrc, index) => {
                  const isActive = activeThumbIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveThumbIndex(index)}
                      className={`aspect-[16/10] overflow-hidden border-2 transition-all duration-300 relative cursor-pointer focus:outline-none ${
                        isActive 
                          ? "border-industrial-red scale-[1.02] shadow-[3px_3px_0px_#111111]" 
                          : "border-black opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:scale-[1.01]"
                      }`}
                      aria-label={`View structural detail stage ${index + 1}`}
                    >
                      <img 
                        src={thumbSrc} 
                        alt={`Preview thumbnail ${index + 1}`} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6 min-w-0 w-full overflow-hidden">
              {/* Dynamic Project profile description */}
              <div className="space-y-3 min-w-0 w-full overflow-hidden">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-black uppercase tracking-tight border-b-2 border-black pb-2.5">
                  The Project Profile & Structural Description
                </h2>
                {project.description && (project.description.includes('<') || project.description.includes('&lt;')) ? (
                  <div 
                    className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed space-y-3 prose max-w-none prose-headings:font-display prose-headings:font-black break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                ) : (
                  <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden">
                    {project.description || "No project specification profiles ingested."}
                  </p>
                )}
              </div>

              {/* Dynamic Scope of work deliverables */}
              <div className="space-y-3 pt-4 min-w-0 w-full overflow-hidden">
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-black uppercase tracking-tight border-b-2 border-black pb-2.5">
                  Execution & Core Deliverables Scope
                </h2>
                {project.scope && (project.scope.includes('<') || project.scope.includes('&lt;')) ? (
                  <div 
                    className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed space-y-3 prose max-w-none prose-headings:font-display prose-headings:font-black break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden"
                    dangerouslySetInnerHTML={{ __html: project.scope }}
                  />
                ) : (
                  <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden">
                    {project.scope || "No active engineering deliverables lists cataloged."}
                  </p>
                )}
              </div>

              {/* Only show default challenges/strategy context if it's a default project and has no rich HTML tags (meaning it hasn't been re-saved yet) */}
              {project.id.startsWith('proj-') && parseInt(project.id.split('-')[1]) <= 5 && (!project.description || (!project.description.includes('<') && !project.description.includes('&lt;'))) && (
                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <h3 className="font-display font-black text-sm uppercase text-[#1B49B8] tracking-widest">
                    // GEOTECHNICAL CONTEXT & SEVERE WIND CRITERIA
                  </h3>
                  <p className="font-sans text-gray-500 text-[11px] leading-relaxed">
                    Standard J/G certified layouts are modeled on finite element analysis templates to support up to Category 5 typhoons (280 KPH sustained gusts). Foundations are mapped using soil-friction piling configurations directly coordinated with regional Cavite/Batangas structural testing bureaus.
                  </p>
                </div>
              )}
            </div>

            {/* Blockquote with Industrial Red boundary Accent */}
            <blockquote className="border-l-4 border-industrial-red bg-red-50/50 p-6 italic text-gray-700 text-xs sm:text-sm leading-relaxed">
              "We take pride in our direct physical handovers. When a project is marked J/G Certified, client teams receive full verification logs, raw materials laboratory reports, and municipal structural compliance stamps securely cataloged."
            </blockquote>

          </div>

          {/* Right Column (Project Directory & Inquiry Sidebar - 30% Width) */}
          <div className="w-full lg:w-[30%] space-y-8 lg:sticky lg:top-24">
            
            {/* Layout Card 1 (Responsible Sign-Off / Project Leadership) */}
            <div className="border border-black p-6 bg-white shadow-[4px_4px_0px_#111111] space-y-4 text-left">
              <span className="font-mono text-[10px] font-black text-industrial-red uppercase tracking-widest block">
                // EXECUTIVE BY-LINE
              </span>
              <div>
                <span className="font-mono text-[9px] text-gray-400 font-bold block uppercase tracking-wider">
                  MANAGING ENGINEER
                </span>
                <h4 className="font-display font-extrabold text-[#111111] text-base uppercase mt-0.5">
                  Engr. Gregorio A. Lacay
                </h4>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Founder & General Manager, J/G Engineering Services
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <span className="font-mono text-[9px] text-[#1B49B8] font-bold block uppercase tracking-wider">
                  GENERAL CONTRACTOR
                </span>
                <h4 className="font-display font-extrabold text-[#111111] text-base uppercase mt-0.5">
                  J/G SITE SERVICES TEAM
                </h4>
                <p className="font-sans text-xs text-gray-500 mt-1">
                  Safe Operations Protocol Verified
                </p>
              </div>
              <div className="pt-3 border-t border-gray-100 font-mono text-xs">
                <span className="text-gray-400 block mb-1">PROJECT TECHNICAL OFFICE:</span>
                <a 
                  href="mailto:jgconstruction880@gmail.com" 
                  className="text-[#1B49B8] hover:text-industrial-red break-all transition-colors font-bold"
                >
                  jgconstruction880@gmail.com
                </a>
              </div>
              <p className="font-sans text-[11px] text-gray-400 leading-relaxed pt-2">
                Professional engineers coordinating architectural finishes, structural components, electrical and plumbing plans.
              </p>
            </div>

            {/* Layout Card 2 (Project Inquiry Form) */}
            <div className="bg-gray-50 border border-black p-5 shadow-[4px_4px_0px_#1B49B8] text-left">
              <span className="font-mono text-[9.5px] font-black text-[#1B49B8] uppercase tracking-widest block mb-1">
                // TECHNICAL INQUIRY
              </span>
              <h4 className="font-display font-extrabold text-sm text-black uppercase">
                Inquire About Similar Builds
              </h4>
              <p className="font-sans text-[11.5px] text-gray-500 mt-1 leading-snug">
                Request a consultation regarding industrial framework solutions.
              </p>

              {submitted ? (
                <div className="bg-green-50 border border-green-500 p-4 mt-4 text-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <span className="font-mono text-xs font-black text-green-700 block">INQUIRY QUEUED</span>
                  <p className="text-[10px] text-green-600 mt-0.5">We will review structural specs shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitInquiry} className="mt-4 space-y-3">
                  <div>
                    <label className="block text-[10px] font-mono text-black font-bold uppercase mb-1">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full bg-white border border-black px-3 py-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] text-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-black font-bold uppercase mb-1">
                      Contact Number
                    </label>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +63 917 123 4567"
                      className="w-full bg-white border border-black px-3 py-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] text-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-black font-bold uppercase mb-1">
                      Your Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. partner@firm.com"
                      className="w-full bg-white border border-black px-3 py-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] text-black font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-black font-bold uppercase mb-1">
                      Project Scope Category
                    </label>
                    <div className="relative">
                      <select
                        required
                        value={serviceCategory}
                        onChange={(e) => setServiceCategory(e.target.value)}
                        className="w-full bg-white border border-black px-3 py-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] text-black font-mono appearance-none cursor-pointer pr-8"
                      >
                        <option value="" disabled className="text-gray-400">-- Choose Service Area --</option>
                        {dataStore.getServices().map((service) => (
                          <option key={service.id} value={service.title} className="text-black">
                            {service.title}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-black">
                        <svg className="fill-current h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-black font-bold uppercase mb-1">
                      Project Notes (Optional)
                    </label>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly state target location, square footage objectives..."
                      className="w-full bg-white border border-black p-2 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] text-black font-sans resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-black hover:bg-gray-900 text-white font-display font-bold text-xs uppercase py-2.5 px-4 rounded-none transition-all tracking-widest cursor-pointer shadow-[3px_3px_0px_#D41D1D] active:shadow-[0px_0px_0px_#111111] border border-black"
                  >
                    SUBMIT INQUIRY
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 4: BOTTOM CALL TO ACTION (CTA) */}
      <section className="bg-white py-16 border-t border-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={project.image} 
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
