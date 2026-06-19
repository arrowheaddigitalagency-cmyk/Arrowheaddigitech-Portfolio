import React, { useState } from "react";
import { ArrowRight, Terminal } from "lucide-react";

export default function ProjectEstimatorCTA() {
  const [step, setStep] = useState(1);

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden">
      
      {/* Brutalist Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Terminal Header */}
        <div className="flex items-center gap-3 mb-16 border-b border-white/10 pb-6">
          <Terminal className="w-5 h-5 text-brand-orange-500" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-slate-400">
            SYSTEM.INITIATE_CONTACT();
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-12">
          READY TO <br /> DEPLOY?
        </h2>

        {/* Brutalist Single-Column Form */}
        <form className="flex flex-col gap-8">
          
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">01. Identity</label>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-transparent border-b border-white/20 text-3xl font-extrabold tracking-tight text-white placeholder-slate-800 py-4 focus:outline-none focus:border-brand-orange-500 transition-colors rounded-none"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">02. Comms Link</label>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-transparent border-b border-white/20 text-3xl font-extrabold tracking-tight text-white placeholder-slate-800 py-4 focus:outline-none focus:border-brand-orange-500 transition-colors rounded-none"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">03. Corporate Entity</label>
            <input 
              type="text" 
              placeholder="Company Name" 
              className="w-full bg-transparent border-b border-white/20 text-3xl font-extrabold tracking-tight text-white placeholder-slate-800 py-4 focus:outline-none focus:border-brand-orange-500 transition-colors rounded-none"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold">04. Operational Requirement</label>
            <select className="w-full bg-transparent border-b border-white/20 text-3xl font-extrabold tracking-tight text-slate-300 py-4 focus:outline-none focus:border-brand-orange-500 transition-colors appearance-none rounded-none cursor-pointer">
              <option value="" className="bg-slate-900">Select Parameter</option>
              <option value="growth" className="bg-slate-900">Full-Stack Growth Engineering</option>
              <option value="web" className="bg-slate-900">High-Performance Web Architecture</option>
              <option value="ads" className="bg-slate-900">Algorithmic Media Buying</option>
            </select>
          </div>

          {/* Action Button */}
          <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-10">
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-bold mb-1">Direct Line</span>
              <a href="tel:+923000955490" className="text-xl font-mono text-white hover:text-brand-orange-500 transition-colors">+92 300 0955490</a>
            </div>
            <button 
              type="submit" 
              className="group flex items-center gap-4 bg-white text-black px-10 py-6 font-bold text-sm tracking-widest uppercase hover:bg-brand-orange-500 hover:text-white transition-colors"
            >
              Execute
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </form>

      </div>
    </section>
  );
}
