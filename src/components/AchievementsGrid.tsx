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
  const points = "0,40 20,35 40,45 60,25 80,30 100,15 120,20 140,5 160,20 180,2";
  return (
    <div className="w-full h-12 mt-4 relative overflow-hidden">
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
          cx="180" cy="2" r="3" fill={color} 
        />
      </svg>
    </div>
  );
};

export default function AchievementsGrid() {
  const kpis = [
    {
      label: "Satisfied Clients",
      value: 150,
      suffix: "+",
      desc: "Trusted by businesses worldwide to grow and succeed.",
      color: "#FF5A1F" // Orange
    },
    {
      label: "Projects Delivered",
      value: 250,
      suffix: "+",
      desc: "Successfully delivered projects across diverse industries.",
      color: "#3B82F6" // Blue
    },
    {
      label: "Years of Experience",
      value: 12,
      suffix: "+",
      desc: "Bringing expertise, creativity, and strategy to every campaign.",
      color: "#10B981" // Emerald
    },
    {
      label: "Client Retention",
      value: 98,
      suffix: "+",
      desc: "Long-term partnerships built on trust, results, and satisfaction.",
      color: "#8B5CF6" // Purple
    },
    {
      label: "Campaigns Launched",
      value: 500,
      suffix: "+",
      desc: "Data-driven campaigns that deliver real results and measurable growth.",
      color: "#EC4899" // Pink
    },
    {
      label: "Industries Served",
      value: 25,
      suffix: "+",
      desc: "Experience across multiple industries with tailored marketing solutions.",
      color: "#F59E0B" // Amber
    }
  ];

  return (
    <section id="achievements" className="py-32 bg-white text-slate-900 border-t border-slate-200">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-bg-dark opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10">
        
        {/* Header Segment */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
              // TELEMETRY
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              OUR ACHIEVEMENTS.
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-sm">
            Results that speak for our growth. We deliver numbers that matter — more leads, stronger brands, higher sales, and long-term business growth.
          </p>
        </div>

        {/* 3x2 Grid for Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {kpis.map((kpi, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col border border-slate-100 p-6 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-slate-350 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-slate-400">
                  {kpi.label}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              
              <h4 className="text-4xl sm:text-5xl font-extrabold tracking-tighter mb-3 text-slate-900">
                <AnimatedCounter value={kpi.value} suffix={kpi.suffix} />
              </h4>
              
              <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-4">
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
