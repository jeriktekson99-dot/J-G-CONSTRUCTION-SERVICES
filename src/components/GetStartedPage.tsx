import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle, 
  FileCode2, 
  Send, 
  Plus, 
  Minus, 
  HelpCircle, 
  ShieldAlert, 
  Compass, 
  CheckSquare 
} from 'lucide-react';
import { ContactState } from '../types';
import { dataStore } from '../utils/dataStore';

interface GetStartedPageProps {
  onScrollToSection: (id: string) => void;
}

interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
  category: 'Logistics' | 'Technical Specifications' | 'Procurement' | 'Compliance';
}

export default function GetStartedPage({ onScrollToSection }: GetStartedPageProps) {
  const [formData, setFormData] = useState<ContactState>({
    fullName: "",
    companyEmail: "",
    projectScope: "",
    phone: "",
    companyName: "",
    serviceCategory: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      num: "01",
      category: "Technical Specifications",
      question: "What is J/G Construction Services' typical turnaround time for a proposal?",
      answer: "We deliver initial feasibility analyses and comprehensive bidding proposals within 3 to 5 business days from the receipt of project blueprint assets, geotechnical reports, and structural metadata. For site emergency audits or structural stamp validations, we can deploy engineers for physical site reviews within 24 hours of notification."
    },
    {
      id: "faq-2",
      num: "02",
      category: "Compliance",
      question: "Are your calculations and designs certified under local regional building codes?",
      answer: "Absolutely. All engineering calculations, structural models, and drawing stamps strictly comply with the National Structural Code of the Philippines (NSCP), the International Building Code (IBC), and municipal zoning ordinances. Every blueprint is reviewed and wet-sealed by a licensed professional Civil & Structural Engineer."
    },
    {
      id: "faq-3",
      num: "03",
      category: "Logistics",
      question: "How does J/G prevent project delays and ensure efficient material delivery?",
      answer: "We employ highly structured pre-construction workflows and detailed Build Information Modeling (BIM) programs to detect structural clashes before fabrication begins. Additionally, we coordinate hand-in-hand with logistical suppliers using 'Just-In-Time' steel and concrete dispatch protocols, avoiding congested build sites in dense commercial centers."
    },
    {
      id: "faq-4",
      num: "04",
      category: "Procurement",
      question: "How do you achieve material cost-efficiency without compromising structural safety?",
      answer: "Through precise value engineering. Instead of standard high-margin raw material bulk over-ordering, our estimators use 3D laser-point topography mapping and structural stress distribution models. This allows us to optimize gusset plates, steel truss configurations, and concrete volume ratios perfectly to trim material waste by up to 15%."
    },
    {
      id: "faq-5",
      num: "05",
      category: "Technical Specifications",
      question: "Can J/G perform capacity ratings and retrofitting designs on pre-existing structures?",
      answer: "Yes, we have specialized credentials in structural forensic evaluation and seismic retrofitting. We conduct on-site core compression testing, ultrasonic non-destructive weld reviews, and finite element analysis to design robust carbon-fiber polymer (CFRP) wrapping or structural steel jacketing to restore stability."
    },
    {
      id: "faq-6",
      num: "06",
      category: "Compliance",
      question: "What safety protocols are practiced on J/G active engineering project fields?",
      answer: "Safety is our absolute foundational baseline. We maintain a proud zero-incident field record through daily pre-operations risk assessments, mandatory certified safety officer walkovers, strict double-locking scaffolding tieback protocols, and comprehensive hot-work permit guidelines."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyEmail || !formData.phone || !formData.projectScope || !formData.serviceCategory) {
      alert("Please complete all required fields, including Service Category.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      dataStore.addLead({
        fullName: formData.fullName,
        companyEmail: formData.companyEmail,
        phone: formData.phone || "N/A",
        projectScope: formData.projectScope,
        serviceCategory: formData.serviceCategory
      });
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyEmail: "",
      projectScope: "",
      phone: "",
      companyName: "",
      serviceCategory: ""
    });
    setSubmitted(false);
  };

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="bg-white pt-24 pb-16 text-[#111111]">
      
      {/* GET STARTED HERO HEADER */}
      <section className="relative py-14 border-b border-black overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="/assets/images/rebar_foundation_1780503628161.png" 
            alt="Get started background" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-[0.55] select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
            <div>
              <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-2">
                PROJECT ESTIMATION
              </span>
              <h1 className="font-display font-extrabold text-[#111111] text-3xl sm:text-4xl lg:text-5xl tracking-tight uppercase leading-none">
                Get Started
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: LET'S BUILD SOMETHING UNCOMPROMISING (Header & Form Grid) */}
      <section className="relative py-16 border-b border-gray-300 bg-white">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Premium Contact details and introductory statements */}
            <div className="lg:col-span-5 pt-4 text-left">
              <div>
                <span className="font-mono text-xs font-black text-industrial-red uppercase tracking-widest block mb-4">
                  SECURE FIELD ESTIMATING PIPELINE
                </span>
                
                <h2 className="font-display font-black text-2xl sm:text-3xl text-black mb-6">
                  Let's Build Something Uncompromising.
                </h2>
                
                <p className="font-sans text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  Submit your blueprints, draft specifications, or structural concerns via our secure, high-integrity pipeline. Our licensed structural civil engineers evaluate metrics and correspond with detailed estimations within 2 business hours.
                </p>
              </div>

              {/* Verified Contact Meta Information Cards */}
              <div className="space-y-6 pt-6 border-t border-gray-200">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                      DIRECT DIGITAL DISPATCH
                    </span>
                    <a 
                      href="mailto:jgconstruction880@gmail.com" 
                      className="font-display font-bold text-sm sm:text-base text-black hover:text-[#D41D1D] transition-colors"
                    >
                      jgconstruction880@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                      REGIONAL SITE OFFICE HOTLINE
                    </span>
                    <a 
                      href="tel:+639453087399" 
                      className="font-display font-bold text-sm sm:text-base text-black hover:text-[#1B49B8] transition-colors"
                    >
                      (+63) 945 308 7399
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gray-50 border border-gray-200 text-black shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-mono text-[9px] text-gray-400 uppercase tracking-widest font-black leading-none mb-1">
                      HQ DESIGN & CONTRACTING SUITE
                    </span>
                    <p className="font-sans text-xs sm:text-sm text-gray-700 font-medium">
                      Lot 8, Block 6, Legian 2D Subdivision, Carsadang Bago I, Imus City, Cavite, Philippines
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Right Column: High-Contrast Technical Form Box */}
            <div className="lg:col-span-7 bg-white border-2 border-black p-6 sm:p-10 relative shadow-[8px_8px_0px_#1B49B8] mt-4 lg:mt-0">
              
              <div className="absolute top-2.5 right-3 text-gray-300 font-mono text-[9px] select-none pointer-events-none">
                JG_VAL_FORM_V26
              </div>

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center"
                >
                  <div className="p-4 bg-green-50 border-2 border-green-500 rounded-full text-green-600 mb-6">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-black uppercase mb-3 text-center">
                    SPECIFICATIONS INGESTED
                  </h3>
                  
                  <p className="max-w-md text-gray-600 font-sans text-sm leading-relaxed mb-8 text-center">
                    Your structural scope has been queued into our estimator database. A coordinating civil engineer will correspond with full bidding valuations shortly.
                  </p>

                  <div className="bg-[#fafafa] border border-black p-4 w-full text-left font-mono text-xs text-black mb-8 overflow-x-auto max-w-sm mx-auto">
                    <div className="text-gray-400 font-bold">// JG_LEDGER_RECEIPT //</div>
                    <div className="mt-2">CLIENT: <span className="font-bold">{formData.fullName}</span></div>
                    <div>EMAIL: {formData.companyEmail}</div>
                    <div>PHONE: {formData.phone}</div>
                    <div>ROUTE_STAMP: JG_{formData.fullName ? formData.fullName.substring(0,3).toUpperCase() : "USR"}_0226</div>
                    <div className="text-industrial-red font-black mt-2">STATUS: SECURE_ESTIMATING_QUEUE</div>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-white bg-black hover:bg-gray-900 border-2 border-black font-display font-bold px-8 py-3.5 rounded-none transition-colors cursor-pointer text-xs uppercase tracking-widest"
                  >
                    Submit Another Project
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  
                  {/* Grid Container for 2 per row layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                         Name <span className="text-industrial-red">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white border border-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                        placeholder="e.g. Juan dela Cruz"
                      />
                    </div>

                    <div>
                      <label htmlFor="companyEmail" className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                        Email <span className="text-industrial-red">*</span>
                      </label>
                      <input
                        type="email"
                        id="companyEmail"
                        required
                        value={formData.companyEmail}
                        onChange={(e) => setFormData({ ...formData, companyEmail: e.target.value })}
                        className="w-full bg-white border border-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                        placeholder="e.g. j.delacruz@gmail.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono font-black text-[#111111] uppercase tracking-wider mb-2">
                        Phone Number <span className="text-industrial-red">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone || ""}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-white border border-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans"
                        placeholder="e.g. +63 (0917) 555-0901"
                      />
                    </div>

                    {/* Dropdown Category Box, styled EXACTLY like the input fields */}
                    <div>
                      <label htmlFor="serviceCategory" className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                        Project Scope Category <span className="text-industrial-red">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="serviceCategory"
                          required
                          value={formData.serviceCategory || ""}
                          onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                          className="w-full bg-white border border-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black font-sans appearance-none cursor-pointer pr-10"
                        >
                          <option value="" disabled className="text-gray-400">-- Choose Service Area --</option>
                          {dataStore.getServices().map((service) => (
                            <option key={service.id} value={service.title} className="text-black">
                              {service.title}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* High priority last element - Project Scope & Requirements */}
                  <div>
                    <label htmlFor="projectScope" className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                      Project Scope & Structural Requirements <span className="text-industrial-red">*</span>
                    </label>
                    <textarea
                      id="projectScope"
                      required
                      rows={4}
                      value={formData.projectScope}
                      onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                      className="w-full bg-white border border-black px-4 py-3 text-sm rounded-none focus:outline-none focus:ring-2 focus:ring-[#1B49B8] text-black placeholder-gray-400 font-sans resize-y"
                      placeholder="Please note down specific structural objectives, load variables, design intents or contract requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-industrial-red hover:bg-[#B31515] disabled:bg-gray-400 text-white font-display font-extrabold tracking-widest text-xs uppercase py-4.5 px-6 rounded-none transition-all duration-300 shadow-[4px_4px_0px_#111111] active:shadow-[0px_0px_0px_#111111] border-2 border-black cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    {loading ? (
                      <>
                        <FileCode2 className="h-4.5 w-4.5 animate-spin" />
                        <span>VERIFYING SYSTEM CALCULATIONS...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Ingest Proposal Parameters</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-mono text-gray-400 text-center uppercase tracking-normal">
                    All calculations mapped directly to standard engineering rules. Privacy strictly secured.
                  </p>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: FREQUENTLY ASKED QUESTIONS (FAQs) */}
      <section className="bg-white py-16 border-t border-gray-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="border-b border-black pb-4 mb-12 text-center">
            <span className="font-mono text-xs font-black text-[#1B49B8] uppercase tracking-widest block mb-1">
              JG_KNOWLEDGE_BASE // TECHNICAL CLEARANCE
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-black uppercase tracking-tight">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>

          {/* Interactive Structural Accordion List */}
          <div className="space-y-4 text-left">
            {faqs.map((f) => {
              const isOpen = openFaqId === f.id;
              return (
                <div 
                   key={f.id}
                   className="border border-black bg-white transition-all duration-300 hover:shadow-[4px_4px_0px_#111111]"
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => toggleFaq(f.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      {/* Numeric Indicator */}
                      <span className="font-mono text-xs font-black text-[#1B49B8] bg-gray-50 border border-gray-200 px-2 py-0.5 shrink-0">
                        {f.num}
                      </span>
                      {/* Question Text */}
                      <span className="font-display font-extrabold text-[#111111] text-sm sm:text-base leading-snug">
                        {f.question}
                      </span>
                    </div>

                    {/* Expand Icons in red on active */}
                    <div className="shrink-0 ml-2">
                      <div className={`p-1.5 border border-black rounded-none transition-colors ${
                        isOpen ? 'bg-black text-white' : 'bg-white text-black'
                      }`}>
                        {isOpen ? (
                          <Minus className="h-3.5 w-3.5" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Answer area */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-100 text-[#444444] font-sans text-xs sm:text-sm leading-relaxed space-y-3">
                          <p>{f.answer}</p>
                          <div className="flex items-center gap-3 pt-3">
                            <span className="font-mono text-[9px] text-[#D41D1D] font-black uppercase tracking-widest bg-red-50 border border-red-200 px-2 py-0.5">
                              CATEGORY: {f.category}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Quick Technical Help line */}
          <div className="mt-12 bg-gray-50 border border-black p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <span className="font-mono text-[9.5px] text-[#1B49B8] font-black uppercase tracking-widest block">
                STILL REQUIRE CALIBRATION CHECKS?
              </span>
              <p className="font-sans text-xs text-gray-500">
                If your technical scenario is highly customized, speak directly to our professional engineering coordinators.
              </p>
            </div>
            <a 
              href="mailto:jgconstruction880@gmail.com"
              className="inline-flex items-center justify-center bg-black hover:bg-gray-900 border border-black text-white font-mono text-xs font-black uppercase py-3 px-6 rounded-none transition-colors tracking-widest self-start sm:self-center cursor-pointer cursor-pointer"
            >
              jgconstruction880@gmail.com
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
