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
        if (hero.inert !== (progress < .7)) hero.inert = progress < .7;
        if (cover.inert !== (progress > .88)) cover.inert = progress > .88;
        const covering = progress < 0.38;
        if (document.documentElement.classList.contains('entrance-covering') !== covering) {
          document.documentElement.classList.toggle('entrance-covering', covering);
        }
      };
      const touch = window.matchMedia('(pointer: coarse)').matches;
      const context = gsap.context(() => {
        gsap.set(hero, { clearProps: 'clipPath' });
        gsap.set('.hero-reveal', { clearProps: 'clipPath', opacity: 0, y: 28 });
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: element, start: 'top top', end: () => `+=${Math.round(element.offsetHeight - stage.offsetHeight)}`,
          // Near-zero scrub lag so Lenis stays smooth through the entrance.
          scrub: touch ? 0.2 : true,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          onUpdate: self => syncInteraction(self.progress),
          onRefresh: self => syncInteraction(self.progress),
        }});
        // Opacity/scale reveal — far cheaper than clipping the hero every frame.
        timeline
          .fromTo('.hero-reveal', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.2)
          .fromTo('.hero-atmosphere', { opacity: 0 }, { opacity: 1, duration: .35, ease: 'power1.out' }, 0.16)
          .to('.entrance-core', { scale: 1.22, opacity: 0, duration: .45, ease: 'power2.in' }, .1)
          .to('.entrance-edition, .entrance-scroll, .entrance-baseline', { opacity: 0, y: -12, duration: .22 }, 0)
          .to(cover, { autoAlpha: 0, duration: .45, ease: 'power1.inOut' }, .22);
      }, element);
      return () => {
        context.revert();
        hero.inert = false;
        cover.inert = false;
        document.documentElement.classList.remove('entrance-covering');
      };
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
        <span className="entrance-edition">ARROWHEAD DIGITECH / AI SOFTWARE HOUSE</span>
        <div className="entrance-brand">
          <div className="entrance-core">
            <div className="entrance-aura-wrap" aria-hidden="true">
              <div className="entrance-aura" />
            </div>
            <div className="entrance-particles entrance-particles--title">
              {reduced ? (
                <span className="entrance-static">ARROWHEAD</span>
              ) : (
                <ParticleText
                  text="ARROWHEAD"
                  color="#3d7fb8"
                  highlightColor="#ea5e2b"
                  fontSize="clamp(36px, 10vw, 164px)"
                  fontWeight={650}
                  particleSize={2}
                  density={2.6}
                  scatter={120}
                  gatherDuration={1600}
                  idleDrift={0.45}
                  pointerRepel={48}
                  repelRadius={130}
                  glow={false}
                />
              )}
            </div>
            <div className="entrance-particles entrance-particles--digitech">
              {reduced ? (
                <span className="entrance-static entrance-static--digitech">DIGITECH</span>
              ) : (
                <ParticleText
                  text="DIGITECH"
                  color="#3d7fb8"
                  highlightColor="#ea5e2b"
                  fontSize="clamp(18px, 4.8vw, 50px)"
                  fontWeight={650}
                  particleSize={2}
                  density={2.2}
                  scatter={100}
                  gatherDuration={1600}
                  stagger={380}
                  idleDrift={0.4}
                  pointerRepel={42}
                  repelRadius={110}
                  glow={false}
                />
              )}
            </div>
            <p className="entrance-tagline">CLEAR THINKING. CONNECTED POSSIBILITIES.</p>
            <p className="entrance-signal">SOFTWARE · AI SYSTEMS · GROWTH</p>
          </div>
        </div>
        <a className="entrance-scroll" href="#home">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={20} />
        </a>
        <div className="entrance-baseline">
          <span>SOFTWARE · DESIGN · AI · GROWTH</span>
          <span>EVERYWHERE</span>
        </div>
      </div>
    </section>
      </div>
    </div>
  );
}
