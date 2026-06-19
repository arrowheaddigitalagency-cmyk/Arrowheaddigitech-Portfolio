import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function StorytellingAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress to fill the timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const journey = [
    {
      chapter: "01",
      title: "The Genesis",
      desc: "Arrowhead wasn't born in a boardroom. It started with a fundamental realization: agencies were charging premium retainers for vanity metrics, while businesses were starved for actual revenue. We set out to engineer systems that hunt for profit, not just clicks."
    },
    {
      chapter: "02",
      title: "The Architecture",
      desc: "We abandoned the traditional agency model. Instead of hiring generic account managers, we built an alliance of technical growth architects, data scientists, and luxury brand strategists. We built the Arrowhead Protocol."
    },
    {
      chapter: "03",
      title: "The Scale",
      desc: "Our systems started dominating local markets, and soon, international campaigns. From deploying high-frequency trading principles into Google Ads algorithms to automating entire sales pipelines with AI, Arrowhead became the silent partner behind industry leaders."
    },
    {
      chapter: "04",
      title: "The Future",
      desc: "We are no longer just an agency; we are a growth infrastructure company. The future belongs to brands that operate with zero latency, aggressive market positioning, and autonomous systems. We build those engines."
    }
  ];

  return (
    <section ref={containerRef} id="about" className="relative bg-[#050505] text-white py-32 lg:py-48 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1000px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Narrative Header */}
        <div className="mb-32 text-center">
          <span className="text-[10px] font-mono tracking-[0.4em] text-slate-500 uppercase block mb-6 font-bold">
            // FOUNDER'S LOG
          </span>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-white leading-[0.95] tracking-tighter">
            OUR <br /> JOURNEY.
          </h2>
        </div>

        {/* Central Scroll-Linked Timeline Layout */}
        <div className="relative">
          
          {/* Background Timeline Track */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-1/2" />
          
          {/* Glowing Animated Timeline Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
            <motion.div 
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-brand-orange-500 via-amber-400 to-transparent shadow-[0_0_15px_rgba(255,90,31,0.8)]"
            />
          </div>

          {/* Journey Chapters */}
          <div className="space-y-32">
            {journey.map((chapter, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={chapter.chapter} className="relative flex flex-col md:flex-row items-center justify-between w-full">
                  
                  {/* Glowing Node on Timeline */}
                  <div className="absolute left-[24.5px] md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-[#050505] border-2 border-brand-orange-500 z-10 shadow-[0_0_10px_rgba(255,90,31,0.5)]" />

                  {/* Left Side Content (Empty for odd on desktop, content for even) */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'hidden md:block'}`}>
                    {isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <span className="text-[10px] font-mono text-brand-orange-500 uppercase tracking-widest block mb-4">
                          Chapter {chapter.chapter}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-white">{chapter.title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed">{chapter.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Side Content (Empty for even on desktop, content for odd) */}
                  <div className={`w-full md:w-5/12 pl-16 md:pl-12 ${!isEven ? 'md:text-left' : 'hidden md:block'}`}>
                    {!isEven && (
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <span className="text-[10px] font-mono text-brand-orange-500 uppercase tracking-widest block mb-4">
                          Chapter {chapter.chapter}
                        </span>
                        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 text-white">{chapter.title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed">{chapter.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Mobile Fallback for Even (since they are hidden on right side for mobile) */}
                  {isEven && (
                    <div className="w-full pl-16 block md:hidden mt-[-10px]">
                      <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <span className="text-[10px] font-mono text-brand-orange-500 uppercase tracking-widest block mb-4">
                          Chapter {chapter.chapter}
                        </span>
                        <h3 className="text-3xl font-extrabold tracking-tight mb-4 text-white">{chapter.title}</h3>
                        <p className="text-slate-400 text-base leading-relaxed">{chapter.desc}</p>
                      </motion.div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
