import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Rocket, TrendingUp, Globe2, Cpu, Users, FolderOpen, Zap, Award } from "lucide-react";

/* ─── Milestone data ─────────────────────────────────── */
const MILESTONES = [
  {
    year: "2012",
    chapter: "The Beginning",
    title: "Founded in Lahore",
    body: "Arrowhead DigiTech was born with one conviction: most businesses are invisible online. We started as a lean digital consultancy helping local brands build their first credible web presence.",
    achievements: ["First 3 clients onboarded", "Full-service web studio launched", "Lahore-based operations"],
    stat: { value: "3", label: "Founding Clients", sub: "Day 1" },
    icon: Rocket,
    color: "#FF5A1F",
    bgColor: "#fff5f0",
    borderColor: "rgba(255,90,31,0.15)",
  },
  {
    year: "2016",
    chapter: "The Growth",
    title: "Performance Marketing Unlocked",
    body: "We proved web development alone wasn't enough. By adding Google Ads and Meta Ads capabilities, client revenue tripled on average. A full team of developers, marketers, and designers formed.",
    achievements: ["Google & Meta Ads launched", "50+ clients served", "Team of 8 built"],
    stat: { value: "50+", label: "Clients Served", sub: "4-year milestone" },
    icon: TrendingUp,
    color: "#3B82F6",
    bgColor: "#eff6ff",
    borderColor: "rgba(59,130,246,0.15)",
  },
  {
    year: "2020",
    chapter: "Enterprise Scale",
    title: "International Projects",
    body: "We delivered landmark builds — YalaRide's car rental marketplace, America Needs Nurses' healthcare platform, Go Jetter Tours' travel brand. International clients began seeking us out for complex, growth-critical projects.",
    achievements: ["YalaRide marketplace launched", "America Needs Nurses built", "US & UAE clients won"],
    stat: { value: "100+", label: "Projects Delivered", sub: "Cross-continent reach" },
    icon: Globe2,
    color: "#8B5CF6",
    bgColor: "#f5f3ff",
    borderColor: "rgba(139,92,246,0.15)",
  },
  {
    year: "2024",
    chapter: "The Future",
    title: "AI-Powered Growth Systems",
    body: "Today we build AI-integrated websites, autonomous lead-routing chatbots, and full-stack digital growth infrastructure. 150+ clients. 250+ projects. 25+ industries. The mission stays the same — build things that actually grow businesses.",
    achievements: ["AI chatbot platform launched", "500+ campaigns managed", "25+ industries served"],
    stat: { value: "150+", label: "Global Clients", sub: "& growing" },
    icon: Cpu,
    color: "#10B981",
    bgColor: "#f0fdf4",
    borderColor: "rgba(16,185,129,0.15)",
  },
];

/* ─── Summary stats strip ────────────────────────────── */
const SUMMARY = [
  { icon: Users,      value: "150+", label: "Clients",   color: "#FF5A1F" },
  { icon: FolderOpen, value: "250+", label: "Projects",  color: "#3B82F6" },
  { icon: Zap,        value: "500+", label: "Campaigns", color: "#8B5CF6" },
  { icon: Award,      value: "12+",  label: "Years",     color: "#10B981" },
];

