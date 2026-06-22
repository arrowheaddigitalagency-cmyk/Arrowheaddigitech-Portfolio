import React from "react";
import { ArrowRight, Code2, TrendingUp, Users, Award } from "lucide-react";
import { motion } from "motion/react";

/* ─── Leader data ────────────────────────────────────── */
const LEADERS = [
  {
    name: "Waseeq Nauman",
    role: "Founder & CEO",
    initials: "WN",
    accent: "#FF5A1F",
    accentLight: "#fff8f5",
    photo: null,
    tagline: "The strategist behind every growth system.",
    bio: "Waseeq built Arrowhead from a lean consultancy into a full-stack digital growth company trusted by brands across the US, UAE, and Pakistan. With over 10 years shaping digital strategy, he brings a rare blend of executive vision and hands-on execution — turning ambitious ideas into market-winning products.",
    specialties: ["Digital Strategy", "Brand Positioning", "Enterprise Growth", "Client Relations"],
  },
];

/* ─── Supporting team ────────────────────────────────── */
const TEAM = [
  { name: "Usman Farooqi", role: "Operations Director", initials: "UF", accent: "#3B82F6", focus: "Full-Stack Dev & Delivery", icon: Code2 },
  { name: "Zulqarnain Jutt", role: "Marketing Strategist", initials: "ZJ", accent: "#F59E0B", focus: "Paid Campaigns & Growth", icon: TrendingUp },
  { name: "Hammad Ahmad", role: "Brand Growth Manager", initials: "HA", accent: "#10B981", focus: "Brand Strategy & Identity", icon: Award },
  { name: "Shabbir Shah", role: "Web & Software Expert", initials: "AK", accent: "#8B5CF6", focus: "Frontend & UI Engineering", icon: Code2 },
  { name: "Mohammad Kashan", role: "Creative Analyst / Video Editor", initials: "MK", accent: "#EC4899", focus: "Video Production & Creatives", icon: Users },
];

/* ─── Waseeq spotlight card ──────────────────────────── */
function LeaderSpotlight({ person }: { key?: React.Key; person: typeof LEADERS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="leader-card overflow-hidden"
    >
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${person.accent}, ${person.accent}50, transparent)` }} />

      <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr]">

        {/* Avatar panel */}
        <div
          className="flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden"
          style={{ background: person.accentLight }}
        >
          <span className="absolute text-[8rem] font-extrabold select-none pointer-events-none leading-none"
            style={{ color: `${person.accent}10`, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
            {person.initials}
          </span>
          <div
            className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold shadow-xl z-10 mb-3"
            style={{ background: `linear-gradient(135deg, ${person.accent}, ${person.accent}bb)` }}
          >
            {person.initials}
          </div>
          <p className="text-sm font-800 text-ink-900 text-center z-10">{person.name}</p>
          <p className="text-[10px] font-700 text-center mt-0.5 z-10 px-2 leading-tight" style={{ color: person.accent }}>
            {person.role}
          </p>
          <div className={`absolute top-0 bottom-0 right-0 w-[3px]`}
            style={{ background: `linear-gradient(to bottom, ${person.accent}, transparent)` }} />
        </div>

        {/* Content panel */}
        <div className="p-7 sm:p-9 flex flex-col justify-between">
          <div>
            <p className="text-xs font-700 italic mb-4 leading-relaxed" style={{ color: person.accent }}>
              "{person.tagline}"
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-900 mb-4 leading-tight">{person.name}</h3>
            <p className="text-sm text-ink-500 leading-relaxed mb-6">{person.bio}</p>
            <div className="flex flex-wrap gap-2">
              {person.specialties.map((s) => (
                <span key={s}
                  className="text-[10px] font-700 uppercase tracking-wide px-3 py-1.5 rounded-full"
                  style={{ background: `${person.accent}12`, color: person.accent, border: `1px solid ${person.accent}25` }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Supporting member card ─────────────────────────── */
function SupportCard({ person, index }: { key?: React.Key; person: typeof TEAM[0]; index: number }) {
  const Icon = person.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="card-lifted rounded-2xl p-5 flex items-center gap-4 group cursor-default"
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-extrabold shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2"
        style={{ background: `linear-gradient(135deg, ${person.accent}, ${person.accent}99)` }}
      >
        {person.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-800 text-ink-900 truncate">{person.name}</p>
        <p className="text-xs text-ink-400 font-600 truncate">{person.role}</p>
      </div>

      {/* Focus badge */}
      <div
        className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:rotate-6"
        style={{ background: `${person.accent}12` }}
      >
        <Icon className="w-4 h-4" style={{ color: person.accent }} />
      </div>
    </motion.div>
  );
}

/* ─── Main export ────────────────────────────────────── */
export default function LuxuryTeam() {
  return (
    <section id="team" className="relative bg-white section-pad overflow-hidden">

      <div className="absolute inset-0 dot-texture opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-orange-200 to-transparent" />

      <div className="container-xl relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div className="max-w-lg">
            <p className="section-label mb-3">The Team</p>
            <div className="hr-accent mb-5" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-ink-900 leading-tight">
              The People Behind{" "}
              <span className="text-gradient-orange">Your Growth.</span>
            </h2>
          </div>
          <p className="text-sm text-ink-500 max-w-sm leading-relaxed">
            No outsourcing. No freelancers. The people you meet are the people building your project.
          </p>
        </motion.div>

        {/* Leadership — Waseeq spotlight */}
        <div className="mb-10">
          {LEADERS.map((p) => (
            <LeaderSpotlight key={p.name} person={p} />
          ))}
        </div>

        {/* Team divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="hr-accent" />
          <p className="text-xs font-700 text-ink-400 uppercase tracking-[0.2em]">The Team</p>
          <div className="flex-1 h-px bg-ink-100" />
        </div>

        {/* Team grid — 5 cards including Usman */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-12">
          {TEAM.map((p, i) => (
            <SupportCard key={p.name} person={p} index={i} />
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute right-0 top-0 bottom-0 w-[300px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse at right, rgba(255,90,31,0.12) 0%, transparent 70%)" }} />
          <div className="relative z-10">
            <p className="text-xl font-800 text-white mb-1">We're growing — are you?</p>
            <p className="text-sm text-slate-400">
              Join 150+ businesses that trust Arrowhead to build and scale their digital presence.
            </p>
          </div>
          <a href="#contact" className="btn-primary btn-primary-shimmer shrink-0 relative z-10">
            Work With Us
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
