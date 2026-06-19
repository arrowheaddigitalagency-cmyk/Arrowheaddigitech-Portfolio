import React from "react";
import { Linkedin, Mail, MapPin, Target } from "lucide-react";

export default function PremiumFooter() {
  return (
    <footer className="bg-slate-950 text-white pt-32 pb-10 overflow-hidden relative">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-32 border-b border-white/10 pb-20">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-6 h-6 text-brand-orange-500" />
              <span className="text-xl font-extrabold tracking-tight">Arrowhead DigiTech</span>
            </div>
            <p className="text-slate-500 font-medium max-w-sm mb-8">
              We engineer growth architecture and high-velocity acquisition systems for market leaders.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noreferrer" className="w-12 h-12 bg-white/5 hover:bg-brand-orange-500 hover:text-white rounded flex items-center justify-center transition-colors border border-white/10">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:info@arrowheaddigitech.com" className="w-12 h-12 bg-white/5 hover:bg-brand-orange-500 hover:text-white rounded flex items-center justify-center transition-colors border border-white/10">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase block mb-6">Operations</span>
            <ul className="space-y-4">
              <li><a href="#services" className="text-slate-300 hover:text-white font-medium transition-colors">Engineering</a></li>
              <li><a href="#process" className="text-slate-300 hover:text-white font-medium transition-colors">Methodology</a></li>
              <li><a href="#work" className="text-slate-300 hover:text-white font-medium transition-colors">Deployments</a></li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-widest text-slate-500 font-bold uppercase block mb-6">Headquarters</span>
            <ul className="space-y-4 text-slate-300 font-medium">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-500 mt-1 shrink-0" />
                <span>Lahore, Pakistan<br />Operating Globally.</span>
              </li>
              <li><a href="mailto:info@arrowheaddigitech.com" className="hover:text-white transition-colors">info@arrowheaddigitech.com</a></li>
              <li><a href="tel:+923000955490" className="hover:text-white transition-colors">+92 300 0955490</a></li>
            </ul>
          </div>

        </div>

        {/* Massive Mega Text */}
        <div className="w-full flex justify-center mb-10 overflow-hidden select-none">
          <h1 className="text-[15vw] leading-none font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-900">
            ARROWHEAD
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-600 uppercase tracking-widest gap-4">
          <span>&copy; {new Date().getFullYear()} Arrowhead Digital Systems. All Systems Nominal.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
