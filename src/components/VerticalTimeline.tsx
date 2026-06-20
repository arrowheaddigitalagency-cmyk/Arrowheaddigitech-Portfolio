import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function VerticalTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  const milestones = [
    {
      year: "2021",
      title: "The Inception",
      desc: "Arrowhead began as a boutique performance marketing agency, focusing strictly on high-intent lead generation.",
    },
    {
      year: "2022",
      title: "Systems Architecture",
      desc: "We evolved into building custom web infrastructure, recognizing that traffic without a high-converting system is worthless.",
    },
    {
      year: "2023",
      title: "AI Integration",
      desc: "Pioneered autonomous AI chatbot pipelines, allowing our clients to route leads and schedule meetings 24/7.",
    },
    {
      year: "2024",
      title: "Global Protocol",
      desc: "Launched the Arrowhead Protocol. A comprehensive growth framework now used by international brands to capture markets.",
    }
  ];

  return (
    <section ref={containerRef} id="journey" className="py-32 relative bg-[#02040a] text-white overflow-hidden border-t border-slate-900">
      
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-brand-orange-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-6 sm:px-12 relative z-10 w-full flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-32 text-center">
          <h2 className="text-6xl sm:text-8xl font-extrabold text-white leading-[0.9] tracking-tighter uppercase">
            OUR <br />
            JOURNEY.
          </h2>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative w-full max-w-4xl">
          
          {/* Central Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-orange-500 via-brand-orange-400 to-transparent"
              style={{ height: useTransform(pathLength, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-24 md:space-y-32">
            {milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={m.year} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12`}>
                  
                  {/* Glowing Node */}
                  <div className="absolute left-[20px] md:left-1/2 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#02040a] border-2 border-brand-orange-500 shadow-[0_0_15px_rgba(255,90,31,0.6)] z-20" />
                  
                  {/* Content Container (Left or Right) */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      <span className="text-brand-orange-500 font-mono font-bold tracking-widest uppercase mb-2 block">{m.year}</span>
                      <h3 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{m.title}</h3>
                      <p className="text-slate-400 font-medium leading-relaxed">{m.desc}</p>
                    </motion.div>
                  </div>

                  {/* Empty Spacer for the other side */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
