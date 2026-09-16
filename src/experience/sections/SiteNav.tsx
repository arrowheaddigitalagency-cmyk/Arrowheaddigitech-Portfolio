'use client';

import { useEffect, useState } from 'react';
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

/** Fixed studio nav — sits above work filters and all later sections. */
export default function SiteNav({ navLinks, menuOpen, onMenuToggle, onNavClick }: SiteNavProps) {
  const [visible, setVisible] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const hero = document.getElementById('home');
    const work = document.getElementById('work');
    if (!hero) return;

    const sync = () => {
      const heroRect = hero.getBoundingClientRect();
      setVisible(heroRect.top <= 96);
      const workTop = work?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;
      const content = document.getElementById('hero-content');
      setSolid(workTop <= 96 || (content?.getBoundingClientRect().bottom ?? heroRect.bottom) < 140);
    };

    sync();
    const show = ScrollTrigger.create({
      trigger: hero,
      start: 'top top+=96',
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
      onUpdate: sync,
    });
    const solidTrigger = work
      ? ScrollTrigger.create({
          trigger: work,
          start: 'top top+=96',
          onEnter: () => setSolid(true),
          onLeaveBack: () => setSolid(hero.getBoundingClientRect().bottom < 140),
        })
      : null;

    window.addEventListener('resize', sync);
    return () => {
      show.kill();
      solidTrigger?.kill();
      window.removeEventListener('resize', sync);
    };
  }, []);

  return (
    <header
      className={`site-nav${visible ? ' is-visible' : ''}${solid ? ' is-solid' : ''}${menuOpen ? ' is-open' : ''}`}
      aria-hidden={!visible}
    >
      <a className="brand brand-lockup" href="#home" aria-label="Arrowhead DigiTech home" onClick={onNavClick} tabIndex={visible ? 0 : -1}>
        <img className="brand-logo-hero" src="/images/arrowhead_black.png" alt="" width={240} height={48} />
      </a>
      <nav aria-label="Main navigation" className={menuOpen ? 'nav open' : 'nav'}>
        {navLinks.map(([text, href]) => (
          <a key={href} href={href} onClick={onNavClick} tabIndex={visible ? 0 : -1}>
            {text}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={onNavClick} tabIndex={visible ? 0 : -1}>
          Let&rsquo;s talk <ArrowUpRight size={16} />
        </a>
      </nav>
      <div className="nav-mobile-actions">
        <a
          className="nav-cta nav-cta-compact"
          href="#contact"
          onClick={onNavClick}
          tabIndex={visible ? 0 : -1}
        >
          Let&rsquo;s talk <ArrowUpRight size={14} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={onMenuToggle}
          tabIndex={visible ? 0 : -1}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
