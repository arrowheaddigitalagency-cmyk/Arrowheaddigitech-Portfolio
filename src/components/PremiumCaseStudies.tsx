import React, { useState, useEffect } from "react";
import { ArrowRight, TrendingUp, Zap, Smartphone, Monitor, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
  metrics: {
    label: string;
    value: string;
    prefix?: string;
    suffix?: string;
  }[];
  lighthouse: {
    perf: number;
    access: number;
    seo: number;
  };
}

const AnimatedCounter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <span>{count}</span>;
};

export default function PremiumCaseStudies() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const cases: CaseStudy[] = [
    {
      id: "yalaride",
      client: "YalaRide",
      title: "Dominating the UAE Luxury Car Leasing Market",
      category: "Web App & Growth",
      image: "/src/assets/images/yalaride_web_portal_1781815990359.jpg",
      metrics: [
        { label: "YoY Revenue", value: "312", suffix: "%" },
        { label: "CPA Reduction", value: "45", suffix: "%" },
        { label: "Daily Leads", value: "850", prefix: "+" }
      ],
      lighthouse: { perf: 98, access: 100, seo: 100 }
    },
    {
      id: "america-nurses",
      client: "America Needs Nurses",
      title: "Automating Recruitment Pipelines at Scale",
      category: "CRM & Paid Media",
      image: "/src/assets/images/nurses_recruiter_portal_1781816032234.jpg",
      metrics: [
        { label: "Placement Rate", value: "4x", suffix: "" },
        { label: "Funnel Drop-off", value: "82", suffix: "% ↓" },
        { label: "Active Roster", value: "12", suffix: "k+" }
      ],
      lighthouse: { perf: 96, access: 98, seo: 100 }
    },
    {
      id: "go-jetter",
      client: "Go-Jetter Tours",
      title: "High-Ticket Tourism Booking Engine",
      category: "E-Commerce & SEO",
      image: "/src/assets/images/hero_dashboard_mockup_1781815970624.jpg",
      metrics: [
        { label: "Organic Traffic", value: "240", suffix: "%" },
        { label: "Booking Conv.", value: "6.8", suffix: "%" },
        { label: "ROAS Limit", value: "14", suffix: "x" }
      ],
      lighthouse: { perf: 100, access: 100, seo: 98 }
    }
  ];

  return (
    <section id="work" className="py-32 relative bg-slate-950 overflow-hidden text-left">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      {/* Floating Glowing Orbs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-orange-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand-blue-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header Segment */}
        <div className="max-w-3xl mb-24">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-brand-orange-500" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-orange-500 uppercase">
              CASE RECORDS
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-white leading-[1.05] tracking-tight">
            ENGINEERED <br />
            <span className="text-slate-500">FOR DOMINANCE.</span>
          </h2>
        </div>

        {/* Portfolio Showcase Array */}
        <div className="space-y-32">
          {cases.map((cs, idx) => {
            const isReversed = idx % 2 !== 0;
            return (
              <div key={cs.id} className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-16 items-center`}>
                
                {/* Left: Device Mockup */}
                <motion.div 
                  initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full lg:w-1/2 relative perspective-1000"
                >
                  {/* Faux MacBook Mockup */}
                  <div className="relative z-10 rounded-2xl bg-slate-800 p-2 shadow-2xl border border-slate-700 transform rotate-y-[-5deg] rotate-x-[5deg] hover:rotate-0 transition-transform duration-700">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rounded-b-lg flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-slate-900 bg-slate-900 aspect-[16/10] relative">
                      <img src={cs.image} alt={cs.client} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>
                  {/* Floating Mobile Mockup */}
                  <div className="absolute -bottom-10 -right-10 w-32 md:w-48 rounded-[2rem] bg-slate-800 p-1.5 shadow-2xl border border-slate-600 z-20 transform rotate-y-[15deg] rotate-x-[-10deg] animate-float">
                    <div className="rounded-[1.75rem] overflow-hidden border-4 border-slate-900 bg-slate-900 aspect-[9/19] relative">
                       <img src={cs.image} alt={cs.client + " mobile"} className="w-full h-full object-cover object-left opacity-90" />
                    </div>
                  </div>
                </motion.div>

                {/* Right: Data & Metrics */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/2"
                >
                  <div className="mb-6 flex items-center gap-4">
                    <span className="px-3 py-1 bg-brand-orange-500/10 border border-brand-orange-500/20 text-brand-orange-500 rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {cs.category}
                    </span>
                  </div>
                  
                  <h3 className="text-4xl font-extrabold text-white mb-4 tracking-tight">{cs.client}</h3>
                  <p className="text-xl text-slate-400 font-medium mb-12">{cs.title}</p>

                  {/* High-Impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-6 mb-12">
                    {cs.metrics.map((m, i) => (
                      <div key={i} className="space-y-2">
                        <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tighter flex items-end">
                          {m.prefix && <span className="text-xl text-brand-orange-500 mb-1">{m.prefix}</span>}
                          <AnimatedCounter value={parseInt(m.value)} />
                          {m.suffix && <span className="text-xl text-brand-orange-500 mb-1">{m.suffix}</span>}
                        </div>
                        <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Lighthouse Scores */}
                  <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 backdrop-blur-md">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-6">Lighthouse Audit Protocol</h4>
                    <div className="flex gap-6 justify-between max-w-sm">
                      {Object.entries(cs.lighthouse).map(([key, val]) => (
                        <div key={key} className="flex flex-col items-center gap-3">
                          {/* SVG Progress Ring */}
                          <div className="relative w-14 h-14">
                            <svg className="w-14 h-14 transform -rotate-90">
                              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                              <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={`${val * 1.5} 150`} className="text-emerald-500 transition-all duration-1000 ease-out" />
                            </svg>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-white">{val}</span>
                          </div>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{key}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="mt-12 group flex items-center gap-3 text-sm font-bold text-white uppercase tracking-widest hover:text-brand-orange-500 transition-colors">
                    Read Full Blueprint
                    <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-brand-orange-500 transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>

                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Global View All CTA */}
        <div className="mt-32 text-center">
           <button className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
             Explore Case Repository
           </button>
        </div>

      </div>
    </section>
  );
}
