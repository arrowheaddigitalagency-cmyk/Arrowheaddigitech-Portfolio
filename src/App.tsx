import React, { useEffect, useState, lazy, Suspense } from "react";

import Header              from "./components/Header";
import InteractiveHero     from "./components/InteractiveHero";
import InteractiveServices from "./components/InteractiveServices";
import StorytellingAbout   from "./components/StorytellingAbout";
import HorizontalProcess   from "./components/HorizontalProcess";
import PremiumCaseStudies  from "./components/PremiumCaseStudies";
import AchievementsGrid    from "./components/AchievementsGrid";
import LuxuryTeam          from "./components/LuxuryTeam";
import TestimonialSlider   from "./components/TestimonialSlider";
import ProjectEstimatorCTA from "./components/ProjectEstimatorCTA";
import PremiumFooter       from "./components/PremiumFooter";
import CinematicPreloader  from "./components/CinematicPreloader";

import Lenis from "lenis";
import { motion, AnimatePresence } from "motion/react";

/* Lazy-load Three.js / R3F — decorative only, not needed for first paint */
const AmbientBackground3D = lazy(() => import("./components/AmbientBackground3D"));

/* Only show preloader on the first visit per session */
const PRELOADER_KEY = "arw_preloader_shown";
const shouldShowPreloader = () => {
  if (typeof window === "undefined") return false;
  if (sessionStorage.getItem(PRELOADER_KEY)) return false;
  return true;
};

export default function App() {
  const [scrollPercent,   setScrollPercent]   = useState(0);
  const [preloaderDone,   setPreloaderDone]   = useState(!shouldShowPreloader());
  const [contentVisible,  setContentVisible]  = useState(!shouldShowPreloader());

  /* Lenis smooth scroll — initialised only after preloader completes */
  useEffect(() => {
    if (!preloaderDone) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const h  = document.documentElement;
      const b  = document.body;
      const st = h.scrollTop || b.scrollTop;
      const sh = h.scrollHeight || b.scrollHeight;
      setScrollPercent((st / (sh - h.clientHeight)) * 100);
    };
    lenis.on("scroll", handleScroll);

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (anchor?.hash && anchor.origin === window.location.origin) {
        const target = document.querySelector(anchor.hash);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [preloaderDone]);

  /* When preloader finishes — mark session, fade in content */
  const handlePreloaderComplete = () => {
    sessionStorage.setItem(PRELOADER_KEY, "1");
    setPreloaderDone(true);
    /* Small delay so preloader exit animation completes cleanly */
    setTimeout(() => setContentVisible(true), 120);
  };

  return (
    <>
      {/* ── Cinematic preloader — first visit only ──────── */}
      {!preloaderDone && (
        <CinematicPreloader onComplete={handlePreloaderComplete} />
      )}

      {/* ── Main site — fades in after preloader ─────────── */}
      <AnimatePresence>
        {contentVisible && (
          <motion.div
            key="site"
            className="relative min-h-screen bg-white text-ink-900 overflow-x-hidden antialiased"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Three.js ambient layer — lazy loaded */}
            <Suspense fallback={null}>
              <AmbientBackground3D />
            </Suspense>

            {/* Scroll progress bar */}
            <div
              className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-brand-orange-500 to-brand-orange-400 z-[60] transition-all duration-75"
              style={{ width: `${scrollPercent}%` }}
            />

            <Header />

            <main>
              <InteractiveHero />
              <InteractiveServices />
              <StorytellingAbout />
              <HorizontalProcess />
              <PremiumCaseStudies />
              <AchievementsGrid />
              <LuxuryTeam />
              <TestimonialSlider />
              <ProjectEstimatorCTA />
            </main>

            <PremiumFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
