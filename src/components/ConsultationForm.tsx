import React from 'react';

interface ConsultationFormProps {
  onScrollToSection: (id: string) => void;
}

export default function ConsultationForm({ onScrollToSection }: ConsultationFormProps) {
  return (
    <section 
      id="consultation" 
      className="bg-white py-16 border-t border-black relative overflow-hidden animate-fade-in"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/src/assets/images/field_excellence_operations_1780503096054.png" 
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
  );
}
