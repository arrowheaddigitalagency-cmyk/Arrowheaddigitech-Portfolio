import React, { useState, useEffect } from "react";
import { Target, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Methodology", href: "#process" },
    { name: "Deployments", href: "#work" },
    { name: "Telemetry", href: "#achievements" },
    { name: "Command", href: "#team" }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4" 
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          <a href="#" className="flex items-center gap-2 group">
            <Target className="w-6 h-6 text-brand-orange-500 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-extrabold text-xl tracking-tight text-white">Arrowhead</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-xs font-mono font-bold tracking-widest uppercase text-slate-300 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-6 py-2 border border-white/20 text-white text-xs font-mono font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
            >
              Initiate
            </a>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col p-6 sm:p-12"
          >
            <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2">
                <Target className="w-6 h-6 text-brand-orange-500" />
                <span className="font-extrabold text-xl tracking-tight text-white">Arrowhead</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-brand-orange-500">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-8">
              {links.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-extrabold tracking-tighter text-white hover:text-brand-orange-500 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 px-8 py-4 bg-white text-black text-sm font-bold tracking-widest uppercase inline-block text-center hover:bg-brand-orange-500 hover:text-white transition-colors"
              >
                Initiate Protocol
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
