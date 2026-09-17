'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type NavLink = [string, string];

interface SiteNavProps {
  navLinks: NavLink[];
  menuOpen: boolean;
  onMenuToggle: () => void;
  onNavClick: () => void;
}

/** Show on hero; hide once user scrolls below hero. Filters stay pinned at top in work. */
export default function SiteNav({ navLinks, menuOpen, onMenuToggle, onNavClick }: SiteNavProps) {
  const [visible, setVisible] = useState(false);
  const [solid, setSolid] = useState(false);
  const menuOpenRef = useRef(menuOpen);
  menuOpenRef.current = menuOpen;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const heroAnchor = document.getElementById('home');
    const heroContent = document.getElementById('hero-content');
    const work = document.getElementById('work');
    if (!heroAnchor || !heroContent) return;

    let frame = 0;
    let previousShow: boolean | undefined;
    let previousSolid: boolean | undefined;
    let previousFiltersTop: boolean | undefined;
    // Hysteresis locks — stop sticky/nav class chatter on threshold edges.
    let showLocked = false;
    let filtersLocked = false;

    const sync = () => {
      frame = 0;
      const heroRect = heroContent.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroBottom = heroRect.bottom;
      const entrancePassed = heroAnchor.getBoundingClientRect().top <= 8;

      // Wide dead-zones so Lenis/iOS rubber-band can't flip classes every frame.
      if (!showLocked) {
        if (entrancePassed && heroTop < 90 && heroBottom > 180) showLocked = true;
      } else if (heroBottom <= 110 || !entrancePassed) {
        showLocked = false;
      }

      if (!filtersLocked) {
        if (heroBottom <= 120) filtersLocked = true;
      } else if (heroBottom > 240) {
        filtersLocked = false;
      }

      const workRect = work?.getBoundingClientRect();
      const workTop = workRect?.top ?? Number.POSITIVE_INFINITY;
      const workBottom = workRect?.bottom ?? Number.NEGATIVE_INFINITY;
      const inWork = Boolean(work) && workTop <= 80 && workBottom > 140;

      const show = menuOpenRef.current || showLocked;
      const nextSolid = filtersLocked || inWork || workTop < 220;
      const filtersTop = filtersLocked || inWork;

      if (show !== previousShow) {
        setVisible(show);
        document.documentElement.classList.toggle('nav-concealed', !show);
        previousShow = show;
      }
      if (nextSolid !== previousSolid) {
        setSolid(nextSolid);
        previousSolid = nextSolid;
      }
      if (filtersTop !== previousFiltersTop) {
        document.documentElement.classList.toggle('work-filters-top', filtersTop);
        previousFiltersTop = filtersTop;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    const triggers = [
      ScrollTrigger.create({ trigger: heroContent, start: 'top bottom', end: 'bottom top', onUpdate: onScroll }),
      ScrollTrigger.create({ trigger: heroAnchor, start: 'top top', onEnter: onScroll, onLeaveBack: onScroll }),
    ];
    if (work) {
      triggers.push(
        ScrollTrigger.create({ trigger: work, start: 'top bottom', end: 'bottom top', onUpdate: onScroll }),
      );
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      triggers.forEach(t => t.kill());
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('nav-concealed', 'work-filters-top');
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      setVisible(true);
      document.documentElement.classList.remove('nav-concealed');
    }
  }, [menuOpen]);

  const shown = visible || menuOpen;

  return (
    <header
      className={`site-nav${shown ? ' is-visible' : ''}${solid ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}${!shown ? ' is-concealed' : ''}`}
      aria-hidden={!shown}
    >
      <a className="brand brand-lockup" href="#home" aria-label="Arrowhead DigiTech home" onClick={onNavClick} tabIndex={shown ? 0 : -1}>
        <img className="brand-logo-hero" src="/images/arrowhead_black.png" alt="" width={240} height={48} />
      </a>
      <nav aria-label="Main navigation" className={menuOpen ? 'nav open' : 'nav'}>
        {navLinks.map(([text, href]) => (
          <a key={href} href={href} onClick={onNavClick} tabIndex={shown ? 0 : -1}>
            {text}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={onNavClick} tabIndex={shown ? 0 : -1}>
          Let&rsquo;s talk <ArrowUpRight size={16} />
        </a>
      </nav>
      <div className="nav-mobile-actions">
        <a
          className="nav-cta nav-cta-compact"
          href="#contact"
          onClick={onNavClick}
          tabIndex={shown ? 0 : -1}
        >
          Let&rsquo;s talk <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={onMenuToggle}
          tabIndex={shown ? 0 : -1}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
