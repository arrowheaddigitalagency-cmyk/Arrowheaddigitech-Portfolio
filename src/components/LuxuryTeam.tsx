import React from "react";
import { Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  image: string;
  linkedin: string;
}

export default function LuxuryTeam() {
  const leaders: TeamMember[] = [
    {
      name: "Waseeq Nauman",
      role: "Founder & CEO",
      badge: "Founder & CEO // Executive Principal",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    },
    {
      name: "Usman Farooqi",
      role: "Operations Director",
      badge: "Operations Director // Systems Architect",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    }
  ];

  const specialists: TeamMember[] = [
    {
      name: "Zulqarnain Jutt",
      role: "Marketing Strategist",
      badge: "Strategy Officer",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    },
    {
      name: "Hammad Ahmad",
      role: "Brand Growth Manager",
      badge: "Brand Director",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    },
    {
      name: "Abeer Khurram",
      role: "Web & Software Expert",
      badge: "Technical Lead",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    },
    {
      name: "Mohammad Kashan",
      role: "Creative Analyst / Video Editor",
      badge: "Media Lead",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
    }
  ];

  return (
    <section id="team" className="py-20 bg-white text-slate-900 border-t border-slate-200 text-left">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full">
        
        {/* Header Segment */}
        <div className="mb-20 md:flex justify-between items-end border-b border-slate-100 pb-10">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
              // EXECUTIVE LEADERSHIP
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tighter">
              EXECUTIVE <br /> COMMAND.
            </h2>
          </div>
          <p className="mt-8 md:mt-0 text-lg text-slate-500 font-medium max-w-sm">
            A concentrated alliance of digital systems experts, strategists, and operations directors commanding strict execution.
          </p>
        </div>

        {/* Row 1: Executive Leaders (Larger Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {leaders.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col md:flex-row border border-slate-200/80 p-8 rounded-xl bg-slate-50/50 hover:bg-slate-50 hover:border-brand-orange-500/30 transition-all duration-500 gap-8"
            >
              {/* Larger Leader Image aspect ratio */}
              <div className="relative w-full md:w-[45%] aspect-[4/5] overflow-hidden bg-slate-150 rounded-lg shrink-0">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-1000" />
                
                {/* Social Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/95 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="mailto:info@arrowheaddigitech.com" className="w-10 h-10 bg-white/95 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-brand-orange-500 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Text description details - Bigger font for executive profiles */}
              <div className="flex flex-col justify-between py-2">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase mb-3 block">
                    {member.badge}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-2 group-hover:text-brand-orange-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-base text-slate-600 font-bold mb-4">{member.role}</p>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed">
                    Directing Arrowhead's business growth pipelines and high-end tech-consulting operations for enterprise scaling.
                  </p>
                </div>
                <div className="mt-8 text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                  Status // ACTIVE DEPLOYER
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Row 2: Specialists & Directors (Standard Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialists.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col border border-slate-100 p-6 rounded-xl bg-slate-50/20 hover:bg-slate-50 transition-all duration-500"
            >
              {/* Standard Image container */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-150 rounded-lg mb-5">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-1000" />
                
                {/* Social Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-8 h-8 bg-white/90 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                  <a href="mailto:info@arrowheaddigitech.com" className="w-8 h-8 bg-white/90 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-brand-orange-500 hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Text metadata */}
              <div className="flex flex-col">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-1.5">
                  {member.badge}
                </span>
                <h3 className="text-xl font-extrabold tracking-tighter mb-0.5 group-hover:text-brand-orange-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 font-bold">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
