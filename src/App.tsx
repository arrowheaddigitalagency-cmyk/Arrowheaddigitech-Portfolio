import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import InteractiveHero from "./components/InteractiveHero";
import InteractiveServices from "./components/InteractiveServices";
import VerticalTimeline from "./components/VerticalTimeline";
import HorizontalProcess from "./components/HorizontalProcess";
import PremiumCaseStudies from "./components/PremiumCaseStudies";
import LuxuryTeam from "./components/LuxuryTeam";
import TestimonialSlider from "./components/TestimonialSlider";
import ProjectEstimatorCTA from "./components/ProjectEstimatorCTA";
import PremiumFooter from "./components/PremiumFooter";
import AmbientBackground3D from "./components/AmbientBackground3D";

import Lenis from "lenis";

export default function App() {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const handleScroll = () => {
      const h = document.documentElement;
      const b = document.body;
      const st = 'scrollTop';
      const sh = 'scrollHeight';
      const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
      setScrollPercent(percent);
    };
    
    lenis.on("scroll", handleScroll);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.5,
            immediate: false,
          });
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
    <div className="relative min-h-screen text-slate-700 bg-white selection:bg-brand-orange-500 selection:text-white overflow-x-hidden antialiased font-sans">
      {/* 3D WebGL Background Layer */}
      <AmbientBackground3D />

      {/* Scroll Progress Line Indicator */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-orange-500 via-amber-400 to-brand-orange-600 z-50 transition-all duration-100 ease-out"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Shared Translucent Header Navigation */}
      <Header />

      {/* Core Dynamic Experience Layers */}
      <div className="relative z-10">
        {/* Immersive 3D/Parallax Hero Viewport (100vh) */}
        <InteractiveHero />

        {/* Bento Box Interactive Services (AI Chatbots live interface included) */}
        <InteractiveServices />

        {/* Our Journey Vertical Timeline */}
        <VerticalTimeline />

        {/* Step Horizontal Timeline (Discover, Strategize, Execute, Scale) */}
        <HorizontalProcess />

        {/* Full Screen High Fidelity Case Studies Mock Device Switcher */}
        <PremiumCaseStudies />

        {/* Deluxe 3D Hover Team Matrix */}
        <LuxuryTeam />

        {/* Star Verified Institutional Testimonials Quote Slider */}
        <TestimonialSlider />

        {/* Final Campaign Action & Estimator Tool Configuration Form */}
        <ProjectEstimatorCTA />

        {/* System Registry Enterprise Footer */}
        <PremiumFooter />
      </div>
    </div>
  );
}

