import React, { useState, useEffect } from "react";
import { Users, Briefcase, Award, HeartHandshake, Rocket, Landmark, Network, Activity, TrendingUp, BarChart } from "lucide-react";
import { motion, useAnimation } from "motion/react";

interface Achievement {
  value: string;
  label: string;
  desc: string;
  sub: string;
  icon: any;
  coordinates: { x: string; y: string };
  delay: number;
}

// Helper for Animated Counter
const Counter = ({ from, to, duration, symbol = "" }: { from: number, to: number, duration: number, symbol?: string }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, duration]);

  return <>{count}{symbol}</>;
};

export default function AchievementsGrid() {
  const [activeMetric, setActiveMetric] = useState<number | null>(null);

  const stats: Achievement[] = [
    {
      value: "150",
      label: "SATISFIED PARTNERS",
      desc: "Trusted worldwide to coordinate direct acquisition campaigns and custom software solutions.",
      sub: "99.2% Retention Score",
      icon: Users,
      coordinates: { x: "left-[5%] md:left-[10%] top-[8%]", y: "translate-x-0" },
      delay: 0.1
    },
    {
      value: "250",
      label: "PROJECTS INSTALLED",
      desc: "Deployed high-speed React applications, optimized maps keywords, and automatic CRM routing.",
      sub: "100% Quality Attained",
      icon: Briefcase,
      coordinates: { x: "left-[45%] top-[5%]", y: "-translate-x-1/2" },
      delay: 0.2
    },
    {
      value: "12",
      label: "YEARS DEPLOYMENT",
      desc: "Comprehensive vertical expertise, ad spending structures, and bespoke digital scaling loops.",
      sub: "Quantitative Foundation Core",
      icon: Award,
      coordinates: { x: "right-[5%] md:right-[10%] top-[12%]", y: "translate-x-0" },
      delay: 0.3
    },
    {
      value: "98",
      label: "CLIENT LOYALTY RATE",
      desc: "Long-term client relationships sustained by complete analytics transparency.",
      sub: "Stable Multi-year Relations",
      icon: HeartHandshake,
      coordinates: { x: "left-[8%] md:left-[12%] bottom-[12%]", y: "translate-x-0" },
      delay: 0.4
    },
    {
      value: "500",
      label: "OPTIMIZED CAMPAIGNS",
      desc: "High-ROI Google & Meta campaigns managed daily to reduce client budget waist.",
      sub: "Across High-Yield Channels",
      icon: Rocket,
      coordinates: { x: "right-[45%] bottom-[6%]", y: "translate-x-1/2" },
      delay: 0.5
    },
    {
      value: "25",
      label: "VERTICALS COVERED",
      desc: "Bespoke acquisition pipelines built for vehicle fleets, clinics, and industrial services.",
      sub: "Optimized Regional Profiles",
      icon: Landmark,
      coordinates: { x: "right-[8%] md:right-[12%] bottom-[15%]", y: "translate-x-0" },
      delay: 0.6
    }
  ];

  return (
    <section id="achievements" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Margins */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Head Block */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-3 font-bold">
            // PERSISTENT SCALE METRICS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            OUR SCALE BY THE NUMBERS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue-500 to-brand-orange-500">
              AUDITED AND VERIFIED.
            </span>
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 max-w-xl">
             We do not rely on subjective claims. Our telemetry clusters map real-time audited business performance metrics.
          </p>
        </div>

        {/* Constellation Canvas Workspace */}
        <div className="relative min-h-[700px] lg:min-h-[600px] w-full rounded-3xl border border-slate-200/60 bg-slate-50/30 p-6 md:p-8 overflow-hidden shadow-2xl backdrop-blur-sm perspective-[1000px]">
          
          {/* Glass Gradient Backgrounds */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Central Core Network Hub */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center pointer-events-none select-none z-0"
          >
            <div className="w-24 h-24 rounded-full bg-white shadow-[0_0_50px_rgba(255,90,31,0.2)] border border-brand-orange-200 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full bg-brand-orange-500/10 animate-ping" />
              <Activity className="w-8 h-8 text-brand-orange-500" />
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase mt-4 block bg-white/80 px-4 py-1 rounded-full border border-slate-200 backdrop-blur-md">
              LIVE TELEMETRY HUB
            </span>
          </motion.div>

          {/* Clusters Map */}
          <div className="relative w-full h-full min-h-[600px] lg:min-h-[500px]">
            {stats.map((st, idx) => {
              const active = activeMetric === idx;
              const IconComp = st.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: st.delay, type: "spring" }}
                  onMouseEnter={() => setActiveMetric(idx)}
                  onMouseLeave={() => setActiveMetric(null)}
                  className={`absolute ${st.coordinates.x} ${st.coordinates.y} z-10 transition-all duration-500 max-w-[280px] w-full`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.div 
                    animate={active ? { rotateX: 5, rotateY: -5, scale: 1.05, z: 20 } : { rotateX: 0, rotateY: 0, scale: 1, z: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`p-6 rounded-2xl transition-all duration-300 select-none ${
                      active 
                        ? "glass-card border-brand-orange-300 shadow-2xl shadow-brand-orange-500/20" 
                        : "bg-white/80 backdrop-blur-md border border-white hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-4 select-none">
                      <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold block">KPI_NODE_0{idx+1}</span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${active ? "bg-brand-orange-100" : "bg-slate-100"}`}>
                        <IconComp className={`w-4 h-4 ${active ? "text-brand-orange-500" : "text-slate-500"}`} />
                      </div>
                    </div>

                    <div className="space-y-1 select-none text-left">
                      <span className={`text-4xl sm:text-5xl font-extrabold font-mono tracking-tighter transition-colors ${active ? "text-slate-900" : "text-slate-700"}`}>
                        <Counter from={0} to={parseInt(st.value)} duration={2000} symbol="+" />
                      </span>
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block font-sans">
                        {st.label}
                      </span>
                    </div>

                    {/* Expandable specs panel */}
                    <div className={`transition-all duration-500 overflow-hidden ${active ? "max-h-[150px] opacity-100 mt-4" : "max-h-0 opacity-0"}`}>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {st.desc}
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between font-mono bg-slate-50 -mx-6 -mb-6 px-6 py-3 rounded-b-2xl">
                        <span className="text-[9px] text-slate-400 font-bold uppercase">Audit Scope</span>
                        <span className="text-[9px] text-emerald-600 block font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          {st.sub}
                        </span>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Global audit status panel */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange-500 to-brand-blue-500" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <BarChart className="w-5 h-5 text-brand-orange-500" />
            </div>
            <div>
              <p className="text-sm text-slate-300 font-medium">
                All acquisition benchmarks are continuously verified by our analytics registries.
              </p>
              <span className="text-[10px] text-emerald-400 font-mono tracking-widest block uppercase font-bold mt-1">
                SECURE TELEMETRY CONNECTION ESTABLISHED
              </span>
            </div>
          </div>
          <div className="relative z-10">
            <button className="px-6 py-3 bg-white text-slate-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors shadow-lg">
              Download Q2 Report
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
