import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function InteractiveHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden text-left selection:bg-brand-orange-500 selection:text-white">
      
      {/* Absolute Precision Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none" />

      {/* Minimalist Focal Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-brand-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full flex flex-col items-center mt-20">
        
        {/* Monospaced Blueprint Tag */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full mb-10 bg-white/5 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-slate-300 uppercase font-bold">
            Arrowhead Digital Systems // Protocol 2.0
          </span>
        </motion.div>

        {/* Brutalist Hero Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl sm:text-7xl lg:text-[7rem] font-extrabold text-white leading-[0.95] tracking-tighter text-center max-w-5xl"
        >
          ENGINEERING <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-500">
            GROWTH ARCHITECTURE.
          </span>
        </motion.h1>

        {/* High-Contrast Editorial Body */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg sm:text-xl text-slate-400 font-medium leading-relaxed text-center max-w-2xl"
        >
          We discard aesthetic fluff for mathematical certainty. Deploying hyper-optimized conversion mechanics and programmatic search loops.
        </motion.p>

        {/* Linear-style Action Cluster */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-6"
        >
          <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-slate-200 transition-colors">
            Initiate Protocol
            <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#work" className="group inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-sm hover:border-white/40 hover:bg-white/5 transition-colors">
            View Analytics
          </a>
        </motion.div>

      </div>

      {/* Cinematic Base Shadow */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
