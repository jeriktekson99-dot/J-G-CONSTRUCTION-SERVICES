import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Paintbrush,
  Compass,
  Zap,
  Activity,
  MapPin,
  Layers,
  Droplets
} from 'lucide-react';

interface ServicesProps {
  onScrollToSection?: (id: string) => void;
}

export default function Services({ onScrollToSection }: ServicesProps) {
  const services = [
    {
      id: "ser-1",
      title: "Architectural Planning & Drafting",
      icon: Compass,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Bespoke schematic spatial design, custom layouts, 3D renderings, and precise CAD elevations.",
    },
    {
      id: "ser-2",
      title: "Interior Fit-Out & Finishing",
      icon: Paintbrush,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Drywall partition structures, acoustical false ceilings, raised floor tiling, and custom carpentry.",
    },
    {
      id: "ser-3",
      title: "General Building Renovation",
      icon: Activity,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Corporate office modernizations, load-bearing transfers, facade cladding, and structural repairs.",
    },
    {
      id: "ser-4",
      title: "Civil Works & Infrastructure",
      icon: MapPin,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Heavy site layout grading, volumetric balancing, storm drainage channels, and concrete roads.",
    },
    {
      id: "ser-5",
      title: "Structural Engineering & Design",
      icon: Building2,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Finite element load modeling, dynamic seismic design, roof truss shop details, and wind computations.",
    },
    {
      id: "ser-6",
      title: "Foundations & Concrete Works",
      icon: Layers,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Monolithic concrete mat footings, subgrade suitability profiling, pile caps, and curing audits.",
    },
    {
      id: "ser-7",
      title: "Electrical Systems Engineering",
      icon: Zap,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Balanced power panel calculations, fire-rated conduit runs, auxiliary systems, and riser schemes.",
    },
    {
      id: "ser-8",
      title: "Plumbing & Sanitary Engineering",
      icon: Droplets,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Thermal PPR domestic water loops, sanitary stack venting, grease interceptors, and storm drainage.",
    }
  ];

  return (
    <section 
      id="capabilities" 
      className="py-16 bg-white border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest">
                Our Capabilities
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">
              Engineered for Excellence
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-sm text-left md:text-right">
            [SERVICES CATALOG v2026] // ZERO-COMPROMISE BLUEPRINT ANALYSIS AND TURNKEY STRUCTURAL WORKS
          </p>
        </div>

        {/* 8-Column Grid Layout (Show 4 columns on large screens, 2 on medium, 1 on small) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                onClick={() => onScrollToSection?.(svc.id)}
                className={`bg-white border border-black p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[6px_6px_0px_#111111] hover:-translate-y-1 group relative cursor-pointer ${svc.accentColor}`}
              >
                {/* Structural Grid lines background overlay on hover to simulate engineering charts */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] pointer-events-none transition-opacity duration-300" style={{
                  backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
                  backgroundSize: '12px 12px'
                }} />

                <div>
                  {/* Card top branding indicators */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-gray-50 border border-gray-200 group-hover:border-black group-hover:bg-white text-black transition-colors">
                      <IconComponent className="h-6 w-6 text-black group-hover:text-industrial-red transition-colors" />
                    </div>
                    <span className="font-mono text-xs text-gray-400 group-hover:text-black font-bold transition-colors">
                      [0{idx + 1}]
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-[#111111] text-lg tracking-tight mb-2 text-left group-hover:text-industrial-red transition-colors">
                    {svc.title}
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
  );
}
