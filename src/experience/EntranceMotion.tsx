'use client';

import { useEffect, useRef } from 'react';

/** Original artwork stays in a responsive picture; only the particles repaint. */
export default function EntranceMotion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const host = canvas.parentElement!;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const portrait = matchMedia('(max-aspect-ratio: 4/5)');
    let frame = 0, last = 0, elapsed = 0, visible = true;
    let width = 1440, height = 960;
    let mouse = { x: -1000, y: -1000 };
    const colors = ['#087eff', '#ff7824', '#f3372e'];
    let particles: {x:number;y:number;bx:number;by:number;vx:number;vy:number;phase:number;size:number;color:string;alpha:number}[] = [];
    function resize() {
      const mobile = portrait.matches;
      width = mobile ? 900 : 1440; height = mobile ? 1600 : 960;
      const box = host.getBoundingClientRect();
      const scale = Math.min(box.width / width, box.height / height);
      const w = width * scale, h = height * scale;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx!.setTransform(canvas.width / width, 0, 0, canvas.height / height, 0, 0);
      let seed = 22;
      const rand = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
      particles = Array.from({length: mobile ? 1200 : 2300}, (_, i) => {
        const side = i % 2 ? -1 : 1, u = rand();
        const spread = (rand() - .5) * (25 + (mobile ? 85 : 100) * u);
        const x = mobile ? 450 + side * (142 + u * 290) : 720 + side * (112 + u * 520);
        const y = (mobile ? 600 - 250 * u : 365 - 130 * u) + Math.sin(u * 8) * 38 + spread;
        return {x,y,bx:x,by:y,vx:0,vy:0,phase:rand()*6.28,size:.6+rand()*1.45,color:colors[i%3],alpha:.3+rand()*.65};
      });
      restart();
    }
    function draw(now: number) {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) { ctx!.clearRect(0,0,width,height); last = 0; return; }
      const dt = last ? Math.min((now-last)/16.667, 2) : 1;
      last = now; elapsed += dt / 60;
      ctx!.clearRect(0,0,width,height);
      for (const p of particles) {
        const dx=p.x-mouse.x, dy=p.y-mouse.y, dist=Math.hypot(dx,dy);
        if(dist<150 && dist>.1) { const force=(1-dist/150)*2.8*dt; p.vx+=dx/dist*force; p.vy+=dy/dist*force; }
        p.vx+=(p.bx+Math.sin(elapsed*.8+p.phase)*7-p.x)*.012*dt;
        p.vy+=(p.by+Math.cos(elapsed+p.phase)*9-p.y)*.012*dt;
        p.vx*=Math.pow(.9,dt); p.vy*=Math.pow(.9,dt); p.x+=p.vx*dt; p.y+=p.vy*dt;
        ctx!.globalAlpha=p.alpha; ctx!.fillStyle=p.color;
        ctx!.beginPath(); ctx!.arc(p.x,p.y,p.size,0,Math.PI*2); ctx!.fill();
      }
      const mobile=portrait.matches;
      for(let i=0;i<10;i++) {
        const a=i*.58+elapsed*.09;
        const x=(mobile?450:720)+(mobile?410:540)*Math.cos(a);
        const y=(mobile?540:410)+(mobile?510:480)*Math.sin(a);
        if(y>(mobile?760:610)) continue;
        const glow=ctx!.createRadialGradient(x,y,0,x,y,13);
        glow.addColorStop(0,colors[i%3]);glow.addColorStop(1,'transparent');
        ctx!.globalAlpha=.55;ctx!.fillStyle=glow;ctx!.fillRect(x-13,y-13,26,26);
        ctx!.fillStyle=colors[i%3];ctx!.beginPath();ctx!.arc(x,y,2.6,0,7);ctx!.fill();
      }
      ctx!.globalAlpha=1;
      frame=requestAnimationFrame(draw);
    }
    function restart() { cancelAnimationFrame(frame); last=0; frame=requestAnimationFrame(draw); }
    const move=(event:PointerEvent)=>{const r=canvas.getBoundingClientRect();mouse={x:(event.clientX-r.left)*width/r.width,y:(event.clientY-r.top)*height/r.height};};
    const leave=()=>{mouse={x:-1000,y:-1000};};
    const activity=(event:Event)=>{visible=(event as CustomEvent<boolean>).detail;restart();};
    const observer=new ResizeObserver(resize);observer.observe(host);
    host.addEventListener('pointermove',move);host.addEventListener('pointerleave',leave);
    window.addEventListener('entrance-active',activity);
    document.addEventListener('visibilitychange',restart);reduced.addEventListener('change',restart);
    return()=>{cancelAnimationFrame(frame);observer.disconnect();host.removeEventListener('pointermove',move);host.removeEventListener('pointerleave',leave);window.removeEventListener('entrance-active',activity);document.removeEventListener('visibilitychange',restart);reduced.removeEventListener('change',restart);};
  }, []);
  return <div className="entrance-artwork">
    <div className="entrance-backdrop" aria-hidden="true"><i /><i /><i /></div>
    <picture><source media="(max-aspect-ratio: 4/5)" srcSet="/entrance/mobile.jpg" /><img src="/entrance/desktop.jpg" alt="Arrowhead DigiTech. Digital growth. Technology. Results. Marketing, Technology, AI and Automation. Portfolio 2026." fetchPriority="high" /></picture>
    <canvas ref={canvasRef} aria-hidden="true" />
    <a className="entrance-enter" href="#home" aria-label="Enter Arrowhead portfolio" />
  </div>;
}
