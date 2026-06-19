import React, { useState, useEffect } from "react";
import { Activity, TrendingUp, Users, DollarSign, Target, BarChart, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

// Animated Counter Hook
const AnimatedCounter = ({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  return <span>{prefix}{count}{suffix}</span>;
};

// Mini Line Chart Component (CSS)
const Sparkline = ({ color }: { color: string }) => (
  <div className="flex items-end gap-1 h-10 mt-4 opacity-70">
    {[30, 45, 25, 60, 40, 75, 50, 90].map((h, i) => (
      <motion.div 
        key={i}
        initial={{ height: 0 }}
        whileInView={{ height: `${h}%` }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="w-1.5 rounded-t-sm"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

export default function AchievementsGrid() {
  const kpis = [
    {
      label: "Total Pipeline Value",
      value: 12.5,
      prefix: "$",
      suffix: "M+",
      trend: "+24.5%",
      icon: DollarSign,
      color: "#10B981" // Emerald
    },
    {
      label: "Qualified Leads Routed",
      value: 450,
      suffix: "k",
      trend: "+12.8%",
      icon: Users,
      color: "#3B82F6" // Blue
    },
    {
      label: "Average CPA Reduction",
      value: 42,
      suffix: "%",
      trend: "Optimal",
      icon: Target,
      color: "#FF5A1F" // Orange
    }
  ];

  return (
    <section id="achievements" className="py-32 relative bg-white overflow-hidden text-left">
      
      {/* Soft Top/Bottom Borders */}
      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-slate-50/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header Segment */}
        <div className="mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-brand-blue-500 uppercase block mb-4">
            // LIVE PERFORMANCE TELEMETRY
          </span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.05] tracking-tight">
              A DECADE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-900">
                COMPOUNDING METRICS.
              </span>
            </h2>
            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-sm">
               We do not rely on subjective claims. Our clusters map verified, real-time business performance.
            </p>
          </div>
        </div>

        {/* Executive Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Chart Panel (Spans 2 columns) */}
          <div className="lg:col-span-2 glass-card p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue-500/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
            
            <div className="flex justify-between items-start mb-12 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-blue-500" /> System Growth Velocity
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">Aggregated platform scaling (YoY)</p>
              </div>
              <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1 border border-emerald-100">
                <TrendingUp className="w-3 h-3" /> LIVE
              </div>
            </div>

            <div className="relative h-64 w-full flex items-end justify-between gap-2 z-10">
              {/* Complex Faux Bar Chart */}
              {[15, 25, 20, 45, 30, 55, 40, 70, 50, 85, 65, 100].map((h, i) => (
                <div key={i} className="w-full flex flex-col justify-end h-full group/bar cursor-crosshair">
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full bg-slate-100 group-hover/bar:bg-brand-blue-500 rounded-t-md transition-colors relative"
                  >
                    {/* Tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-mono px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Q{i+1}: {h}%
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {/* Overlay Gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right KPIs Column */}
          <div className="flex flex-col gap-6">
            {kpis.map((kpi, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 flex flex-col justify-between group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} />
                  </div>
                  <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 flex items-center gap-1">
                    {kpi.trend} <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
                <div>
                  <h4 className="text-4xl font-extrabold text-slate-900 tracking-tighter mb-1">
                    {kpi.prefix}<AnimatedCounter value={kpi.value} />{kpi.suffix}
                  </h4>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-slate-400">{kpi.label}</p>
                </div>
                <Sparkline color={kpi.color} />
              </motion.div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
}
