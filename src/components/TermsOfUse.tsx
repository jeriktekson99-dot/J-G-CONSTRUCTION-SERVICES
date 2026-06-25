import React from 'react';
import { Shield, Mail, Phone, MapPin, User, FileText, HelpCircle } from 'lucide-react';

interface TermsOfUseProps {
  onScrollToSection?: (id: string) => void;
}

export default function TermsOfUse({ onScrollToSection }: TermsOfUseProps) {
  return (
    <div className="bg-white pb-0 text-[#111111]">
      
      {/* PAGE HERO HEADER (WITHOUT BACKGROUND IMAGE) */}
      <section className="relative pt-32 pb-14 border-b border-black overflow-hidden bg-gray-50">
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 text-left">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-industrial-red uppercase tracking-widest">
                  REGULATORY CHARTER // SITE ACCESS TERMS
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                TERMS OF USE
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* TERMS FLATTENED LAYOUT CONTENT (NOT WITHIN A CONTAINER) */}
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
              Agreement & Acceptance of Terms
            </h2>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              Welcome to the website of <strong>J/G Construction Services</strong>. By accessing or using our website, digital platforms, and online services, you agree to comply with and be bound by the following Terms of Use. Please review these terms carefully. If you do not agree to these terms, you should not use this website or rely on the digital materials provided herein.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              1. Acceptance of Agreement
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              You agree to the terms and conditions outlined in this Terms of Use Agreement ("Agreement") with respect to our site. This Agreement constitutes the entire and only agreement between J/G Construction Services and you, and supersedes all prior or contemporaneous agreements, representations, warranties, and understandings with respect to the site, the content, or services provided by or through the site.
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              2. Scope of Services
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              J/G Construction Services specializes in engineering, design, and building solutions within the Philippines, including:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>General Contracting:</strong> Completing turnkey construction projects, finishing, and structural works.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Renovation & Remodeling:</strong> Adaptive reuse of structures, custom fit-outs, and extension scopes.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Design & Build Services:</strong> Merging beautiful architectural designs with robust, safe structural calculations.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Comprehensive Utilities:</strong> Professional civil, structural, electrical, and plumbing engineering works.
                </div>
              </div>
            </div>

            <p className="font-sans text-gray-600 text-sm leading-relaxed pt-2">
              The digital materials, capability lists, project case studies, and informational articles published on this website are intended solely for educational, marketing, and preliminary project scoping purposes.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              3. Technical Disclaimers & Preliminary Estimates
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              Please note the following essential professional parameters regarding all dynamic digital previews or tools:
            </p>
            
            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Bids and Estimations:</strong> Any preliminary estimations, cost-per-square-meter values, or budget calculators rendered via this website or secondary digital intake forms do not constitute binding commercial quotes. Official contracting tenders require absolute verification from our design and planning group following comprehensive on-site inspections, material market checks, and soil diagnostics.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>No Engineering Liability for Digital Previews:</strong> The layout guides, portfolio images, and case studies display past projects or conceptual blueprints. They are not structural recommendations for your specific property. Structural engineering plans must always be signed, sealed, and computed directly by our licensed engineering personnel before building operations commence.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              4. Restrictions on User Conduct
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              When using our web forms, consultation scheduling platforms, or contacting our communications channels, you agree not to:
            </p>

            <div className="space-y-4 pt-2">
              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// False Information</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Submit false or misleading identification, project properties, or corporate credentials.
                </p>
              </div>

              <div className="border-l-2 border-engineering-blue pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Malicious Activity</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Upload corrupted files, malware, or destructive code sequences that could disrupt site operations or computational infrastructure.
                </p>
              </div>

              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Automated Scraping</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  Use automated scrapers or data extraction mechanisms to scrape our proprietary project portfolios or blueprint galleries.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              5. Indemnification & Limitation of Liability
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              J/G Construction Services and its management team shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to safely navigate our web platform or reliance upon generic information contained within our industry archive articles. You agree to indemnify and hold harmless our officers, engineers, and foremen from any liability, loss, claim, and expense related to your violation of this Agreement.
            </p>
          </div>
        </div>

        {/* Section 6 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              6. Governing Law and Legal Jurisdiction
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              This Agreement shall be treated as though it were executed and performed in the Philippines, and shall be governed by and construed in accordance with the laws of the <strong>Republic of the Philippines</strong>. Any legal action or cause of action arising directly out of these digital terms must be instituted strictly in the proper courts of <strong>Imus City, Cavite</strong>, to the exclusion of all other venues.
            </p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              7. Modifications to Terms
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              J/G Construction Services reserves the right to modify, append, or delete portions of these terms at any time without explicit individual notice. Your continued utilization of our website following the posting of modifications indicates clear compliance and absolute acceptance of the updated terms.
            </p>
          </div>
        </div>

        {/* Section 8 */}
        <div className="w-full bg-gray-50 py-14 px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-xl text-black uppercase tracking-tight">
              8. Contact and Administrative Information
            </h3>
            <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
              If you have questions, disputes, or clarifications regarding these operational Terms of Use, please reach out to our administrative hub:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-gray-200 font-sans space-y-3">
                <div className="flex gap-2.5 items-center">
                  <Shield className="h-4 w-4 text-industrial-red shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">J/G Construction Services</span>
                </div>
                <div className="flex gap-2.5 items-center pb-2 border-b border-gray-100">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="font-sans text-xs text-gray-700">Managing Officer: Engr. Gregorio A. Lacay</span>
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
                  <span className="font-mono text-xs font-bold text-gray-800">Official Email</span>
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
