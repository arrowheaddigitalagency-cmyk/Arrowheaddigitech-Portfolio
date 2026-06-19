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
    <div className="py-24 bg-[#0a0a0a] relative overflow-hidden select-none flex flex-col items-center">
      
      {/* Stark Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <div className="w-full overflow-hidden flex">
        <div className="animate-marquee flex items-center gap-24">
          {repeatedClients.map((client, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 flex items-center gap-4 group cursor-pointer grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <client.icon className="w-8 h-8 text-white" />
              <span className="text-3xl font-bold text-white tracking-tighter">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
