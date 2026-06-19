import React from "react";
import { Linkedin, Mail, MapPin, Target, Shield, CheckCircle } from "lucide-react";

export default function PremiumFooter() {
  return (
    <footer className="bg-[#02040a] text-white pt-40 pb-12 overflow-hidden relative border-t border-white/5">
      
      {/* Heavy Engineering Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,#1e3a8a20_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col">
        
        {/* Massive Logo / Branding Area */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center mb-32 border-b border-white/10 pb-20 gap-12">
          
          <div className="flex flex-col gap-6">
            {/* Asset placeholder for actual Arrowhead Logo */}
            <div className="w-64 h-20 bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden rounded">
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-slate-500">[ ASSET: arrowhead_logo.png ]</span>
              <img src="/src/assets/images/arrowhead_logo.png" alt="Arrowhead DigiTech" onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="absolute inset-0 w-full h-full object-contain p-4 transition-opacity duration-300" />
            </div>
            <p className="text-xl sm:text-2xl font-bold text-slate-400 max-w-lg tracking-tight">
              We engineer growth architecture and high-velocity acquisition systems for market leaders.
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-lg">
               <Shield className="w-5 h-5 text-emerald-500" />
               <span className="font-mono text-xs tracking-widest uppercase font-bold text-slate-300">Enterprise Grade Infrastructure</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-lg">
               <CheckCircle className="w-5 h-5 text-blue-500" />
               <span className="font-mono text-xs tracking-widest uppercase font-bold text-slate-300">Verified System Uptime 99.9%</span>
            </div>
          </div>

        </div>

        {/* Multi-Column Data & Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-40">
          
          <div>
            <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block mb-8">System Hierarchy</span>
            <ul className="space-y-5">
              <li><a href="#services" className="text-slate-400 hover:text-white font-bold transition-colors">Deployment Vectors</a></li>
              <li><a href="#about" className="text-slate-400 hover:text-white font-bold transition-colors">Founder's Log</a></li>
              <li><a href="#work" className="text-slate-400 hover:text-white font-bold transition-colors">Verified Records</a></li>
              <li><a href="#achievements" className="text-slate-400 hover:text-white font-bold transition-colors">Executive Analytics</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block mb-8">Global Intel</span>
            <ul className="space-y-5">
              <li><a href="#" className="text-slate-400 hover:text-white font-bold transition-colors">Market Research</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white font-bold transition-colors">Algorithm Updates</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white font-bold transition-colors">Acquisition Strategy</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-16 lg:gap-32 lg:justify-end">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block mb-8">Secure Comms</span>
              <ul className="space-y-5">
                <li><a href="mailto:info@arrowheaddigitech.com" className="text-lg font-bold text-white hover:text-brand-orange-500 transition-colors">info@arrowheaddigitech.com</a></li>
                <li><a href="tel:+923000955490" className="text-lg font-bold text-white hover:text-brand-orange-500 transition-colors">+92 300 0955490</a></li>
              </ul>
              <div className="flex items-center gap-4 mt-8">
                <a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-[#0A66C2] rounded flex items-center justify-center transition-colors border border-white/10">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block mb-8">Headquarters</span>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-slate-500 shrink-0" />
                <span className="text-slate-400 font-bold leading-relaxed">
                  Lahore, Pakistan<br />
                  <span className="text-white mt-2 block">Operating Globally.</span>
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Massive Mega Text ending */}
        <div className="w-full flex justify-center mb-16 overflow-hidden select-none border-b border-white/10 pb-16">
          <h1 className="text-[14vw] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-900">
            ARROWHEAD
          </h1>
        </div>

        {/* Tactical Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-600 uppercase tracking-widest gap-6 font-bold">
          <span>&copy; {new Date().getFullYear()} Arrowhead Digital Systems. All Systems Nominal.</span>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="text-emerald-500">Status: ONLINE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
