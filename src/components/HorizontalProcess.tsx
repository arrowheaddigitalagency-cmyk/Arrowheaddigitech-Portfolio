import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

export default function HorizontalProcess() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  const steps = [
    {
      id: "01",
      title: "DISCOVERY & AUDIT",
      desc: "Deep forensic analysis of current pipelines, tracking setups, and code architecture.",
      detail: "Identify massive friction points."
    },
    {
      id: "02",
      title: "STRATEGY FORMULATION",
      desc: "Mapping specific acquisition loops, media buying logic, and UX overhaul requirements.",
      detail: "Zero aesthetic bias."
    },
    {
      id: "03",
      title: "ENGINEERING PHASE",
      desc: "Deployment of sub-second React frontends and integrated CRM routing mechanisms.",
      detail: "Absolute code precision."
    },
    {
      id: "04",
      title: "SCALING PROTOCOL",
      desc: "Activating aggressive programmatic ad spend, strictly optimizing for target CPA and ROAS.",
      detail: "Continuous algorithmic tuning."
    }
  ];

  return (
    <section ref={targetRef} id="process" className="relative h-[300vh] bg-[#0a0a0a] text-white">
      
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full mb-12 flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
              // METHODOLOGY
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tighter">
              THE ARROWHEAD <br /> PROTOCOL.
            </h2>
          </div>
          <p className="text-slate-400 font-medium max-w-sm hidden md:block">
            Scroll to traverse our strict four-phase deployment cycle. 
          </p>
        </div>

        {/* Horizontal Scrolling Track */}
        <div className="w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6 sm:px-12 w-[400vw] sm:w-[300vw] lg:w-[200vw]">
            {steps.map((step, idx) => (
              <div 
                key={step.id} 
                className="w-[85vw] sm:w-[60vw] lg:w-[45vw] flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-10 md:p-16 flex flex-col justify-between h-[400px] relative overflow-hidden group hover:bg-white/10 transition-colors"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange-500/10 blur-[80px] rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-orange-500/20 transition-colors" />
                
                <div>
                  <span className="text-6xl md:text-8xl font-mono font-extrabold text-white/10 tracking-tighter block mb-6">
                    {step.id}
                  </span>
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-md">
                    {step.desc}
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-8">
                  <div className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-widest uppercase font-bold text-slate-300">
                    {step.detail}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
