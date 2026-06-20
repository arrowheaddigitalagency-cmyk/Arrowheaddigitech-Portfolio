import React, { useRef } from "react";
import {
  ArrowRight, TrendingUp, Star, BarChart2,
  Smartphone, Globe, MousePointer
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

/* ─────────────────────────────────────────────────────
   KPI WIDGETS  — premium glass cards
───────────────────────────────────────────────────── */

function KpiLeadCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[210px]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
          </div>
          <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">New Lead</span>
        </div>
        <span className="text-[9px] font-700 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Qualified</span>
      </div>
      <p className="text-sm font-700 text-ink-900 mb-0.5">Dubai Car Rental Co.</p>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-ink-100">
        <span className="text-[10px] text-ink-400 font-500">via Google Ads</span>
        <span className="text-[10px] font-600 text-brand-orange-500">2m ago</span>
      </div>
    </div>
  );
}

function KpiRatingCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[178px]">
      <div className="flex gap-0.5 mb-1.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-2xl font-extrabold text-ink-900 leading-none">5.0</p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Google Rating</p>
      <p className="text-[10px] font-500 text-ink-300">47 verified reviews</p>
    </div>
  );
}

function KpiRevenueCard() {
  const bars = [38, 55, 42, 72, 50, 84, 62, 91, 56, 88, 70, 96];
  return (
    <div className="kpi-glass rounded-2xl px-4 py-4 w-[220px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-brand-blue-500" />
          <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Revenue</span>
        </div>
        <span className="text-[10px] font-700 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">↑ 145%</span>
      </div>
      <p className="text-xl font-extrabold text-ink-900 mb-3">$48,200 <span className="text-xs font-600 text-ink-400">/ mo</span></p>
      <div className="flex items-end gap-[3px] h-9">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-sm transition-all"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8 + i * 0.04, duration: 0.4, ease: "easeOut" }}
            style={{
              height: `${h}%`,
              transformOrigin: "bottom",
              background: i >= bars.length - 3
                ? "linear-gradient(180deg,#3B82F6,#60a5fa)"
                : "linear-gradient(180deg,#dbeafe,#eff6ff)"
            }}
          />
        ))}
      </div>
    </div>
  );
}

function KpiLiveCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[162px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative w-2.5 h-2.5">
          <div className="absolute inset-0 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
        </div>
        <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Active Now</span>
      </div>
      <p className="text-3xl font-extrabold text-ink-900 leading-none">24</p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Live projects</p>
    </div>
  );
}

function KpiWebsiteCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[178px]">
      <div className="flex items-center gap-2 mb-2">
        <MousePointer className="w-3.5 h-3.5 text-brand-orange-500" />
        <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Conversion</span>
      </div>
      <p className="text-2xl font-extrabold text-ink-900 leading-none">3.2<span className="text-base">x</span></p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Avg. lift delivered</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   DEVICE MOCKUPS
───────────────────────────────────────────────────── */

function MacBookFrame({ image }: { image: string }) {
  return (
    <div className="w-full select-none device-shadow">
      {/* Lid */}
      <div className="w-full bg-gradient-to-b from-[#e0e1e3] to-[#d2d3d5] rounded-t-[14px] p-[2.2%] border-t border-x border-[#c0c1c3]">
        {/* Camera dot */}
        <div className="absolute top-[1.2%] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#b0b1b3] z-10" />
        {/* Screen */}
        <div className="w-full aspect-[16/10] bg-[#111827] rounded-[6px] overflow-hidden relative border border-black/20">
          {/* Browser chrome */}
          <div className="absolute top-0 left-0 right-0 h-[26px] bg-[#f5f5f7] border-b border-[#ddd] flex items-center px-3 gap-1.5 z-10">
            <div className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-3 bg-[#e9e9eb] rounded-full h-[14px] flex items-center px-2.5 border border-[#d0d0d2]">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#bbb] mr-1.5" />
              <span className="text-[7px] text-[#888] font-500 truncate">arrowheaddigitech.com</span>
            </div>
          </div>
          {/* Content */}
          <img
            src={image}
            alt="Dashboard preview"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ marginTop: "26px", height: "calc(100% - 26px)" }}
            onError={(e) => { e.currentTarget.style.opacity = "0"; }}
          />
          {/* Gradient overlay at bottom for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
          {/* Fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 -z-10 flex items-center justify-center" style={{ marginTop: "26px" }}>
            <Globe className="w-10 h-10 text-blue-400 opacity-20" />
          </div>
        </div>
      </div>
      {/* Hinge */}
      <div className="relative h-[10px] bg-gradient-to-b from-[#c8c9cb] to-[#b4b5b7] border-x border-[#b0b1b3]">
        <div className="absolute inset-x-[10%] top-0 h-[3px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>
      {/* Base */}
      <div className="h-[14px] bg-gradient-to-b from-[#b8b9bb] to-[#a8a9ab] rounded-b-[10px] border-x border-b border-[#a0a1a3]" />
      <div className="h-[5px] w-[28%] bg-gradient-to-b from-[#b2b3b5] to-[#a2a3a5] rounded-b-[6px] mx-auto border-x border-b border-[#9a9b9d]" />
    </div>
  );
}

