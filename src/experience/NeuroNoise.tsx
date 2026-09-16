'use client';

import { useEffect, useRef } from 'react';

/** Theme-aware NeuroNoise filament field — orange / blue strands over dark ink.
 * Inspired by React Bits Pro Hero 24 background treatment; drawn in canvas so
 * it stays light and CSS-token driven without requiring the Pro install. */
export default function NeuroNoise({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;

    const strands = Array.from({ length: 28 }, (_, i) => ({
      amp: 40 + (i % 7) * 18,
      freq: 0.0012 + (i % 5) * 0.00035,
      speed: 0.35 + (i % 9) * 0.08,
      phase: i * 0.55,
      y: 0.12 + (i / 28) * 0.78,
      orange: i % 3 !== 1,
      width: 0.6 + (i % 4) * 0.35,
    }));

    const resize = () => {
      const parent = canvas.parentElement;
      const rect = parent?.getBoundingClientRect();
      w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth));
      h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#05070c';
      ctx.fillRect(0, 0, w, h);

      // Soft brand glows (engineering / logo DNA)
      const g1 = ctx.createRadialGradient(w * 0.72, h * 0.42, 0, w * 0.72, h * 0.42, w * 0.45);
      g1.addColorStop(0, 'rgba(255,90,31,0.18)');
      g1.addColorStop(1, 'rgba(255,90,31,0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      const g2 = ctx.createRadialGradient(w * 0.2, h * 0.75, 0, w * 0.2, h * 0.75, w * 0.35);
      g2.addColorStop(0, 'rgba(59,130,246,0.1)');
      g2.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      for (const s of strands) {
        ctx.beginPath();
        const baseY = s.y * h;
        for (let x = -40; x <= w + 40; x += 8) {
          const y =
            baseY +
            Math.sin(x * s.freq + t * s.speed + s.phase) * s.amp +
            Math.sin(x * s.freq * 2.1 - t * s.speed * 0.6 + s.phase) * (s.amp * 0.28);
          if (x === -40) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = s.orange
          ? `rgba(255,90,31,${0.08 + (s.width / 3) * 0.07})`
          : `rgba(59,130,246,${0.06 + (s.width / 3) * 0.05})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      // Filament spark points
      for (let i = 0; i < 90; i++) {
        const px = ((i * 97 + t * 12) % (w + 80)) - 40;
        const py = ((i * 53 + Math.sin(t * 0.4 + i) * 40) % h + h) % h;
        ctx.fillStyle = i % 2 ? 'rgba(255,90,31,0.35)' : 'rgba(200,206,216,0.25)';
        ctx.fillRect(px, py, 1.2, 1.2);
      }

      if (!reduced.matches) {
        t += 0.016;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    draw();
    if (reduced.matches) {
      // static frame already drawn
    }

    const onResize = () => {
      resize();
      if (reduced.matches) draw();
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className={`hero-neuro ${className}`} aria-hidden="true" />;
}
