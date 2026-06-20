import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Services",    href: "#services"     },
  { name: "Work",        href: "#work"          },
  { name: "About",       href: "#about"         },
  { name: "Process",     href: "#process"       },
  { name: "Team",        href: "#team"          },
];

export default function Header() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ─── Desktop / Tablet Header ─────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "glass-white shadow-[0_1px_0_rgba(10,13,20,0.06),0_4px_16px_rgba(10,13,20,0.06)] py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container-xl flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative w-8 h-8">
              <img
                src="/src/assets/images/arrowhead_logo.png"
                alt="Arrowhead DigiTech"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              {/* fallback icon if logo missing */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 peer-[img:not([src])]:opacity-100">
                <Zap className="w-6 h-6 text-brand-orange-500" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base tracking-tight text-ink-900">
                Arrowhead
              </span>
              <span className="text-[9px] font-semibold tracking-widest uppercase text-ink-400">
                DigiTech
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setActiveLink(link.name)}
                onMouseLeave={() => setActiveLink("")}
                className="relative px-4 py-2 text-sm font-600 text-ink-600 hover:text-ink-900 transition-all duration-200 rounded-lg hover:bg-surface-2 group"
              >
                {link.name}
                <motion.span
                  className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-brand-orange-500"
                  initial={false}
                  animate={{ scaleX: activeLink === link.name ? 1 : 0, opacity: activeLink === link.name ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: "left" }}
                />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+923000955490"
              className="text-xs font-700 text-ink-500 hover:text-ink-900 transition-colors tracking-wide hidden lg:block"
            >
              +92 300 0955490
            </a>
            <a href="#contact" className="btn-primary btn-primary-shimmer text-sm py-2.5 px-5">
              Book Strategy Call
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-ink-100 bg-white shadow-sm"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-ink-700" />
          </button>
        </div>
      </header>

      {/* ─── Mobile Full-Screen Menu ──────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col overflow-y-auto"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink-100">
              <a href="#" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <img
                  src="/src/assets/images/arrowhead_logo.png"
                  alt="Arrowhead DigiTech"
                  className="w-8 h-8 object-contain"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="flex flex-col leading-none">
                  <span className="font-extrabold text-base text-ink-900">Arrowhead</span>
                  <span className="text-[9px] font-semibold tracking-widest uppercase text-ink-400">DigiTech</span>
                </div>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-ink-100 hover:bg-surface-2 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-ink-700" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 pt-8 pb-6 flex-1 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  className="flex items-center justify-between py-4 text-2xl font-bold text-ink-900 border-b border-ink-100 hover:text-brand-orange-500 transition-colors group"
                >
                  {link.name}
                  <ArrowRight className="w-5 h-5 text-ink-300 group-hover:text-brand-orange-500 group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-6 pb-8 flex flex-col gap-4">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center text-base py-4"
              >
                Book Strategy Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex items-center justify-center gap-6 text-sm text-ink-400 font-medium">
                <a href="tel:+923000955490" className="hover:text-ink-900 transition-colors">+92 300 0955490</a>
                <span>·</span>
                <a href="mailto:info@arrowheaddigitech.com" className="hover:text-ink-900 transition-colors">Email Us</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
