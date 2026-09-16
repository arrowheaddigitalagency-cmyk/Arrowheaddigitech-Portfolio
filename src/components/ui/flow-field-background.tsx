'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NeuralBackgroundProps {
  className?: string;
  color?: string;
  trailColor?: string;
  trailOpacity?: number;
  particleCount?: number;
  speed?: number;
  layout?: 'field' | 'wings';
}

type Side = 'left' | 'right';

export default function NeuralBackground({
  className,
  color = '#5B9FD4',
  trailColor = '6, 12, 21',
  trailOpacity = 0.12,
  particleCount = 700,
  speed = 0.85,
  layout = 'field',
}: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let particles: Particle[] = [];
    let animationFrameId = 0;
    let inView = false;
    let isMobile = width <= 768;
    const mouse = { x: -1000, y: -1000 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const targetCount = () => {
      if (layout !== 'wings') return particleCount;
      if (width <= 430) return Math.round(particleCount * 0.42);
      if (width <= 768) return Math.round(particleCount * 0.55);
      if (width <= 1100) return Math.round(particleCount * 0.78);
      return particleCount;
    };

    const covering = () => document.documentElement.classList.contains('entrance-covering');

    class Particle {
      x = 0;
      y = 0;
      vx = 0;
      vy = 0;
      age = 0;
      life = 100;
      side: Side = 'left';
      size = 1.6;
      seed = Math.random();

      constructor() {
        this.reset(true);
      }

      update() {
        if (layout === 'wings') this.updateWings();
        else this.updateField();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.945;
        this.vy *= 0.945;

        this.age++;
        if (this.age > this.life) this.reset();

        if (layout === 'wings') {
          if (this.x < -60 || this.x > width + 60 || this.y < -60 || this.y > height + 60) {
            this.reset();
          }
        } else {
          if (this.x < 0) this.x = width;
          if (this.x > width) this.x = 0;
          if (this.y < 0) this.y = height;
          if (this.y > height) this.y = 0;
        }
      }

      updateField() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;
        this.applyMouse();
      }

      updateWings() {
        const sign = this.side === 'left' ? -1 : 1;
        const ny = this.y / Math.max(height, 1);
        const noise =
          Math.cos((this.x + this.seed * 140) * 0.0042) +
          Math.sin((this.y - this.seed * 90) * 0.0048);

        const lift = isMobile ? 0.52 : 0.62;
        const spread = isMobile ? 0.78 : 0.92;
        const baseAngle = -Math.PI * lift + sign * (spread + this.seed * 0.22);
        const flow = baseAngle + noise * 0.35;
        this.vx += Math.cos(flow) * 0.2 * speed;
        this.vy += Math.sin(flow) * 0.2 * speed;

        const originX = width * 0.5 + sign * width * (isMobile ? 0.03 : 0.05);
        const originY = height * (isMobile ? 0.64 : 0.7);
        const toEdgeX = this.x - originX;
        const toEdgeY = this.y - originY;
        const dist = Math.sqrt(toEdgeX * toEdgeX + toEdgeY * toEdgeY) || 1;
        this.vx += (toEdgeX / dist) * 0.05 * speed;
        this.vy += (toEdgeY / dist) * 0.02 * speed - 0.035 * speed;

        // Soft hemisphere bias — no hard wall (hard walls make a vertical seam).
        const mid = width * 0.5;
        if (this.side === 'left' && this.x > mid - width * 0.04) this.vx -= 0.18 * speed;
        if (this.side === 'right' && this.x < mid + width * 0.04) this.vx += 0.18 * speed;

        const corridor = isMobile ? width * 0.18 : width * 0.16;
        const dx = this.x - mid;
        if (Math.abs(dx) < corridor && ny < 0.7) {
          this.vx += Math.sign(dx || sign) * 0.32 * speed;
          this.vy += 0.05 * speed;
        }

        if (ny < 0.4) this.vy += 0.06 * speed;
        this.applyMouse();
      }

      applyMouse() {
        if (mouse.x < -100) return;
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = isMobile ? 140 : 220;
        if (distance > 0 && distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx += (-dy / distance) * force * 0.2;
          this.vy += (dx / distance) * force * 0.2;
          this.vx -= (dx / distance) * force * 0.05;
          this.vy -= (dy / distance) * force * 0.05;
        }
      }

      reset(initial = false) {
        this.vx = 0;
        this.vy = 0;
        this.age = initial ? Math.random() * 100 : 0;
        this.life = Math.random() * 200 + 100;
        this.size = isMobile ? 1.2 + Math.random() * 0.5 : 1.35 + Math.random() * 0.65;
        this.seed = Math.random();

        if (layout !== 'wings') {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          return;
        }

        this.side = this.seed < 0.48 ? 'left' : 'right';
        const sign = this.side === 'left' ? -1 : 1;
        const t = Math.pow(Math.random(), 0.55);

        const originX = width * 0.5 + sign * width * (isMobile ? 0.05 : 0.07);
        const originY = height * (0.5 + Math.random() * 0.42);
        this.x =
          originX +
          sign * (width * 0.04 + t * width * (isMobile ? 0.42 : 0.46)) +
          (Math.random() - 0.5) * width * 0.04;
        this.y =
          originY -
          t * height * (0.38 + this.seed * 0.14) +
          (Math.random() - 0.5) * height * 0.05;

        // Soft clamp — allow particles near the true edges so CSS mask can fade them.
        if (this.side === 'left') this.x = Math.min(Math.max(this.x, width * 0.01), width * 0.48);
        if (this.side === 'right') this.x = Math.max(Math.min(this.x, width * 0.99), width * 0.52);
      }

      draw(context: CanvasRenderingContext2D) {
        let alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;
        if (layout === 'wings') {
          const centerDist = Math.abs(this.x - width * 0.5) / Math.max(width * 0.5, 1);
          const yNorm = this.y / Math.max(height, 1);
          if (centerDist < (isMobile ? 0.28 : 0.24) && yNorm < 0.74) {
            alpha *= 0.12 + centerDist * 1.8;
          }
          if (yNorm > 0.52) alpha *= 1.06;
          if (yNorm < 0.35) alpha *= 0.55;
        }
        context.fillStyle = color;
        context.globalAlpha = Math.max(0, Math.min(1, alpha));
        context.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const init = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      isMobile = width <= 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = targetCount();
      particles = [];
      for (let i = 0; i < count; i++) particles.push(new Particle());

      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${trailColor})`;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      animationFrameId = 0;
      if (!inView || document.hidden || covering() || reduced.matches) return;

      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${trailColor}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const resume = () => {
      if (inView && !document.hidden && !covering() && !animationFrameId && !reduced.matches) {
        animate();
      }
    };

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (width === container.clientWidth && height === container.clientHeight) return;
        init();
        resume();
      }, 100);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    init();
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
        if (inView) resume();
        else {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      },
      { threshold: [0, 0.05, 0.2] },
    );
    visibility.observe(container);

    const coverWatch = new MutationObserver(() => {
      if (covering()) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      } else resume();
    });
    coverWatch.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('visibilitychange', resume);
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    container.addEventListener('pointermove', handlePointerMove, { passive: true });

    if (reduced.matches) particles.forEach(p => p.draw(ctx));
    else resume();

    return () => {
      visibility.disconnect();
      coverWatch.disconnect();
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      window.clearTimeout(resizeTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, trailColor, trailOpacity, particleCount, speed, layout]);

  return (
    <div ref={containerRef} className={cn('flow-field-root', className)}>
      <canvas ref={canvasRef} className="flow-field-canvas" />
    </div>
  );
}
