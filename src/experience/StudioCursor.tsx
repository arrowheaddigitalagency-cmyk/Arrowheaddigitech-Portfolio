'use client';
import { useEffect, useRef } from 'react';

export default function StudioCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)');
    let cleanup = () => {};
    const configure = () => {
      cleanup();
      if (!media.matches || !cursor.current) return;
      const el = cursor.current;
      document.documentElement.classList.add('studio-cursor-enabled');
      const move = (event: PointerEvent) => {
        el.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        el.classList.add('is-visible');
        el.classList.toggle('is-interactive', event.target instanceof Element && !!event.target.closest('a,button,summary,input,select,textarea,[role="button"]'));
      };
      const hide = () => el.classList.remove('is-visible');
      window.addEventListener('pointermove', move, { passive: true });
      document.addEventListener('pointerleave', hide);
      window.addEventListener('blur', hide);
      cleanup = () => {
        document.documentElement.classList.remove('studio-cursor-enabled'); hide();
        window.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', hide); window.removeEventListener('blur', hide);
      };
    };
    configure(); media.addEventListener('change', configure);
    return () => { cleanup(); media.removeEventListener('change', configure); };
  }, []);
  return <div className="studio-cursor" ref={cursor} aria-hidden="true"><i/><span/></div>;
}
