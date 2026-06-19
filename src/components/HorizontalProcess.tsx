import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function HorizontalProcess() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const steps = [
    {
      id: "01",
      title: "DISCOVER",
      desc: "Analyze business goals, audit current platforms, and map target audience profiles.",
      bullets: ["Analyze business", "Understand market", "Identify ideal customers"],
      detail: "Phase 01 // Deep Audit"
    },
    {
      id: "02",
      title: "STRATEGIZE",
      desc: "Build growth models, establish advertising campaigns strategy, and design positioning.",
      bullets: ["Build growth strategy", "Marketing planning", "Brand positioning"],
      detail: "Phase 02 // Strategic Blueprint"
    },
    {
      id: "03",
      title: "EXECUTE",
      desc: "Launch performance marketing campaigns, optimize website UI, and activate chatbots.",
      bullets: ["Launch campaigns", "Implement solutions", "Generate leads"],
      detail: "Phase 03 // Precision Execution"
    },
    {
      id: "04",
      title: "SCALE",
      desc: "Amplify search visibility, scale paid budgets based on ROI loops, and maximize margins.",
      bullets: ["Optimize results", "Expand reach", "Increase revenue"],
      detail: "Phase 04 // Continuous Growth"
    }
  ];

  // Opacity transforms for the 4 stages
  const opacity1 = useTransform(scrollYProgress, [0, 0.20, 0.26], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.20, 0.26], [0, 0, -40]);

  const opacity2 = useTransform(scrollYProgress, [0.20, 0.26, 0.46, 0.52], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.20, 0.26, 0.46, 0.52], [40, 0, 0, -40]);

  const opacity3 = useTransform(scrollYProgress, [0.46, 0.52, 0.72, 0.78], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.46, 0.52, 0.72, 0.78], [40, 0, 0, -40]);

  const opacity4 = useTransform(scrollYProgress, [0.72, 0.78, 0.95], [0, 1, 1]);
  const y4 = useTransform(scrollYProgress, [0.72, 0.78, 0.95], [40, 0, 0]);

  // Indicator highlighters
  const activeDot1 = useTransform(scrollYProgress, [0, 0.22], ["#FF5A1F", "#334155"]);
  const activeDot2 = useTransform(scrollYProgress, [0.22, 0.48], ["#FF5A1F", "#334155"]);
  const activeDot3 = useTransform(scrollYProgress, [0.48, 0.74], ["#FF5A1F", "#334155"]);
  const activeDot4 = useTransform(scrollYProgress, [0.74, 1.0], ["#FF5A1F", "#334155"]);

  // Vertical timeline line height transform
  const progressLineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={targetRef} id="process" className="relative h-[240vh] bg-[#0a0a0a] text-white">
      
      {/* Top transition overlay */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-[#0a0a0a] pointer-events-none z-20" />
      
      {/* Bottom transition overlay */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-[#0a0a0a] pointer-events-none z-20" />

      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Title & Vertical Timeline Indicator (Spans 5) */}
          <div className="lg:col-span-5 flex flex-col">
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
              // METHODOLOGY & DOCTRINE
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tighter mb-12">
              THE ARROWHEAD <br /> PROTOCOL.
            </h2>

            {/* Vertical Phase Indicator */}
            <div className="relative pl-8 flex flex-col gap-6">
              
              {/* Vertical Track Line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-800">
                <motion.div 
                  className="w-full bg-brand-orange-500 origin-top"
                  style={{ height: progressLineHeight }}
                />
              </div>

              {/* Step dots */}
              {steps.map((st, i) => {
                const color = i === 0 ? activeDot1 : i === 1 ? activeDot2 : i === 2 ? activeDot3 : activeDot4;
                return (
                  <div key={st.id} className="flex items-center gap-4 relative">
                    <motion.div 
                      className="absolute left-[-32px] w-4 h-4 rounded-full border-2 border-[#0a0a0a] z-10 flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs font-mono font-bold text-slate-400">{st.id}.</span>
                    <span className="text-sm font-bold tracking-tight text-slate-200 uppercase">{st.title}</span>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Right Column: Stacked Transition Cards (Spans 7) */}
          <div className="lg:col-span-7 h-[420px] relative flex items-center justify-center">
            
            {/* CARD 1 */}
            <motion.div 
              style={{ opacity: opacity1, y: y1 }}
              className="absolute w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 sm:p-12 flex flex-col justify-between h-[380px] pointer-events-auto"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div>
                <span className="text-xs font-mono text-brand-orange-500 tracking-widest font-bold uppercase mb-2 block">{steps[0].detail}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-4 text-white uppercase">{steps[0].title}</h3>
                <p className="text-slate-400 font-medium text-base sm:text-lg leading-relaxed max-w-lg">{steps[0].desc}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 mt-6">
                {steps[0].bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange-500 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 2 */}
            <motion.div 
              style={{ opacity: opacity2, y: y2 }}
              className="absolute w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 sm:p-12 flex flex-col justify-between h-[380px] pointer-events-auto"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-blue-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div>
                <span className="text-xs font-mono text-brand-blue-500 tracking-widest font-bold uppercase mb-2 block">{steps[1].detail}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-4 text-white uppercase">{steps[1].title}</h3>
                <p className="text-slate-400 font-medium text-base sm:text-lg leading-relaxed max-w-lg">{steps[1].desc}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 mt-6">
                {steps[1].bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-blue-500 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 3 */}
            <motion.div 
              style={{ opacity: opacity3, y: y3 }}
              className="absolute w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 sm:p-12 flex flex-col justify-between h-[380px] pointer-events-auto"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div>
                <span className="text-xs font-mono text-emerald-500 tracking-widest font-bold uppercase mb-2 block">{steps[2].detail}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-4 text-white uppercase">{steps[2].title}</h3>
                <p className="text-slate-400 font-medium text-base sm:text-lg leading-relaxed max-w-lg">{steps[2].desc}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 mt-6">
                {steps[2].bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CARD 4 */}
            <motion.div 
              style={{ opacity: opacity4, y: y4 }}
              className="absolute w-full border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 sm:p-12 flex flex-col justify-between h-[380px] pointer-events-auto"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none" />
              <div>
                <span className="text-xs font-mono text-indigo-500 tracking-widest font-bold uppercase mb-2 block">{steps[3].detail}</span>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-4 text-white uppercase">{steps[3].title}</h3>
                <p className="text-slate-400 font-medium text-base sm:text-lg leading-relaxed max-w-lg">{steps[3].desc}</p>
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-6 mt-6">
                {steps[3].bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
