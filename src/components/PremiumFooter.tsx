import React from "react";
import { Facebook, Instagram, Linkedin, ShieldCheck, ArrowUp } from "lucide-react";

export default function PremiumFooter() {
  const scrollBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-transparent text-slate-800 relative overflow-hidden pt-20 pb-10 border-t border-slate-100 font-sans">
      
      {/* Structural layout outlines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />
      <div className="absolute right-[8%] top-0 bottom-0 w-px bg-slate-100 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Upper Column Stack */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-100 text-left">
          
          {/* Logo block */}
          <div className="md:col-span-4 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-orange-500 flex items-center justify-center shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white stroke-[2]" stroke="currentColor">
                  <path d="M4 12l16-8-3 8 3 8-16-8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-800 flex items-center font-sans uppercase">
                ARROWHEAD<span className="text-brand-orange-500 text-xl font-black">.</span>
              </span>
            </div>

            <p className="text-slate-500 text-xs font-normal leading-relaxed max-w-xs font-sans">
              Designing custom performance funnels and speed-optimized React directories to attract verified high-intent client traffic globally.
            </p>

            {/* Social channels */}
            <div className="flex items-center gap-2 pt-2 select-none">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-orange-500 hover:border-brand-orange-500/20 hover:bg-brand-orange-50 transition-all duration-300"
                title="Arrowhead Facebook Channel"
              >
                <Facebook className="w-4 h-4 fill-current" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-orange-500 hover:border-brand-orange-500/20 hover:bg-brand-orange-50 transition-all duration-300"
                title="Arrowhead Instagram Media"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand-orange-500 hover:border-brand-orange-500/20 hover:bg-brand-orange-50 transition-all duration-300"
                title="Arrowhead LinkedIn Professional Network"
              >
                <Linkedin className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Link grids (8 cols inside) */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 font-sans">
            
            {/* Services navigation links */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
                // SYSTEM DEPLOYMENTS
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold text-left">
                {["Google Ads Campaigns", "Meta Ads Services", "Social Engagement", "Web & Software Dev", "Custom AI Chatbots"].map((link) => (
                  <li key={link}>
                    <a href="#services" className="hover:text-brand-orange-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Corporate profiles links */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
                // PLATFORM AUDITS
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold text-left">
                {["Institutional About", "Coordinated Timeline", "Proven Metrics Board", "Interactive Estimator", "Subject Leaders"].map((link, i) => {
                  const anchors = ["about", "process", "achievements", "estimate", "team"];
                  return (
                    <li key={link}>
                      <a href={`#${anchors[i]}`} className="hover:text-brand-orange-600 transition-colors">
                        {link}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Direct legal guidelines */}
            <div className="space-y-3.5">
              <h4 className="text-[10px] font-mono font-bold tracking-widest text-brand-orange-600 uppercase">
                // LEGAL COORDINATION
              </h4>
              <ul className="space-y-2 text-xs text-slate-500 font-semibold text-left">
                {["Privacy Standards", "Terms of Engagement", "Citation Rules", "System Audit Logs", "Recruitment Pack"].map((link) => (
                  <li key={link}>
                    <a href="#estimate" className="hover:text-brand-orange-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* Lower row details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 select-none font-sans">
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-450 font-mono font-bold">
            <span>© {new Date().getFullYear()} ARROWHEAD DIGITECH. ALL PERFORMANCE METRICS RESERVED.</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-1 text-emerald-600 uppercase">
              <ShieldCheck className="w-3.5 h-3.5" /> SECURED HIGH-SPEED CONTAINER
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollBackToTop}
            className="group flex items-center gap-1 px-4 py-2 bg-slate-50 border border-slate-200 hover:border-brand-orange-500/20 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-all cursor-pointer rounded-lg shadow-sm"
          >
            LAUNCH_TO_TOP <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-brand-orange-500" />
          </button>
        </div>

      </div>
    </footer>
  );
}
