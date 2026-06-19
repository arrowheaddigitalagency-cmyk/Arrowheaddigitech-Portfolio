import React from "react";
import { CheckCircle2, Search, Target, Rocket, BarChart } from "lucide-react";
import { motion } from "motion/react";

export default function HorizontalProcess() {
  const steps = [
    {
      id: "01",
      title: "DISCOVER",
      desc: "Analyze business goals, audit current platforms, and map target audience profiles.",
      bullets: ["Analyze business", "Understand market", "Identify ideal customers"],
      detail: "Phase 01 // Deep Audit",
      icon: <Search className="w-8 h-8 text-brand-orange-500 mb-6" />,
      color: "from-brand-orange-500/20 to-transparent",
      borderColor: "border-brand-orange-500/20",
      accent: "text-brand-orange-500"
    },
    {
      id: "02",
      title: "STRATEGIZE",
      desc: "Build growth models, establish advertising campaigns strategy, and design positioning.",
      bullets: ["Build growth strategy", "Marketing planning", "Brand positioning"],
      detail: "Phase 02 // Strategic Blueprint",
      icon: <Target className="w-8 h-8 text-brand-blue-500 mb-6" />,
      color: "from-brand-blue-500/20 to-transparent",
      borderColor: "border-brand-blue-500/20",
      accent: "text-brand-blue-500"
    },
    {
      id: "03",
      title: "EXECUTE",
      desc: "Launch performance marketing campaigns, optimize website UI, and activate chatbots.",
      bullets: ["Launch campaigns", "Implement solutions", "Generate leads"],
      detail: "Phase 03 // Precision Execution",
      icon: <Rocket className="w-8 h-8 text-emerald-500 mb-6" />,
      color: "from-emerald-500/20 to-transparent",
      borderColor: "border-emerald-500/20",
      accent: "text-emerald-500"
    },
    {
      id: "04",
      title: "SCALE",
      desc: "Amplify search visibility, scale paid budgets based on ROI loops, and maximize margins.",
      bullets: ["Optimize results", "Expand reach", "Increase revenue"],
      detail: "Phase 04 // Continuous Growth",
      icon: <BarChart className="w-8 h-8 text-indigo-500 mb-6" />,
      color: "from-indigo-500/20 to-transparent",
      borderColor: "border-indigo-500/20",
      accent: "text-indigo-500"
    }
  ];

  return (
    <section id="process" className="relative bg-[#0a0a0a] text-white py-24 lg:py-32 overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10">
        
        {/* Header section */}
        <div className="flex flex-col items-center text-center mb-20">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
            // METHODOLOGY & DOCTRINE
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tighter">
            THE ARROWHEAD <br /> PROTOCOL.
          </h2>
        </div>

        {/* 4-Column Grid for Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((st, i) => (
            <motion.div 
              key={st.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              className={`relative border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-xl p-8 flex flex-col h-full overflow-hidden group hover:bg-white/[0.04] transition-colors`}
            >
              {/* Top Gradient Fade */}
              <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${st.color} opacity-50 pointer-events-none`} />
              
              <div className="relative z-10 flex-1">
                {st.icon}
                <span className={`text-xs font-mono tracking-widest font-bold uppercase mb-2 block ${st.accent}`}>
                  {st.detail}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tighter mb-4 text-white uppercase">{st.title}</h3>
                <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">{st.desc}</p>
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-3 border-t border-white/5 pt-6 mt-auto">
                {st.bullets.map((b, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-bold">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 ${st.accent}`} />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
