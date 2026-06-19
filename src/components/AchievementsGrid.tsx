import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

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

// Stripe-style Precision Line Chart (SVG)
const PrecisionChart = ({ color }: { color: string }) => {
  const points = "0,40 20,35 40,45 60,25 80,30 100,10 120,15 140,5 160,20 180,0";
  return (
    <div className="w-full h-16 mt-6 relative overflow-hidden">
      <svg viewBox="0 0 180 50" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <motion.polyline
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true }}
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <motion.circle 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
          viewport={{ once: true }}
          cx="180" cy="0" r="4" fill={color} 
        />
      </svg>
    </div>
  );
};

export default function AchievementsGrid() {
  const kpis = [
    {
      label: "Total Pipeline Value",
      value: 12,
      prefix: "$",
      suffix: "M+",
      desc: "Gross revenue managed through our infrastructure.",
      color: "#10B981" // Emerald
    },
    {
      label: "Qualified Leads Routed",
      value: 450,
      suffix: "k",
      desc: "Aggregated user actions verified by our routing systems.",
      color: "#3B82F6" // Blue
    },
    {
      label: "Average CPA Reduction",
      value: 42,
      suffix: "%",
      desc: "Client-wide median acquisition cost compression.",
      color: "#FF5A1F" // Orange
    }
  ];

  return (
    <section id="achievements" className="py-32 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase block mb-6 font-bold">
              // TELEMETRY
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              COMPOUNDING <br /> METRICS.
            </h2>
          </div>
          <p className="text-lg text-slate-600 font-medium max-w-sm">
            We map verified, real-time business performance. No assumptions. Only absolute precision.
          </p>
        </div>

        {/* Minimalist Data Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {kpis.map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col group"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                  {kpi.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
              </div>
              
              <h4 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4 text-slate-900">
                {kpi.prefix}<AnimatedCounter value={kpi.value} />{kpi.suffix}
              </h4>
              
              <p className="text-sm text-slate-500 font-medium max-w-[200px]">
                {kpi.desc}
              </p>
              
              <PrecisionChart color={kpi.color} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
