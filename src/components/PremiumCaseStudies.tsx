import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Monitor, TrendingUp, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── Animated counter ──────────────────────────────── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        let start: number | null = null;
        const step = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1800, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(ease * target));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

/* ─── Premium MacBook frame ──────────────────────────── */
function MacFrame({ image, alt, accent }: { image: string; alt: string; accent: string }) {
  return (
    <div className="w-full select-none" style={{ filter: "drop-shadow(0 28px 56px rgba(10,13,20,0.18)) drop-shadow(0 6px 12px rgba(10,13,20,0.1))" }}>
      <div className="bg-gradient-to-b from-[#e2e3e5] to-[#d4d5d7] rounded-t-[16px] p-[2.2%] border-t border-x border-[#c0c1c3]">
        {/* Camera */}
        <div className="flex justify-center mb-1">
          <div className="w-[6px] h-[6px] rounded-full bg-[#b0b1b3]" />
        </div>
        {/* Screen */}
        <div className="w-full aspect-[16/10] bg-[#0f172a] rounded-[6px] overflow-hidden relative border border-black/25">
          {/* Browser bar */}
          <div className="absolute top-0 left-0 right-0 h-[27px] bg-[#f5f5f7] border-b border-[#e0e0e2] flex items-center px-3 gap-1.5 z-20">
            <div className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#ffbd2e]" />
            <div className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-3 bg-[#e9e9eb] rounded-full h-[14px] flex items-center px-2.5 border border-[#d4d4d6]">
              <div className="w-2 h-2 rounded-sm mr-1.5" style={{ background: accent + "80" }} />
              <span className="text-[7px] text-[#888] truncate">{alt.toLowerCase().replace(/\s+/g, "")}.com</span>
            </div>
          </div>
          {/* Screenshot */}
          <img
            src={image} alt={alt}
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ marginTop: "27px", height: "calc(100% - 27px)" }}
            onError={(e) => { e.currentTarget.style.opacity = "0"; }}
          />
          {/* Bottom gradient for depth */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-950 to-slate-900 -z-10" style={{ marginTop: "27px" }} />
        </div>
      </div>
      {/* Hinge */}
      <div className="h-[9px] bg-gradient-to-b from-[#c4c5c7] to-[#b0b1b3] border-x border-[#b0b1b3]">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
      {/* Base */}
      <div className="h-[13px] bg-gradient-to-b from-[#b4b5b7] to-[#a4a5a7] rounded-b-[10px] border-x border-b border-[#9e9fa1]" />
      <div className="h-[5px] w-[28%] bg-gradient-to-b from-[#aeafb1] to-[#9ea0a2] rounded-b-[5px] mx-auto border-x border-b border-[#989a9c]" />
    </div>
  );
}

