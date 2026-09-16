'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import ParticleText from './ParticleText';

/** A scroll-led opening chapter, with no timer or scroll lock. */
export default function Entrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    gsap.registerPlugin(ScrollTrigger);
    const stage = element.querySelector<HTMLElement>('.opening-stage')!;
    const hero = element.querySelector<HTMLElement>('.opening-hero')!;
    const cover = element.querySelector<HTMLElement>('.particle-entrance')!;
    const media = gsap.matchMedia();
    let frame = 0;
    let lastHeight = 0;
    const resize = new ResizeObserver(() => {
      const height = stage.offsetHeight;
      if (height === lastHeight) return;
      lastHeight = height;
      element.style.setProperty('--opening-height', `${height}px`);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    resize.observe(stage);
    media.add('(prefers-reduced-motion: no-preference)', () => {
      hero.inert = true;
      const syncInteraction = (progress: number) => {
        hero.inert = progress < .7;
        cover.inert = progress > .88;
      };
      const touch = window.matchMedia('(pointer: coarse)').matches;
      const context = gsap.context(() => {
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: element, start: 'top top', end: () => `+=${element.offsetHeight - stage.offsetHeight}`,
          // Soft scrub on touch so Lenis + pin don't feel sticky.
          scrub: touch ? 0.85 : 0.45,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: self => syncInteraction(self.progress),
          onRefresh: self => syncInteraction(self.progress),
        }});
        timeline.fromTo(hero, { clipPath: 'circle(0% at 50% 48%)' }, { clipPath: 'circle(76% at 50% 48%)', duration: 1, ease: 'power2.inOut' }, 0)
          .to('.entrance-particles', { scale: 1.65, opacity: 0, duration: .65, ease: 'power2.in' }, .08)
          .to('.entrance-edition, .entrance-tagline, .entrance-scroll, .entrance-baseline', { opacity: 0, y: -20, duration: .3 }, 0)
          .to(cover, { autoAlpha: 0, duration: .7, ease: 'power1.inOut' }, .25);
      }, element);
      return () => { context.revert(); hero.inert = false; cover.inert = false; };
    });
    return () => { resize.disconnect(); cancelAnimationFrame(frame); media.revert(); };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="opening-sequence" ref={root}>
      <span id="home" className="opening-destination" aria-hidden="true" />
      <div className="opening-stage">
      <div className="opening-hero">{children}</div>
      <section className="particle-entrance" aria-label="Welcome to Arrowhead">
      <div className="particle-entrance-stage">
        <span className="entrance-edition">ARROWHEAD DIGITECH / INDEPENDENT DIGITAL STUDIO</span>
        <div className="entrance-particles">
          {reduced ? (
            <span className="entrance-static">arrowhead</span>
          ) : (
            <ParticleText
              text="arrowhead"
              color="#4a8ec8"
              highlightColor="#6eabd9"
              fontSize="clamp(64px, 16vw, 240px)"
              fontWeight={600}
              particleSize={2}
              density={3}
              scatter={150}
              gatherDuration={1800}
              idleDrift={0.4}
              glow={false}
            />
          )}
        </div>
        <p className="entrance-tagline">Clear thinking. Connected possibilities.</p>
        <a className="entrance-scroll" href="#home">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={20} />
        </a>
        <div className="entrance-baseline">
          <span>SOFTWARE • DESIGN • GROWTH</span>
          <span>LAHORE • EVERYWHERE</span>
        </div>
      </div>
    </section>
      </div>
    </div>
  );
}
