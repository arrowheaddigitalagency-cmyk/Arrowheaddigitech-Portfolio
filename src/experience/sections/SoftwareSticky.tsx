'use client';

import { useEffect, useRef, useState } from 'react';
import { Cpu, GitBranch, Layers3, Plus, ShieldCheck, Smartphone, Workflow } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionLabel } from './shared';

const layers = [
  { name: 'MERN Core', title: 'One stack, built to scale.', text: 'MongoDB, Express, React and Node — a proven core we tune for every product, from marketplaces to internal operating systems.', tags: ['MongoDB', 'Express / Node.js', 'React'], icon: Layers3 },
  { name: 'Multi-Tenant', title: 'One codebase. Every client isolated.', text: 'Tenant-aware data models, roles and permissions so new customers, teams or locations onboard onto the same platform without a single line of new code.', tags: ['Tenant isolation', 'Role-based access', 'Shared codebase'], icon: GitBranch },
  { name: 'APIs', title: 'Clean contracts, connected systems.', text: 'REST and GraphQL cores that let your web app, mobile app, partners and automations all speak the same language, reliably.', tags: ['REST & GraphQL', 'Webhooks', 'Third-party integrations'], icon: Workflow },
  { name: 'Flutter', title: 'One codebase. Every screen.', text: 'Flutter mobile experiences that share logic with the web platform and ship to iOS and Android from a single team, in parallel.', tags: ['iOS & Android', 'Shared business logic', 'Native performance'], icon: Smartphone },
  { name: 'Deploy', title: 'Shipped. Monitored. Always on.', text: 'VPS and Linux-based deployment pipelines, CI/CD and uptime monitoring so your platform stays reliable as usage — and the team — grows.', tags: ['VPS / Linux', 'CI/CD pipelines', 'Uptime monitoring'], icon: ShieldCheck },
];

/** Sticky editorial chapter that scrubs through the software layers we build
 * on: MERN core, multi-tenancy, APIs, Flutter mobile, and deployment. */
