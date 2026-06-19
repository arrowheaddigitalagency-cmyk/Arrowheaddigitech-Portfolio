import React, { useState, useEffect } from "react";
import { Search, Compass, Cpu, TrendingUp, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function HorizontalProcess() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "DISCOVER",
      tagline: "MARKET WIRE AUDIT",
      desc: "We run clean-room diagnostics on your audience landscape, tracking keyword search volumes, and client leakage vector indices.",
      icon: Search,
      deliverables: ["Competitor bid audits", "Acquisition leakage maps"],
      interactiveVisual: {
        title: "Intent Spectrum",
        stats: "1.4M Hourly Queries",
        status: "SPECTRUM STABLE"
      }
    },
    {
      number: "02",
      title: "STRATEGIZE",
      tagline: "CONVERSION ARCHITECTURE",
      desc: "Our architects map streamlined bid routing directions, copywriting copies, and low-latency landing blueprints.",
      icon: Compass,
      deliverables: ["Attribution funnels", "UX speed performance audits"],
      interactiveVisual: {
        title: "Coordinate Mapping",
        stats: "11.6% Scaled Target",
        status: "FLOW SYSTEM VERIFIED"
      }
    },
    {
      number: "03",
      title: "EXECUTE",
      tagline: "ALGORITHMIC AD LAUNCH",
      desc: "We deploy beautiful React structures integrated with trained qualified language models and programmatic campaigns.",
      icon: Cpu,
      deliverables: ["TypeScript React layouts", "Programmatic campaign setups"],
      interactiveVisual: {
        title: "Deployment Frame",
        stats: "Lighthouse Speed: 99.8%",
        status: "ACTIVE PIPELINE"
      }
    },
    {
      number: "04",
      title: "SCALE",
      tagline: "CAPITAL AMPLIFICATION",
      desc: "We continuously shift budget assets into high-margin ad slots and scale direct audience matches to shrink cost parameters.",
      icon: TrendingUp,
      deliverables: ["Bid multiplier updates", "Outreach scalability reviews"],
      interactiveVisual: {
        title: "Attribution Sync",
        stats: "CPL Shifted: -42%",
        status: "OUTBURST STABILIZED"
      }
    }
  ];

  const current = steps[activeStep];
  const IconComp = current.icon;

  // Auto-advance timeline
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="process" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Decorative vertical lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Head Block */}
        <div className="max-w-3xl mb-24 text-center mx-auto">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
            // OPERATIONAL PROTOCOL
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            OUR MATHEMATICAL STEPS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
              TO RAPID SCALE.
            </span>
          </h2>
        </div>

        {/* Floating Glass Circles Timeline */}
        <div className="relative mb-24 max-w-5xl mx-auto">
          {/* Background Track Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 rounded-full pointer-events-none" />
          
          {/* Animated Glowing Progress Line */}
          <motion.div 
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500 -translate-y-1/2 rounded-full pointer-events-none shadow-[0_0_15px_rgba(255,90,31,0.6)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          <div className="relative flex justify-between items-center w-full z-10">
            {steps.map((s, idx) => {
              const active = idx === activeStep;
              const completed = idx < activeStep;
              return (
                <button
                  key={s.number}
                  onClick={() => setActiveStep(idx)}
                  className="group relative cursor-pointer outline-none"
                >
                  <motion.div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center font-mono text-sm font-bold tracking-wider transition-all duration-500 relative backdrop-blur-md border-2 ${
                      active
                        ? "bg-white/90 border-brand-orange-500 text-brand-orange-600 shadow-[0_0_30px_rgba(255,90,31,0.3)] scale-110"
                        : completed
                        ? "bg-brand-orange-50/80 border-brand-orange-300 text-brand-orange-500 shadow-sm"
                        : "bg-white/50 border-slate-200 text-slate-400 hover:border-slate-300 hover:bg-white/80"
                    }`}
                    animate={{ y: active ? [0, -10, 0] : 0 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {s.number}
                    {completed && !active && (
                      <CheckCircle2 className="absolute -bottom-2 -right-2 w-6 h-6 text-brand-orange-500 bg-white rounded-full" />
                    )}
                  </motion.div>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${active ? "text-slate-900" : "text-slate-400"}`}>
                      {s.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic visual step deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center bg-slate-50/50 rounded-3xl p-8 sm:p-12 border border-slate-100 relative">
          
          {/* Left panel: Details */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-mono text-brand-orange-600 uppercase mb-2 font-bold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse" />
                    {current.tagline}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">{current.title}</h3>
                </div>

                <p className="text-slate-600 text-lg leading-relaxed font-medium max-w-xl">
                  {current.desc}
                </p>

                {/* Deliverables boxes */}
                <div className="space-y-4 pt-8 border-t border-slate-200/60">
                  <h4 className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold text-left">MODULE DELIVERABLES</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {current.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-3 bg-white border border-slate-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <ShieldCheck className="w-5 h-5 text-brand-blue-500 shrink-0" />
                        <span className="text-sm text-slate-700 font-bold">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center gap-4 pt-6">
                  <button
                    onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1))}
                    className="text-xs font-mono font-bold text-slate-500 hover:text-slate-900 px-6 py-3 transition-colors cursor-pointer border border-slate-200 rounded-xl bg-white shadow-sm"
                  >
                    [ PREV ]
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0))}
                    className="flex items-center gap-2 text-xs font-mono font-bold text-white px-6 py-3 transition-all cursor-pointer bg-slate-900 hover:bg-black rounded-xl shadow-lg shadow-slate-900/20"
                  >
                    [ NEXT ] <ArrowRight className="w-4 h-4 text-brand-orange-500" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right panel: Floating layout */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[350px] select-none perspective-[1000px]">
            {/* Giant abstract shadow number */}
            <AnimatePresence mode="wait">
              <motion.span
                key={`num-${activeStep}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.05, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="text-[16rem] font-black text-slate-900 absolute select-none pointer-events-none -top-10 tracking-tighter z-0"
              >
                {current.number}
              </motion.span>
            </AnimatePresence>

            {/* Glowing active card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${activeStep}`}
                initial={{ opacity: 0, rotateY: 20, rotateX: -10, z: -100 }}
                animate={{ opacity: 1, rotateY: -10, rotateX: 10, z: 0 }}
                exit={{ opacity: 0, rotateY: -20, rotateX: -10, z: 100 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-72 h-72 rounded-[2rem] bg-white/60 backdrop-blur-xl border-2 border-white p-8 flex flex-col justify-between shadow-2xl relative z-10 glass-card animate-float"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex justify-between items-start border-b border-slate-200/50 pb-4" style={{ transform: 'translateZ(20px)' }}>
                  <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-wider">{current.interactiveVisual.status}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" />
                </div>
                
                <div className="space-y-4 text-left" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-brand-orange-500 flex items-center justify-center shadow-lg shadow-brand-orange-500/30 text-white">
                    <IconComp className="w-7 h-7 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-widest uppercase font-mono mt-4">{current.interactiveVisual.title}</h4>
                  <p className="text-xl text-slate-600 leading-relaxed font-extrabold">{current.interactiveVisual.stats}</p>
                </div>

                <div className="text-[9px] text-slate-400 font-mono text-right font-bold" style={{ transform: 'translateZ(10px)' }}>
                  SYSTEM_NODE_V{current.number}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
