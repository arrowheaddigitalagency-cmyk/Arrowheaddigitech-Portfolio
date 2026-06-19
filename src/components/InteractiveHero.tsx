import React, { useState } from "react";
import { ArrowUpRight, Sparkles, ChevronRight, Play, CheckCircle, BarChart3, TrendingUp, Network } from "lucide-react";
import { motion } from "motion/react";

export default function InteractiveHero() {
  const [estimateBudget, setEstimateBudget] = useState(5000);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const estLeads = Math.floor(estimateBudget * 0.16 + 30);
  const estPipeline = (estLeads * 195).toLocaleString();

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-36 pb-24 flex flex-col justify-center overflow-hidden bg-transparent select-none"
    >
      {/* Premium modern city abstract background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/images/hero_dashboard_mockup_1781815970624.jpg" 
          alt="Arrowhead Premium Web Application" 
          className="w-full h-full object-cover select-none pointer-events-none mix-blend-overlay opacity-30" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-white/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center text-left">
        {/* Left Column: High-Impact Editorial Copy */}
        <div className="lg:col-span-6 flex flex-col justify-center relative">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass-pill px-4 py-1.5 text-[10px] font-mono tracking-[0.2em] font-bold text-brand-orange-600 uppercase mb-8 w-fit"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-orange-500 animate-spin" style={{ animationDuration: "8s" }} />
            ARROWHEAD DIGITAL ACCELERATOR
          </motion.div>

          {/* Master Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.05]"
          >
            WE ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-orange-600 relative inline-block">
              GROWTH LOOPS
              <motion.div 
                className="absolute -bottom-2 left-0 h-1.5 w-full bg-brand-orange-500 rounded-full"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              />
            </span> <br />
            FOR STARTUPS.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg sm:text-xl font-medium leading-relaxed mb-10 max-w-xl"
          >
            Scale your qualified customer acquisition with ultra-fast code, high-ROI search campaigns, and bespoke conversion mechanics.
          </motion.p>

          {/* Interactive buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <button
              onClick={() => scrollToSection("estimate")}
              className="cursor-pointer group relative py-4 px-8 bg-brand-orange-500 hover:bg-brand-orange-600 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-xl shadow-brand-orange-500/20 hover:shadow-2xl hover:shadow-brand-orange-500/30 flex items-center justify-center gap-2.5 overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
              PROJECT CALCULATOR
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToSection("case-studies")}
              className="cursor-pointer py-4 px-8 bg-white/80 backdrop-blur-md text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-200 hover:border-brand-orange-200 transition-all duration-300 flex items-center justify-center gap-2 rounded-xl hover:bg-white"
            >
              View Case Records
              <ChevronRight className="w-4 h-4 text-brand-orange-500" />
            </button>
          </motion.div>

          {/* Key proof metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-slate-200/60 max-w-lg"
          >
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">$250M+</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Leads Generated</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-orange-500 block">150+</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Clients Retained</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 block">99.2%</span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-bold">Success Score</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: 3D Glass Mockups & Digital Growth Visualization */}
        <div className="lg:col-span-6 relative w-full flex flex-col items-center justify-center min-h-[500px]" style={{ perspective: '1000px' }}>
          
          {/* Main Floating Glass Panel */}
          <motion.div 
            initial={{ opacity: 0, rotateY: 20, rotateX: 10, scale: 0.9 }}
            animate={{ opacity: 1, rotateY: -5, rotateX: 5, scale: 1 }}
            transition={{ duration: 1, type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-md glass-card p-6 sm:p-7 z-20 animate-float"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Visual Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100/50 mb-6" style={{ transform: 'translateZ(20px)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange-500 animate-ping" />
                <span className="text-[9px] font-mono tracking-widest text-slate-500 uppercase font-bold">
                  Scale projection engine // live
                </span>
              </div>
              <span className="text-[10px] bg-brand-blue-50 text-brand-blue-600 px-2 py-0.5 rounded font-mono font-bold">VERIFIED</span>
            </div>

            {/* Slider bar */}
            <div className="space-y-6" style={{ transform: 'translateZ(30px)' }}>
              <div>
                <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-mono font-bold">
                  <span>MONTHLY MEDIA SPEND</span>
                  <span className="text-slate-900 font-extrabold">${estimateBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="50000"
                  step="1000"
                  value={estimateBudget}
                  onChange={(e) => setEstimateBudget(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange-500 mb-2 shadow-inner"
                />
              </div>

              {/* Dynamic results */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/60 border border-white rounded-xl shadow-sm text-left backdrop-blur-sm transition-all">
                  <span className="text-[9px] font-mono text-slate-400 uppercase block font-bold">Qualified leads</span>
                  <span className="text-xl font-extrabold text-brand-orange-500 block mt-1">+{estLeads} / mo</span>
                </div>

                <div className="p-4 bg-brand-blue-50/60 border border-brand-blue-100/50 rounded-xl shadow-sm text-left backdrop-blur-sm">
                  <span className="text-[9px] font-mono text-brand-blue-500 uppercase block font-bold">Pipeline value</span>
                  <span className="text-xl font-extrabold text-brand-blue-600 block mt-1">${estPipeline}</span>
                </div>
              </div>

              {/* High-End Image Block */}
              <div className="relative group overflow-hidden rounded-xl shadow-md aspect-video">
                <img 
                  src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg"
                  alt="Arrowhead Software Engineers"
                  className="w-full h-full object-cover mix-blend-luminosity opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                      <Play className="w-3 h-3 fill-white text-white ml-0.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest">
                      Run simulation
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating 3D Elements Behind/Around */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute -right-4 top-10 glass-panel p-4 flex items-center gap-4 z-10 hidden sm:flex animate-float"
            style={{ animationDelay: '1s', transform: 'translateZ(-50px)' }}
          >
            <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-brand-blue-500" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-widest">Growth</span>
              <span className="text-sm font-extrabold text-slate-900">+340% YoY</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute -left-8 bottom-20 glass-panel p-4 flex items-center gap-4 z-30 hidden sm:flex animate-float"
            style={{ animationDelay: '0.5s', transform: 'translateZ(40px)' }}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <Network className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <span className="text-[10px] text-slate-500 font-mono font-bold block uppercase tracking-widest">Architecture</span>
              <span className="text-sm font-extrabold text-slate-900">Scalable AI</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
