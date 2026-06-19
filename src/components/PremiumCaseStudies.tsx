import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, CheckCircle, Globe } from "lucide-react";
import { motion, useInView } from "motion/react";

interface CaseMetric {
  label: string;
  value: number;
  suffix: string;
}

interface CaseStudy {
  id: string;
  client: string;
  brandInfo: string;
  approach: string[];
  results: CaseMetric[];
  image: string;
  device: "macbook" | "iphone";
}

function CountingMetric({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const duration = 2000;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

// MacBook Pro CSS-Only Frame Mockup
function MacBookMockup({ image, alt }: { image: string; alt: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      className="relative w-full max-w-2xl mx-auto cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{
          rotateY: coords.x * 12,
          rotateX: -coords.y * 12,
          scale: isHovered ? 1.02 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="w-full"
      >
        {/* Laptop Screen Bezel */}
        <div className="bg-[#0f0f11] p-[3.2%] rounded-t-2xl border-t border-x border-slate-700 shadow-2xl relative">
          {/* Camera Dot */}
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[8%] h-[2.5%] bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-[2px] h-[2px] rounded-full bg-slate-900" />
          </div>
          {/* Inner Display screen */}
          <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden rounded-md border border-slate-900">
            <img src={image} alt={alt} className="w-full h-full object-cover select-none pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none z-20" />
          </div>
        </div>
        {/* Laptop Base Bezel */}
        <div className="relative h-4 bg-gradient-to-b from-[#4d5257] via-[#212325] to-[#121314] rounded-b-2xl border-b border-x border-slate-900 shadow-2xl flex justify-center">
          <div className="w-[18%] h-[25%] bg-[#080808] rounded-b-md" />
        </div>
      </motion.div>
    </div>
  );
}

// iPhone 15 Pro CSS-Only Frame Mockup
function iPhoneMockup({ image, alt }: { image: string; alt: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setCoords({ x, y });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
      className="relative w-[270px] sm:w-[300px] mx-auto cursor-pointer"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{
          rotateY: coords.x * 15,
          rotateX: -coords.y * 15,
          scale: isHovered ? 1.03 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="w-full bg-[#0d0d0f] border-[9px] border-[#383a3f] rounded-[3.2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] p-2.5 relative aspect-[9/19.5]"
      >
        {/* Ear Piece speaker */}
        <div className="absolute top-[2.2%] left-1/2 -translate-x-1/2 w-[22%] h-[0.8%] bg-black rounded-full z-30" />
        {/* Dynamic Island */}
        <div className="absolute top-[4.2%] left-1/2 -translate-x-1/2 w-[32%] h-[3.2%] bg-black rounded-full z-30 flex items-center justify-end pr-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
        </div>
        {/* Inner Phone Screen Display */}
        <div className="w-full h-full bg-slate-950 overflow-hidden rounded-[2.6rem] relative border border-slate-900">
          <img src={image} alt={alt} className="w-full h-full object-cover select-none pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none z-20" />
        </div>
      </motion.div>
    </div>
  );
}

export default function PremiumCaseStudies() {
  const cases: CaseStudy[] = [
    {
      id: "yalaride",
      client: "YalaRide",
      brandInfo: "Car Rental Marketplace | USA Brand",
      approach: [
        "Car Rental Portal",
        "Google Ads & SEO",
        "Mobile App Development",
        "Campaign Strategy",
        "Brand Awareness",
      ],
      results: [
        { label: "More Visibility", value: 160, suffix: "%" },
        { label: "More Leads", value: 190, suffix: "%" },
        { label: "More Bookings", value: 80, suffix: "%" },
      ],
      image: "/src/assets/images/yalaride_web_portal_1781815990359.jpg",
      device: "macbook",
    },
    {
      id: "america-needs-nurses",
      client: "America Needs Nurses",
      brandInfo: "Healthcare Professionals Marketplace | USA Brand",
      approach: [
        "Healthcare Marketplace",
        "Nurse Job Opportunities",
        "Employer & Nurse Dashboards",
        "Free Healthcare Listings",
        "Google Ads & Brand Awareness",
        "Campaign Management",
      ],
      results: [
        { label: "More Healthcare Leads", value: 140, suffix: "%" },
        { label: "More Job Applications", value: 110, suffix: "%" },
        { label: "Stronger Brand Reach", value: 70, suffix: "%" },
      ],
      image: "/src/assets/images/nurses_recruiter_portal_1781816032234.jpg",
      device: "iphone",
    },
    {
      id: "go-jetter",
      client: "Go Jetter Tours",
      brandInfo: "Travel & Tours Brand | UAE & USA Registered",
      approach: [
        "Custom Travel Website",
        "Mobile App Development",
        "Google Ads & SEO",
        "Meta Ads & Social Media Marketing",
        "Brand Awareness",
      ],
      results: [
        { label: "More Travel Leads", value: 190, suffix: "%" },
        { label: "More Bookings", value: 130, suffix: "%" },
        { label: "Stronger Brand Reach", value: 80, suffix: "%" },
      ],
      image: "/src/assets/images/hero_dashboard_mockup_1781815970624.jpg",
      device: "macbook",
    },
  ];

  return (
    <section id="work" className="py-20 relative bg-white overflow-hidden text-left border-t border-slate-200">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-bg-dark opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10">
        
        {/* Editorial Brutalist Header */}
        <div className="mb-20 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
              // CASE RECORDS & DEPLOYED SYSTEMS
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              CASE <br /> STUDIES.
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-sm">
            High-fidelity interactive platforms built to generate leads, scale attention, and establish market leadership.
          </p>
        </div>

        {/* List layout of premium case records */}
        <div className="flex flex-col gap-24">
          {cases.map((cs, idx) => (
            <div 
              key={cs.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Left Column: Metrics & Approach Details (Spans 5) */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-brand-orange-500" />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
                    {cs.brandInfo}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tighter mb-4">
                  {cs.client}
                </h3>
                
                {/* Approach List */}
                <div className="mt-6">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold block mb-3">// Our Approach</span>
                  <div className="flex flex-wrap gap-2">
                    {cs.approach.map((item, index) => (
                      <span key={index} className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-100 rounded-full bg-slate-50 font-bold text-slate-700">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics Count upward */}
                <div className="mt-10 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
                  {cs.results.map((m, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        +<CountingMetric target={m.value} suffix={m.suffix} />
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1.5 leading-snug">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View project blueprint CTA */}
                <div className="mt-10">
                  <a href="#contact" className="group inline-flex items-center gap-3 text-xs font-mono font-bold text-slate-900 uppercase tracking-widest hover:text-brand-orange-500 transition-colors">
                    Request Integration Blueprint
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </a>
                </div>

              </motion.div>

              {/* Right Column: Immersive Device Mockups (Spans 7) */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 w-full flex justify-center order-1 lg:order-2"
              >
                {cs.device === "macbook" ? (
                  <MacBookMockup image={cs.image} alt={cs.client} />
                ) : (
                  <iPhoneMockup image={cs.image} alt={cs.client} />
                )}
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
