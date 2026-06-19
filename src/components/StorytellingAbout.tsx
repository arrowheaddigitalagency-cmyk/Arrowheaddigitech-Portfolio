import React from "react";
import { ArrowRight, Target, Activity } from "lucide-react";
import { motion } from "motion/react";

export default function StorytellingAbout() {
  return (
    <section id="about" className="py-32 relative bg-white overflow-hidden text-left">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Typographic Art Left Column (Spans 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-px bg-slate-900" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-slate-900 font-bold uppercase">
                  OPERATIONAL DOCTRINE
                </span>
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tighter mb-8">
                WE DO NOT GUESS. <br />
                <span className="text-slate-400">WE COMPUTE.</span>
              </h2>
              
              <div className="space-y-6 text-slate-600 font-medium text-lg leading-relaxed max-w-md">
                <p>
                  Most agencies rely on aesthetic subjectivity. Arrowhead operates on pure mathematical telemetry. We build digital infrastructure explicitly designed to capture market share and eliminate friction.
                </p>
                <p>
                  Founded by engineers and scaling experts, our protocol merges deep React architecture with aggressive media buying algorithms.
                </p>
              </div>

              <div className="mt-12 flex items-center gap-8">
                <div className="space-y-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tighter">99.2%</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Retention</span>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="space-y-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-mono tracking-tighter">$15M+</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Managed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Asymmetrical Image Composition Right Column (Spans 7) */}
          <div className="lg:col-span-7 relative">
            
            {/* Background Massive Text Watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] font-extrabold text-slate-50 opacity-50 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
              SCALE
            </div>

            <div className="relative z-10 w-full h-[600px] flex items-center justify-center">
              
              {/* Primary Image - Stark brutalist crop */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-3/4 h-3/4 bg-slate-100 overflow-hidden relative shadow-2xl"
              >
                <img 
                  src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg" 
                  alt="Arrowhead Team Operation" 
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
                {/* Minimalist Overlay Box */}
                <div className="absolute bottom-0 left-0 bg-white p-6 md:p-8 w-3/4 sm:w-2/3">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-4 h-4 text-brand-orange-500" />
                    <span className="text-[10px] font-mono tracking-widest text-slate-900 font-bold uppercase">Precision Targeted</span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">Every line of code and ad dollar is mapped to acquisition.</p>
                </div>
              </motion.div>

              {/* Secondary Overlapping Abstract Element */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-10 right-0 w-1/3 h-1/2 bg-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between p-6"
              >
                <div className="w-full flex justify-end">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div>
                  <Activity className="w-6 h-6 text-brand-orange-500 mb-4" />
                  <p className="text-white font-mono text-xs uppercase tracking-widest opacity-80">System Live.</p>
                </div>
                {/* Abstract grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
              </motion.div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
