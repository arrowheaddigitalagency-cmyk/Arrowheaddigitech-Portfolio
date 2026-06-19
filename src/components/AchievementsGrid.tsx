import React, { useState, useEffect } from "react";
import { ArrowUpRight, Activity, TrendingUp, BarChart2 } from "lucide-react";
import { motion } from "motion/react";

const AnimatedCounter = ({ value, prefix = "", suffix = "", decimals = 0 }: { value: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(progress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

// Cinematic Pulsing Sparkline
const PulseChart = ({ color }: { color: string }) => {
  const points = "0,30 10,25 20,35 30,15 40,20 50,5 60,10 70,2 80,15 90,0 100,5";
  return (
    <div className="w-full h-16 mt-6 relative overflow-visible">
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          d={`M 0,30 L 10,25 L 20,35 L 30,15 L 40,20 L 50,5 L 60,10 L 70,2 L 80,15 L 90,0 L 100,5`}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.path
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          viewport={{ once: true }}
          d={`M 0,30 L 10,25 L 20,35 L 30,15 L 40,20 L 50,5 L 60,10 L 70,2 L 80,15 L 90,0 L 100,5 L 100,40 L 0,40 Z`}
          fill={`url(#grad-${color})`}
        />
        <motion.circle 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          viewport={{ once: true }}
          cx="100" cy="5" r="2.5" fill={color} 
        />
        <motion.circle 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.8 }}
          cx="100" cy="5" r="2.5" fill={color} 
        />
      </svg>
    </div>
  );
};

export default function AchievementsGrid() {
  return (
    <section id="achievements" className="relative py-32 bg-[#02040a] text-white overflow-hidden border-t border-white/5">
      
      {/* Intense Bloomberg Terminal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-full bg-[radial-gradient(ellipse_at_top,#1e3a8a15_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10">
        
        {/* Terminal Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-950/30 border border-blue-900/50 rounded-full mb-6">
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
              Global Operations Telemetry
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter text-white">
            EXECUTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">ANALYTICS.</span>
          </h2>
        </div>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Primary Metric (Spans 8) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 border border-white/10 bg-[#0a0d14]/80 backdrop-blur-md rounded-2xl p-8 sm:p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-start justify-between mb-8">
              <div>
                <span className="text-xs font-mono text-slate-400 tracking-widest uppercase block mb-2">Aggregate Portfolio ROAS</span>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white">
                    <AnimatedCounter value={4.82} decimals={2} suffix="x" />
                  </h3>
                  <span className="flex items-center gap-1 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                    <ArrowUpRight className="w-4 h-4" /> 18.4%
                  </span>
                </div>
              </div>
              <BarChart2 className="w-8 h-8 text-blue-500 opacity-50" />
            </div>

            <p className="text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
              Real-time aggregation of return on ad spend across active client portfolios. Demonstrating sustained systemic outperformance against industry benchmarks.
            </p>

            <PulseChart color="#3B82F6" />
          </motion.div>

          {/* Secondary Metric Stacked (Spans 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Metric 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex-1 border border-white/10 bg-[#0a0d14]/80 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange-500/10 blur-[50px] rounded-full pointer-events-none" />
              <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase block mb-4">Capital Deployed (QTD)</span>
              <h4 className="text-4xl font-extrabold tracking-tighter text-white mb-2">
                $<AnimatedCounter value={12.4} decimals={1} suffix="M" />
              </h4>
              <span className="text-xs font-mono text-brand-orange-500 uppercase tracking-widest font-bold">In Active Management</span>
            </motion.div>

            {/* Metric 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex-1 border border-white/10 bg-[#0a0d14]/80 backdrop-blur-md rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none" />
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Client Retention</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <h4 className="text-4xl font-extrabold tracking-tighter text-white mb-2">
                <AnimatedCounter value={98.6} decimals={1} suffix="%" />
              </h4>
              <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest font-bold">Enterprise Lifetime</span>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