/* ─── Case data ──────────────────────────────────────── */
const CASES = [
  {
    id: "yalaride",
    client: "YalaRide",
    tagline: "Car Rental Marketplace · USA",
    industry: "Automotive",
    logo: "/images/client-logos/yalaride.png",
    accent: "#FF5A1F",
    accentLight: "#fff8f5",
    overview: "YalaRide needed a full-stack car rental marketplace — a consumer-facing website, admin portal, and a performance marketing engine to drive bookings from day one.",
    challenge: "Zero digital presence competing against established US rental brands.",
    solution: "Built a custom React marketplace with dual dashboards, then launched targeted Google & Meta campaigns.",
    tech: ["React", "Node.js", "PostgreSQL", "Google Ads", "Meta Ads", "SEO"],
    desktopImg: "/images/yalaride_web_portal_1781815990359.jpg",
    metrics: [
      { label: "Organic Visibility", value: 160, suffix: "%", icon: TrendingUp },
      { label: "App Installs", value: 140, suffix: "%", icon: TrendingUp },
      { label: "Booking Conversion", value: 42, suffix: "%", icon: TrendingUp },
      { label: "Campaigns Running", value: 8, suffix: "+", icon: Star },
    ],
    quote: "Arrowhead helped build a powerful car rental marketplace with a smooth website, mobile app, and marketing strategy.",
    quoteAuthor: "Mohammed Rizwan",
    quoteRole: "CEO, YalaRide",
    quotePhoto: "/images/rizwan_photo.png",
  },
  {
    id: "ann",
    client: "America Needs Nurses",
    tagline: "Healthcare Recruitment Platform · USA",
    industry: "Healthcare",
    logo: "/images/client-logos/america-needs-nurses.png",
    accent: "#3B82F6",
    accentLight: "#f0f6ff",
    overview: "America Needs Nurses needed a dual-sided marketplace connecting healthcare employers with qualified nurses — including a recruiter portal, candidate profiles, and a brand awareness campaign.",
    challenge: "Complex two-sided marketplace with strict healthcare compliance requirements.",
    solution: "Designed separate recruiter and nurse-facing interfaces, then launched brand awareness campaigns across Google and Meta.",
    tech: ["React", "TypeScript", "REST API", "Google Ads", "Meta Ads", "App Store"],
    desktopImg: "/images/nurses_recruiter_portal_1781816032234.jpg",
    metrics: [
      { label: "Campaigns Running", value: 8, suffix: "+", icon: Star },
      { label: "Job Applications", value: 110, suffix: "%", icon: TrendingUp },
      { label: "Time-to-Hire Reduced", value: 35, suffix: "%", icon: TrendingUp },
      { label: "Healthcare Partners", value: 50, suffix: "+", icon: Star },
    ],
    quote: "Arrowhead transformed our healthcare marketplace vision into a complete, working platform.",
    quoteAuthor: "Ray Washington",
    quoteRole: "Founder, America Needs Nurses",
    quotePhoto: "/images/ray_photo.png",
  },
  {
    id: "gojetter",
    client: "Go Jetter Tours",
    tagline: "Travel Brand · UAE",
    industry: "Travel",
    logo: "/images/client-logos/go-jetter-tours.png",
    accent: "#10B981",
    accentLight: "#f0fdf8",
    overview: "Go Jetter Tours required a premium travel brand identity, a high-converting website, and a full digital marketing strategy targeting UAE travellers across search and social.",
    challenge: "New brand entering a competitive UAE travel market with no existing digital presence.",
    solution: "Complete brand build — identity, WordPress site, and simultaneous Google + Meta launch.",
    tech: ["WordPress", "WooCommerce", "Google Ads", "Meta Ads", "SEO", "Email Marketing"],
    desktopImg: "/images/go_jetter_macbook_screenshot.jpg.png",
    metrics: [
      { label: "Travel Leads", value: 190, suffix: "%", icon: TrendingUp },
      { label: "Tour Bookings", value: 130, suffix: "%", icon: TrendingUp },
      { label: "Cost Per Lead Down", value: 38, suffix: "%", icon: TrendingUp },
      { label: "Countries Targeted", value: 6, suffix: "", icon: Star },
    ],
    quote: "Within 3 months we had more qualified travel leads than the entire previous year combined.",
    quoteAuthor: "Go Jetter Team",
    quoteRole: "UAE",
    quotePhoto: null,
  },
  {
    id: "atlantacar",
    client: "Atlanta Car Rental",
    tagline: "Premium Rental Booking · USA",
    industry: "Automotive",
    logo: "/images/client-logos/atlanta-car-rental.png",
    accent: "#F59E0B",
    accentLight: "#fffcf0",
    overview: "Atlanta Car Rental required a streamlined online booking system to transition away from manual reservations, along with a digital footprint to attract local and airport traffic.",
    challenge: "High competition in the Atlanta area and outdated manual booking processes.",
    solution: "Developed an automated booking engine with dynamic pricing, integrated with hyper-local Google Search campaigns.",
    tech: ["React", "Stripe API", "Google Ads", "Local SEO", "Node.js"],
    desktopImg: "/images/atlanta_web_portal_1781815990359.jpg",
    metrics: [
      { label: "Online Bookings", value: 210, suffix: "%", icon: TrendingUp },
      { label: "Manual Work Saved", value: 80, suffix: "%", icon: TrendingUp },
      { label: "Local Search Rank", value: 1, suffix: "st", icon: Star },
      { label: "Revenue Growth", value: 65, suffix: "%", icon: TrendingUp },
    ],
    quote: "The new booking system eliminated our administrative overhead and drastically improved customer experience.",
    quoteAuthor: "Atlanta Car Team",
    quoteRole: "USA",
    quotePhoto: null,
  },
  {
    id: "priceless",
    client: "Priceless Car Rental",
    tagline: "Corporate Fleet Rentals · USA",
    industry: "Automotive",
    logo: "/images/client-logos/priceless-rentacar.png",
    accent: "#8B5CF6",
    accentLight: "#f5f3ff",
    overview: "Priceless Car Rental needed to modernize their corporate fleet management and consumer rental portal to scale their operations across multiple new locations.",
    challenge: "Managing a large growing fleet with disparate systems that didn't talk to each other.",
    solution: "Engineered a unified dashboard for fleet tracking and a high-performance consumer storefront.",
    tech: ["Next.js", "GraphQL", "AWS", "Google Ads", "Meta Ads"],
    desktopImg: "/images/priceless_web_portal_1781815990359.jpg",
    metrics: [
      { label: "Fleet Utilization", value: 95, suffix: "%", icon: TrendingUp },
      { label: "User Acquisition", value: 150, suffix: "%", icon: TrendingUp },
      { label: "System Uptime", value: 99, suffix: "%", icon: TrendingUp },
      { label: "New Locations", value: 3, suffix: "+", icon: Star },
    ],
    quote: "Our operational efficiency skyrocketed once Arrowhead unified our fleet management system.",
    quoteAuthor: "Priceless Team",
    quoteRole: "USA",
    quotePhoto: null,
  }
];

