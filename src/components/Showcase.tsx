import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Project } from '../utils/dataStore';
import { dataStore } from '../utils/dataStore';

interface ShowcaseProps {
  onScrollToSection: (id: string) => void;
  onSelectProject: (project: Project) => void;
}

export default function Showcase({ onScrollToSection, onSelectProject }: ShowcaseProps) {
  const dbProjects = (dataStore.getProjects(false) as unknown as Project[])
    .filter(p => p.status === 'Completed')
    .sort((a, b) => {
      // Primary: compare updatedAt
      if (a.updatedAt !== undefined || b.updatedAt !== undefined) {
        return (b.updatedAt || 0) - (a.updatedAt || 0);
      }
      
      // Secondary: parse timestamp from IDs if they are of form "proj-<timestamp>"
      const getTimestamp = (idStr: string) => {
        const parts = idStr.split('-');
        if (parts.length > 1) {
          const num = parseInt(parts[1], 10);
          if (!isNaN(num) && num > 100000) {
            return num;
          }
        }
        return 0;
      };
      
      const tsA = getTimestamp(a.id);
      const tsB = getTimestamp(b.id);
      if (tsA !== tsB) {
        return tsB - tsA;
      }
      
      // Tertiary: fallback to ID alphabetical comparison
      return b.id.localeCompare(a.id);
    })
    .slice(0, 3);

  return (
    <section 
      id="showcase" 
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest">
                Our Showcase
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">
              Standard-Setting Executions
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-sm text-left md:text-right">
            [EXCELLENCE YOU CAN TRUST / MULTI-PIECE PORTFOLIO MATRIX]
          </p>
        </div>

        {/* 3-Column Grid Layout matching Portfolio Style 1-to-1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {dbProjects.map((p) => (
            <div 
              key={p.id}
              onClick={() => onSelectProject(p)}
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
                  <h3 className="font-display font-black text-lg text-black mt-1 group-hover:text-industrial-red transition-colors break-words break-all whitespace-normal">
                    {p.title}
                  </h3>
                </div>

                {/* Right directional arrow link indicator */}
                <div className="border border-black p-2 bg-white transition-colors group-hover:bg-black group-hover:text-white shrink-0 mt-1">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
