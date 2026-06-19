import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function TestimonialSlider() {
  const testimonials = [
    {
      quote: "Arrowhead didn't just build our app. They completely re-engineered our acquisition loop. CPA dropped 45% in week two.",
      author: "Omar S.",
      role: "CEO, YalaRide",
      company: "YalaRide"
    },
    {
      quote: "We were losing 82% of applicants in the funnel. They rebuilt the routing logic from scratch and 4x'd our placement rate.",
      author: "Sarah J.",
      role: "Director of Operations",
      company: "America Needs Nurses"
    },
    {
      quote: "No fluff. No vanity metrics. They mapped our entire revenue pipeline to specific, high-intent search queries. Unbelievable precision.",
      author: "Michael T.",
      role: "Founder",
      company: "Go-Jetter Tours"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-40 bg-white relative overflow-hidden flex items-center min-h-[80vh]">
      
      {/* Brutalist Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-extrabold text-slate-50 opacity-40 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
        VALIDATION.
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col md:flex-row items-center gap-16">
        
        {/* Navigation Dots */}
        <div className="flex md:flex-col gap-4 order-2 md:order-1">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 transition-all duration-500 ${
                idx === currentIndex ? "h-12 bg-brand-orange-500" : "h-4 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Massive Pull Quote */}
        <div className="flex-1 order-1 md:order-2 h-[300px] flex items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tighter mb-12">
                "{testimonials[currentIndex].quote}"
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">{testimonials[currentIndex].author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">{testimonials[currentIndex].author}</h4>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">
                    {testimonials[currentIndex].role} — {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
