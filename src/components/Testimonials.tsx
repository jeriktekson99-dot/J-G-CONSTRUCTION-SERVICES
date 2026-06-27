import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { TestimonialItem } from '../types';


export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState<TestimonialItem[]>([]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('jg_testimonials');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setTestimonials(parsed.filter(t => !t.isDeleted));
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  if (testimonials.length === 0) {
    return null;
  }

  const hasMoreThanThree = testimonials.length > 3;

  return (
    <section 
      id="testimonials" 
      className="py-16 bg-white border-t border-gray-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="border-b border-black pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-black text-engineering-blue uppercase tracking-widest">
                Client Perspectives
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-black tracking-tight">
              Let Our Executions Do the Talking
            </h2>
          </div>
          <p className="text-gray-500 font-mono text-xs max-w-sm text-left md:text-right">
            [TRUST MATRIX / 100% VERIFIED INDEPENDENT REVIEWS]
          </p>
        </div>

        {/* 3-Column side-by-side grid OR slow infinite loop marquee */}
        {!hasMoreThanThree ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((test, idx) => {
              const isRedStars = idx % 2 === 0;
              const starColor = isRedStars ? "text-industrial-red fill-industrial-red" : "text-engineering-blue fill-engineering-blue";
              
              return (
                <div
                  key={test.id}
                  className="bg-white border border-black p-6 sm:p-8 flex flex-col justify-between hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-all duration-300 relative text-left"
                >
                  {/* Visual quote accent in the top corner */}
                  <div className="absolute top-4 right-4 text-gray-100 font-serif select-none pointer-events-none">
                    <Quote className="h-10 w-10 text-gray-100" />
                  </div>

                  <div>
                    {/* Rating Stars - 5 star icons */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(test.stars)].map((_, sIdx) => (
                        <Star key={sIdx} className={`h-4.5 w-4.5 ${starColor}`} />
                      ))}
                    </div>

                    {/* Body quote with clean structural styling */}
                    <blockquote className="text-[#111111] font-sans font-medium text-base sm:text-lg leading-relaxed mb-8 relative z-10 break-words w-full">
                      "{test.quote}"
                    </blockquote>
                  </div>

                  {/* Author footer markup */}
                  <div className="border-t border-gray-100 pt-5 mt-auto flex flex-col">
                    <span className="font-display font-extrabold text-[#111111] text-base leading-none">
                      {test.author}
                    </span>
                    <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1.5 leading-none">
                      {test.role} // {test.organization}
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {hasMoreThanThree ? (
        <div className="relative w-full overflow-hidden py-4">
          {/* Subtle gradient overlays on sides to fade edge of scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Row moving to the RIGHT */}
          <div className="flex w-max">
            <motion.div
              className="flex gap-8 px-4"
              initial={{ x: "-50%" }}
              animate={{ x: "0%" }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                duration: 40,
              }}
            >
              {/* Duplicate testimonials list to ensure seamless looping */}
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((test, idx) => {
                const isRedStars = idx % 2 === 0;
                const starColor = isRedStars ? "text-industrial-red fill-industrial-red" : "text-engineering-blue fill-engineering-blue";
                
                return (
                  <div
                    key={`${test.id}-${idx}`}
                    className="w-[350px] sm:w-[400px] shrink-0 bg-white border border-black p-6 sm:p-8 flex flex-col justify-between hover:shadow-[6px_6px_0px_rgba(0,0,0,0.1)] transition-all duration-300 relative text-left"
                  >
                    {/* Visual quote accent in the top corner */}
                    <div className="absolute top-4 right-4 text-gray-100 font-serif select-none pointer-events-none">
                      <Quote className="h-10 w-10 text-gray-100" />
                    </div>

                    <div>
                      {/* Rating Stars - 5 star icons */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(test.stars)].map((_, sIdx) => (
                          <Star key={sIdx} className={`h-4.5 w-4.5 ${starColor}`} />
                        ))}
                      </div>

                      {/* Body quote with clean structural styling */}
                      <blockquote className="text-[#111111] font-sans font-medium text-base sm:text-lg leading-relaxed mb-8 relative z-10 break-words w-full">
                        "{test.quote}"
                      </blockquote>
                    </div>

                    {/* Author footer markup */}
                    <div className="border-t border-gray-100 pt-5 mt-auto flex flex-col">
                      <span className="font-display font-extrabold text-[#111111] text-base leading-none">
                        {test.author}
                      </span>
                      <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest mt-1.5 leading-none">
                        {test.role} // {test.organization}
                      </span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
