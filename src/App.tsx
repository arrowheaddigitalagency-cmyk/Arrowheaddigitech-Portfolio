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

import Lenis from "lenis";

/* Lazy-load Three.js / R3F — decorative only, not needed for first paint */
const AmbientBackground3D = lazy(() => import("./components/AmbientBackground3D"));

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
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
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-ink-900 overflow-x-hidden antialiased">

      {/* Three.js ambient layer — lazy loaded after first paint (decorative only) */}
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
    </div>
  );
}
