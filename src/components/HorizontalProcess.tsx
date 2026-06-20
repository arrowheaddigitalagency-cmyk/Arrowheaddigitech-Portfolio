import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, Lightbulb, Code2, TrendingUp, ArrowRight } from "lucide-react";

const STEPS = [
  {
    id: "01",
    title: "Discover",
    icon: Search,
    color: "#FF5A1F",
    tagline: "Understand before we build.",
    description:
      "We start with a deep audit of your current digital presence, competitive landscape, and revenue bottlenecks. No assumptions — just data and honest analysis.",
    deliverables: [
      "Digital presence audit",
      "Competitor analysis",
      "Opportunity mapping",
      "Goal alignment session",
    ],
  },
  {
    id: "02",
    title: "Strategize",
    icon: Lightbulb,
    color: "#3B82F6",
    tagline: "Blueprint before we execute.",
    description:
      "We design the exact digital infrastructure and campaign architecture needed for your market. Every decision has a reason — and a measurable outcome attached to it.",
    deliverables: [
      "Custom growth blueprint",
      "Tech stack selection",
      "Campaign architecture",
      "Timeline & milestones",
    ],
  },
  {
    id: "03",
    title: "Build",
    icon: Code2,
    color: "#8B5CF6",
    tagline: "Ship fast. Ship right.",
    description:
      "Rapid, high-quality delivery of your web assets, campaigns, and automation systems. We move fast without cutting corners — weekly builds, regular check-ins, zero surprises.",
    deliverables: [
      "Website / platform build",
      "Campaign setup & launch",
      "AI integration",
      "QA & testing",
    ],
  },
  {
    id: "04",
    title: "Scale",
    icon: TrendingUp,
    color: "#10B981",
    tagline: "Optimize. Grow. Repeat.",
    description:
      "After launch we don't disappear. We monitor, analyze, A/B test, and expand what's working — turning a successful launch into a compounding growth engine.",
    deliverables: [
      "Performance analytics",
      "Continuous optimization",
      "A/B testing",
      "Quarterly growth reviews",
    ],
  },
];

function StepCard({ step, index }: { key?: React.Key; step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "start 45%"] });
  const y    = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const opac = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const Icon = step.icon;

  return (
    <motion.div ref={ref} style={{ y, opacity: opac }} className="relative group">
      {/* Connector arrow between cards — desktop */}
      {index < STEPS.length - 1 && (
        <div className="hidden lg:block absolute top-[1.6rem] left-[calc(100%+0px)] w-6 h-6 z-20 pointer-events-none -translate-x-3">
          <div className="w-full h-full flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-ink-200" />
          </div>
        </div>
      )}

      <div
        className="card-lifted rounded-2xl p-7 h-full flex flex-col relative z-10 overflow-hidden transition-all duration-300"
        style={{ "--hover-color": step.color } as React.CSSProperties}
      >
        {/* Hover left border accent */}
        <div
          className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to bottom, ${step.color}, ${step.color}40)` }}
        />

        {/* Giant faded step number */}
        <span className="absolute -top-2 -right-2 text-[5.5rem] font-extrabold leading-none select-none pointer-events-none"
          style={{ color: `${step.color}08` }}>
          {step.id}
        </span>

        {/* Icon — bounces on hover */}
        <motion.div
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 shadow-sm"
          style={{ background: `${step.color}15` }}
        >
          <Icon className="w-6 h-6" style={{ color: step.color }} />
        </motion.div>

        {/* Phase pill */}
        <span
          className="text-[10px] font-800 tracking-widest uppercase mb-3 w-fit px-2.5 py-1 rounded-full"
          style={{ background: `${step.color}12`, color: step.color, border: `1px solid ${step.color}28` }}
        >
          Phase {step.id}
        </span>

        <h3 className="text-xl font-extrabold text-ink-900 mb-1 group-hover:text-ink-900 transition-colors">{step.title}</h3>
        <p className="text-xs font-700 text-ink-400 uppercase tracking-wider mb-4">{step.tagline}</p>
        <p className="text-sm text-ink-500 leading-relaxed mb-6 flex-1">{step.description}</p>

        {/* Deliverables — stagger on group hover */}
        <div className="space-y-2 pt-4 border-t border-ink-100">
          {step.deliverables.map((d) => (
            <motion.div
              key={d}
              initial={false}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                style={{ background: `${step.color}18` }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: step.color }} />
              </div>
              <span className="text-xs font-600 text-ink-600">{d}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function HorizontalProcess() {
  return (
    <section id="process" className="relative bg-surface-1 section-pad overflow-hidden">

      <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />

      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* ── Header ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14"
        >
          <div className="max-w-xl">
            <p className="section-label mb-3">How We Work</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              Four Phases to{" "}
              <span className="text-gradient-orange">Real Results.</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-base text-ink-500 leading-relaxed">
              A structured process that removes ambiguity and delivers measurable growth at every stage.
            </p>
            <a href="#contact" className="btn-primary btn-primary-shimmer mt-5 inline-flex text-sm">
              Start the Discovery Call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        {/* ── Steps grid ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>

        {/* ── Bottom reassurance strip ──────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 p-7 rounded-2xl bg-gradient-to-r from-brand-orange-50 to-brand-blue-50 border border-ink-100 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div className="flex-1">
            <p className="font-800 text-ink-900 text-base mb-1">No lock-in. No black box.</p>
            <p className="text-sm text-ink-500 leading-relaxed">
              Full transparency at every phase. You own everything we build — code, campaigns, and data.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            {["Weekly updates", "Full ownership", "Clear pricing", "NDA protected"].map((tag) => (
              <span key={tag} className="pill-badge pill-neutral text-xs">{tag}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
