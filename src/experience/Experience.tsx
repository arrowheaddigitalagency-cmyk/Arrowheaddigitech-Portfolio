'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Hero from './sections/Hero';
import SiteNav from './sections/SiteNav';
import Clients from './sections/Clients';
import Portfolio from './sections/Portfolio';
import Entrance from './Entrance';
import EngineeringStory from './sections/EngineeringStory';
import Mobile from './sections/Mobile';
import Growth from './sections/Growth';
import About from './sections/About';
import Contact from './sections/Contact';

const navLinks: [string, string][] = [
  ['Our work', '#work'],
  ['Engineering', '#services'],
  ['Marketing', '#growth'],
  ['About us', '#about'],
];

function isCoarsePointer() {
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
}

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const smoothScroll = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestedProject, setRequestedProject] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let tick: ((time: number) => void) | undefined;
    let refreshTimer = 0;

    const refreshTriggers = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };

    if (!reduced.matches) {
      const touch = isCoarsePointer();
      lenis = new Lenis({
        // Responsive glide — follows the wheel closely, less sticky lag.
        duration: touch ? 0.75 : 0.85,
        lerp: touch ? 0.16 : 0.14,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Keep touch scrolling on the browser compositor; scroll animations
        // still follow native scroll through ScrollTrigger.
        syncTouch: false,
        syncTouchLerp: 0.14,
        touchInertiaExponent: 1.15,
        touchMultiplier: touch ? 1.05 : 1,
        wheelMultiplier: 1,
        anchors: {
          offset: -12,
          duration: touch ? 0.8 : 0.9,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        },
        stopInertiaOnNavigate: true,
        autoResize: true,
        prevent: node =>
          node.hasAttribute('data-lenis-prevent') ||
          node.closest('[data-lenis-prevent]') != null ||
          node.closest('.portfolio-dialog') != null,
      });

      smoothScroll.current = lenis;
      document.documentElement.classList.add('lenis', 'lenis-smooth');
      if (touch) document.documentElement.classList.add('lenis-touch');

      gsap.ticker.lagSmoothing(0);
      lenis.on('scroll', ScrollTrigger.update);
      tick = time => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);

      refreshTriggers();
      window.addEventListener('load', refreshTriggers);
      window.addEventListener('orientationchange', refreshTriggers);
      window.addEventListener('resize', refreshTriggers);
    }

    const modalChange = (event: Event) => {
      if ((event as CustomEvent<boolean>).detail) {
        lenis?.stop();
        document.documentElement.classList.add('lenis-stopped');
      } else {
        lenis?.start();
        document.documentElement.classList.remove('lenis-stopped');
        refreshTriggers();
      }
    };
    window.addEventListener('portfolio-modal', modalChange);

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.reveal').forEach(el =>
          gsap.from(el, {
            y: 28,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          }),
        );
      }, root);
      return () => context.revert();
    });

    return () => {
      media.revert();
      window.removeEventListener('portfolio-modal', modalChange);
      window.removeEventListener('load', refreshTriggers);
      window.removeEventListener('orientationchange', refreshTriggers);
      window.removeEventListener('resize', refreshTriggers);
      window.clearTimeout(refreshTimer);
      document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-touch', 'lenis-stopped');
      lenis?.destroy();
      smoothScroll.current = null;
      if (tick) gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    smoothScroll.current?.stop();
    document.documentElement.classList.add('lenis-stopped');
    const escape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', escape);
    return () => {
      document.body.style.overflow = old;
      smoothScroll.current?.start();
      document.documentElement.classList.remove('lenis-stopped');
      window.removeEventListener('keydown', escape);
    };
  }, [menuOpen]);

  function exploreProject(index: number) {
    setRequestedProject(index);
  }

  return (
    <div ref={root} className="experience">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteNav
        navLinks={navLinks}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(v => !v)}
        onNavClick={() => setMenuOpen(false)}
      />

    <main id="main">
        <Entrance><Hero /></Entrance>
        <Clients />
        <Portfolio requestedProject={requestedProject} onClose={() => setRequestedProject(null)} />
        <EngineeringStory />
        <Mobile onExplore={exploreProject} />
        <Growth />
        <About />
        <Contact />
    </main>

      <footer className="footer footer-merged">
        <div className="footer-top">
          <a className="footer-tagline" href="#home">
            Digital products. Connected intelligence. Lasting impact.
          </a>
          <a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={14} />
          </a>
        </div>
        <a className="footer-wordmark" href="#home" aria-label="Arrowhead — back to home">
          Arrowhead<span>↗</span>
        </a>
        <div className="footer-bottom">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Arrowhead DigiTech</span>
          <span>DESIGNED TO THINK AHEAD.</span>
          <a href="#home">
            Back to top <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