/* ─── Single milestone row ───────────────────────────── */
function MilestoneRow({ m, index, isLast }: {
  key?: React.Key;
  m: typeof MILESTONES[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "start 35%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const x       = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -32 : 32, 0]);

  const Icon = m.icon;
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_64px_1fr] items-start">

      {/* ── LEFT slot ── */}
      <div className={`pb-10 md:pb-16 ${isEven ? "md:pr-10 flex justify-end" : "md:order-3 md:pl-10 flex justify-start"}`}>
        {isEven ? (
          <motion.div style={{ opacity, x }} className="w-full max-w-[420px]">
            <MilestoneCard m={m} />
          </motion.div>
        ) : (
          /* Year stamp on the empty side */
          <div className="hidden md:flex items-start pt-3">
            <div className="flex flex-col items-end gap-1">
              <span className="text-5xl font-extrabold text-ink-100 leading-none select-none">{m.year}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── SPINE ── */}
      <div className="relative flex flex-col items-center">
        {/* Line above node */}
        {index > 0 && (
          <div className="w-[2px] h-6 hidden md:block" style={{ background: `${m.color}30` }} />
        )}
        {/* Node */}
        <motion.div
          style={{ opacity, background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)` }}
          className="relative w-12 h-12 rounded-2xl flex items-center justify-center z-10 shadow-lg shrink-0 mt-1"
          whileHover={{ scale: 1.1, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-5 h-5 text-white" />
        </motion.div>
        {/* Year below node on mobile */}
        <span className="mt-1.5 text-xs font-800 tracking-widest uppercase md:hidden" style={{ color: m.color }}>{m.year}</span>
        {/* Line below node */}
        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[60px] hidden md:block"
            style={{ background: `linear-gradient(to bottom, ${m.color}40, transparent)` }} />
        )}
      </div>

      {/* ── RIGHT slot ── */}
      <div className={`pb-10 md:pb-16 ${!isEven ? "md:pl-10 flex justify-start" : "md:order-3 flex justify-end"}`}>
        {!isEven ? (
          <motion.div style={{ opacity, x }} className="w-full max-w-[420px]">
            <MilestoneCard m={m} />
          </motion.div>
        ) : (
          /* Year stamp on empty side */
          <div className="hidden md:flex items-start pt-3 pl-2">
            <span className="text-5xl font-extrabold text-ink-100 leading-none select-none">{m.year}</span>
          </div>
        )}
      </div>

      {/* Mobile: card below spine */}
      <div className="md:hidden col-span-1 px-1 pb-8">
        <MilestoneCard m={m} />
      </div>
    </div>
  );
}

/* ─── Milestone content card ─────────────────────────── */
function MilestoneCard({ m }: { m: typeof MILESTONES[0] }) {
  return (
    <div
      className="rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        background: m.bgColor,
        borderColor: m.borderColor,
        boxShadow: "0 2px 12px rgba(10,13,20,0.06)",
      }}
    >
      {/* Chapter badge */}
      <div className="flex items-center gap-2.5 mb-4">
        <span
          className="text-[10px] font-800 tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{ background: `${m.color}18`, color: m.color, border: `1px solid ${m.color}30` }}
        >
          {m.chapter}
        </span>
      </div>

      <h3 className="text-xl font-800 text-ink-900 mb-2.5 leading-snug">{m.title}</h3>
      <p className="text-sm text-ink-500 leading-relaxed mb-5">{m.body}</p>

      {/* Achievement checklist */}
      <div className="flex flex-col gap-1.5 mb-5">
        {m.achievements.map((a) => (
          <div key={a} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: `${m.color}20` }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: m.color }} />
            </div>
            <span className="text-xs font-600 text-ink-600">{a}</span>
          </div>
        ))}
      </div>

      {/* Stat */}
      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${m.color}20` }}>
        <div>
          <p className="text-3xl font-extrabold leading-none" style={{ color: m.color }}>{m.stat.value}</p>
          <p className="text-[10px] font-700 text-ink-400 uppercase tracking-widest mt-0.5">{m.stat.label}</p>
        </div>
        <span className="text-[10px] font-600 text-ink-300 uppercase tracking-wider">{m.stat.sub}</span>
      </div>
    </div>
  );
}

/* ─── Main section ───────────────────────────────────── */
export default function StorytellingAbout() {
  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: spineRef, offset: ["start 80%", "end 20%"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="about" className="relative bg-surface-1 overflow-hidden section-pad">

      <div className="absolute inset-0 grid-texture opacity-40 pointer-events-none" />
      {/* Faint top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* ── Header ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="section-label mb-3">Our Story</p>
          <div className="hr-accent mb-5" />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight mb-4">
            12 Years of Building{" "}
            <span className="text-gradient-orange">Things That Grow.</span>
          </h2>
          <p className="text-base text-ink-500 leading-relaxed">
            From a single office in Lahore to an international agency trusted by brands across the US, UAE, and Pakistan — here's the journey behind every decision we make today.
          </p>
        </motion.div>

        {/* ── Summary stats ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {SUMMARY.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.12 + i * 0.07 }}
                className="card-lifted rounded-2xl p-5 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${s.color}15` }}>
                  <Icon className="w-5 h-5" style={{ color: s.color }} />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-ink-900 leading-none">{s.value}</p>
                  <p className="text-xs text-ink-400 font-600 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Timeline ──────────────────────────── */}
        <div ref={spineRef} className="relative">

          {/* Animated spine — desktop only */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-ink-100 hidden md:block pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                scaleY: lineScaleY,
                transformOrigin: "top",
                background: "linear-gradient(to bottom, #FF5A1F, #3B82F6, #8B5CF6, #10B981)",
                height: "100%",
              }}
            />
          </div>

          <div className="flex flex-col">
            {MILESTONES.map((m, i) => (
              <MilestoneRow
                key={m.year}
                m={m}
                index={i}
                isLast={i === MILESTONES.length - 1}
              />
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-8 pt-10 border-t border-ink-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-lg font-700 text-ink-900 mb-1">Ready to be part of the next chapter?</p>
            <p className="text-sm text-ink-500">We're building growth systems for the next 150 clients.</p>
          </div>
          <a href="#contact" className="btn-primary btn-primary-shimmer shrink-0">
            Start a Project
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
