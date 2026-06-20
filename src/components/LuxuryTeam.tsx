import React, { useRef } from "react";
import { Linkedin, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export default function LuxuryTeam() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const founders = [
    {
      id: "CEO",
      name: "Waseeq Nauman",
      role: "Founder & Chief Executive Officer",
      desc: "Waseeq engineers the grand strategy behind Arrowhead's market dominance. With deep expertise in luxury positioning and enterprise growth, he transformed Arrowhead from a standard agency into a high-performance growth infrastructure company capable of scaling international brands.",
      image: "/src/assets/images/rizwan_photo.png",
      linkedin: "#",
    },
    {
      id: "OPS",
      name: "Usman Farooqi",
      role: "Operations Director & Systems Architect",
      desc: "Usman is the technical mastermind driving the Arrowhead Protocol. He oversees the seamless integration of advanced web architectures, AI autonomous pipelines, and high-latency data systems, ensuring that every strategic vision is executed with zero defects.",
      image: "/src/assets/images/ray_photo.png",
      linkedin: "#",
    }
  ];

  return (
    <section ref={containerRef} id="team" className="py-32 relative bg-white text-slate-900 overflow-hidden border-t border-slate-100">
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header */}
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // LEADERSHIP
          </span>
          <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter uppercase">
            THE ARCHITECTS OF <br />
            GROWTH.
          </h2>
        </div>

        {/* Staggered Grid */}
        <div className="flex flex-col gap-24 lg:gap-40 mt-20">
          {founders.map((founder, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={founder.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                
                {/* Portrait Container */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2"
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200 group">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                      className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                    />
                    {/* Fallback */}
                    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center -z-10">
                      <div className="w-[80%] h-[80%] border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center bg-white/50 relative">
                         <span className="text-slate-400 font-mono tracking-widest uppercase font-bold text-sm z-10 text-center px-4 mb-2">
                           {founder.id} PORTRAIT
                         </span>
                         <span className="text-slate-400 font-mono tracking-[0.2em] text-[10px] uppercase text-center px-4 z-10">
                           Awaiting Asset
                         </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Content Container */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full lg:w-1/2 flex flex-col justify-center"
                >
                  <span className="text-[10px] font-mono tracking-widest uppercase text-brand-orange-500 font-bold mb-4 block">
                    {founder.id} // {founder.role}
                  </span>
                  <h3 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tighter mb-8">
                    {founder.name}
                  </h3>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 max-w-lg">
                    {founder.desc}
                  </p>
                  <a href={founder.linkedin} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-slate-900 uppercase hover:text-brand-orange-500 transition-colors w-fit">
                    View LinkedIn Profile
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
