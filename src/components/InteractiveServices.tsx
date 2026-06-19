import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

export default function InteractiveServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const services = [
    {
      id: "01",
      title: "Performance Marketing.",
      headline: "Algorithms that hunt for revenue.",
      desc: "We don't buy clicks; we buy customers. Our advanced Google and Meta Ads campaigns use machine learning to bypass competitors and secure high-intent leads at scale.",
      metric: "4.8x",
      metricLabel: "Average Verified ROAS",
      color: "from-brand-orange-500",
      image: "/src/assets/images/arrowhead_performance_marketing.jpg" // Placeholder for an abstract data visualization
    },
    {
      id: "02",
      title: "Web Architecture.",
      headline: "Platforms built for speed.",
      desc: "Your website is your best salesperson. We engineer high-performance React applications and custom software solutions designed strictly for conversion velocity and zero latency.",
      metric: "120ms",
      metricLabel: "Average Interaction Latency",
      color: "from-brand-blue-500",
      image: "/src/assets/images/arrowhead_web_architecture.jpg" // Placeholder for a sleek code/UI interface
    },
    {
      id: "03",
      title: "AI Automation.",
      headline: "Your sales team, awake 24/7.",
      desc: "Stop leaking leads outside of business hours. We build custom AI chatbots that instantly qualify prospects, route customer support, and book meetings into your calendar automatically.",
      metric: "24/7",
      metricLabel: "Autonomous Lead Routing",
      color: "from-emerald-500",
      image: "/src/assets/images/arrowhead_ai_automation.jpg" // Placeholder for a futuristic neural network or bot UI
    },
    {
      id: "04",
      title: "Creative Production.",
      headline: "Content that commands attention.",
      desc: "In an attention economy, boring brands die. Our post-production team delivers cinematic video advertisements and omnichannel social growth strategies that dominate timelines.",
      metric: "+300%",
      metricLabel: "Engagement Lift",
      color: "from-indigo-500",
      image: "/src/assets/images/arrowhead_creative_production.jpg" // Placeholder for a dynamic video editing timeline
    }
  ];

  return (
    <section ref={containerRef} id="services" className="py-32 relative bg-white overflow-hidden text-left">
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Brutalist Header */}
        <div className="mb-32 flex flex-col items-center text-center">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // CAPABILITIES
          </span>
          <h2 className="text-6xl sm:text-8xl lg:text-[8rem] font-extrabold text-slate-900 leading-[0.9] tracking-tighter">
            WE BUILD <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
              ENGINES.
            </span>
          </h2>
        </div>

        {/* Alternating Apple-Style Story Blocks */}
        <div className="space-y-40 lg:space-y-64">
          {services.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 lg:gap-24 items-center`}>
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1"
                >
                  <span className="text-sm font-mono font-bold text-slate-400 mb-6 block">
                    {service.id} // {service.title}
                  </span>
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tighter leading-[1.05] mb-8">
                    {service.headline}
                  </h3>
                  <p className="text-lg sm:text-xl text-slate-500 font-medium leading-relaxed mb-12">
                    {service.desc}
                  </p>

                  {/* Big Impact Metric */}
                  <div className="pl-6 border-l-4 border-slate-900">
                    <span className={`block text-5xl sm:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${service.color} to-slate-900`}>
                      {service.metric}
                    </span>
                    <span className="block text-sm font-bold text-slate-500 uppercase tracking-widest mt-2">
                      {service.metricLabel}
                    </span>
                  </div>
                </motion.div>

                {/* Visual Content (Massive Image/Visual block) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex-1 w-full"
                >
                  <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-2xl border border-slate-200 group">
                    {/* Placeholder structural element since we don't have real images yet */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center p-12">
                      <div className="w-full h-full border-2 border-dashed border-slate-400 rounded-xl flex items-center justify-center bg-white/50 backdrop-blur-sm transition-transform duration-700 group-hover:scale-105">
                         <span className="font-mono text-slate-500 font-bold uppercase tracking-widest text-sm text-center">
                           [ CINEMATIC DEMO: {service.title} ]<br/>
                           Waiting for High-Res Asset
                         </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
