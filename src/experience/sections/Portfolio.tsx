'use client';
import { useState, useRef, useEffect, type CSSProperties } from 'react';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clientProjects, type ClientProject } from '../../data/client-projects';

function ProjectImage({ project, eager = false }: { project: ClientProject; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <div className="project-image-fallback">
      <span>{project.industry}</span>
      <strong>{project.client}</strong>
      <ArrowUpRight size={80} />
    </div>
  ) : (
    <img
      src={`/images/portfolio/${project.image}.png`}
      alt={`${project.client} website imagery`}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}

export default function Portfolio({
  requestedProject,
  onClose,
}: {
  requestedProject: number | null;
  onClose: () => void;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('All work');
  const [selected, setSelected] = useState<ClientProject | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selected) {
      opener.current = document.activeElement as HTMLElement;
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
      opener.current?.focus();
    }
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.dispatchEvent(new CustomEvent('portfolio-modal', { detail: true }));
    return () => {
      document.body.style.overflow = before;
      window.dispatchEvent(new CustomEvent('portfolio-modal', { detail: false }));
    };
  }, [selected]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [filter]);

  useEffect(() => {
    if (requestedProject !== null) setSelected(clientProjects[requestedProject]);
  }, [requestedProject]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches || !sectionRef.current) return;

    const context = gsap.context(() => {
      gsap.from('.portfolio-heading > *', {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
      });

      gsap.from('.portfolio-filters', {
        y: 14,
        opacity: 0,
        duration: 0.65,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: { trigger: '.portfolio-filters', start: 'top 92%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.portfolio-card').forEach((card, i) => {
        const art = card.querySelector<HTMLElement>('.project-art');
        const windowEl = card.querySelector<HTMLElement>('.project-window');
        const caption = card.querySelector<HTMLElement>('.project-caption');
        const meta = card.querySelectorAll<HTMLElement>('.project-art-top, .project-art-bottom');

        gsap.set([card, art, windowEl, caption].filter(Boolean), { clearProps: 'opacity,filter' });
        if (windowEl) gsap.set(windowEl.querySelectorAll('img'), { opacity: 1, filter: 'none' });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: 'top 86%', once: true },
        });

        tl.fromTo(
          card,
          { y: 72 },
          {
            y: 0,
            duration: 1.05,
            delay: (i % 2) * 0.1,
            ease: 'power3.out',
            clearProps: 'transform',
          },
        );

        if (art) {
          tl.fromTo(
            art,
            { scale: 0.94, borderRadius: '28px' },
            {
              scale: 1,
              borderRadius: '18px',
              duration: 1.05,
              ease: 'power3.out',
              clearProps: 'transform',
            },
            '-=0.95',
          );
        }

        if (windowEl) {
          tl.fromTo(
            windowEl,
            {
              y: 48,
              rotateX: 8,
              rotateY: i % 2 === 0 ? -6 : 6,
              scale: 0.92,
              transformPerspective: 1000,
              clipPath: 'inset(14% 10% 18% 10% round 12px)',
            },
            {
              y: 0,
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 8px)',
              duration: 1.1,
              ease: 'power3.out',
              clearProps: 'transform,clipPath',
            },
            '-=0.9',
          );
        }

        if (meta.length) {
          tl.fromTo(
            meta,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power2.out', clearProps: 'all' },
            '-=0.55',
          );
        }

        if (caption) {
          tl.fromTo(
            caption,
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.65, ease: 'power2.out', clearProps: 'all' },
            '-=0.5',
          );
        }
      });
    }, sectionRef);

    return () => context.revert();
  }, [filter]);

  function close() {
    setSelected(null);
    onClose();
  }

  const visible = clientProjects.filter(
    p =>
      filter === 'All work' ||
      (filter === 'Marketing'
        ? p.services.includes('Social media marketing')
        : filter === 'Apps & platforms'
          ? !!p.mobile
          : p.stack === filter),
  );

  return (
    <section id="work" className="portfolio-section" ref={sectionRef}>
      <div className="portfolio-heading">
        <p className="chapter-label">
          <span>01 / SELECTED WORK</span>
          <span>STRATEGY → BUILD → GROW</span>
        </p>
        <div>
          <h2>
            Big ideas.
            <br />
            <em>Real-world impact.</em>
          </h2>
          <p>
            Different industries. Shared ambition.
            <br />
            Explore the products we build and
            <br />
            the brands we help move forward.
          </p>
        </div>
      </div>
      <div className="portfolio-filters" aria-label="Filter projects">
        {['All work', 'Apps & platforms', 'Next.js', 'WordPress', 'Shopify', 'Marketing'].map(
          label => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              aria-pressed={filter === label}
              className={filter === label ? 'active' : ''}
            >
              {label}
              {label === 'All work' && <sup>14</sup>}
            </button>
          ),
        )}
      </div>
  <div className="portfolio-grid">
        {visible.map((p, i) => (
          <article
            className={`portfolio-card ${filter === 'All work' && i < 2 ? 'portfolio-featured' : ''}`}
            key={p.id}
            style={{ '--project-color': p.color } as CSSProperties}
          >
            <button
              className="project-art"
              onClick={() => setSelected(p)}
              aria-label={`Explore ${p.client}`}
            >
              <div className="project-art-top">
                <span>{p.industry}</span>
                <span>{String(clientProjects.indexOf(p) + 1).padStart(2, '0')} / 14</span>
              </div>
              <div className="project-window">
                <div className="window-bar">
                  <i />
                  <i />
                  <i />
                  <span>{new URL(p.url).hostname}</span>
                  <ArrowUpRight size={12} />
                </div>
                <ProjectImage project={p} eager={i < 2} />
              </div>
              <div className="project-art-bottom">
                <span>{p.mobile || p.stack + ' development'}</span>
                <span className="project-open">
                  <ArrowUpRight size={22} />
                </span>
              </div>
    </button>
            <div className="project-caption">
              <div>
                <h3>
                  <button onClick={() => setSelected(p)}>{p.client}</button>
                </h3>
                <p>{p.headline}</p>
              </div>
              <span>{p.stack}</span>
            </div>
    <div className="project-service-line">{p.services.join(' / ')}</div>
          </article>
        ))}
      </div>
      <div className="portfolio-end">
        <span>YOUR NEXT BIG THING BELONGS HERE.</span>
        <a href="#contact">
          Let’s make it happen <ArrowRight size={20} />
        </a>
      </div>
      <dialog
        ref={dialog}
        className="portfolio-dialog"
        data-lenis-prevent
        onCancel={close}
        onClick={e => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="portfolio-dialog-title"
      >
        {selected && (
          <div data-lenis-prevent className="portfolio-dialog-body">
            <div className="portfolio-dialog-top">
              <span>
                {selected.industry} / {selected.stack}
              </span>
              <button autoFocus onClick={close} aria-label="Close project">
                <X />
              </button>
            </div>
            <h2 id="portfolio-dialog-title">{selected.client}</h2>
            <p className="dialog-tagline">{selected.headline}</p>
            <div className="dialog-art" style={{ background: selected.color }}>
              <ProjectImage project={selected} />
            </div>
            <p>{selected.description}</p>
            <h3>Our scope</h3>
            <div className="tags">
              {selected.services.map(s => (
                <span key={s}>{s}</span>
              ))}
            </div>
            {selected.mobile && <p className="project-status">Mobile: {selected.mobile}</p>}
            <div className="dialog-actions">
              <a
                className="button primary"
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit website <ArrowUpRight size={18} />
              </a>
              <a className="text-button" href="#contact" onClick={close}>
                Start a similar project <ArrowRight size={18} />
              </a>
            </div>
  </div>
        )}
  </dialog>
    </section>
  );
}
