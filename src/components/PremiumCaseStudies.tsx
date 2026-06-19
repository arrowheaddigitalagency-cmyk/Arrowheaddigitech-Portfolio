import React, { useState, useRef } from "react";
import { CheckCircle, ArrowRight, Laptop, Monitor, Sparkles, TrendingUp, BarChart3, Smartphone, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CaseStudy {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  results: { value: string; label: string; sub: string; icon: any }[];
  approach: string[];
  imageUrl: string;
  specMetrics: { label: string; legacy: string; optimized: string; lift: string };
  color: string;
}

export default function PremiumCaseStudies() {
  const [activeTab, setActiveTab] = useState<string>("yalaride");
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const projects: CaseStudy[] = [
    {
      id: "yalaride",
      number: "01",
      title: "YalaRide",
      category: "Car Rental Marketplace",
      tagline: "Disrupting the luxury car leasing market with bespoke search-indexing campaigns and high-velocity checkout software.",
      results: [
        { value: "+160%", label: "MAPS ACCREDIT INDEX", sub: "Top #3 standings achieved universally.", icon: BarChart3 },
        { value: "+190%", label: "ACQUIRED RESERVATIONS", sub: "Conversion mechanisms eliminate checkout leakage.", icon: TrendingUp }
      ],
      approach: [
        "Interactive fleet scheduler and maps indexing vectors",
        "PPC programmatic Google Ads matched to buyer-intent factors"
      ],
      imageUrl: "/src/assets/images/yalaride_web_portal_1781815990359.jpg",
      specMetrics: {
        label: "Lighthouse Performance (FCP)",
        legacy: "4.8s (Score: 34)",
        optimized: "0.4s (Score: 99)",
        lift: "+91%"
      },
      color: "#FF5A1F" // brand-orange
    },
    {
      id: "nurses",
      number: "02",
      title: "America Needs Nurses",
      category: "Healthcare Staffing Portal",
      tagline: "Synthesizing an authoritative recruiter directory connecting medical clinics directly with certified nursing specialists.",
      results: [
        { value: "+145%", label: "QUALIFIED LEADS DEPLOYED", sub: "Pre-qualified candidate onboarding systems.", icon: TrendingUp },
        { value: "+110%", label: "CONTRACT INTAKE CORES", sub: "Predictable calendar scales for recruiters.", icon: BarChart3 }
      ],
      approach: [
        "Frictionless registration dashboard with automated compliance pre-screening",
        "Strategic search directory indexes on top maps rankings"
      ],
      imageUrl: "/src/assets/images/nurses_recruiter_portal_1781816032234.jpg",
      specMetrics: {
        label: "Candidate Validation Delay",
        legacy: "Manual: 14 Days",
        optimized: "AI Verified: 4.5 Mins",
        lift: "99.9%"
      },
      color: "#3B82F6" // brand-blue
    },
    {
      id: "gojetter",
      number: "03",
      title: "Go-Jetter Tours",
      category: "Premium Tourism Hub",
      tagline: "Architecting a high-conversion booking engine for global luxury tourism and exotic vacation packages.",
      results: [
        { value: "3.2x", label: "ROAS RATIO", sub: "Attained across Meta & Google Ads networks.", icon: TrendingUp },
        { value: "-45%", label: "ACQUISITION COST", sub: "Reduced via AI predictive budget scaling.", icon: BarChart3 }
      ],
      approach: [
        "Immersive dynamic media catalogs with instant pricing algorithms",
        "Retargeting funnels utilizing high-velocity video creatives"
      ],
      imageUrl: "/src/assets/images/hero_dashboard_mockup_1781815970624.jpg",
      specMetrics: {
        label: "Checkout Flow Completion",
        legacy: "Abandonment: 68%",
        optimized: "Completion: 82%",
        lift: "+120%"
      },
      color: "#10B981" // emerald
    }
  ];

  const currentProject = projects.find((p) => p.id === activeTab) || projects[0];

  const handleMove = (clientX: number, rectLeft: number, rectWidth: number) => {
    const relativeX = clientX - rectLeft;
    const percentage = Math.max(0, Math.min(100, (relativeX / rectWidth) * 100));
    setSliderPosition(percentage);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (containerRef.current && e.touches[0]) {
      const rect = containerRef.current.getBoundingClientRect();
      handleMove(e.touches[0].clientX, rect.left, rect.width);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.buttons === 1 || isDragging) && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      handleMove(e.clientX, rect.left, rect.width);
    }
  };

  return (
    <section id="case-studies" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Structural margins lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      {/* Soft Lighting */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-orange-500/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-brand-blue-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative w-full z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-3xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
              // CASE STUDIES & SPECIFICATIONS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              REAL CASE CHRONICLES. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                HIGH PERFORMANCE IN ACTION.
              </span>
            </h2>
          </div>
          <p className="text-slate-600 text-lg font-medium max-w-sm leading-relaxed">
            We do not compromise on speed, usability, or lead efficiency. Here are the custom systems constructed for flagship brands.
          </p>
        </div>

        {/* Premium Tabs */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-slate-200/60 pb-6">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveTab(project.id);
                setSliderPosition(50);
              }}
              className={`px-8 py-4 rounded-xl relative transition-all duration-300 cursor-pointer outline-none glass-card border-2 ${
                activeTab === project.id 
                  ? "border-brand-orange-500 bg-white/90 shadow-xl shadow-brand-orange-500/10 scale-105 z-10" 
                  : "border-white bg-white/40 hover:bg-white/80 hover:border-brand-orange-200 text-slate-500 hover:text-slate-900"
              }`}
            >
              <span className="font-mono text-[10px] uppercase font-bold text-slate-400 block mb-1">
                EXECUTIVE DEPLOYMENT {project.number}
              </span>
              <span className={`text-xl font-extrabold tracking-tight transition-colors ${
                activeTab === project.id ? "text-slate-900" : ""
              }`}>{project.title}</span>
              
              {activeTab === project.id && (
                <motion.div 
                  layoutId="activeCaseStudyTab" 
                  className="absolute -bottom-[26px] left-1/2 -translate-x-1/2 w-12 h-1 bg-brand-orange-500 rounded-t-lg"
                />
              )}
            </button>
          ))}
        </div>

        {/* Master layout block */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentProject.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch"
          >
            
            {/* Left panel: Info, specs, and metric counters */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
              <div className="space-y-6 text-left">
                
                <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-[10px] font-mono text-slate-600 font-bold uppercase shadow-sm">
                  <span className="w-2 h-2 rounded-full animate-pulse shadow-sm" style={{ backgroundColor: currentProject.color, boxShadow: `0 0 10px ${currentProject.color}` }} />
                  {currentProject.category}
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                  {currentProject.title} Platform Upgrade
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {currentProject.tagline}
                </p>

                {/* Direct Strategy Bullets */}
                <div className="space-y-4 pt-6 border-t border-slate-200/60">
                  <h4 className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">
                    MODULE BLUEPRINT
                  </h4>
                  <div className="space-y-3">
                    {currentProject.approach.map((item, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                        key={idx} 
                        className="flex items-start gap-4 bg-white/60 backdrop-blur-sm border border-white p-4 rounded-2xl shadow-sm"
                      >
                        <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: currentProject.color }} />
                        <span className="text-sm text-slate-700 font-bold">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Metric counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200/60">
                {currentProject.results.map((r, idx) => {
                  const Icon = r.icon;
                  return (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                      key={idx} 
                      className="p-6 bg-white border border-slate-100 rounded-2xl shadow-lg shadow-slate-200/40 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Icon className="w-20 h-20" style={{ color: currentProject.color }} />
                      </div>
                      <div className="relative z-10 space-y-2">
                        <div className="text-3xl font-black text-slate-900 font-mono tracking-tighter leading-none" style={{ color: currentProject.color }}>
                          {r.value}
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-widest">
                          {r.label}
                        </span>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2 border-t border-slate-100 pt-2">
                          {r.sub}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

            </div>

            {/* Right panel: BEFORE/AFTER INTERACTIVE GRAPHIC */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> Interactive Interface Comparison
                </span>
                <span className="text-[10px] font-mono text-brand-orange-600 uppercase font-bold bg-brand-orange-50 border border-brand-orange-200 px-4 py-1.5 rounded-full shadow-sm animate-pulse flex items-center gap-2">
                  DRAG TO COMPARE <ArrowRight className="w-3 h-3" />
                </span>
              </div>

              {/* Workspace Frame */}
              <div 
                ref={containerRef}
                onMouseMove={onMouseMove}
                onTouchMove={onTouchMove}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                className="relative w-full aspect-[4/3] bg-slate-900 rounded-[2rem] border-[8px] border-slate-900 shadow-2xl overflow-hidden cursor-ew-resize group"
              >
                
                {/* ----------------- BEFORE SCREEN (Dark overlay) ----------------- */}
                <div className="absolute inset-0 w-full h-full bg-slate-800 text-left p-8 sm:p-12 flex flex-col justify-between">
                  <div className="absolute inset-0 grid-bg-dark opacity-10 pointer-events-none" />
                  
                  <div className="relative z-10 flex justify-between items-center border-b border-slate-700 pb-6">
                    <span className="text-xs font-mono text-red-400 font-bold uppercase flex items-center gap-2">
                      <Zap className="w-4 h-4" /> BEFORE SYSTEM AUDIT
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold bg-slate-900 px-3 py-1 rounded-full border border-slate-700">LEGACY SYSTEM</span>
                  </div>

                  <div className="relative z-10 space-y-4 max-w-sm text-left">
                    <div className="h-1 w-16 bg-red-500 rounded-full" />
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-200 tracking-tight leading-tight">
                      Unoptimized, delayed legacy frameworks
                    </h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">
                      Severe loading bottlenecks caused massive user drop-offs before booking completion, drastically increasing acquisition costs.
                    </p>
                  </div>

                  {/* Legacy latency metrics */}
                  <div className="relative z-10 p-5 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-1">Performance Lag</span>
                      <span className="text-lg font-mono text-red-400 font-bold block">{currentProject.specMetrics.legacy}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest block mb-1">Status</span>
                      <span className="text-xs font-bold text-red-500 uppercase px-3 py-1 bg-red-500/10 rounded-full border border-red-500/20">Critical</span>
                    </div>
                  </div>
                </div>

                {/* ----------------- AFTER SCREEN (Premium Mockup Overlay) ----------------- */}
                <div 
                  className="absolute inset-y-0 right-0 h-full overflow-hidden border-l-[3px] border-white shadow-[-10px_0_20px_rgba(0,0,0,0.5)] z-10"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div 
                    className="absolute inset-0 w-full h-full bg-slate-100"
                    style={{ width: "100%", transform: `translateX(-${sliderPosition}%)`, left: `${sliderPosition}%` }}
                  >
                    <img
                      src={currentProject.imageUrl}
                      alt={currentProject.title + " User Interface"}
                      className="w-full h-full object-cover"
                      style={{ filter: 'brightness(0.95)' }}
                    />
                    
                    {/* Overlay Badges */}
                    <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
                      <div className="bg-white/90 backdrop-blur-md border border-white/50 px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-mono text-slate-900 font-bold uppercase tracking-wider">
                          ARROWHEAD DEPLOYED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separator handlebar slider circle */}
                <div 
                  className="absolute inset-y-0 w-1 bg-white select-none pointer-events-none z-30"
                  style={{ left: `calc(${sliderPosition}% - 2px)` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl pointer-events-none text-brand-orange-500">
                    <span className="text-xl font-bold leading-none tracking-tighter">⟷</span>
                  </div>
                </div>

              </div>

              {/* Slider performance indicators box */}
              <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200/60 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />
                <div className="flex-1">
                  <span className="text-[10px] font-mono text-slate-500 block uppercase font-bold tracking-widest mb-1">OPERATIONAL METRICS BOOST</span>
                  <span className="text-sm font-extrabold text-slate-900 block">{currentProject.specMetrics.label}</span>
                </div>
                <div className="flex items-center gap-6 flex-1 justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-1">Optimized Result</span>
                    <span className="text-lg font-mono text-emerald-600 font-bold leading-none">{currentProject.specMetrics.optimized}</span>
                  </div>
                  <div className="h-10 w-px bg-slate-200" />
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-widest block mb-1">Net Lift</span>
                    <span className="text-lg font-black text-brand-blue-500 font-mono leading-none">{currentProject.specMetrics.lift}</span>
                  </div>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
