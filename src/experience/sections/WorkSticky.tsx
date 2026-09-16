'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../../data/portfolio';
import { SectionLabel } from './shared';

interface WorkStickyProps {
  activeProject: number;
  setActiveProject: (index: number) => void;
  onOpenDetail: () => void;
}

/** Full-bleed sticky case-study stage. The outer wrapper is the pin target
 * (never keyed — pinned nodes must stay stable across re-renders); only the
 * media/panel children swap key so GSAP's pin plumbing survives project
 * changes driven by scroll. */
export default function WorkSticky({ activeProject, setActiveProject, onOpenDetail }: WorkStickyProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const project = projects[activeProject];
  const total = projects.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const scope = sectionRef.current ?? undefined;

    media.add('(min-width: 1000px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const state = { progress: 0 };
        ScrollTrigger.create({
          trigger: '.work-sticky-outer',
          start: 'top 110px',
          end: `+=${Math.max(1200, total * 340)}`,
          pin: true,
          anticipatePin: 1,
          onUpdate: self => {
            state.progress = self.progress;
            const next = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveProject(next);
          },
        });
      }, scope);
      return () => context.revert();
    });

    media.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.fromTo('.case-media', { y: 50 }, { y: 0, scrollTrigger: { trigger: '.case-stage', start: 'top bottom', end: 'center center', scrub: 1 } });
      }, scope);
      return () => context.revert();
    });

    return () => {
      media.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  return (
    <section id="work" className="work-section" ref={sectionRef}>
      <div className="work-intro">
        <SectionLabel number="01">SELECTED WORK</SectionLabel>
        <div className="section-heading reveal">
          <h2>Systems we&rsquo;ve <span>built.</span></h2>
          <p>Real businesses. Complex challenges.<br />Products that bring it all together.</p>
        </div>
        <div className="project-tabs" aria-label="Featured systems">
          {projects.map((item, i) => (
            <button key={item.id} aria-pressed={activeProject === i} className={activeProject === i ? 'active' : ''} onClick={() => setActiveProject(i)}>
              <span>{String(i + 1).padStart(2, '0')}</span>{item.client}
            </button>
          ))}
        </div>
      </div>

      <div className="work-sticky-outer">
        <div className={`case-stage project-${project.id}`}>
          <div className="case-media" key={`media-${project.id}`}>
            <img src={project.desktopImg} alt={`${project.client} product experience`} />
            <div className="case-media-veil" aria-hidden="true" />
            <div className="case-media-meta">
              <span>{project.industry}</span>
              <span>{project.tagline.split('·')[1]?.trim() || project.tagline}</span>
            </div>
          </div>
          <div className="case-panel" key={`panel-${project.id}`}>
            <img className="project-logo" src={project.logo} alt={project.client} />
            <p className="case-kicker">{String(activeProject + 1).padStart(2, '0')} / {project.tagline}</p>
            <h3>{project.featuredTitle}</h3>
            <p>{project.overview}</p>
            <div className="case-metrics">
              {project.metrics.slice(0, 4).map(metric => (
                <div key={metric.label}>
                  <strong>{metric.value}{metric.suffix}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
            <div className="case-actions">
              <button className="button primary" onClick={onOpenDetail}>Inside the project <ArrowUpRight size={17} /></button>
              <div className="project-pagination">
                <button aria-label="Previous project" onClick={() => setActiveProject((activeProject + total - 1) % total)}><ArrowRight className="reverse" size={18} /></button>
                <button aria-label="Next project" onClick={() => setActiveProject((activeProject + 1) % total)}><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
