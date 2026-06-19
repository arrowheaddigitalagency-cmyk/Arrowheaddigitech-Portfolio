import React, { useState, useEffect } from "react";
import { ArrowUpRight, ShieldCheck, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "py-4 bg-white/75 backdrop-blur-xl border-b border-slate-200/60 shadow-sm"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
        {/* Logo block */}
        <div 
          onClick={() => scrollToSection("hero")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Custom vector arrowhead emblem */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-brand-orange-500/25 group-hover:scale-105 transition-transform duration-300">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-5 h-5 text-white stroke-[2.5]"
              stroke="currentColor"
            >
              <path d="M4 12l16-8-3 8 3 8-16-8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-0.5 font-sans">
              ARROWHEAD<span className="text-brand-orange-500 text-2xl font-black leading-none">.</span>
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] text-slate-400 font-bold uppercase leading-none">
              DigiTech Agency
            </span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center gap-7 bg-slate-50/80 border border-slate-200/50 px-6 py-2 rounded-full backdrop-blur-md">
          {["Services", "About", "Process", "Case Studies", "Team", "Achievements"].map((tab) => {
            const blockId = tab.toLowerCase().replace(" ", "-");
            return (
              <button
                key={tab}
                onClick={() => scrollToSection(blockId)}
                className="text-xs font-semibold tracking-wide text-slate-600 hover:text-brand-orange-500 transition-colors duration-200 cursor-pointer font-sans"
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Actions bar (System Status Indicator & CTA Button) */}
        <div className="hidden md:flex items-center gap-6">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            VERIFIED SECURE
          </div>
          <button
            onClick={() => scrollToSection("estimate")}
            className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange-500 to-amber-500 text-white font-bold text-xs px-5 py-3 rounded-full shadow-lg shadow-brand-orange-500/20 hover:shadow-brand-orange-500/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer uppercase tracking-wider font-sans"
          >
            Start Your Project
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile toggle button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => scrollToSection("estimate")}
            className="bg-brand-orange-500 hover:bg-brand-orange-600 text-white p-2.5 rounded-full shadow-md"
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-brand-orange-500 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bg-white/95 backdrop-blur-2xl border-b border-slate-200 py-8 px-6 flex flex-col gap-6 z-40 ease-out duration-300 shadow-xl">
          <div className="flex flex-col gap-4">
            {["Services", "About", "Process", "Case Studies", "Team", "Achievements"].map((tab) => {
              const blockId = tab.toLowerCase().replace(" ", "-");
              return (
                <button
                  key={tab}
                  onClick={() => scrollToSection(blockId)}
                  className="text-left text-sm font-bold tracking-wide text-slate-800 hover:text-brand-orange-500 transition-colors py-2 border-b border-slate-100 font-sans"
                >
                  {tab}
                </button>
              );
            })}
          </div>
          <div className="pt-4 flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-emerald-600 self-start">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              VERIFIED SECURE CONNECTION
            </div>
            <button
              onClick={() => scrollToSection("estimate")}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-orange-500 to-amber-500 text-white font-bold text-sm py-3.5 rounded-full shadow-lg"
            >
              Start Project
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
