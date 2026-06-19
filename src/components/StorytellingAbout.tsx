import React, { useState } from "react";
import { Compass, Eye, Sparkles, Target, Trophy, Award, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function StorytellingAbout() {
  const [activeTab, setActiveTab] = useState<"mission" | "vision">("mission");

  const pillars = {
    mission: {
      title: "ACTIVATE OUTREACH.",
      statement: "Supercharge client pipelines through high-precision Google & Meta conversion algorithms, high-impact branding, and targeted client flow architecture.",
      tag: "CONVERSION ARCHITECTS",
      icon: <Target className="w-6 h-6 text-brand-orange-500" />,
      pillars: [
        { num: "01", label: "MAGNETIZE INTENT", desc: "Target buyers looking for you." },
        { num: "02", label: "MULTIPLY VALUE", desc: "Sleek UX to capture cart actions." },
        { num: "03", label: "ACCELERATE DATA", desc: "Automated leads reporting, zero lag." },
      ]
    },
    vision: {
      title: "DOMINATE SEGMENTS.",
      statement: "Establish absolute regional authority and measurable advertising ROI for ambitious enterprises seeking superior market positions.",
      tag: "GLOBAL PIONEERS",
      icon: <Eye className="w-6 h-6 text-brand-blue-500" />,
      pillars: [
        { num: "04", label: "PRECISE CONTROL", desc: "Build top-of-mind recall." },
        { num: "05", label: "SCALABLE SYSTEMS", desc: "Modular, responsive API layouts." },
        { num: "06", label: "VERIFIED STANDING", desc: "Continuous automated local rankings." },
      ]
    }
  };

  const current = pillars[activeTab];

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Decorative vertical lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full space-y-32">
        
        {/* TOP: Split Layout (Story & 3D Glass Office) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Narrative */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block font-bold">
                // INSTITUTIONAL STORY
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                WE DO NOT CHASE CLICKS. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
                  WE CAPTURE MARKETS.
                </span>
              </h2>
            </div>

            <p className="text-slate-600 text-lg font-medium leading-relaxed max-w-lg">
              Arrowhead DigiTech operates at the intersection of quantitative search performance and luxury brand design. We construct persistent, verified scales for businesses that refuse average, standard template setups.
            </p>

            <div className="absolute top-8 right-8 z-20">
              <div className="flex -space-x-4">
                <div className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden bg-brand-orange-50">
                 <img src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg" alt="Team" className="w-full h-full object-cover"/>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden bg-brand-blue-50">
                 <img src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg" alt="Team" className="w-full h-full object-cover"/>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-white shadow-xl overflow-hidden bg-emerald-50">
                 <img src="/src/assets/images/arrowhead_experts_team_1781816010797.jpg" alt="Team" className="w-full h-full object-cover"/>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-white bg-brand-orange-100 flex items-center justify-center">
                <span className="text-xs font-bold text-brand-orange-600">+12</span>
              </div>
            </div>
            <div className="text-sm font-bold text-slate-700">
              Top-tier experts <br/><span className="text-slate-500 font-medium text-xs">driving your growth</span>
            </div>
          </motion.div>

          {/* Right: 3D Glass Office Visualization */}
          <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px]">
            <motion.div 
              initial={{ opacity: 0, rotateY: 15, scale: 0.9 }}
              whileInView={{ opacity: 1, rotateY: -5, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, type: "spring" }}
              className="relative w-full max-w-md h-full max-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform-style-3d glass-card"
            >
              <img 
                src="/src/assets/images/hero_dashboard_mockup_1781815970624.jpg" 
                alt="Arrowhead Workspace" 
                className="w-full h-full object-cover transition-transform duration-[20s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange-500/20 to-brand-blue-500/20 mix-blend-overlay" />
            </motion.div>

            {/* Floating Achievement Badges */}
            <motion.div 
              className="absolute -right-6 top-12 glass-panel p-4 flex items-center gap-3 z-20 animate-float"
              style={{ animationDelay: '0.2s', transform: 'translateZ(50px)' }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-orange-50 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-brand-orange-500" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Awarded</span>
                <span className="block text-sm font-extrabold text-slate-900">Awwwards 2025</span>
              </div>
            </motion.div>

            <motion.div 
              className="absolute -left-8 bottom-20 glass-panel p-4 flex items-center gap-3 z-20 animate-float"
              style={{ animationDelay: '1.5s', transform: 'translateZ(80px)' }}
            >
              <div className="w-10 h-10 rounded-full bg-brand-blue-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-blue-500" />
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-widest">Certified</span>
                <span className="block text-sm font-extrabold text-slate-900">Google Partner</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* BOTTOM: Mission & Vision Premium Cards with Animated Connectors */}
        <div className="relative">
          
          <div className="text-center mb-16">
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">OUR DIRECTIVES</h3>
            <p className="text-slate-500 max-w-2xl mx-auto">The foundational principles that guide our enterprise-grade delivery.</p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-12 relative z-20">
            <button
              onClick={() => setActiveTab("mission")}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-xl cursor-pointer shadow-sm border ${
                activeTab === "mission"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Target className={`w-4 h-4 ${activeTab === "mission" ? "text-brand-orange-500" : ""}`} />
              Active Mission
            </button>
            <button
              onClick={() => setActiveTab("vision")}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-xl cursor-pointer shadow-sm border ${
                activeTab === "vision"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
              }`}
            >
              <Eye className={`w-4 h-4 ${activeTab === "vision" ? "text-brand-blue-500" : ""}`} />
              Global Vision
            </button>
          </div>

          {/* Animated Card Container */}
          <div className="relative max-w-4xl mx-auto perspective-[1000px]">
            {/* Animated background connecting line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-orange-500/0 via-slate-300 to-brand-blue-500/0 -translate-x-1/2 z-0 hidden md:block">
              <motion.div 
                className="w-1 h-8 bg-brand-orange-500 rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_10px_#ff5a1f]"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, rotateX: -10, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                exit={{ opacity: 0, rotateX: 10, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-8 md:p-12 relative z-10 border-2 border-white"
              >
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  
                  {/* Left Icon & Title */}
                  <div className="w-full md:w-1/3 space-y-6">
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center border border-slate-100 relative">
                      {current.icon}
                      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/5" />
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full text-[9px] font-mono text-slate-600 uppercase mb-3 font-bold">
                        <Sparkles className="w-3 h-3 text-brand-orange-500" />
                        {current.tag}
                      </div>
                      <h4 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {current.title}
                      </h4>
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="w-full md:w-2/3 space-y-8">
                    <p className="text-slate-600 text-lg font-medium leading-relaxed">
                      {current.statement}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-slate-200">
                      {current.pillars.map((pil, idx) => (
                        <div key={idx} className="flex gap-4">
                          <CheckCircle2 className="w-5 h-5 text-brand-orange-500 shrink-0" />
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono font-bold text-slate-900 uppercase block tracking-wider">
                              {pil.num} // {pil.label}
                            </span>
                            <span className="text-sm text-slate-500 leading-relaxed block font-medium">
                              {pil.desc}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
