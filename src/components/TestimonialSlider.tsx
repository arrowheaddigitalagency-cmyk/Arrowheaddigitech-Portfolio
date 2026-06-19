import React, { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight, CheckCircle2, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarUrl: string;
}

export default function TestimonialSlider() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const list: Testimonial[] = [
    {
      id: "t1",
      quote: "Arrowhead DigiTech engineered an incredibly fast rental portal connected to a custom lead generator. Their programmatic search tactics and audience grids resulted in massive scale-growth. Our leads pipeline grew immediately.",
      author: "Mohammed Rizwan",
      role: "CEO",
      company: "YalaRide",
      rating: 5,
      avatarUrl: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg"
    },
    {
      id: "t2",
      quote: "They turned our initial recruiting platform idea into a high-converting automated marketplace. From nurse verification dashboards to precise search campaigns, they constructed a bulletproof system that generates qualified employer contracts.",
      author: "Ray Washington",
      role: "Founder",
      company: "America Needs Nurses",
      rating: 5,
      avatarUrl: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg"
    },
    {
      id: "t3",
      quote: "The visual overhaul and programmatic ads structure completely shifted our acquisition cost. Their custom dashboard layouts give us complete clarity on where our capital is moving.",
      author: "Elena Rodriguez",
      role: "Operations Director",
      company: "Go-Jetter Tours",
      rating: 5,
      avatarUrl: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg"
    }
  ];

  const current = list[activeIdx];

  const handleNext = () => {
    setIsPlaying(false);
    setActiveIdx((prev) => (prev < list.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsPlaying(false);
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : list.length - 1));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Structural margins */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[400px] bg-brand-orange-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20 text-center mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
            // CLIENT PERFORMANCE REVIEWS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            WHAT THE CLIENTS PROVE.
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 max-w-2xl mx-auto">
            We are dedicated to scaling qualified customer acquisitions, establishing bulletproof brand authority, and building frictionless checkouts.
          </p>
        </div>

        {/* Testimonial Glass Frame */}
        <div className="glass-card rounded-[2rem] p-8 sm:p-12 md:p-16 border-2 border-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl shadow-slate-200/50">
          
          <Quote className="absolute top-8 right-12 w-32 h-32 text-slate-100 opacity-50 stroke-[1] pointer-events-none" />

          {/* Video / Avatar Section */}
          <div className="lg:w-1/3 flex justify-center w-full">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full p-2 bg-gradient-to-tr from-brand-orange-500 to-brand-blue-500">
              <div className="w-full h-full rounded-full overflow-hidden bg-white border-4 border-white relative group cursor-pointer" onClick={togglePlay}>
                
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: isPlaying ? 0.8 : 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    src={current.avatarUrl} 
                    alt={current.author} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: isPlaying ? 'brightness(0.7)' : 'brightness(1)' }}
                  />
                </AnimatePresence>
                
                {/* Simulated Video Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className={`w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center transition-all duration-300 ${isPlaying ? "scale-110 bg-brand-orange-500/50 border-brand-orange-500/50 text-white" : "group-hover:scale-110 group-hover:bg-white/50 text-white shadow-lg"}`}>
                    {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 ml-1 fill-current" />}
                  </div>
                </div>

              </div>
              
              {/* Floating Verified Badge */}
              <motion.div 
                key={`badge-${current.id}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="absolute -bottom-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full border-2 border-white shadow-lg flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Verified</span>
              </motion.div>
            </div>
          </div>

          <div className="lg:w-2/3 space-y-8 flex flex-col justify-center h-full text-left relative z-10">
            
            {/* Rating Stars */}
            <div className="flex gap-1.5 text-brand-orange-500">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-brand-orange-500 text-brand-orange-500 drop-shadow-[0_2px_4px_rgba(255,90,31,0.3)]" />
              ))}
            </div>

            {/* Quote Block */}
            <div className="min-h-[120px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote 
                  key={current.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-slate-800 text-xl sm:text-2xl font-medium leading-relaxed italic"
                >
                  "{current.quote}"
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author identification block */}
            <div className="pt-8 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="text-xl font-extrabold text-slate-900 block tracking-tight">
                    {current.author}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand-orange-500 tracking-widest block uppercase mt-1">
                    {current.role} @ {current.company}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Carousel controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 flex items-center justify-center bg-white border border-slate-200 hover:border-brand-orange-300 hover:bg-brand-orange-50 text-slate-600 hover:text-brand-orange-600 rounded-full shadow-sm transition-all cursor-pointer"
                  aria-label="Previous quote"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 flex items-center justify-center bg-slate-900 hover:bg-black text-white rounded-full shadow-lg shadow-slate-900/20 transition-all cursor-pointer"
                  aria-label="Next quote"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center items-center gap-3 mt-10">
          {list.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => {
                setIsPlaying(false);
                setActiveIdx(idx);
              }}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === activeIdx 
                  ? "w-12 bg-brand-orange-500 shadow-[0_0_10px_rgba(255,90,31,0.5)]" 
                  : "w-4 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
