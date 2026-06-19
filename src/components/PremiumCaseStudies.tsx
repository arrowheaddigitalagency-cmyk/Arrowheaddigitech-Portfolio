import React, { useState } from "react";
import { ArrowRight, Globe } from "lucide-react";
import { motion } from "motion/react";

interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: string;
  image: string;
  metrics: { label: string; value: string; }[];
}

export default function PremiumCaseStudies() {
  const [hoveredCase, setHoveredCase] = useState<string | null>(null);

  const cases: CaseStudy[] = [
    {
      id: "yalaride",
      client: "YalaRide",
      title: "Dominating the UAE Luxury Car Leasing Market",
      category: "Web App & Growth",
      image: "/src/assets/images/yalaride_web_portal_1781815990359.jpg",
      metrics: [
        { label: "YoY Revenue", value: "312%" },
        { label: "CPA Reduction", value: "45%" }
      ]
    },
    {
      id: "america-nurses",
      client: "America Needs Nurses",
      title: "Automating Recruitment Pipelines at Scale",
      category: "CRM & Paid Media",
      image: "/src/assets/images/nurses_recruiter_portal_1781816032234.jpg",
      metrics: [
        { label: "Placement Rate", value: "4x" },
        { label: "Active Roster", value: "12k+" }
      ]
    },
    {
      id: "go-jetter",
      client: "Go-Jetter Tours",
      title: "High-Ticket Tourism Booking Engine",
      category: "E-Commerce & SEO",
      image: "/src/assets/images/hero_dashboard_mockup_1781815970624.jpg",
      metrics: [
        { label: "Organic Traffic", value: "240%" },
        { label: "Booking Conv.", value: "6.8%" }
      ]
    }
  ];

  return (
    <section id="work" className="py-32 relative bg-white overflow-hidden text-left border-t border-slate-200">
      
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 w-full">
        
        {/* Header Segment */}
        <div className="mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b-2 border-slate-900 pb-12">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
              // DEPLOYED SYSTEMS
            </span>
            <h2 className="text-5xl sm:text-7xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
              CASE <br /> RECORDS.
            </h2>
          </div>
          <p className="text-lg text-slate-500 font-medium max-w-sm">
            High-fidelity platforms engineered for strict conversion and absolute market dominance.
          </p>
        </div>

        {/* Cinematic List Layout */}
        <div className="flex flex-col gap-8">
          {cases.map((cs, idx) => (
            <motion.div 
              key={cs.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCase(cs.id)}
              onMouseLeave={() => setHoveredCase(null)}
              className="group flex flex-col md:flex-row bg-[#0a0a0a] rounded-sm overflow-hidden cursor-pointer"
            >
              
              {/* Left: Stark Typography & Metrics */}
              <div className="w-full md:w-1/3 p-10 lg:p-16 flex flex-col justify-between border-r border-white/10 relative z-10 bg-[#0a0a0a]">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-4 h-4 text-brand-orange-500" />
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase">{cs.category}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-4 group-hover:text-brand-orange-500 transition-colors">
                    {cs.client}
                  </h3>
                  <p className="text-slate-400 font-medium">{cs.title}</p>
                </div>
                
                <div className="mt-12 flex items-center justify-between opacity-50 group-hover:opacity-100 transition-opacity">
                  {cs.metrics.map((m, i) => (
                    <div key={i}>
                      <span className="block text-2xl font-mono font-bold text-white">{m.value}</span>
                      <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Edge-to-Edge Cinematic Image */}
              <div className="w-full md:w-2/3 h-[400px] md:h-auto relative overflow-hidden bg-slate-900">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-1000 z-10" />
                <img 
                  src={cs.image} 
                  alt={cs.client} 
                  className={`w-full h-full object-cover transition-transform duration-[2000ms] ease-out ${hoveredCase === cs.id ? 'scale-105' : 'scale-100 grayscale'}`}
                />
                
                {/* View Project Action */}
                <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">View Blueprint</span>
                  <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
