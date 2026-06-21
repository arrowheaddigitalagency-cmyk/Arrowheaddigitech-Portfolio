import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "motion/react";

/* ─────────────────────────────────────────────────────
   PARTICLES — CSS-only, zero R3F overhead
───────────────────────────────────────────────────── */
function Particles() {
  const particles = useMemo(() =>
    Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.8,
      dur: 4 + Math.random() * 6,
      delay: Math.random() * 4,
      opacity: 0.08 + Math.random() * 0.18,
    })), []
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, p.opacity, 0], y: [-8, 8, -8] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* A handful of warm orange particles near center */}
      {Array.from({ length: 8 }, (_, i) => ({
        id: `o${i}`,
        x: 35 + Math.random() * 30,
        y: 30 + Math.random() * 40,
        size: Math.random() * 2.5 + 1,
        dur: 3.5 + Math.random() * 4,
        delay: Math.random() * 3,
      })).map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: "#FF5A1F",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.25, 0], y: [-6, 6, -6] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   ARROWHEAD TRIANGLE — SVG drawn as the hero element.
   Built from the orange triangle in the logo.
───────────────────────────────────────────────────── */
function ArrowheadTriangle({ stage }: { stage: number }) {
  /*
    stage 0 → invisible
    stage 1 → triangle appears (stroke draws in)
    stage 2 → fill fades in
    stage 3 → light sweep
    stage 4 → full glow
  */
  return (
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>

      {/* Outer soft glow — stage 4 */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 200, height: 200,
          background: "radial-gradient(circle, rgba(255,90,31,0.22) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={stage >= 4 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* SVG triangle */}
      <svg viewBox="0 0 120 120" width="120" height="120" style={{ overflow: "visible" }}>
        <defs>
          {/* Metallic gradient fill */}
          <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#ff7a42" />
            <stop offset="45%"  stopColor="#FF5A1F" />
            <stop offset="100%" stopColor="#c03a0a" />
          </linearGradient>

          {/* Light sweep gradient — moves left → right */}
          <linearGradient id="sweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)"   />
            <stop offset="40%"  stopColor="rgba(255,255,255,0)"   />
            <stop offset="50%"  stopColor="rgba(255,255,255,0.55)" />
            <stop offset="60%"  stopColor="rgba(255,255,255,0)"   />
            <stop offset="100%" stopColor="rgba(255,255,255,0)"   />
          </linearGradient>

          {/* Clip to triangle shape */}
          <clipPath id="triClip">
            <polygon points="60,8 112,105 8,105" />
          </clipPath>
        </defs>

        {/* ── Step 1: stroke draws in ── */}
        <motion.polygon
          points="60,8 112,105 8,105"
          fill="none"
          stroke="url(#triGrad)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={stage >= 1
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
          }
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
        />

        {/* ── Step 2: fill emerges ── */}
        <motion.polygon
          points="60,8 112,105 8,105"
          fill="url(#triGrad)"
          initial={{ opacity: 0 }}
          animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* ── Step 3: light sweep overlay ── */}
        {stage >= 3 && (
          <motion.rect
            x="-20" y="0" width="160" height="120"
            fill="url(#sweepGrad)"
            clipPath="url(#triClip)"
            initial={{ x: -160 }}
            animate={{ x: 160 }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0 }}
          />
        )}

        {/* Inner highlight line — subtle metallic edge */}
        <motion.polygon
          points="60,16 106,102 14,102"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={stage >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        />
      </svg>

      {/* Pulsing ring — stage 4 */}
      <motion.div
        className="absolute rounded-full border border-orange-500/20"
        style={{ width: 160, height: 160, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={stage >= 4
          ? { scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }
          : { scale: 0.8, opacity: 0 }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   LOGO TEXT ASSEMBLY
───────────────────────────────────────────────────── */
function LogoText({ stage }: { stage: number }) {
  const letters = "ARROWHEAD".split("");
  const sub     = "DIGITECH";

  return (
    <div className="flex flex-col items-center gap-1 mt-6 select-none">
      {/* Main brand word — letters assemble one by one */}
      <div className="flex items-center gap-[2px]">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="text-3xl font-extrabold tracking-[0.12em]"
            style={{ color: i === 0 ? "#FF5A1F" : "#e8e9eb" }}
            initial={{ opacity: 0, y: 10 }}
            animate={stage >= 4
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 10 }
            }
            transition={{ duration: 0.4, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
          >
            {l}
          </motion.span>
        ))}
      </div>

      {/* Sub-label */}
      <motion.span
        className="text-[11px] font-700 tracking-[0.4em] uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
        initial={{ opacity: 0, y: 6 }}
        animate={stage >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
      >
        {sub}
      </motion.span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   TAGLINE
───────────────────────────────────────────────────── */
function Tagline({ stage }: { stage: number }) {
  const words = "Building Digital Systems That Actually Grow Businesses.".split(" ");
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-x-2 gap-y-1 max-w-sm text-center mt-10"
      initial={{ opacity: 0 }}
      animate={stage >= 5 ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="text-sm font-500 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.45)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={stage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.35, delay: 0.1 + i * 0.04, ease: "easeOut" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN PRELOADER
───────────────────────────────────────────────────── */
interface Props {
  onComplete: () => void;
}

export default function CinematicPreloader({ onComplete }: Props) {
  const [stage,   setStage]   = useState(0);
  const [exiting, setExiting] = useState(false);

  /* Stage sequencer */
  useEffect(() => {
    const seq: Array<[number, number]> = [
      /* [stage, delay ms from previous] */
      [1, 400],   // background settled → triangle stroke draws
      [2, 1200],  // fill appears
      [3, 600],   // light sweep
      [4, 500],   // glow + text assembly
      [5, 900],   // tagline
      [6, 1800],  // begin exit
    ];

    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    seq.forEach(([s, delay]) => {
      accumulated += delay;
      timers.push(setTimeout(() => setStage(s), accumulated));
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  /* Trigger exit when stage 6 is reached */
  useEffect(() => {
    if (stage === 6) {
      const t = setTimeout(() => {
        setExiting(true);
        /* Give exit animation time, then unmount */
        setTimeout(onComplete, 900);
      }, 100);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#080808" }}
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* ── Background gradient — fades in first ── */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,31,0.06) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Subtle vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)",
            }}
          />

          {/* Grid texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Particles */}
          <Particles />

          {/* ── Central logo assembly ── */}
          <motion.div
            className="relative flex flex-col items-center z-10"
            /* Exit: shrinks toward top-left (navbar position) */
            animate={exiting ? { scale: 0.15, x: -600, y: -400, opacity: 0 } : {}}
            transition={exiting
              ? { duration: 0.85, ease: [0.4, 0, 0.2, 1] }
              : {}
            }
          >
            <ArrowheadTriangle stage={stage} />
            <LogoText stage={stage} />
          </motion.div>

          <Tagline stage={stage} />

          {/* Thin bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #FF5A1F 50%, transparent 100%)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={stage >= 4 ? { scaleX: 1, opacity: 0.6 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
