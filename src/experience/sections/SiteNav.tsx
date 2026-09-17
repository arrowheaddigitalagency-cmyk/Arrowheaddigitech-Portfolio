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

/** Show on hero; hide once user scrolls below hero. */
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
    let showLocked = false;
    let solidLocked = false;

    const sync = () => {
      frame = 0;
      const heroRect = heroContent.getBoundingClientRect();
      const heroTop = heroRect.top;
      const heroBottom = heroRect.bottom;
      const entrancePassed = heroAnchor.getBoundingClientRect().top <= 4;

      if (!showLocked) {
        if (entrancePassed && heroTop < 40 && heroBottom > 220) showLocked = true;
      } else if (heroBottom <= 80 || !entrancePassed) {
        showLocked = false;
      }

      const workRect = work?.getBoundingClientRect();
      const workTop = workRect?.top ?? Number.POSITIVE_INFINITY;
      const workBottom = workRect?.bottom ?? Number.NEGATIVE_INFINITY;
      const inWork = Boolean(work) && workTop <= 40 && workBottom > 180;

      if (!solidLocked) {
        if (inWork || workTop < 160 || heroBottom <= 60) solidLocked = true;
      } else if (!inWork && workTop > 280 && heroBottom > 280) {
        solidLocked = false;
      }

      const show = menuOpenRef.current || showLocked;
      const nextSolid = solidLocked;

      if (show !== previousShow) {
        setVisible(show);
        document.documentElement.classList.toggle('nav-concealed', !show);
        previousShow = show;
      }
      if (nextSolid !== previousSolid) {
        setSolid(nextSolid);
        previousSolid = nextSolid;
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
