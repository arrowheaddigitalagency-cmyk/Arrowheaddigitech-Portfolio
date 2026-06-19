import React from "react";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

interface TeamMember {
  name: string;
  role: string;
  badge: string;
  image: string;
  linkedin: string;
}

export default function LuxuryTeam() {
  const team: TeamMember[] = [
    {
      name: "Waseeq Nauman",
      role: "Founder & CEO",
      badge: "Principal Deployer",
      image: "/src/assets/images/arrowhead_experts_team_1781816010797.jpg",
      linkedin: "#"
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
    <section id="team" className="py-32 bg-white text-slate-900 border-t border-slate-200 text-left">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        
        <div className="mb-24 md:flex justify-between items-end">
          <div className="max-w-2xl">
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-4 font-bold">
              // THE ARCHITECTS
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold leading-[0.95] tracking-tighter">
              EXECUTIVE <br /> COMMAND.
            </h2>
          </div>
          <p className="mt-8 md:mt-0 text-lg text-slate-500 font-medium max-w-sm">
            A concentrated alliance of engineers and media buyers commanding strict operational discipline.
          </p>
        </div>

        {/* Cinematic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-100 mb-6">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                
                {/* Social Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                  <a href={member.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 bg-white/90 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="mailto:info@arrowheaddigitech.com" className="w-10 h-10 bg-white/90 backdrop-blur text-slate-900 rounded-full flex items-center justify-center hover:bg-brand-orange-500 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Typography */}
              <div className="flex flex-col">
                <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase mb-2">
                  {member.badge}
                </span>
                <h3 className="text-3xl font-extrabold tracking-tighter mb-1 group-hover:text-brand-orange-500 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-600 font-medium">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
