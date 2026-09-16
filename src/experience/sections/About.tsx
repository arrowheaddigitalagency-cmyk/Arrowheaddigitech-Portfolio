'use client';

import {
  Plus,
  Code2,
  LayoutTemplate,
  Sparkles,
  PanelTop,
  Megaphone,
  Share2,
  Search,
  ShoppingBag,
  Bot,
  Settings2,
  Linkedin,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leaders, team, milestones, legacyServices, processSteps } from '../../data/portfolio';
import { SectionLabel } from './shared';

const serviceIcons: Record<string, LucideIcon> = {
  Code2,
  LayoutTemplate,
  Sparkles,
  PanelTop,
  Megaphone,
  Share2,
  Search,
  ShoppingBag,
  Bot,
  Settings2,
};
const achievements: [string, string][] = [
  ['14', 'Featured collaborations'],
  ['4', 'Core development stacks'],
  ['2', 'Connected disciplines'],
  ['1', 'Team from build to growth'],
];

/** Why Arrowhead — proof, process, testimonials, team and history. */
export default function About() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const touch = window.matchMedia('(pointer: coarse)').matches;
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.about-reading p').forEach(p => {
          gsap.fromTo(p.children, { opacity: .24 }, {
            opacity: 1,
            stagger: .08,
            ease: 'none',
            scrollTrigger: {
              trigger: p,
              start: 'top 80%',
              end: 'bottom 55%',
              scrub: touch ? 0.9 : 0.5,
            },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <section id="about" className="about-section section-shell" ref={root}>
      <SectionLabel number="08">WHY ARROWHEAD</SectionLabel>
      <div className="about-editorial">
        <div className="about-editorial-heading"><h2>Your ambition.<br /><span>Our shared obsession.</span></h2><span className="about-chapter-note">ONE TEAM. THE WHOLE PICTURE.</span><a href="#contact">Let’s build something meaningful ↗</a></div>
        <div className="about-readings">{[
          ['01 / A SHARED DIRECTION', 'We start with the people behind the product. Your customers, your team and the challenge you want to solve. Understanding comes before a single line of code.'],
          ['02 / CONNECTED THINKING', 'Design, engineering and marketing belong in the same conversation. We connect the experience people see with the systems they rely on and the story that brings them to you.'],
          ['03 / BUILT TOGETHER', 'From the first idea to the next release, you work with a team that sees the whole picture. Clear conversations. Considered decisions. Shared care for the details that make a difference.'],
        ].map(([label, text]) => <article className="about-reading" key={label}><span>{label}</span><p>{text.split(' ').map((word, i) => <span key={i}>{word} </span>)}</p></article>)}</div>
      </div>

      <div className="proof-board">
        <div id="achievements" className="proof-strip">
          {achievements.map(([number, label]) => (
            <div key={label} className="proof-stat">
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div id="process" className="proof-process">
          <p className="proof-process-label">HOW WE WORK</p>
          <div className="proof-process-track">
            {processSteps.map((step, index) => (
              <article key={step.id} className="proof-step">
                <div className="proof-step-head">
                  <span className="proof-step-num">{step.id}</span>
                  {index < processSteps.length - 1 && <i className="proof-step-line" aria-hidden="true" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.tagline}</p>
                <details>
                  <summary>
                    What to expect <Plus size={14} />
                  </summary>
                  <p>{step.description}</p>
                  <ul>
                    {step.deliverables.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </details>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="studio-manifesto"><span>THE ARROWHEAD APPROACH</span><p>Your developer should understand your marketing.<br/>Your marketer should understand your product.<br/><em>Here, they sit at the same table.</em></p><a href="#contact">Meet your next digital partner ↗</a></div>

      <details className="company-details" id="team">
        <summary><span>The people behind the systems</span><Plus size={20} /></summary>
        <div className="leader">
          <div>
            <p className="eyebrow">{leaders[0].role}</p>
            <h3>{leaders[0].name}</h3>
            {leaders[0].linkedin && (
              <a
                className="leader-linkedin"
                href={leaders[0].linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Linkedin size={15} strokeWidth={1.8} />
              </a>
            )}
          </div>
          <p>{leaders[0].bio}</p>
        </div>
        <div className="team-grid">
          {team.map(person => (
            <div key={person.name} className="team-card">
              {person.photo ? (
                <img
                  className="team-photo"
                  src={person.photo}
                  alt={person.name}
                  width={196}
                  height={196}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <span className="team-initials" style={{ borderColor: person.accent, color: person.accent }}>
                  {person.initials}
                </span>
              )}
              <h4>{person.name}</h4>
              <p>{person.role}</p>
              <small>{person.focus}</small>
            </div>
          ))}
        </div>
      </details>

      <details className="company-details">
        <summary><span>A decade of building what&rsquo;s next</span><Plus size={20} /></summary>
        <div className="history-grid">
          {milestones.map(item => (
            <div key={item.year}><span>{item.year}</span><h3>{item.title}</h3><p>{item.body}</p></div>
          ))}
        </div>
      </details>

      <details className="company-details">
        <summary><span>Explore our full service capabilities</span><Plus size={20} /></summary>
        <div className="legacy-services">
          {legacyServices.map(service => {
            const Icon = serviceIcons[service.icon] ?? Code2;
            return (
              <article key={service.id} className="service-card">
                <div className="service-icon" style={{ color: service.color, borderColor: `${service.color}44`, background: `${service.color}14` }}>
                  <Icon size={28} strokeWidth={1.6} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
              </article>
            );
          })}
        </div>
      </details>
    </section>
  );
}
