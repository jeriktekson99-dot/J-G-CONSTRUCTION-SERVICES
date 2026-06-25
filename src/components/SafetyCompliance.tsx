import React from 'react';
import { Shield, Mail, Phone, MapPin, User, HelpCircle } from 'lucide-react';

interface SafetyComplianceProps {
  onScrollToSection?: (id: string) => void;
}

export default function SafetyCompliance({ onScrollToSection }: SafetyComplianceProps) {
  return (
    <div className="bg-white pb-0 text-[#111111]">
      
      {/* PAGE HERO HEADER (WITHOUT BACKGROUND IMAGE) */}
      <section className="relative pt-32 pb-14 border-b border-black overflow-hidden bg-gray-50">
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 text-left">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-industrial-red uppercase tracking-widest">
                  REGULATORY CHARTER // SITE PROTOCOLS
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                SAFETY STANDARD COMPLIANCE POLICY
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* POLICY FLATTENED LAYOUT CONTENT (NOT WITHIN A CONTAINER) */}
      <section className="w-full text-left pt-12 pb-0 bg-white">
        
        {/* Effective and Last Updated Meta - Flat border block */}
        <div className="w-full border-b border-gray-100 py-6 px-6 sm:px-12 md:px-20 lg:px-32 bg-gray-50/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-gray-600">
            <div>
              <span className="font-black text-gray-800">// EFFECTIVE DATE:</span> June 7, 2026
            </div>
            <div>
              <span className="font-black text-gray-800">// LAST UPDATED:</span> June 7, 2026
            </div>
          </div>
        </div>

        {/* Introduction Section */}
        <div className="w-full border-b border-gray-100 py-10 px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="space-y-4">
            <h2 className="font-display font-black text-xl sm:text-2xl text-black uppercase tracking-tight">
              Safety First, Precision Always
            </h2>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              At <strong>J/G Construction Services</strong>, structural precision and operational safety are inseparable. We believe that every accident is preventable, and we are completely dedicated to maintaining a zero-incident, hazard-free workplace across all our structural design, civil engineering, general contracting, and renovation projects.
            </p>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              This Safety Standard Compliance Policy outlines our comprehensive technical guidelines, operational protocols, and mandatory protection requirements. It is designed to ensure strict compliance with the <strong>Philippine Occupational Safety and Health Standards (OSHS)</strong>, <strong>Republic Act No. 11058 (An Act Strengthening Compliance with OSH Standards)</strong>, and <strong>DOLE Department Order No. 13 (Guidelines Governing Occupational Safety and Health in the Construction Industry)</strong>.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              1. Leadership Commitment & Accountability
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              Our management team, engineering staff, and on-site foremen take proactive ownership of structural and site safety:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Construction Safety and Health Program (CSHP):</strong> Every project undertaken by J/G Construction Services operates under a localized CSHP approved by the Department of Labor and Employment (DOLE).
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Safety Personnel Placement:</strong> Certified Safety Officers and multi-disciplined site supervisors are deployed to project sites to systematically monitor structural setups, enforce hazard mitigations, and stop any operations deemed unsafely executed.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              2. Personal Protective Equipment (PPE) Mandates
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              All personnel, sub-contractors, engineering consultants, and authorized site visitors must be equipped with and strictly utilize mandatory, industry-certified Personal Protective Equipment (PPE) at all times within active construction zones:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Class A Hard Hats:</strong> Mandatory impact-resistant head protection across all structural shell and framing operations.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Steel-Toe Safety Footwear:</strong> Heavy-duty boots to minimize puncture, compression, and impact hazards on-site.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>High-Visibility Safety Vests:</strong> Bright, reflective gear to maximize visual tracking near heavy equipment, machinery, and logistics vectors.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Task-Specific Protective Gear:</strong> Premium safety harnesses and double-lanyard lifelines for high-elevation framing, proper face shields/goggles for structural welding, and ergonomic heavy-duty gloves for material handling.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              3. Site-Specific Hazard Mitigation & Safety Measures
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              To guarantee operational control and remove high-risk structural variables, we execute the following environmental parameters:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Fall Protection and Edge Guarding:</strong> All open perimeters, scaffolding systems, floor-slab voids, and open trenches must be securely barricaded, wrapped in high-visibility safety mesh, and clearly marked with technical warning labels.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Scaffolding and Framework Integrity:</strong> Scaffolding setups must be erected, inspected, and signed off exclusively by authorized structural technicians before deployment. Overloading scaffolding systems past specified design weight thresholds is strictly prohibited.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Housekeeping Excellence:</strong> Active project sites must adhere to disciplined structural tidiness. Walkways, fire egress corridors, and structural paths must remain completely clear of building debris, electrical wiring clusters, and unstacked masonry modules.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              4. Heavy Equipment & Tools Standardization
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              Our high-efficiency systems depend on rigorous maintenance protocols for tools and mechanical assets:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Pre-Operational Testing:</strong> Heavy industrial equipment, earthmovers, cement mixtures, and mechanical power tools must undergo comprehensive pre-operational checks by certified operators prior to daily use.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Lockout/Tagout (LOTO):</strong> Malfunctioning, compromised, or uncalibrated mechanical tools must be immediately tagged "OUT OF SERVICE," disconnected from power configurations, and isolated to prevent accidental field operation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              5. On-Site Safety Training & Toolbox Meetings
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              Clear, ongoing communication keeps our workforce aligned, dynamic, and safe:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Daily Toolbox Meetings:</strong> Before starting field operations, site foremen and safety officers must run concise toolbox alignments detailing immediate hazards, heavy machinery paths, weather factors, and localized structural targets for the day.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Safety Inductions:</strong> New hires, tradesmen, and finishing sub-contractors must clear a formal safety induction outlining J/G Construction Services' strict zero-incident parameters before gaining access to any structural workspace.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              6. Emergency Response & Incident Management
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              In the event of an unexpected site emergency, environmental shift, or incident, our operations follow a strict response chain:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>First Aid Stations:</strong> Every active project location must feature fully stocked first aid kits, eye-wash modules, and designated, trained first-response personnel.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Emergency Signage and Contact Sheets:</strong> High-visibility graphics charting emergency assembly locations, medical transit paths, and local municipal emergency numbers (fire, police, city hospitals) must be prominently displayed across site command offices.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Mandatory Incident Reporting:</strong> Minor near-miss events or any localized site accidents must be formally documented, reviewed, and audited by our engineering directors within 24 hours to reinforce existing site design parameters and prevent recurrences.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              7. Code of Discipline and Enforcement
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              Failure to abide by our established safety rules undermines our structural engineering standards and places lives at risk. Non-compliance by any individual on-site will be dealt with immediately:
            </p>

            <div className="space-y-4 pt-2">
              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// First Offense</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Verbal warning coupled with immediate on-the-spot mandatory correction of the safety infraction.
                </p>
              </div>

              <div className="border-l-2 border-engineering-blue pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Second Offense</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Written administrative warning and formal record entry under the individual’s or sub-contractor’s profile.
                </p>
              </div>

              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Third Offense</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Immediate removal from the project site, suspension of work permissions, or absolute cancellation of service contracts.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8 */}
        <div className="w-full bg-gray-50 py-14 px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-xl text-black uppercase tracking-tight">
              8. Contact for Safety & Compliance Inquiries
            </h3>
            <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
              For questions regarding our technical building safety standards, safety compliance auditing paperwork, or to report site-specific hazard observations, please communicate directly with our management center:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-gray-200 font-sans space-y-3">
                <div className="flex gap-2.5 items-center">
                  <Shield className="h-4 w-4 text-industrial-red shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">J/G Construction Services</span>
                </div>
                <div className="flex gap-2.5 items-center pb-2 border-b border-gray-100">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="font-sans text-xs text-gray-700">Managing Director: Engr. Gregorio A. Lacay</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <MapPin className="h-4 w-4 text-engineering-blue shrink-0 mt-0.5" />
                  <span className="font-sans text-xs text-gray-600 leading-relaxed">
                    Lot 8, Block 6, Legian 2D Subdivision, Carsadang Bago I, Imus City, Cavite, Philippines
                  </span>
                </div>
              </div>

              <div className="p-5 bg-white border border-gray-200 font-sans space-y-3">
                <div className="flex gap-2.5 items-center">
                  <Phone className="h-4 w-4 text-industrial-red shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">Direct Hotline</span>
                </div>
                <div className="font-sans text-xs text-gray-700 pb-2 border-b border-gray-100">
                  (+63) 945 308 7399
                </div>
                <div className="flex gap-2.5 items-center">
                  <Mail className="h-4 w-4 text-engineering-blue shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">Compliance Email</span>
                </div>
                <div className="font-sans text-xs text-gray-700">
                  <a href="mailto:jgconstruction880@gmail.com" className="text-engineering-blue hover:text-industrial-red transition-colors underline font-medium">
                    jgconstruction880@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
}
