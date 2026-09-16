'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SectionLabel } from './shared';

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    setStatus('sending');
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-heading"><div><p className="form-kicker">A GOOD CONVERSATION STARTS HERE</p><h3>Tell us about your idea.</h3></div><ArrowUpRight size={25} /></div>
      <p className="form-step"><span>01</span> A little about you</p>
      <div className="form-pair">
        <label>Your name<input name="name" autoComplete="name" placeholder="Alex Morgan" required maxLength={100} /></label>
        <label>Work email<input name="email" autoComplete="email" type="email" placeholder="alex@company.com" required maxLength={254} /></label>
      </div>
      <p className="form-step"><span>02</span> The opportunity</p>
      <div className="form-pair">
        <label>
          What are we building?
          <select name="service" defaultValue="Digital product / SaaS" required>
            <option value="Digital product / SaaS">Digital product / SaaS</option>
            <option value="AI agents & automation">AI agents &amp; automation</option>
            <option value="Mobile application">Mobile application</option>
            <option value="Dashboard / CRM">Dashboard / CRM</option>
            <option value="Website / e-commerce">Website / e-commerce</option>
            <option value="Growth & marketing">Growth &amp; marketing</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Project budget
          <select name="budget" defaultValue="Let's discuss" required>
            <option value="Let's discuss">Let&rsquo;s discuss</option>
            <option value="Under $5,000">Under $5,000</option>
            <option value="$5,000–$15,000">$5,000–$15,000</option>
            <option value="$15,000–$50,000">$15,000–$50,000</option>
            <option value="$50,000+">$50,000+</option>
          </select>
        </label>
      </div>
      <label>Phone <span className="muted">(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="+1 234 567 8900" maxLength={40} /></label>
      <label>A little about your vision<textarea name="message" required rows={3} maxLength={5000} placeholder="The problem, the possibility, and where you want to go." /></label>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your brief…' : 'Send your project brief'}<ArrowUpRight size={18} /></button>
      <p className="form-status" role="status">{status === 'success' ? 'Your brief is with our team. Thank you — we’ll be in touch.' : status === 'error' ? 'We couldn’t send your brief. Please retry or email info@arrowheaddigitech.com.' : 'Your details are used only to respond to your inquiry.'}</p>
    </form>
  );
}

/** Final call-to-action — copy on the left, inquiry form on the right. */
export default function Contact() {
  return (
    <section id="contact" className="contact-section section-shell">
      <div className="contact-copy">
        <SectionLabel number="09">YOUR NEXT CHAPTER</SectionLabel>
        <h2>Have a big<br/>idea?<br/><span>We’re all ears.</span></h2>
        <p>A new product, a smarter system, or your next stage of growth. Bring the ambition. We’ll help shape the way forward.</p>
        <div className="contact-emblem" aria-hidden="true"><span/><span/><ArrowUpRight/></div>
        <a href="mailto:info@arrowheaddigitech.com">info@arrowheaddigitech.com <ArrowUpRight size={17} /></a>
        <a href="tel:+923000955490">+92 300 0955490</a>
        <small>LAHORE, PAKISTAN · WORKING WORLDWIDE</small>
        <div className="contact-next"><span>WHAT HAPPENS NEXT</span><p>We read your brief, understand the opportunity, and start a conversation about the right approach.</p></div>
      </div>
      <ContactForm />
    </section>
  );
}
