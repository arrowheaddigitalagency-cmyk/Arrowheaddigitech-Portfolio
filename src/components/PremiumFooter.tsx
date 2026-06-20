import React from "react";
import { Linkedin, Phone, Mail, MapPin, ArrowRight, Zap } from "lucide-react";

const LINKS = {
  Services: [
    { label: "Website Development",  href: "#services" },
    { label: "AI Website Creation",  href: "#services" },
    { label: "Google & Meta Ads",    href: "#services" },
    { label: "SEO & Local SEO",      href: "#services" },
    { label: "E-Commerce",           href: "#services" },
    { label: "AI Chatbots",          href: "#services" },
  ],
  Company: [
    { label: "About Us",       href: "#about"         },
    { label: "Our Work",       href: "#work"           },
    { label: "Process",        href: "#process"        },
    { label: "Team",           href: "#team"           },
    { label: "Achievements",   href: "#achievements"   },
    { label: "Contact",        href: "#contact"        },
  ],
};

export default function PremiumFooter() {
  return (
    <footer className="relative bg-ink-900 text-white overflow-hidden">

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-blue-500" />

      {/* ── Main content ──────────────────────────── */}
      <div className="container-xl relative z-10 pt-16 pb-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.6fr] gap-12 mb-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 bg-brand-orange-500 rounded-lg flex items-center justify-center shrink-0">
                <img
                  src="/src/assets/images/arrowhead_logo.png"
                  alt="Arrowhead DigiTech"
                  className="w-full h-full object-contain p-1 brightness-0 invert"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-extrabold text-base text-white">Arrowhead</span>
                <span className="text-[9px] font-600 tracking-widest uppercase text-slate-400">DigiTech</span>
              </div>
            </a>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              We build websites, AI-powered platforms, and performance marketing systems that actually grow businesses.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3 mt-1">
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
            <div className="flex flex-wrap gap-2 mt-2">
              {["150+ Clients", "250+ Projects", "12+ Years"].map((b) => (
                <span
                  key={b}
                  className="text-[10px] font-700 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
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
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors font-500"
                  >
                    {label}
                  </a>
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
                  <a
                    href={href}
                    className="text-sm text-slate-400 hover:text-white transition-colors font-500"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[10px] font-800 uppercase tracking-widest text-brand-orange-400 mb-5">Contact</p>
            <div className="flex flex-col gap-4 mb-7">
              {[
                { icon: Phone,  value: "+92 300 0955490",             href: "tel:+923000955490"                 },
                { icon: Mail,   value: "info@arrowheaddigitech.com",   href: "mailto:info@arrowheaddigitech.com" },
                { icon: MapPin, value: "Lahore, Pakistan",             href: "https://maps.google.com/?q=Lahore" },
              ].map(({ icon: Icon, value, href }) => (
                <a
                  key={value}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <Icon className="w-4 h-4 text-brand-orange-400 shrink-0 group-hover:text-brand-orange-300" />
                  {value}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-orange-500 text-white text-xs font-700 hover:bg-brand-orange-600 transition-colors"
            >
              Start a Project
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* ── Divider ───────────────────────────────── */}
        <div className="h-px bg-white/10 mb-8" />

        {/* ── Bottom bar ─────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-500">
          <p>
            © {new Date().getFullYear()} Arrowhead DigiTech. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1.5 text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              All systems operational
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