/* ─── Main component ─────────────────────────────────── */
export default function PremiumCaseStudies() {
  const [activeCase, setActiveCase] = useState(0);
  const current = CASES[activeCase];

  const handleCaseChange = (i: number) => { setActiveCase(i); };

  return (
    <section id="work" className="relative bg-surface-1 section-pad overflow-hidden">
      <div className="absolute inset-0 dot-texture opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-xl">
            <p className="section-label mb-3">Case Studies</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              Projects That <span className="text-gradient-orange">Moved the Needle.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-500 max-w-xs leading-relaxed">
            Real clients. Real metrics. Every number here is from a live deployment.
          </p>
        </motion.div>

        {/* Client selector tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          {CASES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleCaseChange(i)}
              className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full font-700 text-sm border transition-all duration-250 ${activeCase === i ? "text-white shadow-md scale-[1.02]" : "bg-white border-ink-200 text-ink-600 hover:border-ink-300 hover:shadow-sm"
                }`}
              style={activeCase === i ? { background: c.accent, borderColor: c.accent, boxShadow: `0 4px 16px ${c.accent}40` } : {}}
            >
              {c.logo && <img src={c.logo} alt={c.client} className="h-4 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
              {c.client}
              <span className="text-[9px] opacity-70 font-600 hidden sm:inline">{c.industry}</span>
            </button>
          ))}
        </div>

        {/* Case study detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
          >
            {/* Top accent bar */}
            <div className="h-1 rounded-t-2xl mb-0" style={{ background: `linear-gradient(90deg, ${current.accent}, ${current.accent}60, transparent)` }} />

            <div className="bg-white rounded-b-2xl rounded-tr-2xl border border-ink-100 overflow-hidden shadow-sm">
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px]">

                {/* LEFT: Device showcase */}
                <div className="p-8 sm:p-10 border-r border-ink-100">

                  {/* Device label */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-700 border border-transparent text-white" style={{ background: current.accent }}>
                      <Monitor className="w-3.5 h-3.5" />
                      Desktop Platform
                    </div>
                    <span className="ml-auto text-[10px] font-600 text-ink-400 uppercase tracking-wider">{current.tagline}</span>
                  </div>

                  {/* Mockup stage */}
                  <div
                    className="rounded-2xl flex items-center justify-center overflow-hidden"
                    style={{
                      background: current.accentLight,
                      padding: "2.5rem 2rem",
                      minHeight: "320px",
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div key="mac" initial={{ opacity: 0, scale: 0.93, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.93, y: -8 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="w-full max-w-2xl">
                        <MacFrame image={current.desktopImg} alt={current.client} accent={current.accent} />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mt-5">
                    {current.tech.map((t) => (
                      <span key={t} className="pill-badge pill-neutral text-[10px]">{t}</span>
                    ))}
                  </div>
                </div>

                {/* RIGHT: Info */}
                <div className="flex flex-col p-7 sm:p-8 bg-white gap-5">

                  {/* Client identity */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl font-extrabold text-ink-900 leading-tight">{current.client}</h3>
                      <p className="text-xs font-700 text-ink-400 uppercase tracking-widest mt-0.5">{current.industry}</p>
                    </div>
                    {current.logo && (
                      <img src={current.logo} alt={current.client} className="h-8 w-auto object-contain opacity-70 shrink-0"
                        onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    )}
                  </div>

                  {/* Overview */}
                  <p className="text-sm text-ink-500 leading-relaxed">{current.overview}</p>

                  {/* Challenge / Solution */}
                  <div className="grid grid-cols-1 gap-3">
                    {[{ label: "Challenge", text: current.challenge, color: "#FF5A1F" },
                    { label: "Solution", text: current.solution, color: current.accent }].map(({ label, text, color }) => (
                      <div key={label} className="flex gap-2.5">
                        <div className="w-1 rounded-full shrink-0 mt-0.5" style={{ background: color, minHeight: "100%" }} />
                        <div>
                          <p className="text-[10px] font-800 uppercase tracking-widest mb-0.5" style={{ color }}>{label}</p>
                          <p className="text-xs text-ink-600 leading-relaxed">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Metrics — 2×2 grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {current.metrics.map((m, i) => (
                      <motion.div
                        key={m.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="rounded-xl p-3.5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                        style={{ background: `${current.accent}08`, borderColor: `${current.accent}20` }}
                      >
                        <p className="text-[9px] font-700 text-ink-400 uppercase tracking-widest mb-1.5 leading-tight">{m.label}</p>
                        <p className="text-2xl font-extrabold leading-none" style={{ color: current.accent }}>
                          {m.suffix === "%" ? "+" : ""}<Counter target={m.value} suffix={m.suffix} />
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="rounded-xl p-4 border mt-auto" style={{ background: "#0a0d14", borderColor: "#1f2937" }}>
                    <p className="text-xs text-slate-300 italic leading-relaxed mb-3">"{current.quote}"</p>
                    <div className="flex items-center gap-2.5">
                      {current.quotePhoto ? (
                        <img src={current.quotePhoto} alt={current.quoteAuthor}
                          className="w-8 h-8 rounded-full object-cover shrink-0 border-2 border-white/10"
                          onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-800 shrink-0"
                          style={{ background: current.accent }}>
                          {current.quoteAuthor[0]}
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-700 text-white">{current.quoteAuthor}</p>
                        <p className="text-[10px] text-slate-500 font-500">{current.quoteRole}</p>
                      </div>
                    </div>
                  </div>

                  <a href="#contact" className="btn-primary btn-primary-shimmer w-full justify-center text-sm mt-1">
                    Discuss a Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
