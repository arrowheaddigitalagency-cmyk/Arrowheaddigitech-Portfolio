import React from "react";
import { Hexagon, Triangle, Circle, Square, Command, Cloud, Anchor, Aperture } from "lucide-react";

export default function InfiniteMarquee() {
  const clients = [
    { name: "YalaRide", icon: Hexagon },
    { name: "America Needs Nurses", icon: Triangle },
    { name: "Go-Jetter Tours", icon: Circle },
    { name: "Nexus AI", icon: Command },
    { name: "Stratos", icon: Cloud },
    { name: "Velocity", icon: Square },
    { name: "Vertex Marine", icon: Anchor },
    { name: "Optic", icon: Aperture }
  ];

  const repeatedClients = [...clients, ...clients, ...clients];

  return (
    <div className="py-20 border-b border-slate-200/50 bg-slate-50/50 relative overflow-hidden select-none flex flex-col items-center">
      
      <span className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase mb-12">
        // TRUSTED BY INDUSTRY LEADERS
      </span>

      {/* Fade Gradients for smooth entrance/exit */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee flex items-center gap-10">
          {repeatedClients.map((client, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 px-8 py-4 glass-pill flex items-center gap-3 group hover:border-brand-orange-500/50 hover:bg-white transition-colors cursor-pointer"
            >
              <client.icon className="w-5 h-5 text-slate-400 group-hover:text-brand-orange-500 transition-colors" />
              <span className="text-xl font-bold text-slate-800 tracking-tight group-hover:text-slate-900 transition-colors">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
