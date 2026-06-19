import React from "react";
import { Linkedin, Mail, ArrowUpRight, Award, Cpu, ShieldCheck, Zap, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  image: string;
  linkedin: string;
  isCEO?: boolean;
}

export default function LuxuryTeam() {
  const team: TeamMember[] = [
    {
      name: "Waseeq Nauman",
      role: "Founder & CEO",
      badge: "Principal Deployer",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#",
      isCEO: true
    },
    {
      name: "Usman Farooqi",
      role: "Web Dev Lead & Project Manager",
      badge: "Systems Architect",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    },
    {
      name: "Abeer Khurram",
      role: "Digital Marketing Lead",
      badge: "Growth Engineer",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    }
  ];

  return (
    <section id="team" className="py-32 relative overflow-hidden bg-transparent select-none text-left">
      
      {/* Structural layout outlines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-200/50 hidden lg:block" />

      {/* Soft Glow Background */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
            // MASTER TEAM PORTRAITS
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            MEET THE SUBJECT EXPERTS. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
              IMPECCABLE PERFORMANCE.
            </span>
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 max-w-xl mx-auto">
            A cohesive alliance of media buyers, custom developers, and cinematic designers operating under high excellence margins.
          </p>
        </div>

        {/* Premium LinkedIn-style Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center">
          
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative group ${member.isCEO ? "lg:scale-110 z-20" : "z-10"}`}
            >
              <div className={`glass-card overflow-hidden transition-all duration-500 border-2 border-white bg-white/60 backdrop-blur-xl ${
                member.isCEO 
                  ? "shadow-2xl shadow-brand-orange-500/20 hover:shadow-3xl hover:shadow-brand-orange-500/30" 
                  : "shadow-lg hover:shadow-xl hover:-translate-y-2"
              }`}>
                
                {/* Profile Banner */}
                <div className="h-32 bg-gradient-to-tr from-slate-200 to-slate-100 relative overflow-hidden">
                  {member.isCEO && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange-500 to-brand-blue-500 opacity-20 mix-blend-overlay" />
                  )}
                  {/* Subtle Grid pattern overlay */}
                  <div className="absolute inset-0 grid-bg-dark opacity-30" />
                </div>

                {/* Profile Avatar */}
                <div className="px-8 relative">
                  <div className={`-mt-16 w-32 h-32 rounded-2xl border-4 border-white overflow-hidden shadow-xl bg-white relative ${member.isCEO ? "ring-2 ring-brand-orange-500 ring-offset-2" : ""}`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {member.isCEO && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <ShieldCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-8 flex gap-2">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors shadow-sm border border-slate-200/50">
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-8 pt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono tracking-widest font-bold uppercase ${member.isCEO ? "text-brand-orange-500" : "text-brand-blue-500"}`}>
                      {member.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-1">{member.name}</h3>
                  <p className="text-slate-600 font-medium text-sm mb-6">{member.role}</p>

                  <div className="pt-6 border-t border-slate-200/50 flex justify-between items-center">
                    <div className="flex gap-4">
                      <a
                        href="mailto:info@arrowheaddigitech.com"
                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-brand-orange-500 flex items-center gap-2 transition-colors"
                        title="info@arrowheaddigitech.com"
                      >
                        <Mail className="w-4 h-4" /> Email
                      </a>
                      <a
                        href="tel:+923000955490"
                        className="text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-emerald-500 flex items-center gap-2 transition-colors"
                        title="+92 300 0955490"
                      >
                        <Phone className="w-4 h-4" /> Phone
                      </a>
                    </div>
                    <a href="https://arrowheaddigitech.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
