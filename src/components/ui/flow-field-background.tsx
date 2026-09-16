'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NeuralBackgroundProps {
  className?: string;
  /**
   * Color of the particles.
   * Defaults to engineering steel-blue from the WHAT WE ENGINEER band.
   */
  color?: string;
  /**
   * Trail fade fill (RGBA string or solid).
   * Defaults to deep engineering navy so trails match the journey band.
   */
  trailColor?: string;
  /**
   * The opacity of the trails (0.0 to 1.0).
   * Lower = longer trails. Higher = shorter trails.
   * Default: 0.1
   */
  trailOpacity?: number;
  /**
   * Number of particles. Default: 800
   * On mobile / wing layout this is further scaled by viewport.
   */
  particleCount?: number;
  /**
   * Speed multiplier. Default: 1
   */
  speed?: number;
  /**
   * Wing composition around centered hero content.
   * Keeps the same canvas particle tech, biased into left/right streams.
   */
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

    const ctx = canvas.getContext('2d', { alpha: false });
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
      if (width <= 430) return Math.round(particleCount * 0.38);
      if (width <= 768) return Math.round(particleCount * 0.48);
      if (width <= 1100) return Math.round(particleCount * 0.72);
      return particleCount;
    };

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
        if (layout === 'wings') {
          this.updateWings();
        } else {
          this.updateField();
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.945;
        this.vy *= 0.945;

        this.age++;
        if (this.age > this.life) this.reset();

        if (layout === 'wings') {
          // Soft wrap within the active wing band — avoid teleporting across the center.
          if (this.x < -20 || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
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
        const angle =
          (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;
        this.applyMouse();
      }

      updateWings() {
        const sign = this.side === 'left' ? -1 : 1;
        const nx = this.x / Math.max(width, 1);
        const ny = this.y / Math.max(height, 1);

        // Organic noise — slight per-particle variance so wings are not mirrored clones.
        const noise =
          Math.cos((this.x + this.seed * 140) * 0.0042) +
          Math.sin((this.y - this.seed * 90) * 0.0048);

        // Primary flow: outward + upward along each wing.
        const lift = isMobile ? 0.52 : 0.62;
        const spread = isMobile ? 0.78 : 0.92;
        const baseAngle = -Math.PI * lift + sign * (spread + this.seed * 0.22);
        const flow = baseAngle + noise * 0.35;
        this.vx += Math.cos(flow) * 0.2 * speed;
        this.vy += Math.sin(flow) * 0.2 * speed;

        // Arc bias from lower-center toward the side edges.
        const originX = width * 0.5 + sign * width * (isMobile ? 0.03 : 0.05);
        const originY = height * (isMobile ? 0.64 : 0.7);
        const toEdgeX = this.x - originX;
        const toEdgeY = this.y - originY;
        const dist = Math.sqrt(toEdgeX * toEdgeX + toEdgeY * toEdgeY) || 1;
        this.vx += (toEdgeX / dist) * 0.05 * speed;
        this.vy += (toEdgeY / dist) * 0.02 * speed - 0.035 * speed;

        // Hard side lock — keep each particle in its wing hemisphere.
        const mid = width * 0.5;
        if (this.side === 'left' && this.x > mid - width * 0.02) {
          this.vx -= 0.35 * speed;
        }
        if (this.side === 'right' && this.x < mid + width * 0.02) {
          this.vx += 0.35 * speed;
        }

        // Keep a clean center corridor behind the headline / copy.
        const corridor = isMobile ? width * 0.18 : width * 0.16;
        const dx = this.x - mid;
        if (Math.abs(dx) < corridor && ny < 0.7) {
          this.vx += Math.sign(dx || sign) * 0.42 * speed;
          this.vy += 0.06 * speed;
        }

        // Prefer denser motion in the lower band.
        if (ny < 0.4) this.vy += 0.06 * speed;

        this.applyMouse();
      }

      applyMouse() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const interactionRadius = isMobile ? 160 : 260;

        if (distance > 0 && distance < interactionRadius) {
          const force = (interactionRadius - distance) / interactionRadius;
          this.vx += (-dy / distance) * force * 0.22;
          this.vy += (dx / distance) * force * 0.22;
          this.vx -= (dx / distance) * force * 0.06;
          this.vy -= (dy / distance) * force * 0.06;
        }
      }

      reset(initial = false) {
        this.vx = 0;
        this.vy = 0;
        this.age = initial ? Math.random() * 100 : 0;
        this.life = Math.random() * 220 + 110;
        this.size = isMobile ? 1.25 + Math.random() * 0.55 : 1.45 + Math.random() * 0.7;
        this.seed = Math.random();

        if (layout !== 'wings') {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          return;
        }

        // Slight right bias so both wings read equally (left trails linger more).
        this.side = this.seed < 0.42 ? 'left' : 'right';
        const sign = this.side === 'left' ? -1 : 1;
        const t = Math.pow(Math.random(), 0.6);

        if (isMobile) {
          // U / V frame from lower-center outward.
          const originX = width * 0.5 + sign * width * (0.04 + this.seed * 0.04);
          const originY = height * (0.56 + Math.random() * 0.36);
          this.x = originX + sign * (width * 0.08 + t * width * 0.4);
          this.y = originY - t * height * (0.36 + this.seed * 0.12) + (Math.random() - 0.5) * height * 0.04;
        } else {
          // Broad elegant wings: strongest in lower 30–45%, curving to side edges.
          const originX = width * 0.5 + sign * width * (0.08 + this.seed * 0.05);
          const originY = height * (0.52 + Math.random() * 0.4);
          this.x =
            originX +
            sign * (width * 0.06 + t * width * (0.4 + this.seed * 0.12)) +
            (Math.random() - 0.5) * width * 0.03;
          this.y =
            originY -
            t * height * (0.4 + this.seed * 0.14) +
            (Math.random() - 0.5) * height * 0.05;
        }

        // Guarantee hemisphere ownership.
        if (this.side === 'left') this.x = Math.min(this.x, width * 0.46);
        if (this.side === 'right') this.x = Math.max(this.x, width * 0.54);
      }

      draw(context: CanvasRenderingContext2D) {
        let alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;

        if (layout === 'wings') {
          const centerDist = Math.abs(this.x - width * 0.5) / Math.max(width * 0.5, 1);
          const yNorm = this.y / Math.max(height, 1);
          // Soften particles that drift into the content corridor.
          if (centerDist < (isMobile ? 0.28 : 0.24) && yNorm < 0.74) {
            alpha *= 0.12 + centerDist * 1.8;
          }
          // Richer presence in the lower wing band.
          if (yNorm > 0.52) alpha *= 1.08;
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

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const count = targetCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgb(${trailColor})`;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      animationFrameId = 0;
      if (!inView || document.hidden) return;
      ctx.globalAlpha = 1;
      ctx.fillStyle = `rgba(${trailColor}, ${trailOpacity})`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduced.matches) p.update();
        p.draw(ctx);
      }

      if (!reduced.matches) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        init();
        if (reduced.matches) {
          // One static frame for reduced-motion users.
          ctx.globalAlpha = 1;
          ctx.fillStyle = `rgb(${trailColor})`;
          ctx.fillRect(0, 0, width, height);
          particles.forEach((p) => p.draw(ctx));
        }
      }, 80);
    };

    const handleMouseMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    init();
    const resume = () => {
      if (inView && !document.hidden && !animationFrameId && !reduced.matches) animate();
    };
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView && reduced.matches) {
        ctx.globalAlpha = 1;
        ctx.fillStyle = `rgb(${trailColor})`;
        ctx.fillRect(0, 0, width, height);
        particles.forEach((p) => p.draw(ctx));
      } else {
        resume();
      }
    });
    visibility.observe(container);
    document.addEventListener('visibilitychange', resume);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    window.addEventListener('pointermove', handleMouseMove, { passive: true });

    if (reduced.matches) {
      particles.forEach((p) => p.draw(ctx));
    } else {
      resume();
    }

    return () => {
      visibility.disconnect();
      document.removeEventListener('visibilitychange', resume);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      window.removeEventListener('pointermove', handleMouseMove);
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
