import React, { useRef, useMemo } from "react";
import { Linkedin, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const LINKS = {
  Services: [
    { label: "Website Development", href: "#services" },
    { label: "AI Website Creation", href: "#services" },
    { label: "Google & Meta Ads", href: "#services" },
    { label: "SEO & Local SEO", href: "#services" },
    { label: "E-Commerce", href: "#services" },
    { label: "AI Chatbots", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Team", href: "#team" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
  ],
};

/* ─── Floating particles (CSS only, zero R3F overhead) ── */
function FooterParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1.5,
      left: Math.random() * 100,
      top: Math.random() * 100,
      dur: 6 + Math.random() * 8,
      delay: Math.random() * 6,
      color: i % 3 === 0 ? "#FF5A1F" : i % 3 === 1 ? "#3B82F6" : "#ffffff",
    }))
    , []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: p.color,
            opacity: 0.15,
          }}
          animate={{ y: [-12, 12, -12], x: [-6, 6, -6], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function PremiumFooter() {
  return (
    <footer className="relative bg-ink-900 text-white overflow-hidden">

      {/* ── Background decorations ──────────────── */}

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Huge low-opacity ARROWHEAD text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        {/* Fade-in wrapper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        >
          {/* Slow drift */}
          <motion.span
            className="block font-extrabold uppercase whitespace-nowrap"
            style={{
              fontSize: "clamp(4rem,16vw,14rem)",
              color: "rgba(255,255,255,0.022)",
              letterSpacing: "0.18em",
            }}
            animate={{ x: [-12, 12, -12] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          >
            ARROWHEAD
          </motion.span>
        </motion.div>
      </div>

      {/* Floating particles */}
      <FooterParticles />

      {/* Orange glow — top right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle at top right, rgba(255,90,31,0.07) 0%, transparent 70%)" }} />
      {/* Blue glow — bottom left */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(circle at bottom left, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />

      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-blue-500 relative z-10" />

      {/* ── Main content ─────────────────────────── */}
      <div className="container-xl relative z-10 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-12 mb-14">

          {/* Brand column */}
          <div className="flex flex-col gap-5">

            {/* Logo — white version */}
            <a href="#" className="flex items-center w-fit">
              <img
                src="/images/arrowhead_logo_full.png"
                alt="Arrowhead DigiTech"
                className="h-16 w-auto object-contain"
              />
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              We build websites, AI-powered platforms, and performance marketing systems that actually grow businesses.
            </p>

            {/* LinkedIn */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/arrowheaddigitech"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-orange-500 hover:bg-brand-orange-500 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {["150+ Clients", "250+ Projects", "10+ Years"].map((b) => (
                <span key={b} className="text-[10px] font-700 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <p className="text-[10px] font-800 uppercase tracking-widest text-brand-orange-400 mb-5">Services</p>
            <ul className="space-y-3">
              {LINKS.Services.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-400 hover:text-white transition-colors font-500">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <p className="text-[10px] font-800 uppercase tracking-widest text-brand-orange-400 mb-5">Company</p>
            <ul className="space-y-3">
              {LINKS.Company.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-slate-400 hover:text-white transition-colors font-500">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[10px] font-800 uppercase tracking-widest text-brand-orange-400 mb-5">Contact</p>
            <div className="flex flex-col gap-4 mb-7">
              {[
                { icon: Phone, value: "+92 300 0955490", href: "tel:+923000955490" },
                { icon: Mail, value: "info@arrowheaddigitech.com", href: "mailto:info@arrowheaddigitech.com" },
                { icon: MapPin, value: "Lahore, Pakistan", href: "https://maps.google.com/?q=Lahore" },
              ].map(({ icon: Icon, value, href }) => (
                <a key={value} href={href} target="_blank" rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group">
                  <Icon className="w-4 h-4 text-brand-orange-400 shrink-0 group-hover:text-brand-orange-300" />
                  {value}
                </a>
              ))}
            </div>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange-500 text-white text-xs font-700 hover:bg-brand-orange-600 transition-colors">
              Start a Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Copyright — centered */}
        <p className="text-center text-[11px] text-slate-500 font-500">
          © {new Date().getFullYear()} Arrowhead DigiTech. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}
