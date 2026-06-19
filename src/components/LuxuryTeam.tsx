import React from "react";
import { Linkedin, Mail, Phone, ExternalLink, ShieldCheck, Star } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  image: string;
  linkedin: string;
  isExecutive?: boolean;
}

export default function LuxuryTeam() {
  const team: TeamMember[] = [
    {
      name: "Waseeq Nauman",
      role: "Founder & CEO",
      badge: "Principal Deployer",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#",
      isExecutive: true
    },
    {
      name: "Usman Farooqi",
      role: "Web Dev Lead & Project Manager",
      badge: "Systems Architect",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#",
      isExecutive: true
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
    <section id="team" className="py-32 relative bg-white overflow-hidden text-left">
      
      {/* Soft Lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-24 mx-auto text-center">
          <span className="text-[10px] font-bold tracking-[0.3em] text-brand-orange-500 uppercase block mb-4">
            // OPERATIONAL LEADERSHIP
          </span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            MEET THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
              SUBJECT EXPERTS.
            </span>
          </h2>
          <p className="text-slate-600 text-lg font-medium leading-relaxed mt-6 max-w-xl mx-auto">
            A highly concentrated alliance of engineers and media buyers commanding strict operational discipline and aggressive scaling protocols.
          </p>
        </div>

        {/* Executive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center justify-center">
          
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className={`relative group ${member.isExecutive ? "lg:-translate-y-4 z-20" : "z-10"}`}
            >
              <div className={`glass-card overflow-hidden transition-all duration-500 bg-white/70 backdrop-blur-2xl ${
                member.isExecutive 
                  ? "border-2 border-white/80 shadow-2xl shadow-brand-orange-500/10 hover:shadow-3xl hover:shadow-brand-orange-500/20" 
                  : "border border-white/50 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:-translate-y-2"
              }`}>
                
                {/* Diagonal Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transform -translate-x-[100%] group-hover:translate-x-[100%] transition-all duration-1000 z-30 pointer-events-none" />

                {/* Profile Banner */}
                <div className="h-40 bg-gradient-to-tr from-slate-100 to-slate-50 relative overflow-hidden">
                  {member.isExecutive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange-500 to-brand-blue-500 opacity-10 mix-blend-overlay" />
                  )}
                  {/* Subtle Grid pattern overlay */}
                  <div className="absolute inset-0 grid-bg-dark opacity-30" />
                  
                  {/* Banner Logo Watermark */}
                  <div className="absolute -bottom-4 -right-4 opacity-5">
                    <ShieldCheck className="w-32 h-32" />
                  </div>
                </div>

                {/* Profile Avatar */}
                <div className="px-8 relative z-20">
                  <div className={`-mt-20 w-36 h-36 rounded-2xl overflow-hidden shadow-2xl bg-white relative mx-auto ${member.isExecutive ? "p-1.5 bg-gradient-to-tr from-brand-orange-500 to-brand-blue-500" : "p-1.5 bg-white border border-slate-200"}`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                    />
                    {member.isExecutive && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-8 pt-6 text-center relative z-20">
                  <div className="inline-block px-3 py-1 bg-slate-100 rounded-full mb-4">
                    <span className={`text-[10px] font-bold tracking-widest uppercase ${member.isExecutive ? "text-brand-orange-500" : "text-brand-blue-500"}`}>
                      {member.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">{member.name}</h3>
                  <p className="text-slate-600 font-medium text-sm mb-8">{member.role}</p>

                  <div className="pt-6 border-t border-slate-200/50 flex justify-center items-center gap-4">
                    <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-all shadow-sm border border-slate-200">
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a href="mailto:info@arrowheaddigitech.com" className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-brand-orange-500 hover:text-white flex items-center justify-center transition-all shadow-sm border border-slate-200">
                      <Mail className="w-4 h-4" />
                    </a>
                    <a href="tel:+923000955490" className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all shadow-sm border border-slate-200">
                      <Phone className="w-4 h-4" />
                    </a>
                    <a href="https://arrowheaddigitech.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 hover:bg-slate-900 hover:text-white flex items-center justify-center transition-all shadow-sm border border-slate-200">
                      <ExternalLink className="w-4 h-4" />
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
