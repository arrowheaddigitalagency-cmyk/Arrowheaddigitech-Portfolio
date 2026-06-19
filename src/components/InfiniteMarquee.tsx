import React from "react";
import { Car, Landmark, Plane, Fuel, ShieldCheck, Compass, Sparkles, Building2, MapPin } from "lucide-react";

export default function InfiniteMarquee() {
  const clients = [
    { name: "YALARIDE", sub: "Car Rental Portal", icon: Car },
    { name: "AMERICA NEED NURSES", sub: "Healthcare Agency", icon: Landmark },
    { name: "GO-JETTER TOURS", sub: "Premium Tourism", icon: Plane },
    { name: "PRICELESS RENT CAR", sub: "Premium Fleet", icon: Fuel },
    { name: "ATLANTA CAR RENTAL", sub: "Luxury Exotic Fleet", icon: ShieldCheck },
    { name: "DRIVE & KLEEN", sub: "Cleaning Tech Solutions", icon: Sparkles },
    { name: "VIP TABS", sub: "SaaS Solutions Systems", icon: Building2 },
    { name: "MOIZ & SONS", sub: "Heavy Industry Logistics", icon: Compass },
    { name: "LOCAL NETWORK", sub: "Community Portals", icon: MapPin },
  ];

  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-24 bg-transparent overflow-hidden relative select-none z-10">
      
      {/* Background Gradients & Glass Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/50 to-white pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-brand-blue-50/50 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left relative z-20">
        <div>
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-3 font-bold">
            // CORPORATE NETWORKS
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Accredited by Global Verticals.
          </h3>
        </div>
        <p className="text-base text-slate-600 font-medium max-w-sm leading-relaxed">
          Connecting premier brand enterprises, staffing boards, and rapid scale platforms to maximum digital conversion velocity.
        </p>
      </div>

      <div className="relative flex items-center w-full py-10">
        {/* Soft edge fade masks styled for light background */}
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Rolling infinite marquee */}
        <div className="w-full flex overflow-hidden">
          <div className="flex animate-marquee gap-8 whitespace-nowrap px-4 py-4">
            {duplicatedClients.map((client, index) => {
              const Icon = client.icon;
              return (
                <div
                  key={`${client.name}-${index}`}
                  className="flex items-center gap-5 glass-pill py-4 px-8 hover:bg-white transition-all duration-500 transform cursor-pointer shrink-0 group border-2 border-white/60 hover:border-brand-orange-200"
                >
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 group-hover:scale-110 group-hover:bg-brand-orange-50 group-hover:border-brand-orange-200 transition-all duration-500 group-hover:shadow-[0_0_20px_rgba(255,90,31,0.3)]">
                    <Icon className="w-5 h-5 text-slate-500 group-hover:text-brand-orange-500 transition-colors" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-extrabold tracking-tight text-slate-900 group-hover:text-brand-orange-600 transition-colors">
                      {client.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase font-bold mt-0.5">
                      {client.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
