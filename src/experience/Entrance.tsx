'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EntranceMotion from './EntranceMotion';

/** A scroll-led opening chapter using the Interactive / Mobile canvas openings. */
export default function Entrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

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
        if (hero.inert !== (progress < 0.7)) hero.inert = progress < 0.7;
        if (cover.inert !== (progress > 0.88)) cover.inert = progress > 0.88;
        const covering = progress < 0.55;
        const nextActive = progress < 0.98;
        if (active !== nextActive) {
          active = nextActive;
          window.dispatchEvent(new CustomEvent('entrance-active', { detail: active }));
        }
        if (document.documentElement.classList.contains('entrance-covering') !== covering) {
          document.documentElement.classList.toggle('entrance-covering', covering);
        }
      };
      let active = true;
      const context = gsap.context(() => {
        gsap.set(hero, { clearProps: 'clipPath' });
        gsap.set('.hero-reveal', { clearProps: 'clipPath', opacity: 0, y: 28 });
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: 'top top',
            end: () => `+=${Math.round(element.offsetHeight - stage.offsetHeight)}`,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,

            onUpdate: self => syncInteraction(self.progress),
            onRefresh: self => syncInteraction(self.progress),
          },
        });
        timeline
          .fromTo('.hero-reveal', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.72, ease: 'power2.out' }, 0.28)
          .fromTo('.hero-atmosphere', { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power1.out' }, 0.16)
          .to('.entrance-core', { yPercent: -3, duration: 0.8, ease: 'none' }, 0.12)
          .to(cover, { autoAlpha: 0, duration: 0.8, ease: 'power1.inOut' }, 0.12);
      }, element);
      return () => {
        context.revert();
        hero.inert = false;
        cover.inert = false;
        document.documentElement.classList.remove('entrance-covering');
      };
    });
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      media.revert();
    };
  }, []);

  return (
    <div className="opening-sequence" ref={root}>
      <span id="home" className="opening-destination" aria-hidden="true" />
      <div className="opening-stage">
        <div className="opening-hero">{children}</div>
        <section className="particle-entrance" aria-label="Welcome to Arrowhead">
          <div className="particle-entrance-stage">
            <div className="entrance-core">
              <EntranceMotion />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