export default function SoftwareSticky() {
  const sectionRef = useRef<HTMLElement>(null);
  const [layer, setLayer] = useState(0);
  const capability = layers[layer];
  const CapabilityIcon = capability.icon;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const scope = sectionRef.current ?? undefined;

    media.add('(min-width: 1000px) and (min-height: 800px) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        ScrollTrigger.create({
          trigger: '.software-sticky',
          start: 'top 80px',
          end: `+=${layers.length * 360}`,
          pin: '.software-sticky-inner',
          scrub: true,
          anticipatePin: 1,
          onUpdate: self => setLayer(Math.min(layers.length - 1, Math.floor(self.progress * layers.length))),
        });
        gsap.from('.signal-card', { y: 28, opacity: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.signal-grid', start: 'top 85%', once: true } });
        gsap.from('.platform-panel', { y: 28, opacity: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: '.platform-mosaic', start: 'top 82%', once: true } });
      }, scope);
      return () => context.revert();
    });

    return () => {
      media.revert();
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <section id="services" className="engineering software-sticky section-shell">
        <div className="engineering-inner software-sticky-inner">
          <SectionLabel number="02">WHAT WE ENGINEER</SectionLabel>
          <div className="section-heading">
            <h2>Software, engineered<br /><span>from the core out.</span></h2>
            <p>A single MERN foundation, made multi-tenant, connected by APIs,<br />shipped to mobile with Flutter, and deployed to stay online.</p>
          </div>
          <div className="engineering-layout">
            <div className="layer-tabs" aria-label="Software capabilities">
              {layers.map((item, i) => (
                <button key={item.name} className={i === layer ? 'active' : ''} aria-pressed={i === layer} onClick={() => setLayer(i)}>
                  <span className="mono">0{i + 1}</span>{item.name}
                </button>
              ))}
            </div>
            <div className="layer-detail" key={layer}>
              <div className="architecture" aria-hidden="true">
                <div className="architecture-lines" />
                <span className="arch-node node-a">INPUT</span>
                <span className="arch-node node-b">API</span>
                <span className="arch-node node-c">OUTPUT</span>
                <span className="arch-core"><CapabilityIcon size={48} strokeWidth={1} /></span>
                <span className="arch-orbit" />
                <span className="arch-orbit second" />
                <span className="arch-code">ARW / {capability.name.toUpperCase()}<br />CONNECTED SYSTEM LAYER</span>
              </div>
              <p className="eyebrow">LAYER 0{layer + 1} / {capability.name.toUpperCase()}</p>
              <h3>{capability.title}</h3>
              <p>{capability.text}</p>
              <p className="layer-detail-list">{capability.tags.join('  ·  ')}</p>
            </div>
          </div>
          <div className="layer-progress">
            {layers.map((item, i) => <span key={item.name} className={i <= layer ? 'filled' : ''} />)}
            <small>EXPLORE THE STACK</small>
          </div>
        </div>
      </section>

      <section id="ai" className="ai-section section-shell">
        <div className="reveal">
          <SectionLabel number="03">AI &amp; AUTOMATION</SectionLabel>
          <div className="section-heading">
            <h2>Intelligence.<br /><span>Put to work.</span></h2>
            <p>AI that belongs in your workflow — connected to knowledge, tools, and the decisions that move revenue.</p>
          </div>
        </div>
        <div className="signal-grid">
          {[
            { icon: Cpu, title: 'Agents with context', text: 'Business-aware assistants, knowledge retrieval, and lead qualification grounded in your data.' },
            { icon: Workflow, title: 'Workflows without friction', text: 'CRM updates, API integrations, and coordinated actions across the tools your teams already use.' },
            { icon: ShieldCheck, title: 'Control by design', text: 'Permissions, review checkpoints, and visibility into every decision that matters.' },
          ].map(item => {
            const Icon = item.icon;
            return <article key={item.title} className="signal-card"><Icon size={26} strokeWidth={1.25} /><h3>{item.title}</h3><p>{item.text}</p></article>;
          })}
        </div>
        <div className="signal-flow" aria-hidden="true">
          <span>Signal in</span><i /><span>Reason</span><i /><span>Act</span><i /><span>Human review</span>
        </div>
      </section>

      <section className="platform-section section-shell">
        <div className="reveal">
          <SectionLabel number="04">SOFTWARE / SAAS / DASHBOARDS</SectionLabel>
          <div className="section-heading">
            <h2>Serious systems.<br /><span>Effortless experiences.</span></h2>
            <p>From a single workflow to your entire operation — multi-tenant platforms that feel inevitable to use.</p>
          </div>
        </div>
        <div className="platform-mosaic">
          {[
            { k: '01', t: 'Custom software', d: 'Purpose-built systems that encode how your business actually works.' },
            { k: '02', t: 'Multi-tenant SaaS', d: 'Scalable product architecture with isolation, roles, and room to grow.' },
            { k: '03', t: 'Operational CRMs', d: 'Interfaces that make complex information actionable for every team.' },
            { k: '04', t: 'API-first cores', d: 'Clean contracts between web, mobile, partners, and automation.' },
          ].map(item => (
            <article key={item.k} className="platform-panel">
              <span className="mono">{item.k}</span>
              <h3>{item.t}</h3>
              <p>{item.d}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="stack" className="stack-section section-shell">
        <SectionLabel number="05">OUR TECHNOLOGY STACK</SectionLabel>
        <div className="section-heading">
          <h2>The right tools.<br /><span>Without the limits.</span></h2>
          <p>Chosen for your product, your team and your scale.</p>
        </div>
        <div className="stack-grid">
          {[
            ['INTERFACES', 'Next.js', 'React', 'TypeScript', 'Flutter'],
            ['SYSTEMS & DATA', 'Node.js', 'MongoDB', 'PostgreSQL', 'REST / GraphQL'],
            ['AI & AUTOMATION', 'AI agents', 'LLM integrations', 'Knowledge retrieval', 'Workflow automation'],
            ['DEPLOY & COMMERCE', 'VPS / Linux', 'CI/CD', 'WordPress', 'WooCommerce / Shopify'],
          ].map(([title, ...items]) => (
            <div key={title}>
              <p className="eyebrow">{title}</p>
              {items.map(item => <span key={item}>{item}<Plus size={13} /></span>)}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
