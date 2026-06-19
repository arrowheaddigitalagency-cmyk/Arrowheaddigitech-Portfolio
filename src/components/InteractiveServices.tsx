import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

export default function InteractiveServices() {
  const services = [
    {
      id: "01",
      title: "Google Ads Campaigns",
      desc: "High-performing PPC campaigns built for rapid lead acquisition and maximized ROI.",
      bullets: ["High-performing PPC campaigns", "Fast lead generation", "Better ROI"],
      color: "border-brand-orange-500/20 hover:border-brand-orange-500 hover:shadow-brand-orange-500/5"
    },
    {
      id: "02",
      title: "Meta Ads Services",
      desc: "Advanced Facebook & Instagram advertising targeting algorithms focused on direct response.",
      bullets: ["Facebook & Instagram advertising", "Audience targeting", "Lead generation campaigns"],
      color: "border-brand-blue-500/20 hover:border-brand-blue-500 hover:shadow-brand-blue-500/5"
    },
    {
      id: "03",
      title: "Social Media Management",
      desc: "Omnichannel brand growth through content creation, metrics optimization, and social interaction.",
      bullets: ["Content creation", "Engagement strategy", "Brand growth"],
      color: "border-emerald-500/20 hover:border-emerald-500 hover:shadow-emerald-500/5"
    },
    {
      id: "04",
      title: "Video Editing",
      desc: "High-end post-production for advertisements, product guides, and cinematic brand storytelling.",
      bullets: ["Promotional videos", "Marketing content", "Brand storytelling"],
      color: "border-indigo-500/20 hover:border-indigo-500 hover:shadow-indigo-500/5"
    },
    {
      id: "05",
      title: "Web & Software Development",
      desc: "Performance-centric web architecture and specialized custom web applications built in React.",
      bullets: ["Custom websites", "Business software solutions", "Performance-focused development"],
      color: "border-purple-500/20 hover:border-purple-500 hover:shadow-purple-500/5"
    },
    {
      id: "06",
      title: "App Development",
      desc: "High-performance iOS & Android mobile systems featuring slick interfaces and offline capability.",
      bullets: ["Mobile applications", "User-friendly interfaces", "Business-focused solutions"],
      color: "border-pink-500/20 hover:border-pink-500 hover:shadow-pink-500/5"
    },
    {
      id: "07",
      title: "Custom AI Chatbots",
      desc: "Intelligent customer routing systems and automated lead qualifiers active 24/7.",
      bullets: ["Customer support automation", "Lead qualification", "24/7 customer engagement"],
      color: "border-teal-500/20 hover:border-teal-500 hover:shadow-teal-500/5"
    },
    {
      id: "08",
      title: "Google Business Services",
      desc: "Aggressive optimization for local map packs, localized keywords, and search discovery.",
      bullets: ["Google Business Profile optimization", "Local SEO", "Maps visibility"],
      color: "border-amber-500/20 hover:border-amber-500 hover:shadow-amber-500/5"
    },
    {
      id: "09",
      title: "E-Commerce Solutions",
      desc: "High-ticket checkout conversion optimization, automated inventory systems, and Shopify setups.",
      bullets: ["Online stores", "Product pages", "Sales optimization"],
      color: "border-cyan-500/20 hover:border-cyan-500 hover:shadow-cyan-500/5"
    },
    {
      id: "10",
      title: "Lead Generation",
      desc: "Systematic lead acquisition structures, prospect nurturing flows, and custom conversion pages.",
      bullets: ["Lead acquisition strategies", "Prospect nurturing", "Conversion-focused campaigns"],
      color: "border-red-500/20 hover:border-red-500 hover:shadow-red-500/5"
    }
  ];

  return (
    <section id="services" className="py-32 relative bg-white overflow-hidden text-left">
      
      {/* Decorative Blueprint Lines */}
      <div className="absolute inset-0 bg-grid-bg-dark opacity-30 pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Brutalist Header */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
              // DEPLOYMENT VECTORS
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              OUR SERVICES.
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-lg">
            Arrowhead helps brands get more visibility, more leads, and more customers through digital marketing and modern technology.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col justify-between border bg-slate-50/50 backdrop-blur-sm p-8 rounded-xl transition-all duration-500 cursor-pointer ${service.color}`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                    {service.id}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-4 group-hover:text-brand-orange-500 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                  {service.desc}
                </p>
              </div>

              {/* Sub features bullets */}
              <div className="border-t border-slate-200/60 pt-4 mt-auto">
                <ul className="space-y-2">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange-500 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
