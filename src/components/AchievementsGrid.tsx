import React, { useRef, useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, FolderOpen, Award, BarChart2, Globe } from "lucide-react";

/* ─── Animated counter ──────────────────────────────── */
function Counter({
  target, suffix = "", decimals = 0,
}: { target: number; suffix?: string; decimals?: number }) {
  const [val, setVal] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired.current) {
          fired.current = true;
          let start: number | null = null;
          const animate = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 2000, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal(ease * target);
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={spanRef}>
      {val.toFixed(decimals)}{suffix}
    </span>
  );
}

/* ─── Sparkline SVG ─────────────────────────────────── */
function Sparkline({ color, points }: { color: string; points: number[] }) {
  const w = 100, h = 36;
  const min = Math.min(...points), max = Math.max(...points);
  const norm = points.map((p) => h - ((p - min) / (max - min || 1)) * (h - 4) - 2);
  const step = w / (points.length - 1);
  const d = norm.map((y, i) => `${i === 0 ? "M" : "L"} ${i * step},${y}`).join(" ");
  const fill = norm.map((y, i) => `${i === 0 ? "M" : "L"} ${i * step},${y}`).join(" ")
    + ` L ${(points.length - 1) * step},${h} L 0,${h} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9 overflow-visible">
      <defs>
        <linearGradient id={`sg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg-${color.replace("#", "")})`} />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      {/* End dot */}
      <circle cx={(points.length - 1) * step} cy={norm[norm.length - 1]} r="3" fill={color} />
    </svg>
  );
}

/* ─── Stat data ─────────────────────────────────────── */
const STATS = [
  {
    icon: Users,
    value: 150, suffix: "+", decimals: 0,
    label: "Clients Served",
    sub: "Across 25+ industries worldwide",
    color: "#FF5A1F",
    trend: "+18% YoY",
    trendUp: true,
    spark: [60, 72, 65, 80, 75, 95, 88, 110, 130, 150],
    span: "lg:col-span-2",
    size: "large",
  },
  {
    icon: FolderOpen,
    value: 250, suffix: "+", decimals: 0,
    label: "Projects Delivered",
    sub: "Websites, apps & campaigns",
    color: "#3B82F6",
    trend: "+32% YoY",
    trendUp: true,
    spark: [80, 100, 110, 130, 150, 170, 195, 215, 235, 250],
    span: "lg:col-span-2",
    size: "large",
  },
  {
    icon: Award,
    value: 12, suffix: "+", decimals: 0,
    label: "Years Experience",
    sub: "Since 2012",
    color: "#8B5CF6",
    trend: "Founded 2012",
    trendUp: true,
    spark: [1, 2, 4, 5, 6, 7, 8, 9, 11, 12],
    span: "lg:col-span-1",
    size: "small",
  },
  {
    icon: TrendingUp,
    value: 98, suffix: "%", decimals: 0,
    label: "Client Retention",
    sub: "Long-term partnerships",
    color: "#10B981",
    trend: "Industry avg: 72%",
    trendUp: true,
    spark: [85, 87, 88, 90, 91, 93, 94, 96, 97, 98],
    span: "lg:col-span-1",
    size: "small",
  },
  {
    icon: BarChart2,
    value: 500, suffix: "+", decimals: 0,
    label: "Campaigns Launched",
    sub: "Google, Meta & SEO",
    color: "#F59E0B",
    trend: "+41% this year",
    trendUp: true,
    spark: [100, 150, 190, 230, 280, 320, 370, 420, 465, 500],
    span: "lg:col-span-2",
    size: "large",
  },
  {
    icon: Globe,
    value: 25, suffix: "+", decimals: 0,
    label: "Industries Served",
    sub: "Healthcare, travel, automotive…",
    color: "#EC4899",
    trend: "Global footprint",
    trendUp: true,
    spark: [5, 8, 10, 13, 15, 17, 19, 21, 23, 25],
    span: "lg:col-span-2",
    size: "large",
  },
];

function StatCard({ stat, index }: { key?: React.Key; stat: typeof STATS[0]; index: number }) {
  const Icon = stat.icon;
  const isLarge = stat.size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
      className={`card-lifted rounded-2xl overflow-hidden cursor-default ${stat.span}`}
    >
      {/* Top accent bar — full color on hover */}
      <div className="h-1 transition-all duration-300" style={{ background: stat.color }} />

      <div className={`p-6 ${isLarge ? "sm:p-7" : ""}`}>
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${stat.color}15` }}
          >
            <Icon className="w-5 h-5" style={{ color: stat.color }} />
          </motion.div>
          <span className={`text-[10px] font-700 px-2 py-1 rounded-full ${stat.trendUp ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"}`}>
            {stat.trend}
          </span>
        </div>

        <p className={`font-extrabold leading-none mb-1 ${isLarge ? "text-5xl" : "text-4xl"}`} style={{ color: stat.color }}>
          <Counter target={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
        </p>
        <p className="text-sm font-700 text-ink-900 mt-2 mb-0.5">{stat.label}</p>
        <p className="text-xs text-ink-400 font-500">{stat.sub}</p>

        <div className="mt-4">
          <Sparkline color={stat.color} points={stat.spark} />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────── */
export default function AchievementsGrid() {
  return (
    <section id="achievements" className="relative bg-white section-pad overflow-hidden">

      <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-blue-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <p className="section-label mb-3">By the Numbers</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              10 Years of{" "}
              <span className="text-gradient-orange">Measurable Results.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-500 max-w-sm leading-relaxed">
            Every number here represents a real client, a real project, or a real campaign — not a pitch deck estimate.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 rounded-2xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 p-8 sm:p-10 text-white text-center"
        >
          <p className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
            These numbers keep growing — because our clients do too.
          </p>
          <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            Join 150+ businesses that chose Arrowhead as their long-term digital growth partner.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-orange-600 font-700 rounded-xl text-sm hover:bg-orange-50 transition-colors shadow-md"
          >
            Let's Build Your Numbers
          </a>
        </motion.div>

      </div>
    </section>
  );
}
