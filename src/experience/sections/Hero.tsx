'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import NeuralBackground from '@/components/ui/flow-field-background';

/** Centered engineering hero — flow-field wings frame the content. */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.from('.hero-copy > *', {
        y: 36,
        opacity: 0,
        stagger: 0.09,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section className="hero hero-24 hero-neural hero-engineering hero-centered" id="hero-content" ref={sectionRef}>
      <div className="hero-flow-field" aria-hidden="true">
        <NeuralBackground
          layout="wings"
          color="#3a7ec9"
          trailColor="214, 227, 237"
          trailOpacity={0.055}
          particleCount={1900}
          speed={1.08}
        />
      </div>
      <div className="hero-atmosphere" aria-hidden="true" />
      <div className="hero-gridlines" aria-hidden="true" />

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="hero-chip">
            <i className="status-dot ping" aria-hidden="true" />
            <span>
              <span className="hero-chip-line">INDEPENDENT DIGITAL STUDIO</span>
              <span className="hero-chip-sep" aria-hidden="true">
                {' '}
                —{' '}
              </span>
              <span className="hero-chip-line">LAHORE → EVERYWHERE</span>
            </span>
          </p>
          <p className="hero-kicker">IDEAS INTO IMPACT.</p>
          <h1>
            Built to work.
            <br />
            Designed to
            <br />
            <span>stand out.</span>
          </h1>
          <p className="hero-description">
            Extraordinary software. Unmissable brands. We bring engineering, design and marketing
            together to turn your next big idea into your unfair advantage.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button primary">
              Explore our work <ArrowUpRight size={20} />
            </a>
            <a href="#contact" className="button quiet">
              Build with us <ArrowRight size={18} />
            </a>
          </div>
        </div>
        <p className="hero-object-label" aria-hidden="true">
          <span>FLOW FIELD</span>
          <span>MOVE TO DISTURB</span>
        </p>
      </div>
    </section>
  );
}
