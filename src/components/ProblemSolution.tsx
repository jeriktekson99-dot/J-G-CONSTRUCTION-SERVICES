import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldAlert, 
  CheckCircle 
} from 'lucide-react';

export default function ProblemSolution() {
  return (
    <div className="w-full bg-white">
      
      {/* ========================================================
          SECTION 1: THE PROBLEM STATEMENT (Split-Screen Layout)
          ======================================================== */}
      <section 
        id="problem-statement" 
        className="w-full border-t border-black bg-white py-16 sm:py-20 relative overflow-hidden"
      >
        <div className="absolute right-6 top-6 font-mono text-[9px] text-[#D41D1D] font-black select-none pointer-events-none tracking-widest">
          // CRITICAL_FAILURE_MODES // JG_SECURE_AUDIT
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            
            {/* Left Split (55%): The Narrative */}
            <div className="w-full lg:w-[55%] flex flex-col justify-between text-left">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-xs font-black text-industrial-red uppercase tracking-widest mb-4">
                  <ShieldAlert className="h-4 w-4" />
                  01 // THE INDUSTRY PROBLEM
                </span>
                
                <h2 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none uppercase mb-6">
                  Crumbling Timelines.<br />
                  <span className="text-gray-400">Compromised Safety.</span>
                </h2>
                
                <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  Traditional development models frequently suffer from structural design blindspots, leading to hazardous calculation errors and severe budget blowouts. When engineers work in isolation from builders, mistakes manifest directly on the field—triggering expensive code-compliance failures and halting operations.
                </p>

                <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed border-l-2 border-industrial-red pl-4 mb-8">
                  "Over 35% of major industrial and commercial projects encounter structural revision delays during local building code permit reviews, directly inflating raw material storage rates."
                </p>
              </div>

              {/* Footnote stamp */}
              <div className="border-t border-gray-100 pt-6 mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  GLOBAL CONSTRUCTION DISCREPANCY LEDGER 
                </span>
                <span className="font-mono text-[10px] text-industrial-red font-black">
                  [AUDIT_FAIL_V4]
                </span>
              </div>
            </div>

            {/* Right Split (45%): Visual Context - Risk Analysis Image */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center">
              <div className="relative">
                <img 
                  src="/assets/images/risk_metrics_concept_1780570881461.png" 
                  alt="Risk Analysis - Crumbling structural beam failure mode" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover border-2 border-black shadow-[6px_6px_0px_#111111]"
                />
                <div className="absolute bottom-3 left-3 bg-black text-white px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  Fig 1.1 // STRUCTURAL_STRESS_FAILURE
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: THE SOLUTION STATEMENT (Split-Screen Layout)
          ======================================================== */}
      <section 
        id="solution-statement" 
        className="w-full border-t border-gray-300 bg-white py-16 sm:py-20 relative overflow-hidden"
      >
        {/* Engineering mesh blueprint background effect on solution side */}
        <div className="absolute inset-x-0 bottom-0 top-0 opacity-[0.02] pointer-events-none select-none" style={{
          backgroundImage: `linear-gradient(#1B49B8 1.5px, transparent 1.5px), linear-gradient(90deg, #1B49B8 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }} />

        <div className="absolute right-6 top-6 font-mono text-[9px] text-[#1B49B8] font-black select-none pointer-events-none tracking-widest">
          // J/G ENGINEERING SERVICES SOLUTION // ACTIVE_STAMP_OK
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-stretch">
            
            {/* Left Split (55%): The Narrative */}
            <div className="w-full lg:w-[55%] flex flex-col justify-between text-left lg:order-2">
              <div>
                <span className="inline-flex items-center gap-2 font-mono text-xs font-black text-[#1B49B8] uppercase tracking-widest mb-4">
                  <CheckCircle className="h-4 w-4" />
                  02 // THE J/G SOLUTION
                </span>
                
                <h2 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none uppercase mb-6">
                  Excellent Workmanship.<br />
                  <span className="text-[#1B49B8]">Direct Accountability.</span>
                </h2>
                
                <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  We eliminate construction guesswork entirely. By pairing excellent workmanship with continuous on-site supervision, J/G Engineering Services ensures your architectural finishes, structural columns, electrical distribution boards, and plumbing networks are executed flawlessly to code specifications from day one.
                </p>

                <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed border-l-2 border-[#1B49B8] pl-4 mb-8">
                  "Our systematic quality checks guarantee 100% compliance with client requirements, providing total customer satisfaction through premium-quality service delivered on time and within budget."
                </p>
              </div>

              {/* Footnote stamp */}
              <div className="border-t border-gray-100 pt-6 mt-6 flex items-center justify-between">
                <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  NSCP & IBC STRUCTURAL COMPLIANCE VERIFICATION 
                </span>
                <span className="font-mono text-[10px] text-[#1B49B8] font-black">
                  [PASS_STAMP_2026]
                </span>
              </div>
            </div>

            {/* Right Split (45%): Visual Context - Solution Blueprint Image */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center lg:order-1">
              <div className="relative">
                <img 
                  src="/assets/images/secure_solution_blueprint_1780570898725.png" 
                  alt="Solution Statement - Unified blueprint coordinate model simulation" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover border-2 border-black shadow-[6px_6px_0px_#1B49B8]"
                />
                <div className="absolute bottom-3 left-3 bg-[#1B49B8] text-white px-3 py-1 font-mono text-[10px] uppercase tracking-wider">
                  Fig 2.1 // ZERO_ERRORS_SIMULATION_OK
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
