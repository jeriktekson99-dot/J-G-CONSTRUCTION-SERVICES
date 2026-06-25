import React from 'react';
import { Shield, Mail, Phone, MapPin, User } from 'lucide-react';

interface PrivacyPolicyProps {
  onScrollToSection?: (id: string) => void;
}

export default function PrivacyPolicy({ onScrollToSection }: PrivacyPolicyProps) {
  return (
    <div className="bg-white pb-0 text-[#111111]">
      
      {/* PAGE HERO HEADER (WITHOUT BACKGROUND IMAGE) */}
      <section className="relative pt-32 pb-14 border-b border-black overflow-hidden bg-gray-50">
        <div className="w-full px-6 sm:px-12 md:px-20 lg:px-32 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 text-left">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="font-mono text-xs font-bold text-industrial-red uppercase tracking-widest">
                  LEGAL CHARTER // PRIVACY ASSURANCE
                </span>
              </div>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                PRIVACY POLICY
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
              J/G Construction Services Privacy Pledge
            </h2>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              At <strong>J/G Construction Services</strong>, we value the trust our clients place in us. That trust forms the bedrock of our service commitment. We are fully committed to protecting your personal data and ensuring compliance with all applicable legal requirements, including the <strong>Philippines Data Privacy Act of 2012 (Republic Act No. 10173)</strong>.
            </p>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, engage our engineering or general contracting services, or interact with our management team.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              1. Information We Collect
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              To provide premium-quality, cost-efficient architectural, civil, structural, electrical, and plumbing works, we may collect personal and professional identifiers, including but not limited to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-gray-200 bg-white">
                <span className="font-mono text-xs font-black text-industrial-red uppercase block mb-1">
                  // Contact Information
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Full name, corporate credentials, email address, telephone numbers, and physical mailing addresses.
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 bg-white">
                <span className="font-mono text-xs font-black text-engineering-blue uppercase block mb-1">
                  // Project Specifications
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Architectural concepts, site blueprints, structural designs, property deeds, land maps, and localized municipal data.
                </p>
              </div>

              <div className="p-4 border border-gray-200 bg-white">
                <span className="font-mono text-xs font-black text-industrial-red uppercase block mb-1">
                  // Financial Data
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Billing addresses, Tax Identification Numbers (TIN), payment details, and bid estimations.
                </p>
              </div>

              <div className="p-4 border border-gray-200 bg-white">
                <span className="font-mono text-xs font-black text-engineering-blue uppercase block mb-1">
                  // Digital Analytics
                </span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  IP addresses, browser types, cookie data, and user behavior trends captured during your visits to our website.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              2. How We Use Your Information
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              We process your data strictly to fulfill our engineering objectives and deliver high-standard technical solutions. This includes:
            </p>

            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Project Execution:</strong> Preparing project bids, setting accurate completion schedules, and formulating cost-efficient value engineering alternatives.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Communication:</strong> Sending technical updates, responding to project scopes, and issuing consultation requests.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Legal Compliance:</strong> Acquiring mandatory local municipal permits, engineering certifications, and ensuring compliance with local revenue codes.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Relationship Management:</strong> Bringing a personal touch to every project by aligning directly with project owners, general contractors, and corporate leads.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              3. Information Sharing and Disclosure
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              J/G Construction Services does not sell, trade, or lease your personal data. We only share information with certified entities necessary to complete building operations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="font-mono text-xs font-bold text-black uppercase block mb-2">// SUBCONTRACTORS</span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Verified civil, finishing, structural steel, or electrical sub-contractors and foremen who execute tasks strictly according to project specifications.
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="font-mono text-xs font-bold text-black uppercase block mb-2">// LEGAL AUTHORITIES</span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Regulatory boards and city government permitting units (such as the City Government of Imus) to formalize required construction privileges.
                </p>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200">
                <span className="font-mono text-xs font-bold text-black uppercase block mb-2">// PROFESSIONAL EXPERTS</span>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">
                  Third-party structural engineers, architects, or safety consultants when required for verification or administrative sign-offs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              4. Data Security and Retention
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              We maintain administrative, technical, and physical security measures to safeguard your blueprint designs, financial data, and personal records.
            </p>
            
            <div className="space-y-3 font-sans text-xs text-gray-700">
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-industrial-red shrink-0 mt-1.5"></div>
                <div>
                  <strong>Personnel Safeguards:</strong> We entrust field tasks to multi-disciplined professionals who strictly adhere to our quality policy and privacy safeguards.
                </div>
              </div>
              <div className="flex gap-2.5 items-start">
                <div className="h-1.5 w-1.5 bg-engineering-blue shrink-0 mt-1.5"></div>
                <div>
                  <strong>Data Preservation Limits:</strong> Your personal information is retained only as long as necessary to achieve the designated project scope, service contracts, or statutory retention requirements under Philippine tax and commercial laws.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              5. Your Rights Under the Data Privacy Act
            </h3>
            <p className="font-sans text-gray-600 text-sm leading-relaxed">
              As a data subject, you are entitled to specific statutory rights regarding the personal information we maintain:
            </p>

            <div className="space-y-4 pt-2">
              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Right to be Informed</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  You have the right to know whether your data is being processed.
                </p>
              </div>

              <div className="border-l-2 border-engineering-blue pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Right to Access</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  You may request a copy of the specific information we maintain about you or your commercial build-out.
                </p>
              </div>

              <div className="border-l-2 border-industrial-red pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Right to Rectification</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  You can request the update or correction of inaccuracies in your project metadata or identity profiles.
                </p>
              </div>

              <div className="border-l-2 border-engineering-blue pl-4">
                <span className="font-mono text-xs font-black text-black uppercase block">// Right to Erasure or Blocking</span>
                <p className="font-sans text-xs text-gray-600 mt-1 leading-relaxed">
                  You may request the removal of your personal information from our digital records if it is no longer required for active contract execution or legal requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6 */}
        <div className="w-full border-b border-gray-100 py-12 px-6 sm:px-12 md:px-20 lg:px-32 hover:bg-gray-50/30 transition-colors">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-lg sm:text-xl text-black uppercase tracking-tight">
              6. Cookies and Tracking Technologies
            </h3>
            <p className="font-sans text-gray-700 text-sm sm:text-base leading-relaxed">
              Our web platform utilizes baseline cookie protocols to improve performance, analyze user interaction patterns, and preserve aesthetic configurations. You can choose to configure your web browser settings to block cookies, though doing so may alter user functionality across specific interactive page modules.
            </p>
          </div>
        </div>

        {/* Section 7 */}
        <div className="w-full bg-gray-50 py-14 px-6 sm:px-12 md:px-20 lg:px-32">
          <div className="w-full space-y-4">
            <h3 className="font-display font-black text-xl text-black uppercase tracking-tight">
              7. Contact Us
            </h3>
            <p className="font-sans text-gray-600 text-xs sm:text-sm leading-relaxed">
              For updates regarding your information, data correction requests, or general inquiries concerning our data processing policies, please connect directly with our administration:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-white border border-gray-200 font-sans space-y-3">
                <div className="flex gap-2.5 items-center">
                  <Shield className="h-4 w-4 text-industrial-red shrink-0" />
                  <span className="font-mono text-xs font-bold text-gray-800">J/G Construction Services</span>
                </div>
                <div className="flex gap-2.5 items-center pb-2 border-b border-gray-100">
                  <User className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="font-sans text-xs text-gray-700">Founder: Engr. Gregorio A. Lacay</span>
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
