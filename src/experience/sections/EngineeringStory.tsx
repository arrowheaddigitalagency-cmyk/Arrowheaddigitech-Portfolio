'use client';
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowUpRight, Atom, Blocks, Bot, Braces, BrainCircuit, CircuitBoard, Cloud, Code2, Container, Database, GitBranch, Globe2, Layers3, Linkedin, Network, Server, ShieldCheck, ShoppingBag, Smartphone, Workflow } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { leaders } from '../../data/portfolio';
import { SectionLabel } from './shared';
const Machine = dynamic(() => import('../EngineeringMachine'), { ssr: false });
class MachineBoundary extends React.Component<{children:React.ReactNode},{failed:boolean}> {
 state={failed:false}; static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?<div className="machine-static"><Layers3 size={92} strokeWidth={.6}/></div>:this.props.children;}
}
const engineering = [
 {label:'THE FOUNDATION',title:'One powerful core.\nBuilt around you.',text:'Custom MERN and Next.js platforms, shaped around the way your business actually works. From the first interface to the last API.',icon:Layers3,code:'01 / ENGINEER'},
 {label:'CONNECTED BY DESIGN',title:'Many moving parts.\nOne connected system.',text:'Multi-tenant architecture, permissions and APIs that connect your customers, teams and operations without adding friction.',icon:Network,code:'02 / CONNECT'},
 {label:'BEYOND THE BROWSER',title:'Every screen.\nThe same ambition.',text:'Web experiences and Flutter applications for iOS and Android. One product vision, thoughtfully delivered across devices.',icon:Smartphone,code:'03 / EXTEND'},
 {label:'READY FOR THE REAL WORLD',title:'A strong launch.\nRoom to keep growing.',text:'VPS infrastructure, deployment pipelines and ongoing care. The foundations your product needs for its next chapter.',icon:Server,code:'04 / DEPLOY'},
];
const intelligence = [
 {label:'CONTEXT FIRST',title:'AI that knows\nyour business.',text:'Chatbots and AI assistants connected to your knowledge, services and workflows. Useful answers with a clear purpose.',icon:BrainCircuit,code:'05 / UNDERSTAND'},
 {label:'LESS REPETITION',title:'Let the busywork\nhandle itself.',text:'Connect the tools you already use. Route inquiries, update records and coordinate repeatable tasks with practical automations.',icon:Workflow,code:'06 / AUTOMATE'},
 {label:'HUMAN BY DESIGN',title:'More intelligence.\nYou stay in control.',text:'Review checkpoints, clear permissions and visibility into the work. Automation that supports the people behind the business.',icon:ShieldCheck,code:'07 / REVIEW'},
];
const allSteps=[...engineering,...intelligence];
const narratives=[
 {label:'THE OPPORTUNITY',text:'Your business has its own way of working. Your software should understand it. We turn the daily complexity of teams, customers and operations into clear, useful digital experiences.'},
 {label:'THE CONNECTION',text:'A website is only the beginning. We connect your platform, dashboards, mobile apps and automations around a shared foundation. Every part works together, so your team can too.'},
 {label:'THE LONG VIEW',text:'Built for the next chapter, not just launch day. Thoughtful architecture, considered design and a team that sees the whole picture. Software that can evolve as your ambition grows.'},
];
const stackGroups=[
 {title:'INTERFACES',icon:Code2,items:[{name:'Next.js',icon:Globe2},{name:'React',icon:Atom},{name:'TypeScript',icon:Braces},{name:'Flutter',icon:Smartphone}]},
 {title:'SYSTEMS & DATA',icon:Database,items:[{name:'Node.js',icon:Container},{name:'MongoDB',icon:Database},{name:'PostgreSQL',icon:Server},{name:'REST / GraphQL',icon:Network}]},
 {title:'AI & AUTOMATION',icon:BrainCircuit,items:[{name:'AI agents',icon:Bot},{name:'LLM integrations',icon:BrainCircuit},{name:'Knowledge retrieval',icon:Blocks},{name:'Workflow automation',icon:Workflow}]},
 {title:'DEPLOY & COMMERCE',icon:Cloud,items:[{name:'VPS / Linux',icon:Cloud},{name:'CI/CD',icon:GitBranch},{name:'WordPress',icon:Globe2},{name:'WooCommerce / Shopify',icon:ShoppingBag}]},
];
export default function EngineeringStory(){
 const root=useRef<HTMLDivElement>(null),journey=useRef<HTMLElement>(null),progress=useRef(0);
 const [active,setActive]=useState(0),[enable3D,setEnable3D]=useState(false);
 const ActiveIcon=allSteps[active].icon;
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setEnable3D(!reduced.matches);update();reduced.addEventListener('change',update);
  gsap.registerPlugin(ScrollTrigger);const media=gsap.matchMedia();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting)setActive(Number((entry.target as HTMLElement).dataset.step));},{rootMargin:'-28% 0px -42% 0px'});
  root.current?.querySelectorAll('[data-step]').forEach(el=>observer.observe(el));
  media.add('(prefers-reduced-motion: no-preference)',()=>{
   const touch=window.matchMedia('(pointer: coarse)').matches;
   const scrubMain=touch?1.1:.75;
   const scrubText=touch:.85:.45;
   const ctx=gsap.context(()=>{
    gsap.to(progress,{current:1,ease:'none',scrollTrigger:{trigger:journey.current,start:'top 70%',end:'bottom 30%',scrub:scrubMain}});
    gsap.utils.toArray<HTMLElement>('.reading-text').forEach(p=>gsap.fromTo(p.querySelectorAll('.reading-word'),{opacity:.19},{opacity:1,stagger:.075,ease:'none',scrollTrigger:{trigger:p,start:'top 78%',end:'bottom 47%',scrub:scrubText}}));
    gsap.fromTo('.founder-statement',{y:45,opacity:.3},{y:0,opacity:1,scrollTrigger:{trigger:'.founder-statement',start:'top 85%',end:'top 35%',scrub:scrubMain}});
   },root);return()=>ctx.revert();
  });return()=>{media.revert();observer.disconnect();reduced.removeEventListener('change',update);};
 },[]);
 function renderStep(step:typeof allSteps[number],index:number){return <article className={`journey-step ${active===index?'is-active':''}`} data-step={index} key={step.label}><span className="journey-step-label"><i/>{step.label}</span><div className="journey-step-copy"><h3>{step.title.split('\n').map((line,i)=><React.Fragment key={line}>{i>0&&<br/>}{line}</React.Fragment>)}</h3><p>{step.text}</p></div></article>;}
 return <div className="refined-sections" ref={root}>
  <section className="engineering-journey" id="services" ref={journey}><div className="journey-gridlines" aria-hidden="true"/><div className="journey-layout"><div className="journey-story">
   <div className="journey-title"><SectionLabel number="02">WHAT WE ENGINEER</SectionLabel><h2>The architecture<br/>of <span>what’s next.</span></h2><p>Built with precision.<br/>Connected by possibility.</p></div>
   {engineering.map(renderStep)}
   <div id="ai" className="journey-title journey-title-ai"><SectionLabel number="03">AI &amp; AUTOMATION</SectionLabel><h2>Intelligence.<br/><span>In motion.</span></h2><p>A little less friction.<br/>A lot more possibility.</p></div>
   <div className="journey-ai-steps">{intelligence.map((step,i)=>renderStep(step,i+engineering.length))}</div>
  </div><div className={`journey-visual ${active>=4?'is-intelligent':''}`} aria-hidden="true"><div className="machine-coordinate"><span>ARW — ENGINEERING CORE</span><span>0{active+1} / 07</span></div><div className="machine-canvas">{enable3D?<MachineBoundary><Machine progress={progress}/></MachineBoundary>:<div className="machine-static"><Layers3 size={100} strokeWidth={.7}/></div>}<div className="machine-symbol" key={active}><ActiveIcon strokeWidth={1}/></div></div><div className="machine-caption"><span className="machine-status"/>{allSteps[active].code}<span>SCROLL TO EXPLORE ↓</span></div></div></div>
  <div className="journey-outro"><CircuitBoard size={30} strokeWidth={1}/><p>Complex underneath.<br/><span>Effortless on the surface.</span></p><a href="#contact">Build with us <ArrowUpRight size={18}/></a></div></section>
  <section className="platform-narrative" id="platforms"><div className="narrative-heading"><SectionLabel number="04">SOFTWARE / SAAS / DASHBOARDS</SectionLabel><h2>Made for your business.<br/><span>Ready for what’s next.</span></h2></div>
   <div className="narrative-body"><div className="reading-rail" aria-hidden="true"><span>THE THINKING<br/>BEHIND THE BUILD</span><i/><span>01 — 03</span></div><div className="reading-chapters">{narratives.map((chapter,i)=><article className="reading-chapter" key={chapter.label}><span className="reading-label"><i>0{i+1}</i>{chapter.label}</span><p className="reading-text">{chapter.text.split(' ').map((word,index)=><span className="reading-word" key={index}>{word}{' '}</span>)}</p></article>)}</div></div>
   <div className="founder-statement"><span className="founder-quote-mark" aria-hidden="true">“</span><div className="founder-message"><p className="eyebrow">A NOTE FROM OUR FOUNDER</p><blockquote>Great work starts with understanding what matters to you. Our role is to bring the right people, technology and thinking together — and build something we can both be proud of.</blockquote><div className="founder-signature"><span>{leaders[0].name}</span><small>FOUNDER &amp; CEO · ARROWHEAD DIGITECH</small></div></div><div className="founder-monogram"><a className="founder-portrait" href={leaders[0].linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${leaders[0].name} on LinkedIn`}><img src={leaders[0].photo ?? '/images/waseeq-portrait.jpg'} alt={`${leaders[0].name}, Founder & CEO`} width={480} height={600} loading="lazy" decoding="async" /><span className="founder-linkedin" aria-hidden="true"><Linkedin size={18} strokeWidth={1.8} /></span></a><small>VISION INTO<br/>SOMETHING REAL.</small></div></div>
  </section>
  <section className="technology-section" id="stack"><SectionLabel number="05">OUR TECHNOLOGY STACK</SectionLabel><div className="technology-heading"><h2>The right tools.<br/><span>Without the limits.</span></h2><p>Chosen for your product,<br/>your team and your scale.</p></div><div className="technology-grid">{stackGroups.map((group,index)=>{const Icon=group.icon;return <div className={`technology-column tech-${index}`} key={group.title}><div className="technology-sculpture" aria-hidden="true"><i/><i/><span><Icon size={46} strokeWidth={1.2}/></span></div><h3>{group.title}</h3>{group.items.map(item=>{const ItemIcon=item.icon;return <div className="technology-row" key={item.name}><ItemIcon size={20} strokeWidth={1.5}/><span>{item.name}</span><span className="technology-plus" aria-hidden="true">+</span></div>;})}</div>;})}</div></section>
 </div>;
}
