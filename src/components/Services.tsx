import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  CheckCircle2, 
  ArrowRight,
  Paintbrush,
  Compass,
  Zap
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: "architectural-finishing",
      title: "Architectural & Finishing",
      icon: Paintbrush,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Custom space planning, complete office & commercial fit-outs, partition layouts, carpentry, and premium surface finishing services.",
      bulletPoints: [
        "Floor space & interior optimization",
        "Drywall partition and column systems",
        "False ceiling & acoustical layouts",
        "Aesthetic cabinetry & wood finishings"
      ]
    },
    {
      id: "civil-grading",
      title: "Civil Works & Site Grading",
      icon: Compass,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Comprehensive site preparation, volume earthworks balancing, storm drainage channels, and durable retaining slope walls.",
      bulletPoints: [
        "Civil storm-drainage layouts",
        "Access roadways & pavement works",
        "Site preparation & grading schemes",
        "Slope stability retaining structures"
      ]
    },
    {
      id: "structural-concrete",
      title: "Structural Design & Foundations",
      icon: Building2,
      accentColor: "border-t-4 border-t-industrial-red",
      description: "Rigid truss & framing designs, high-PSI concrete monolithic footing pours, seismic code alignment, and load-path stability calculation.",
      bulletPoints: [
        "Seismic load engineering calculations",
        "Monolithic concrete mat footings",
        "Steel roof truss shop details",
        "Concrete column curing audits"
      ]
    },
    {
      id: "electrical-plumbing",
      title: "Electrical & Plumbing",
      icon: Zap,
      accentColor: "border-t-4 border-t-engineering-blue",
      description: "Full-service utility integration, power load balance panelboards, fire-rated wiring paths, high-durability water loops, and wastewater venting stack layouts.",
      bulletPoints: [
        "Power distribution panel calculations",
        "Conduit wiring installation schedules",
        "Thermal PPR plumbing water loops",
        "Hygienic sanitary stack venting"
      ]
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

        {/* 4-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <div
                key={svc.id}
                className={`bg-white border border-black p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[6px_6px_0px_#111111] hover:-translate-y-1 group relative ${svc.accentColor}`}
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

                  <h3 className="font-display font-extrabold text-[#111111] text-lg lg:text-xl tracking-tight mb-3 text-left">
                    {svc.title}
                  </h3>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between font-mono text-xs text-black font-bold">
                  <span className="text-[10px] text-gray-400 group-hover:text-engineering-blue transition-colors">
                    STRUCTURAL_ASSURE_OK
                  </span>
                  <div className="flex items-center gap-1 group-hover:text-industrial-red transition-colors">
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
