'use client';

import { ArrowUpRight, Plus } from 'lucide-react';
import { SectionLabel } from './shared';

const growthServices: [string, string, string][] = [
  ['01', 'Performance marketing', 'Google Ads and Meta Ads. Search, display, audience strategy, creative testing and conversion-focused landing pages.'],
  ['02', 'Search & discovery', 'Technical SEO, local SEO, content strategy and GEO / AI search optimization to improve how your business is discovered.'],
  ['03', 'Brand, social & creative', 'Social media strategy, premium creatives, brand identity and video production that make your product worth paying attention to.'],
  ['04', 'Commerce & optimization', 'WordPress, Shopify and WooCommerce development, website management, A/B testing and ongoing performance improvement.'],
];

/** The growth engine — performance marketing, search, brand and commerce. */
export default function Growth() {
  return (
    <section id="growth" className="growth-section section-shell">
      <div className="growth-intro reveal">
        <SectionLabel number="07">THE GROWTH ENGINE</SectionLabel>
        <h2>We build the product.<br /><span>Then build its momentum.</span></h2>
        <p>Engineering gets you to market. A connected growth strategy helps you own your place in it.</p>
        <a href="#contact" className="text-button">Let&rsquo;s grow your business <ArrowUpRight size={18} /></a>
        <div className="growth-orbit" aria-hidden="true"><span>PRODUCT</span><i /><span>REACH</span><i /><span>REVENUE</span></div>
      </div>
      <div className="growth-services">
        {growthServices.map(([num, title, text], index) => (
          <details key={num} open={index === 0}>
            <summary>
              <span>{num}</span>
              <h3>{title}</h3>
              <Plus size={18} />
            </summary>
            <p>{text}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
