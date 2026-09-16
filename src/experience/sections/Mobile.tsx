'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientProjects as projects } from '../../data/client-projects';
import { SectionLabel } from './shared';

interface MobileProps {
  onExplore: (projectIndex: number) => void;
}

function storyFor(id: string) {
  if (id === 'ann') {
    return {
      blurb:
        'A multi-tenant MERN platform, with a Flutter application currently in development. Web, mobile and AI automations connected around healthcare recruitment.',
      tags: ['Flutter · In development', 'Healthcare', 'Connected platform'],
      image: '/images/mobile/america-needs-nurses.jpg',
      accent: '#3B82F6',
    };
  }
  return {
    blurb:
      'A custom MERN rental platform with iOS and Android applications, chatbot integration and connected digital marketing.',
    tags: ['iOS & Android', 'Mobility', 'Connected platform'],
    image: '/images/mobile/yalaride.jpg',
    accent: '#ea5e2b',
  };
}

/** Mobile applications showcase — free-scrolling, theme-aligned presentation. */
export default function Mobile({ onExplore }: MobileProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const [mobileProject, setMobileProject] = useState(0);

  const mobileProjects = useMemo(() => {
    const withMobile = projects.filter(p => p.mobile);
    if (withMobile.length) return withMobile;
    return projects.filter(p => p.id === 'yalaride' || p.id === 'ann');
  }, []);

  const active = mobileProjects[mobileProject] ?? mobileProjects[0];
  const projectIndex = projects.findIndex(p => p.id === active?.id);
  const story = active ? storyFor(active.id) : null;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.from('.mobile-copy > *:not(.mobile-story)', {
        y: 36,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
      });

      gsap.from('.mobile-stage', {
        x: 56,
        opacity: 0,
        rotate: 4,
        duration: 1.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 68%',
          once: true,
        },
      });

      // Gentle idle float — no scrub / no scroll locking
      if (phoneRef.current) {
        gsap.to(phoneRef.current, {
          y: -14,
          duration: 2.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !story) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;

    const storyEl = sectionRef.current.querySelector('.mobile-story');
    const screenEl = sectionRef.current.querySelector('.phone-screen img');
    if (!storyEl) return;

    gsap.fromTo(
      storyEl,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: 'power2.out' },
    );
    if (screenEl) {
      gsap.fromTo(
        screenEl,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.65, ease: 'power2.out' },
      );
    }
  }, [mobileProject, story]);

  if (!active || !story) return null;

  return (
    <section id="mobile" className="mobile-section section-shell" ref={sectionRef}>
      <div className="mobile-copy">
        <SectionLabel number="06">MOBILE APPLICATIONS</SectionLabel>
        <h2>
          Big possibilities.
          <br />
          <span>Pocket-sized.</span>
        </h2>
        <p>
          Purposeful mobile products that bring your business closer to the people who use it.
        </p>

        <div className="mobile-tabs" role="tablist" aria-label="Mobile application projects">
          {mobileProjects.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={i === mobileProject}
              className={i === mobileProject ? 'active' : ''}
              onClick={() => setMobileProject(i)}
            >
              {item.client}
            </button>
          ))}
        </div>

        <div className="mobile-story" key={active.id}>
          <p className="eyebrow">{active.industry.toUpperCase()}</p>
          <h3>{active.headline}</h3>
          <p>{story.blurb}</p>
          <div className="tags">
            {story.tags.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <button
            type="button"
            className="text-button"
            onClick={() => onExplore(projectIndex >= 0 ? projectIndex : 0)}
          >
            Explore the product <ArrowUpRight size={17} />
          </button>
        </div>

        <small className="mobile-capability">
          OUR MOBILE CAPABILITY <span>Flutter · iOS · Android · API integration</span>
        </small>
      </div>

      <div
        className={`mobile-environment ${active.id === 'ann' ? 'healthcare' : ''}`}
        style={{ ['--mobile-accent' as string]: story.accent }}
      >
        <div className="mobile-stage">
          <div className="mobile-ring" aria-hidden="true" />
          <span className="mobile-env-label">{active.client.toUpperCase()}</span>
          <div className="phone" ref={phoneRef}>
            <div className="phone-status">
              <span>9:41</span>
              <span>••• ▰</span>
            </div>
            <span className="phone-camera" aria-hidden="true" />
            <div
              className="phone-screen"
              role="img"
              aria-label={`${active.client} mobile screen preview`}
            >
              <img
                key={active.id}
                src={story.image}
                alt={`${active.client} mobile screen`}
                width={390}
                height={844}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
            <div className="phone-home" aria-hidden="true" />
          </div>
          <div className="device-callout">
            <span className="status-dot" /> WEB + MOBILE + OPERATIONS
          </div>
          <small className="preview-caption">LIVE PRODUCT PREVIEW</small>
        </div>
      </div>
    </section>
  );
}
