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

// 3D Mouse Parallax Mockup Wrapper
function InteractiveMockup({ image, alt }: { image: string; alt: string }) {
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
      className="w-full h-full relative cursor-pointer overflow-hidden rounded-xl bg-slate-900 border border-white/10"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic 3D Transform Layer */}
      <motion.div
        animate={{
          rotateY: coords.x * 20,
          rotateX: -coords.y * 20,
          scale: isHovered ? 1.04 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="w-full h-full relative"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none transition-all duration-700"
        />
        
        {/* Subtle grid light reflections on mockup */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none z-20" />
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
    },
  ];

  return (
    <section id="work" className="py-32 relative bg-white overflow-hidden text-left border-t border-slate-200">
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-grid-bg-dark opacity-40 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10">
        
        {/* Editorial Brutalist Header */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
              // CASE RECORDS & SYSTEMS
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
                className="lg:col-span-7 h-[300px] sm:h-[450px] w-full order-1 lg:order-2"
              >
                <InteractiveMockup image={cs.image} alt={cs.client} />
              </motion.div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
