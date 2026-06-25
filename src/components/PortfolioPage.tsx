import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, X, Shield, FileSpreadsheet, MapPin, Layers, CheckSquare, Calendar, HelpCircle, Search } from 'lucide-react';
import ProjectShowcasePage from './ProjectShowcasePage';
import { dataStore } from '../utils/dataStore';

interface Project {
  id: string;
  title: string;
  category: 'Structural Design' | 'Commercial Build' | 'Industrial Frameworks' | 'Civil Works' | string;
  location: string;
  image: string;
  scope: string;
  client: string;
  completedYear: string;
  complianceRatio: string;
  description: string;
  status: 'Completed' | 'Ongoing';
}

interface PortfolioPageProps {
  onScrollToSection: (id: string) => void;
}

export default function PortfolioPage({ onScrollToSection }: PortfolioPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('Completed');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Structural Design', 'Commercial Build', 'Industrial Frameworks', 'Civil Works'] as const;

  const projects = dataStore.getProjects(false) as unknown as Project[];

  const filteredProjects = projects.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.scope.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  if (selectedProject) {
    return (
      <ProjectShowcasePage 
        project={selectedProject} 
        onBack={() => {
          setSelectedProject(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onScrollToSection={onScrollToSection}
      />
    );
  }

  return (
    <div className="bg-white pt-24 pb-0 text-[#111111]">
      
      {/* PORTFOLIO HERO HEADER */}
      <section className="relative py-14 border-b border-black overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/images/industrial_retrofit_1780500246965.png" 
            alt="Portfolio projects background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div>
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-2">
                PROJECT ARCHIVE
              </span>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                Our Completed Works
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO FILTER BAR with Search and Dropdown Category System */}
      <section className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search and Drop-down Controls Block */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:max-w-3xl">
              
              {/* Search Bar Input */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects (e.g. Cavite, Steel, Seismic, Imus...)"
                  className="w-full bg-white border border-black pl-10 pr-4 py-2.5 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-industrial-red text-black font-mono placeholder-gray-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black focus:outline-none cursor-pointer"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Category Dropdown */}
              <div className="relative w-full sm:w-56">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-black px-4 py-2.5 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] font-mono text-black appearance-none cursor-pointer pr-10"
                >
                  <option value="All">All Categories</option>
                  <option value="Structural Design">Structural Design</option>
                  <option value="Commercial Build">Commercial Build</option>
                  <option value="Industrial Frameworks">Industrial Frameworks</option>
                  <option value="Civil Works">Civil Works</option>
                </select>
                {/* Custom Chevron Indicator */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-black font-mono text-[10px]">
                  ▼
                </div>
              </div>

              {/* Execution Status Dropdown */}
              <div className="relative w-full sm:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full bg-white border border-black px-4 py-2.5 text-xs rounded-none focus:outline-none focus:ring-1 focus:ring-[#1B49B8] font-mono text-black appearance-none cursor-pointer pr-10"
                >
                  <option value="Completed">Completed Works</option>
                  <option value="Ongoing">Ongoing Projects</option>
                </select>
                {/* Custom Chevron Indicator */}
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-black font-mono text-[10px]">
                  ▼
                </div>
              </div>

            </div>

            {/* Results Counter */}
            <div className="font-mono text-[10.5px] text-gray-500 shrink-0 select-none bg-gray-50 border border-gray-200 px-3 py-1.5 matches-count">
              ACTIVE MATCHES // <span className="font-bold text-black">{filteredProjects.length}</span> / {projects.length} PROJECTS
            </div>

          </div>
        </div>
      </section>

      {/* PROJECT SHOWCASE GRID (2-Column Matrix) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {filteredProjects.map((p) => {
              if (p.status === 'Completed') {
                return (
                  <div 
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className="group cursor-pointer text-left focus:outline-none"
                  >
                    {/* Image container frame with thin black border, 16:9 ratio */}
                    <div className="aspect-[16/9] border border-black overflow-hidden bg-gray-50 transition-all duration-300 group-hover:border-engineering-blue shadow-[4px_4px_0px_transparent] group-hover:shadow-[4px_4px_0px_#111111]">
                      <img 
                        src={p.image} 
                        alt={p.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-102"
                      />
                    </div>

                    {/* Details layout */}
                    <div className="mt-5 flex items-start justify-between gap-4 min-w-0 w-full">
                      <div className="transition-transform duration-300 group-hover:translate-x-1 min-w-0 flex-1">
                        {/* Sector details with Blue Accent Text */}
                        <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest block break-words break-all whitespace-normal">
                          {p.category} // {p.location} // <span className="text-green-600">{p.status}</span>
                        </span>
                        <h3 className="font-display font-black text-xl text-black mt-1 group-hover:text-industrial-red transition-colors break-words break-all whitespace-normal">
                          {p.title}
                        </h3>
                      </div>

                      {/* Right directional arrow link indicator */}
                      <div className="border border-black p-2 bg-white transition-colors group-hover:bg-black group-hover:text-white shrink-0 mt-1">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div 
                    key={p.id}
                    className="border-2 border-black bg-white p-6 shadow-[5px_5px_0px_#111111] hover:shadow-[7px_7px_0px_#1B49B8] transition-all duration-300 text-left rounded-none flex flex-col justify-between min-w-0 w-full"
                  >
                    <div className="min-w-0 w-full">
                      {/* Status indicator badge */}
                      <div className="font-mono text-[9px] text-gray-500 font-extrabold uppercase tracking-widest mb-3 flex items-center justify-between gap-2">
                        <span className="bg-[#111111] text-white px-2 py-0.5 font-bold shrink-0">PROJECT STATUS // {p.status}</span>
                        <span className="text-industrial-red font-bold shrink-0">// IN PROGRESS</span>
                      </div>

                      <h3 className="font-display font-black text-[#111111] text-lg sm:text-xl uppercase tracking-tight mb-2 break-words break-all whitespace-normal">
                        {p.title}
                      </h3>

                      <p className="font-sans text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 break-words break-all whitespace-normal">
                        {p.description}
                      </p>
                    </div>

                    {/* Three custom basis detail list */}
                    <div className="border-t border-dashed border-gray-200 pt-4 space-y-2.5 font-mono text-[10px] uppercase text-gray-600 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0 w-full">
                        <span className="font-bold text-black shrink-0">CLIENT REPRESENTATIVE:</span>
                        <span className="text-gray-900 font-medium sm:text-right truncate max-w-full block" title={p.client}>{p.client}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0 w-full">
                        <span className="font-bold text-black shrink-0">SECTOR CATEGORIZATION:</span>
                        <span className="text-[#1B49B8] font-bold sm:text-right truncate max-w-full block" title={p.category}>{p.category}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 min-w-0 w-full">
                        <span className="font-bold text-black shrink-0">MUNICIPAL LOCATION:</span>
                        <span className="text-gray-900 font-medium sm:text-right truncate max-w-full block" title={p.location}>{p.location}, PH</span>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>

        </div>
      </section>

      {/* BOTTOM ASYMMETRICAL CALL TO ACTION (CTA) */}
      <section className="bg-white py-16 border-t border-black relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/images/industrial_retrofit_1780500246965.png" 
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

      {/* COMPREHENSIVE PROJECT SPECIFICATION DETAIL MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.96, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 15 }}
              className="bg-white border-2 border-black max-w-2xl w-full p-6 sm:p-8 relative text-left my-8 shadow-[8px_8px_0px_#111111]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-black hover:text-[#D41D1D] p-1.5 border border-black hover:border-industrial-red bg-white cursor-pointer z-10 transition-colors"
                aria-label="Close project specifications"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Header metadata */}
              <div className="border-b border-black pb-4 mb-6">
                <span className="font-mono text-xs text-engineering-blue font-bold uppercase tracking-widest block mb-1">
                  PROJECT COMPLIANCE RECORD // ARCHIVE FILE
                </span>
                <h3 className="font-display font-black text-2xl text-[#111111] uppercase tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-4 items-center mt-3 text-xs font-mono text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-black" />
                    {selectedProject.location}, PH
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-[#D41D1D]" />
                    {selectedProject.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    YEAR: {selectedProject.completedYear}
                  </span>
                </div>
              </div>

              {/* Photo Display Banner */}
              <div className="aspect-[21/9] border border-black overflow-hidden bg-gray-100 mb-6">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale" 
                />
              </div>

              {/* Scope Description */}
              <div className="space-y-4 font-sans text-xs sm:text-sm text-gray-700 leading-relaxed min-w-0 w-full overflow-hidden">
                <div className="min-w-0 w-full overflow-hidden">
                  <span className="font-mono text-[10px] text-black font-black uppercase tracking-widest block mb-1">
                    PROJECT PROFILE DESCRIPTION
                  </span>
                  <div 
                    className="break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden font-sans text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedProject.description || '' }}
                  />
                </div>
                <div className="min-w-0 w-full overflow-hidden">
                  <span className="font-mono text-[10px] text-black font-black uppercase tracking-widest block mb-1">
                    CORE DELIVERABLE SCOPE OF WORK
                  </span>
                  <div 
                    className="break-words break-all [word-break:break-word] [overflow-wrap:anywhere] overflow-hidden font-sans text-gray-700 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: selectedProject.scope || '' }}
                  />
                </div>
              </div>

              {/* Developer attribution section */}
              <div className="mt-6 border-t border-gray-100 pt-4 flex flex-col sm:flex-row sm:items-center justify-start gap-4 font-mono text-[11px]">
                <div className="text-gray-400">
                  DEVELOPED FOR: <span className="text-black font-extrabold">{selectedProject.client}</span>
                </div>
              </div>

              {/* Close footer elements step */}
              <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 font-bold">
                  ARCH_REF // JG_{selectedProject.id.toUpperCase()}_STAMP
                </span>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    onScrollToSection('consultation');
                  }}
                  className="inline-flex items-center gap-1.5 font-display font-extrabold text-xs text-[#1B49B8] hover:text-[#D41D1D] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Configure Valuation Proposal
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
