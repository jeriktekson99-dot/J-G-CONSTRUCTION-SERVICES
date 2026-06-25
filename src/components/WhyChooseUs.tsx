import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Compass, Users2, Star } from 'lucide-react';
import { PillarItem } from '../types';

export default function WhyChooseUs() {
  const pillars: PillarItem[] = [
    {
      id: "safety",
      title: "Uncompromising Structural Safety",
      description: "Adhering to strict international building codes and employing rigorous triple-checking calculations. We construct to withstand peak wind, seismic events, and heavy industrial load fatigue.",
      number: "01"
    },
    {
      id: "management",
      title: "Transparent Management",
      description: "Providing granular real-time milestone tracking, direct supplier invoice audits, and zero hidden overhead lists. You stay completely in control of structural timelines and resource expenditures.",
      number: "02"
    },
    {
      id: "team",
      title: "Expert Technical Team",
      description: "Experienced, licensed structural engineers and specialized builders collaborating within an ISO-certified unified workflow. Every site manager holds credentials in advanced industrial logistics and structural work.",
      number: "03"
    }
  ];

  return (
    <section 
      id="why-choose-us" 
      className="py-16 bg-white border-t border-gray-100 relative"
    >
      {/* Background structural coordinate overlays to add to the engineered precision context */}
      <div className="absolute right-4 top-4 font-mono text-[9px] text-gray-300 pointer-events-none select-none">
        STRUCT_COORD_SYS_REF // G-7729
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column (The Core Philosophy): Large Focus Block */}
          <div className="lg:col-span-5 flex flex-col justify-between border-2 border-black p-8 bg-white shadow-[6px_6px_0px_#111111] relative text-left">
            {/* Corner alignment nodes reminiscent of engineering layout plates */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-black" />
            <div className="absolute top-0 right-0 w-2 h-2 bg-black" />
            <div className="absolute bottom-0 left-0 w-2 h-2 bg-black" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-black" />

            <div>
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-4">
                The Core Philosophy // J/G SYSTEM
              </span>
              
              <h3 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight leading-tight mb-6">
                Excellent Workmanship.<br/>Founded on Client Trust.
              </h3>
              
              <p className="font-sans text-gray-600 text-base leading-relaxed mb-6">
                J/G Construction Services is committed to total customer satisfaction. We integrate architectural, structural, electrical, plumbing, and finishing works into a seamless, cost-efficient lifecycle to provide premium quality results on time.
              </p>
            </div>

            <div className="border-t border-black pt-6 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-industrial-red fill-current" />
                <span className="font-mono text-xs font-bold text-black uppercase tracking-wider">
                  Licensed & Bonded 2026
                </span>
              </div>
              <span className="text-xs font-mono text-gray-400">
                JG_ENG_REG #09882A
              </span>
            </div>
          </div>

          {/* Right Column (The Three Pillars): Stacked Detail Blocks */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {pillars.map((pillar, idx) => {
              const markerColor = idx === 0 
                ? "text-industrial-red" 
                : idx === 1 
                  ? "text-engineering-blue" 
                  : "text-black";
              
              return (
                <div
                  key={pillar.id}
                  className="flex flex-col sm:flex-row gap-6 p-6 border border-gray-200 hover:border-black bg-white transition-all duration-300 text-left relative group hover:shadow-[4px_4px_0px_#111111]"
                >
                  {/* Large Structural Number Badge */}
                  <div className="font-display font-black text-4xl sm:text-5xl tracking-tighter shrink-0 select-none flex items-start sm:items-center">
                    <span className={markerColor}>
                      {pillar.number}
                    </span>
                    <span className="text-gray-100 group-hover:text-gray-300 font-sans font-light text-2xl ml-1">
                      /
                    </span>
                  </div>

                  {/* Detail */}
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-lg sm:text-xl text-black tracking-tight mb-2 flex items-center gap-2">
                      <span>{pillar.title}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-industrial-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <p className="font-sans text-sm text-gray-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Structural Horizontal Diagram under column split */}
        <div className="mt-16 pt-8 border-t border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-none bg-industrial-red" />
            <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest leading-none">
              Engineering workflow assurance verification protocol activated
            </span>
          </div>
          <div className="font-mono text-[10px] text-black bg-gray-50 border border-gray-200 px-3 py-1 rounded-none leading-none">
            JG_STRUCTURAL_HEALTH_METER_SECURE // 100% OK
          </div>
        </div>

      </div>
    </section>
  );
}
