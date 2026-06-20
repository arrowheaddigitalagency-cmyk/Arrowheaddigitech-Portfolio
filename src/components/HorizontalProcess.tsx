import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export default function HorizontalProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const steps = [
    {
      id: "01",
      title: "Discover",
      desc: "Deep audit of your current systems, market positioning, and revenue bottlenecks.",
      metric: "System Audit",
      color: "from-brand-blue-500",
    },
    {
      id: "02",
      title: "Strategize",
      desc: "Architecting the exact digital infrastructure and campaigns needed to capture market share.",
      metric: "Custom Blueprint",
      color: "from-indigo-500",
    },
    {
      id: "03",
      title: "Execute",
      desc: "Rapid deployment of high-performance web assets and multi-channel performance marketing.",
      metric: "Deployment",
      color: "from-brand-orange-500",
    },
    {
      id: "04",
      title: "Scale",
      desc: "Continuous algorithmic optimization, A/B testing, and autonomous lead routing expansion.",
      metric: "Hyper-Growth",
      color: "from-emerald-500",
    }
  ];

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <section ref={containerRef} id="process" className="py-32 relative bg-[#02040a] text-white overflow-hidden">
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header */}
        <div className="mb-24 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // METHODOLOGY
          </span>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-white leading-[0.95] tracking-tighter">
            THE ARROWHEAD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 via-amber-400 to-brand-orange-600">
              PROTOCOL.
            </span>
          </h2>
        </div>

        <div className="relative mt-32">
          
          {/* Animated Connecting Path (Desktop) */}
          <div className="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-white/10 z-0">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-orange-500 via-amber-400 to-brand-orange-600"
              style={{ width: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                className="relative flex flex-col"
              >
                {/* Node */}
                <div className="hidden lg:flex w-8 h-8 rounded-full bg-[#030712] border-2 border-slate-700 items-center justify-center mb-10 mx-auto group-hover:border-brand-orange-500 transition-colors z-10 relative">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.color} to-slate-900 shadow-inner`} />
                </div>

                {/* Mobile Node */}
                <div className="lg:hidden w-8 h-8 rounded-full bg-[#030712] border-2 border-slate-700 flex items-center justify-center mb-6 z-10 relative">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${step.color} to-slate-900 shadow-inner`} />
                  <div className="absolute top-8 left-[15px] w-[2px] h-[calc(100%+2rem)] bg-white/10 -z-10" />
                </div>

                {/* Card */}
                <div className="bg-[#050505] border border-[#333] rounded-2xl p-8 hover:bg-[#0a0a0a] hover:border-brand-orange-500/50 transition-all flex-1 shadow-2xl group">
                  <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-6 font-bold group-hover:text-white transition-colors">
                    Phase {step.id}
                  </span>
                  
                  <h3 className="text-2xl font-extrabold text-white mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                    {step.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold tracking-widest text-brand-orange-500 uppercase">
                      {step.metric}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-brand-orange-500 transition-colors group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
