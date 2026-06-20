import React from "react";
import { Linkedin, Mail, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export default function LuxuryTeam() {
  const founders = [
    {
      id: "CEO",
      name: "Waseeq Nauman",
      role: "Founder & Chief Executive Officer",
      desc: "Waseeq engineers the grand strategy behind Arrowhead's market dominance. With deep expertise in luxury positioning and enterprise growth, he transformed Arrowhead from a standard agency into a high-performance growth infrastructure company capable of scaling international brands.",
      image: "/src/assets/images/waseeq_photo.jpg", // Asset Placeholder
      linkedin: "#",
      accent: "text-brand-orange-500",
      bgAccent: "bg-brand-orange-500"
    },
    {
      id: "OPS",
      name: "Usman Farooqi",
      role: "Operations Director & Systems Architect",
      desc: "Usman is the technical mastermind driving the Arrowhead Protocol. He oversees the seamless integration of advanced web architectures, AI autonomous pipelines, and high-latency data systems, ensuring that every strategic vision is executed with zero defects.",
      image: "/src/assets/images/usman_photo.jpg", // Asset Placeholder
      linkedin: "#",
      accent: "text-brand-blue-500",
      bgAccent: "bg-brand-blue-500"
    }
  ];

  const specialists = [
    { name: "Zulqarnain Jutt", role: "Marketing Strategist", badge: "Strategy" },
    { name: "Hammad Ahmad", role: "Brand Growth Manager", badge: "Brand" },
    { name: "Abeer Khurram", role: "Web & Software Expert", badge: "Technical" },
    { name: "Mohammad Kashan", role: "Creative Analyst / Video Editor", badge: "Media" }
  ];

  return (
    <section id="team" className="py-32 bg-white text-slate-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full">
        
        {/* Header Segment */}
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // EXECUTIVE COMMAND
          </span>
          <h2 className="text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tighter max-w-3xl mx-auto">
            THE ARCHITECTS OF <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">GROWTH.</span>
          </h2>
        </div>

        {/* Founder Spotlights (Strict Hierarchy) */}
        <div className="space-y-32">
          {founders.map((founder, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={founder.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Massive Portrait Container */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl group">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center -z-10 shadow-inner">
                      <div className="w-[80%] h-[80%] border border-white/10 rounded-xl flex flex-col items-center justify-center bg-white/5 backdrop-blur-md relative overflow-hidden">
                         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                         <span className="text-white font-mono tracking-widest uppercase font-bold text-sm z-10 text-center px-4 mb-2">
                           {founder.id} PORTRAIT
                         </span>
                         <span className="text-slate-500 font-mono tracking-[0.2em] text-[10px] uppercase text-center px-4 z-10">
                           Awaiting Asset
                         </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-60 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                       <span className="text-xs font-mono font-bold tracking-widest text-white/70 uppercase">
                         [ Asset Slot: {founder.id} ]
                       </span>
                       <div className="flex gap-2 pointer-events-auto">
                         <a href={founder.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-[#0A66C2] transition-colors">
                           <Linkedin className="w-4 h-4" />
                         </a>
                       </div>
                    </div>
                  </div>
                </motion.div>

                {/* Editorial Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <span className={`w-12 h-1 ${founder.bgAccent}`} />
                    <span className={`text-[10px] font-mono tracking-widest font-bold uppercase ${founder.accent}`}>
                      {founder.id} Spotlight
                    </span>
                  </div>
                  
                  <h3 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-4 text-slate-900">
                    {founder.name}
                  </h3>
                  <h4 className="text-xl sm:text-2xl font-bold text-slate-500 mb-8 tracking-tight">
                    {founder.role}
                  </h4>
                  
                  <p className="text-lg text-slate-600 font-medium leading-relaxed mb-12">
                    {founder.desc}
                  </p>

                  <a href="#contact" className="group inline-flex items-center gap-3 text-sm font-bold text-slate-900 uppercase tracking-widest hover:text-brand-orange-500 transition-colors">
                    Request Consultation
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </motion.div>

              </div>
            );
          })}
        </div>

        {/* Supporting Leadership Team (Strictly separate from founders, tightly packed) */}
        <div className="mt-40 border-t border-slate-200 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h4 className="text-3xl font-extrabold tracking-tighter text-slate-900">Supporting Directors.</h4>
              <p className="text-slate-500 mt-2 font-medium">The tactical specialists driving daily execution.</p>
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-bold">
              // TACTICAL SQUAD
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {specialists.map((member, idx) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group border-l-2 border-slate-100 pl-6 hover:border-slate-900 transition-colors"
              >
                <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-2 block">
                  {member.badge}
                </span>
                <h5 className="text-lg font-extrabold tracking-tight text-slate-900 mb-1">{member.name}</h5>
                <p className="text-xs font-bold text-slate-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
