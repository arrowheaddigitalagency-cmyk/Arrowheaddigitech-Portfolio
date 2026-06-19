import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, Star } from "lucide-react";

export default function TestimonialSlider() {
  const testimonials = [
    {
      quote: "Arrowhead Marketing helped build a powerful car rental marketplace with a smooth website, mobile app, and strong marketing strategy. Their Google Ads, SEO, and brand awareness campaigns helped reach more customers and grow faster.",
      author: "Mohammed Rizwan",
      role: "CEO",
      company: "YalaRide"
    },
    {
      quote: "Arrowhead Marketing turned our idea into a complete healthcare professional marketplace. From employer and nurse dashboards to campaign management and brand awareness, they helped create a platform that connects nurses with real job opportunities.",
      author: "Ray Washington",
      role: "Founder",
      company: "America Needs Nurses"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-40 bg-white relative overflow-hidden flex items-center min-h-[80vh] border-t border-slate-200">
      
      {/* Brutalist Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 text-[15vw] font-extrabold text-slate-50 opacity-40 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
        VALIDATION.
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col md:flex-row items-center gap-16">
        
        {/* Navigation Dots */}
        <div className="flex md:flex-col gap-4 order-2 md:order-1">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-1.5 transition-all duration-500 rounded-full ${
                idx === currentIndex ? "h-12 bg-brand-orange-500" : "h-4 bg-slate-200 hover:bg-slate-300"
              }`}
            />
          ))}
        </div>

        {/* Massive Pull Quote */}
        <div className="flex-1 order-1 md:order-2 h-[400px] sm:h-[300px] flex items-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full"
            >
              {/* Star Indicators */}
              <div className="flex gap-1 mb-8 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              <Quote className="absolute -top-10 -left-6 w-20 h-20 text-brand-orange-500/5 -z-10" />

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-relaxed tracking-tight mb-12">
                "{testimonials[currentIndex].quote}"
              </h2>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-950 text-white flex items-center justify-center font-bold">
                  {testimonials[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {testimonials[currentIndex].author}
                  </h4>
                  <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">
                    {testimonials[currentIndex].role} of {testimonials[currentIndex].company}
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
