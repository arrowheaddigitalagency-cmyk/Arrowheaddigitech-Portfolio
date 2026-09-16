'use client';
import { clientProjects } from '../../data/client-projects';
export default function Clients(){return <section className="client-strip" aria-label="Our clients"><p>GOOD COMPANY.<br/><span>GREAT COLLABORATIONS.</span></p><div className="client-marquee"><div className="client-marquee-track">{[0,1].map(copy=><div className="client-name-group" key={copy} aria-hidden={copy===1}>{clientProjects.map(p=><span key={p.id}>{p.client}<i>✳</i></span>)}</div>)}</div></div></section>;}
