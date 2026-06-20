import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

interface CaseMetric {
  label: string;
  value: number;
  suffix: string;
}

interface CaseStudy {
  id: string;
  client: string;
  brandInfo: string;
  results: CaseMetric[];
  desktopImage: string;
  mobileImage: string;
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

// Cinematic Full-Width MacBook Pro CSS-Only Frame Mockup
function CinematicMacBook({ image, alt }: { image: string; alt: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
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
      onMouseLeave={() => setCoords({ x: 0, y: 0 })}
      className="relative w-full max-w-[1200px] mx-auto cursor-crosshair z-10"
      style={{ perspective: 1500 }}
    >
      <motion.div
        animate={{
          rotateY: coords.x * 10,
          rotateX: -coords.y * 10,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full"
      >
        <div className="bg-[#0f0f11] p-[2.5%] rounded-t-3xl border-t-2 border-x-2 border-slate-700 shadow-2xl relative">
          <div className="absolute top-[1.5%] left-1/2 -translate-x-1/2 w-[6%] h-[2.5%] bg-black rounded-b-xl z-30 flex items-center justify-center">
            <div className="w-[3px] h-[3px] rounded-full bg-blue-900/40" />
          </div>
          <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden rounded-lg border-2 border-black">
            {image ? (
              <img src={image} alt={alt} onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-300" />
            ) : (
              <div className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center p-8 -z-10">
                <div className="w-full h-full border-2 border-dashed border-[#333] rounded-lg flex flex-col items-center justify-center bg-[#0a0a0a] gap-3">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                     <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   </div>
                   <span className="text-slate-300 font-mono tracking-widest uppercase font-bold text-center text-sm">
                     {alt}
                   </span>
                   <span className="text-slate-600 font-mono tracking-widest uppercase text-[10px] text-center">
                     Drop Image Here
                   </span>
                </div>
              </div>
            )}
            {/* Glossy Reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10 mix-blend-overlay" />
          </div>
        </div>
        <div className="relative h-6 sm:h-8 bg-gradient-to-b from-[#4d5257] via-[#212325] to-[#121314] rounded-b-3xl border-b border-x border-slate-900 shadow-[0_40px_100px_-10px_rgba(0,0,0,0.8)] flex justify-center">
          <div className="w-[20%] h-[30%] bg-[#080808] rounded-b-lg shadow-inner" />
        </div>
      </motion.div>
    </div>
  );
}

// Cinematic iPhone 15 Pro CSS-Only Frame Mockup
function CinematicIPhone({ image, alt }: { image: string; alt: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
      onMouseLeave={() => setCoords({ x: 0, y: 0 })}
      className="relative w-[320px] sm:w-[400px] mx-auto cursor-crosshair z-10"
      style={{ perspective: 1200 }}
    >
      <motion.div
        animate={{
          rotateY: coords.x * 12,
          rotateX: -coords.y * 12,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-full bg-[#0d0d0f] border-[12px] border-[#2a2c30] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] p-3 relative aspect-[9/19.5]"
      >
        <div className="absolute top-[3.5%] left-1/2 -translate-x-1/2 w-[30%] h-[3%] bg-black rounded-full z-30 flex items-center justify-end pr-3">
          <div className="w-2 h-2 rounded-full bg-blue-900/40" />
        </div>
        <div className="w-full h-full bg-slate-900 overflow-hidden rounded-[2.8rem] relative border border-black flex items-center justify-center">
           {image ? (
              <img src={image} alt={alt} onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-300" />
           ) : (
              <div className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center p-4 -z-10">
                <div className="w-full h-full border-2 border-dashed border-[#333] rounded-3xl flex flex-col items-center justify-center bg-[#0a0a0a] gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                     <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                   </div>
                   <span className="text-slate-300 font-mono tracking-widest uppercase font-bold text-center text-[10px]">
                     {alt}
                   </span>
                </div>
              </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 pointer-events-none z-10 mix-blend-overlay" />
        </div>
      </motion.div>
    </div>
  );
}

export default function PremiumCaseStudies() {
  const containerRef = useRef(null);
  
  const cases: CaseStudy[] = [
    {
      id: "yalaride",
      client: "YalaRide",
      brandInfo: "Car Rental Marketplace | USA",
      results: [
        { label: "Visibility", value: 160, suffix: "%" },
        { label: "Leads", value: 190, suffix: "%" },
      ],
      desktopImage: "/src/assets/images/yalaride_macbook_screenshot.jpg.png",
      mobileImage: "/src/assets/images/yalaride_mobile_screenshot.jpg.png",
    },
    {
      id: "america-needs-nurses",
      client: "America Needs Nurses",
      brandInfo: "Healthcare App | USA",
      results: [
        { label: "App Installs", value: 140, suffix: "%" },
        { label: "Job Applications", value: 110, suffix: "%" },
      ],
      desktopImage: "/src/assets/images/nurses_recruiter_portal_1781816032234.jpg",
      mobileImage: "/src/assets/images/america_needs_nurses_iphone_screenshot.jpg.png",
    },
    {
      id: "go-jetter",
      client: "Go Jetter Tours",
      brandInfo: "Travel Brand | UAE",
      results: [
        { label: "Travel Leads", value: 190, suffix: "%" },
        { label: "Bookings", value: 130, suffix: "%" },
      ],
      desktopImage: "/src/assets/images/go_jetter_macbook_screenshot.jpg.png",
      mobileImage: "/src/assets/images/go_jetter_mobile_screenshot.jpg.png",
    },
  ];

  return (
    <section id="work" ref={containerRef} className="relative bg-[#030712] text-white py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full relative z-10 mb-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // HARDWARE SHOWCASE
          </span>
          <h2 className="text-6xl sm:text-8xl font-extrabold text-white leading-[0.95] tracking-tighter">
            CASE <br /> STUDIES.
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col gap-40">
        {cases.map((cs, idx) => (
          <div key={cs.id} className="relative w-full min-h-screen flex items-center justify-center px-4">
            
            {/* Background Glows */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20 ${idx % 2 === 0 ? 'bg-brand-orange-500' : 'bg-brand-blue-500'} pointer-events-none`} />

            {/* Massive Typography Behind Device */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 mix-blend-overlay opacity-30">
              <h3 className="text-[15vw] font-extrabold tracking-tighter uppercase whitespace-nowrap">
                {cs.client}
              </h3>
            </div>

            {/* Hardware Layer (Composite Desktop + Mobile) */}
            <div className="relative w-full max-w-[1400px] flex justify-center items-center">
              <div className="w-[85%] sm:w-[75%] lg:w-[65%] z-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] rounded-t-3xl">
                <CinematicMacBook image={cs.desktopImage} alt={`${cs.client} Desktop Screenshot`} />
              </div>
              <div className="absolute right-[5%] sm:right-[15%] lg:right-[20%] top-[40%] sm:top-[30%] w-[35%] sm:w-[25%] lg:w-[20%] z-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)] rounded-[3.5rem]">
                <CinematicIPhone image={cs.mobileImage} alt={`${cs.client} Mobile Screenshot`} />
              </div>
            </div>

            {/* Floating Metric Badge 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-[20%] left-[10%] sm:left-[20%] z-20 p-5 border border-white/10 bg-black/60 backdrop-blur-xl rounded-xl shadow-2xl"
            >
               <span className="block text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">{cs.results[0].label}</span>
               <span className="text-4xl font-extrabold text-white">
                 +<CountingMetric target={cs.results[0].value} suffix={cs.results[0].suffix} />
               </span>
            </motion.div>

            {/* Floating Metric Badge 2 */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute bottom-[20%] right-[10%] sm:right-[20%] z-20 p-5 border border-white/10 bg-black/60 backdrop-blur-xl rounded-xl shadow-2xl"
            >
               <span className="block text-[10px] font-mono text-slate-400 tracking-widest uppercase mb-1">{cs.results[1].label}</span>
               <span className="text-4xl font-extrabold text-white">
                 +<CountingMetric target={cs.results[1].value} suffix={cs.results[1].suffix} />
               </span>
            </motion.div>
            
          </div>
        ))}
      </div>
    </section>
  );
}
