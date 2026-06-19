import React, { useRef } from "react";
import { ArrowRight, Compass, Shield, Zap, MessageSquare, Target } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export default function StorytellingAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax translation curves
  const yImage1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  
  // Opacity & movement triggers for sections
  const aboutOpacity = useTransform(scrollYProgress, [0.1, 0.35, 0.55], [0, 1, 0]);
  const aboutTranslateY = useTransform(scrollYProgress, [0.1, 0.35, 0.55], [40, 0, -30]);

  const mvOpacity = useTransform(scrollYProgress, [0.45, 0.7, 0.95], [0, 1, 0]);
  const mvTranslateY = useTransform(scrollYProgress, [0.45, 0.7, 0.95], [40, 0, -30]);

  const benefits = [
    {
      title: "More Leads",
      desc: "Quality prospects for your business",
      icon: <Zap className="w-5 h-5 text-brand-orange-500" />
    },
    {
      title: "Strong Brand",
      desc: "A powerful presence people remember",
      icon: <Shield className="w-5 h-5 text-brand-blue-500" />
    },
    {
      title: "Real Results",
      desc: "Marketing focused on growth",
      icon: <Target className="w-5 h-5 text-emerald-500" />
    },
    {
      title: "Clear Communication",
      desc: "Simple updates and honest strategy",
      icon: <MessageSquare className="w-5 h-5 text-indigo-500" />
    }
  ];

  const missionPillars = ["Attract", "Grow", "Convert", "Achieve"];
  const visionValues = ["Lead", "Trust", "Impact", "Success"];

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative min-h-[160vh] bg-white overflow-hidden text-left py-20"
    >
      {/* Background Section Pin Layout */}
      <div className="sticky top-0 w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
        
        {/* Subtle Watermark backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] font-extrabold text-slate-100/50 select-none pointer-events-none tracking-tighter whitespace-nowrap z-0">
          DOCTRINE
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Parallax Images & Graphics */}
          <div className="lg:col-span-6 relative h-[450px] sm:h-[600px] w-full flex items-center justify-center">
            
            {/* Primary team visual with slow upward scroll-parallax */}
            <motion.div 
              style={{ y: yImage1 }}
              className="absolute left-6 w-3/4 h-[350px] sm:h-[450px] bg-slate-100 overflow-hidden shadow-2xl rounded-sm border border-slate-200"
            >
              <img 
                src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg" 
                alt="Arrowhead Marketing Operations" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
              />
            </motion.div>

            {/* Secondary geometric card with slow downward scroll-parallax */}
            <motion.div 
              style={{ y: yImage2 }}
              className="absolute right-6 top-12 w-1/2 h-[200px] sm:h-[280px] bg-slate-950 shadow-2xl overflow-hidden flex flex-col justify-between p-8 border border-white/10 rounded-sm"
            >
              <div className="w-full flex justify-end">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-orange-500 animate-pulse" />
              </div>
              <div>
                <Compass className="w-8 h-8 text-brand-blue-500 mb-4 animate-spin" style={{ animationDuration: '20s' }} />
                <h4 className="text-white text-xs font-mono tracking-widest uppercase font-bold">DIRECTION SYSTEM</h4>
                <p className="text-slate-400 text-[11px] font-mono mt-2">LATENCY // SECURE // OK</p>
              </div>
              {/* Architectural grid overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />
            </motion.div>

          </div>

          {/* Right Column: Progressive Reveal content */}
          <div className="lg:col-span-6 relative h-[600px] w-full">
            
            {/* Phase 1: About Us */}
            <motion.div 
              style={{ opacity: aboutOpacity, y: aboutTranslateY }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-orange-500" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-orange-500 font-bold uppercase">
                  OPERATIONAL PROFILE
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tighter leading-[1.05] mb-6">
                ABOUT US.
              </h2>
              
              <div className="space-y-4 text-slate-500 font-medium text-base leading-relaxed">
                <p>
                  Arrowhead helps businesses grow faster with smart digital strategies, strong branding, and lead-focused campaigns.
                </p>
                <p>
                  Beyond marketing, Arrowhead focuses on building brands, attracting customers, and supporting business growth.
                </p>
              </div>

              {/* Core Benefits */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <div key={i} className="flex gap-3 items-start border border-slate-100 p-3 rounded-md bg-slate-50/50">
                    <div className="p-1.5 border border-slate-200 rounded bg-white">
                      {b.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{b.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Phase 2: Mission & Vision */}
            <motion.div 
              style={{ opacity: mvOpacity, y: mvTranslateY }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-blue-500" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-blue-500 font-bold uppercase">
                  MISSION & VISION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                
                {/* Mission */}
                <div className="border border-slate-100 p-6 rounded bg-slate-50/50 backdrop-blur-sm relative">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">Our Mission</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    To help businesses grow with smart marketing, stronger branding, and high-quality leads that turn into real results.
                  </p>
                  <div className="mt-6">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-2">// Mission Pillars</span>
                    <div className="flex flex-wrap gap-2">
                      {missionPillars.map((p, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 border border-brand-orange-500/20 text-brand-orange-600 rounded bg-brand-orange-50/50 font-bold">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Vision */}
                <div className="border border-slate-100 p-6 rounded bg-slate-50/50 backdrop-blur-sm">
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3">Our Vision</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    To become a trusted marketing partner for brands that want to stand out, scale faster, and lead their market.
                  </p>
                  <div className="mt-6">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-2">// Vision Values</span>
                    <div className="flex flex-wrap gap-2">
                      {visionValues.map((v, idx) => (
                        <span key={idx} className="text-xs px-2.5 py-1 border border-brand-blue-500/20 text-brand-blue-600 rounded bg-brand-blue-50/50 font-bold">
                          {v}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