function IPhoneFrame({ image }: { image: string }) {
  return (
    <div className="w-[116px] select-none device-shadow-sm">
      {/* Body */}
      <div className="relative bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c] rounded-[2.4rem] p-[8px] border border-[#3a3a3c]">
        {/* Side buttons */}
        <div className="absolute left-[-3px] top-[22%] w-[3px] h-[28px] bg-[#3a3a3c] rounded-l-sm" />
        <div className="absolute left-[-3px] top-[36%] w-[3px] h-[44px] bg-[#3a3a3c] rounded-l-sm" />
        <div className="absolute right-[-3px] top-[28%] w-[3px] h-[52px] bg-[#3a3a3c] rounded-r-sm" />
        {/* Dynamic island */}
        <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[38%] h-[16px] bg-[#1a1a1c] rounded-full z-20 flex items-center justify-center gap-1.5">
          <div className="w-[5px] h-[5px] rounded-full bg-[#2c2c2e]" />
          <div className="w-[8px] h-[8px] rounded-full bg-[#2c2c2e]" />
        </div>
        {/* Screen */}
        <div className="rounded-[1.9rem] overflow-hidden aspect-[9/19.5] bg-[#0f172a] relative">
          <img
            src={image}
            alt="Mobile preview"
            className="w-full h-full object-cover object-top"
            onError={(e) => { e.currentTarget.style.opacity = "0"; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950 to-slate-900 -z-10 flex items-center justify-center">
            <Smartphone className="w-7 h-7 text-blue-400 opacity-20" />
          </div>
          {/* Screen glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────────────── */

export default function InteractiveHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  const stats = [
    { value: "150+", label: "Clients" },
    { value: "250+", label: "Projects" },
    { value: "12+",  label: "Years"   },
    { value: "98%",  label: "Retention"},
  ];

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col">

      {/* ── Background depth layers ──────────────── */}
      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
      {/* Warm radial top-right */}
      <div className="absolute -top-[10%] right-[-5%] w-[620px] h-[620px] rounded-full bg-gradient-radial from-brand-orange-100/70 to-transparent pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,220,195,0.55) 0%, transparent 70%)" }} />
      {/* Cool radial bottom-left */}
      <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(191,219,254,0.4) 0%, transparent 70%)" }} />
      {/* Thin horizontal line accents */}
      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-100 to-transparent pointer-events-none hidden lg:block" />

      {/* ── Main content ─────────────────────────── */}
      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 flex-1 flex items-center">
        <div className="container-xl w-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-16 items-center pt-28 pb-12 lg:pt-20 lg:pb-12">

          {/* LEFT ── Copy */}
          <div className="flex flex-col max-w-[540px]">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16,1,0.3,1] }}
              className="pill-badge pill-orange self-start mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse shrink-0" />
              Web Development · AI Websites · Digital Growth
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16,1,0.3,1] }}
              className="text-[2.75rem] sm:text-5xl xl:text-[3.6rem] font-extrabold text-ink-900 leading-[1.07] tracking-tight mb-5"
            >
              Building Digital
              <span className="block">Systems That</span>
              <span className="block text-gradient-orange">Actually Grow.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16,1,0.3,1] }}
              className="text-base sm:text-lg text-ink-500 leading-relaxed mb-7 max-w-[460px]"
            >
              Custom Websites, AI-Powered Experiences, and Growth Infrastructure designed to generate leads, increase credibility, and scale businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16,1,0.3,1] }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a href="#work" className="btn-primary btn-primary-shimmer py-3.5 px-7 text-sm">
                View Case Studies
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline py-3.5 px-7 text-sm group">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="flex flex-wrap gap-x-7 gap-y-3 pt-5 border-t border-ink-100"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 + i * 0.07 }}
                >
                  <p className="text-[1.6rem] font-extrabold text-ink-900 leading-none">{s.value}</p>
                  <p className="text-[11px] text-ink-400 font-600 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT ── Device ecosystem */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.22, ease: [0.16,1,0.3,1] }}
            className="relative hidden lg:block"
            style={{ height: "560px" }}
          >
            {/* Depth blob behind everything */}
            <div className="absolute top-[15%] left-[8%] right-[8%] bottom-[10%] rounded-[32px] pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(255,220,200,0.35) 0%, rgba(191,219,254,0.3) 100%)", filter: "blur(40px)" }} />

            {/* MacBook — main layer */}
            <motion.div
              className="absolute top-[4%] left-[2%] right-[2%] z-10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            >
              <MacBookFrame image="/src/assets/images/hero_dashboard_mockup_1781815970624.jpg" />
            </motion.div>

            {/* iPhone — overlapping bottom-right */}
            <motion.div
              className="absolute bottom-[1%] right-[6%] z-20"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <IPhoneFrame image="/src/assets/images/america_needs_nurses_iphone_screenshot.jpg.png" />
            </motion.div>

            {/* KPI: Revenue — top-left, overlapping MacBook */}
            <motion.div
              className="absolute top-[3%] left-[-6%] z-30"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              initial={{ opacity: 0, x: -20, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
            >
              <KpiRevenueCard />
            </motion.div>

            {/* KPI: Rating — top-right */}
            <motion.div
              className="absolute top-[8%] right-[-2%] z-30"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiRatingCard />
            </motion.div>

            {/* KPI: New Lead — mid-left */}
            <motion.div
              className="absolute top-[44%] left-[-7%] z-30"
              animate={{ y: [0, -9, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiLeadCard />
            </motion.div>

            {/* KPI: Live Projects — overlapping phone top */}
            <motion.div
              className="absolute bottom-[26%] right-[-3%] z-30"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiLiveCard />
            </motion.div>

            {/* KPI: Conversion — bottom-left near base */}
            <motion.div
              className="absolute bottom-[3%] left-[2%] z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <KpiWebsiteCard />
            </motion.div>

            {/* Subtle dot cluster decoration */}
            <div className="absolute top-[35%] right-[18%] grid grid-cols-4 gap-1.5 pointer-events-none z-0">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-ink-200" />
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* ── Client ticker ─────────────────────────── */}
      <div className="relative z-10 border-t border-ink-100 bg-surface-1 overflow-hidden">
        <div className="py-3 text-center">
          <span className="text-[10px] font-700 text-ink-300 uppercase tracking-[0.2em]">Trusted by businesses across 25+ industries</span>
        </div>
        <div className="pb-4 flex whitespace-nowrap overflow-hidden">
          <div className="flex items-center animate-marquee shrink-0">
            {[...Array(2)].map((_, pass) => (
              <div key={pass} className="flex items-center gap-0 shrink-0">
                {[
                  "YalaRide","America Needs Nurses","Go Jetter Tours",
                  "Priceless Rent-A-Car","Cars Compound","Atlanta Car Rental",
                  "Drive Kleen","VIP Cars","Moiz & Sons Elevator",
                ].map((name) => (
                  <span key={`${pass}-${name}`} className="px-8 text-xs font-700 text-ink-300 hover:text-ink-600 transition-colors cursor-default uppercase tracking-widest">
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
