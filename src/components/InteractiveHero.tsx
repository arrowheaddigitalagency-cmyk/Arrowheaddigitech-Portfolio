import React from "react";
import { ArrowRight, BarChart3, Globe, Smartphone, Monitor, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

export default function InteractiveHero() {
  return (
    <section className="relative min-h-screen w-full bg-[#02040a] overflow-hidden flex items-center pt-20 pb-20 lg:pt-0 lg:pb-0">
      
      {/* Subtle Background Gradients (Corporate / Executive) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-blue-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-brand-orange-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
        
        {/* LEFT SIDE: Copy & Call to Actions */}
        <div className="flex flex-col justify-center max-w-2xl pt-10 lg:pt-0">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md self-start mb-8 shadow-2xl"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              Web Development &bull; AI Websites &bull; Digital Growth
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold text-white leading-[1.05] tracking-tight mb-8"
          >
            Building Digital Systems<br/>
            That Actually<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-amber-500">Grow Businesses.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-400 font-medium leading-relaxed mb-12 max-w-xl"
          >
            Custom Websites, AI-Powered Experiences, and Growth Infrastructure built to generate leads, increase credibility, and scale operations.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <a 
              href="#work" 
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-extrabold text-sm tracking-widest uppercase hover:bg-slate-200 transition-colors"
            >
              View Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contact" 
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-transparent border border-white/20 text-white font-extrabold text-sm tracking-widest uppercase hover:bg-white/5 hover:border-white/40 transition-colors"
            >
              Book Strategy Call
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Floating Digital Ecosystem */}
        <div className="relative h-[600px] lg:h-[800px] w-full hidden sm:block perspective-1000">
          <motion.div
            initial={{ opacity: 0, rotateY: 15, x: 100 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full transform-style-3d"
          >
            
            {/* Primary MacBook Mockup */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[110%] max-w-[800px] z-20"
            >
              <div className="w-full aspect-[16/10] bg-[#0f0f11] rounded-t-2xl border-t-2 border-x-2 border-slate-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] p-[2%] relative">
                <div className="w-full h-full bg-slate-900 rounded border border-slate-800 overflow-hidden relative flex flex-col">
                  {/* Faux Browser Header */}
                  <div className="h-6 bg-slate-950 border-b border-slate-800 flex items-center px-3 gap-2 shrink-0">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  {/* Content Area placeholder representing a high-end website */}
                  <div className="flex-1 bg-gradient-to-br from-slate-900 to-black p-8 relative overflow-hidden">
                     <div className="absolute top-8 left-8 w-32 h-6 bg-white/10 rounded" />
                     <div className="absolute top-24 left-8 w-3/4 h-12 bg-white/5 rounded" />
                     <div className="absolute top-40 left-8 w-1/2 h-8 bg-white/5 rounded" />
                     <div className="absolute bottom-8 right-8 w-40 h-32 bg-brand-blue-500/20 rounded-lg border border-brand-blue-500/30" />
                     <Globe className="absolute bottom-12 right-12 w-24 h-24 text-brand-blue-500/20" />
                  </div>
                </div>
              </div>
              <div className="w-[110%] -ml-[5%] h-4 bg-gradient-to-b from-slate-600 to-slate-900 rounded-b-xl border-b border-slate-950 shadow-2xl" />
            </motion.div>

            {/* Mobile Device Overlay */}
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="absolute top-[20%] right-[5%] w-[180px] z-30"
            >
              <div className="w-full aspect-[9/19.5] bg-[#0d0d0f] border-8 border-slate-800 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] p-2 relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-black rounded-b-xl z-10" />
                <div className="w-full h-full bg-gradient-to-b from-slate-900 to-black rounded-[1.8rem] overflow-hidden relative border border-slate-700/50 p-4">
                  <div className="w-full h-24 bg-brand-orange-500/20 rounded-xl border border-brand-orange-500/30 mb-4 mt-8 flex items-center justify-center">
                    <Smartphone className="text-brand-orange-500/50 w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-white/10 rounded" />
                    <div className="w-3/4 h-4 bg-white/5 rounded" />
                    <div className="w-5/6 h-4 bg-white/5 rounded" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Lead Generation Card */}
            <motion.div 
              animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[20%] left-[-5%] w-[220px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 z-40 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">New Lead</span>
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/10 rounded" />
                <div className="h-3 w-2/3 bg-white/10 rounded" />
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 uppercase font-mono">Status</span>
                <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Qualified</span>
              </div>
            </motion.div>

            {/* Floating Analytics Widget */}
            <motion.div 
              animate={{ y: [8, -8, 8], x: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut", delay: 1.5 }}
              className="absolute top-[10%] left-[5%] w-[200px] bg-gradient-to-br from-slate-900 to-black border border-slate-700/50 rounded-2xl p-5 z-10 shadow-2xl"
            >
              <div className="flex justify-between items-start mb-6">
                <BarChart3 className="w-5 h-5 text-brand-blue-500" />
                <span className="text-[10px] font-mono text-emerald-400 font-bold">+145%</span>
              </div>
              <span className="block text-2xl font-extrabold text-white tracking-tighter mb-1">24.8k</span>
              <span className="block text-xs font-medium text-slate-500 uppercase tracking-widest">Active Users</span>
            </motion.div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
