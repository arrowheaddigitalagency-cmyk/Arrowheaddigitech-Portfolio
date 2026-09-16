import { ArrowUpRight, ArrowUp, Linkedin } from 'lucide-react';

export default function Footer() {
  return <footer className="studio-footer">
    <div className="footer-invitation"><p>GOOD PEOPLE. AMBITIOUS IDEAS.</p><a href="#contact">Let’s make<br/><span>the next move.</span><ArrowUpRight aria-hidden="true"/></a></div>
    <div className="footer-directory">
      <div className="footer-signoff"><a className="brand" href="#home" aria-label="Arrowhead DigiTech home"><img src="/arrowhead-mark.png" alt="" width={31} height={38}/><span>arrowhead<span className="brand-sub">DIGITECH</span></span></a><p>Independent minds.<br/>One connected digital partner.</p><span className="footer-location"><i/> LAHORE, PK · WORKING EVERYWHERE</span></div>
      <div><h3>Explore</h3><a href="#work">Our work</a><a href="#services">Engineering</a><a href="#growth">Growth & marketing</a><a href="#about">The studio</a></div>
      <div><h3>Let’s connect</h3><a href="mailto:info@arrowheaddigitech.com">Drop us an email <ArrowUpRight size={15}/></a><a href="tel:+923000955490">+92 300 0955490</a><a href="https://linkedin.com/company/arrowheaddigitech" target="_blank" rel="noopener noreferrer">LinkedIn <Linkedin size={14}/></a></div>
      <a className="footer-back" href="#home" aria-label="Back to top"><ArrowUp size={25}/><span>BACK TO TOP</span></a>
    </div>
    <div className="footer-colophon"><span>© {new Date().getFullYear()} Arrowhead DigiTech</span><span>BUILT WITH INTENTION. ALWAYS.</span><span>SOFTWARE × DESIGN × GROWTH</span></div>
    <a className="footer-full-wordmark" href="#home" aria-label="Arrowhead — back to home">arrowhead<span>↗</span></a>
  </footer>;
}
