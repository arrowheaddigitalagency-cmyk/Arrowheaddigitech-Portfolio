import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function InteractiveServices() {
  const services = [
    {
      id: "01",
      title: "PERFORMANCE ENGINEERING",
      desc: "High-velocity React frameworks built for strict conversion optimization.",
      metric: "Sub-Second",
      metricLabel: "Load Times"
    },
    {
      id: "02",
      title: "PREDICTIVE MEDIA BUYING",
      desc: "Programmatic scaling across Google & Meta mapped to algorithmic ROAS loops.",
      metric: "4.8x",
      metricLabel: "Avg. ROAS"
    },
    {
      id: "03",
      title: "SEARCH DOMINANCE",
      desc: "Absolute saturation of local maps and generic high-intent query terms.",
      metric: "#1",
      metricLabel: "Target Ranking"
    },
    {
      id: "04",
      title: "AUTOMATED CRM PIPELINES",
      desc: "Zero-latency lead routing and AI-assisted qualification sequences.",
      metric: "< 1m",
      metricLabel: "Response Gap"
    }
  ];

  return (
    <section id="services" className="py-32 relative bg-white overflow-hidden text-left">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative w-full">
        
        {/* Brutalist Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase block mb-6 font-bold">
              // DEPLOYMENT VECTORS
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              SCALE <br /> IS NOT AN ACCIDENT.
            </h2>
          </div>
          <p className="text-lg text-slate-600 font-medium max-w-sm">
            We abandon aesthetic fluff. Every system we build is ruthlessly optimized for acquisition.
          </p>
        </div>

        {/* Alternating Brutalist Rows */}
        <div className="flex flex-col">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="group border-b border-slate-200 py-12 md:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 hover:bg-slate-50 transition-colors cursor-pointer px-4 -mx-4 rounded-xl"
            >
              {/* Left Segment: Index & Title */}
              <div className="flex items-start md:items-center gap-6 lg:w-1/2">
                <span className="text-lg font-mono font-bold text-slate-300 group-hover:text-brand-orange-500 transition-colors mt-1 md:mt-0">
                  {service.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                  {service.title}
                </h3>
              </div>

              {/* Right Segment: Desc & Metric */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 lg:w-1/2 justify-between w-full pl-12 lg:pl-0">
                <p className="text-slate-500 font-medium max-w-xs group-hover:text-slate-900 transition-colors">
                  {service.desc}
                </p>
                <div className="flex items-center justify-between w-full md:w-auto gap-8">
                  <div className="text-right">
                    <span className="block text-2xl font-extrabold text-slate-900 font-mono tracking-tighter">
                      {service.metric}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                      {service.metricLabel}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-brand-orange-500 group-hover:border-brand-orange-500 group-hover:text-white text-slate-400 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
