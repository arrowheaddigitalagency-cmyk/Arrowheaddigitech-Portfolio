import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/* ─────────────────────────────────────────────────────
   PARTICLES
───────────────────────────────────────────────────── */
function Particles() {
  const white = useMemo(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.6,
      dur: 5 + Math.random() * 7,
      delay: Math.random() * 5,
      opacity: 0.06 + Math.random() * 0.14,
    })), []);

  const orange = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: `o${i}`,
      x: 30 + Math.random() * 40,
      y: 25 + Math.random() * 50,
      size: Math.random() * 2 + 1,
      dur: 4 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {white.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, p.opacity, 0], y: [-8, 8, -8] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {orange.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: "#FF5A1F" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0], y: [-5, 5, -5] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   LIGHT SWEEP — horizontal shimmer over the logo
───────────────────────────────────────────────────── */
function LightSweep({ active }: { active: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl z-20"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        className="absolute top-0 bottom-0 w-[40%]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.32) 50%, rgba(255,255,255,0.18) 60%, transparent 100%)",
          left: "-40%",
        }}
        initial={{ left: "-40%" }}
        animate={active ? { left: "140%" } : { left: "-40%" }}
        transition={active
          ? { duration: 0.85, ease: [0.25, 0.1, 0.25, 1] }
          : { duration: 0 }
        }
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────
   LOGO IMAGE — the real logo, with cinematic reveal
───────────────────────────────────────────────────── */
function LogoReveal({ stage }: { stage: number }) {
  return (
    <div className="relative flex items-center justify-center select-none">

      {/* Soft ambient glow behind the logo */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 480, height: 240,
          background: "radial-gradient(ellipse, rgba(255,90,31,0.18) 0%, transparent 70%)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(24px)",
        }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={stage >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      {/* Logo image container — clips + reveals */}
      <motion.div
        className="relative overflow-hidden"
        style={{ width: 480, maxWidth: "85vw" }}
        initial={{ opacity: 0, scale: 0.88, filter: "blur(12px)" }}
        animate={stage >= 1
          ? { opacity: 1, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, scale: 0.88, filter: "blur(12px)" }
        }
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* The actual logo */}
        <img
          src="/src/assets/images/arrowhead_logo_full.png"
          alt="Arrowhead DigiTech"
          className="w-full h-auto object-contain"
          draggable={false}
          style={{
            /* Invert white-bg logo to work on dark preloader background.
               The logo has a white background — we make it transparent using
               CSS mix-blend-mode so the dark bg shows through. */
            mixBlendMode: "multiply",
            filter: "invert(1)",
          }}
        />

        {/* Light sweep overlaid on the logo */}
        <LightSweep active={stage === 3} />
      </motion.div>

      {/* Pulsing ring — stage 4 */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 520, height: 260,
          borderColor: "rgba(255,90,31,0.15)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={stage >= 4
          ? { scale: [1, 1.06, 1], opacity: [0.25, 0.08, 0.25] }
          : { scale: 0.9, opacity: 0 }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   TAGLINE
───────────────────────────────────────────────────── */
function Tagline({ stage }: { stage: number }) {
  const words = "Building Digital Systems That Actually Grow Businesses.".split(" ");
  return (
    <div className="flex flex-wrap justify-center gap-x-[6px] gap-y-1 max-w-md text-center mt-8 px-4">
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="text-sm font-400 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.42)", fontFamily: "Poppins, sans-serif" }}
          initial={{ opacity: 0, y: 8 }}
          animate={stage >= 5 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.35, delay: 0.08 + i * 0.038, ease: "easeOut" }}
        >
          {w}
        </motion.span>
      ))}
    </div>
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

  /* ── Animation timeline ─────────────────────────
     Total ~5.8s before exit begins
  ─────────────────────────────────────────────── */
  useEffect(() => {
    const seq: Array<[number, number]> = [
      [1, 350],   // logo emerges from blur/darkness
      [2, 1100],  // fully visible — pause to register
      [3, 400],   // light sweep fires
      [4, 700],   // glow pulse begins
      [5, 600],   // tagline fades in
      [6, 2000],  // hold → begin exit
    ];

    let t = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    seq.forEach(([s, delay]) => {
      t += delay;
      timers.push(setTimeout(() => setStage(s), t));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Trigger exit ─────────────────────────────── */
  useEffect(() => {
    if (stage !== 6) return;
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 950);
    }, 80);
    return () => clearTimeout(t);
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
            scale: 1.05,
            transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          {/* Background warm radial */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255,90,31,0.05) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(0,0,0,0.65) 100%)",
            }}
          />

          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.022,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Particles */}
          <Particles />

          {/* ── Logo — centre stage ─────────────────── */}
          <motion.div
            className="relative z-10 flex flex-col items-center"
            animate={exiting
              ? { scale: 0.14, x: "-46vw", y: "-44vh", opacity: 0 }
              : {}
            }
            transition={exiting
              ? { duration: 0.9, ease: [0.4, 0, 0.2, 1] }
              : {}
            }
          >
            <LogoReveal stage={stage} />
          </motion.div>

          {/* Tagline — below logo, stays in place on exit */}
          <Tagline stage={stage} />

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #FF5A1F 50%, transparent 100%)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={stage >= 4 ? { scaleX: 1, opacity: 0.55 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
