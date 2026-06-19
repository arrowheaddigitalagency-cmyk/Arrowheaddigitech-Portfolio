import React from "react";
import { motion } from "motion/react";
import { ArrowRight, BarChart, CheckCircle2 } from "lucide-react";

export default function ClientSuccessStories() {
  const stories = [
    {
      id: "yalaride",
      client: "YalaRide",
      author: "Mohammed Rizwan",
      role: "CEO",
      logo: "/src/assets/images/yalaride_logo.png", // Asset Placeholder
      photo: "/src/assets/images/rizwan_photo.jpg", // Asset Placeholder
      project: "Marketplace Architecture & Lead Acquisition",
      results: "Built a high-performance car rental portal and scaled operations via aggressive Google Ads, yielding a 190% increase in verified bookings within 90 days.",
      metrics: [
        { label: "Booking Volume", val: "+190%" },
        { label: "CPA Reduction", val: "-42%" }
      ]
    },
    {
      id: "americaneedsnurses",
      client: "America Needs Nurses",
      author: "Ray Washington",
      role: "Founder",
      logo: "/src/assets/images/ann_logo.png", // Asset Placeholder
      photo: "/src/assets/images/ray_photo.jpg", // Asset Placeholder
      project: "Healthcare Infrastructure & Recruitment",
      results: "Engineered a dual-sided marketplace with custom employer/nurse dashboards. Executed a brand awareness campaign that drove a 140% spike in healthcare lead volume.",
      metrics: [
        { label: "Lead Volume", val: "+140%" },
        { label: "Time-to-Hire", val: "-35%" }
      ]
    }
  ];

  return (
    <section className="py-32 bg-[#f8fafc] border-t border-slate-200 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header */}
        <div className="mb-20">
          <span className="text-[10px] font-mono tracking-[0.3em] text-brand-orange-500 uppercase block mb-6 font-bold">
            // VERIFIED RECORDS
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-[0.95] tracking-tighter">
            CLIENT SUCCESS <br />
            STORIES.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {stories.map((story, idx) => (
            <motion.div 
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col justify-between"
            >
              
              <div>
                {/* Header: Logo and Author */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-10 border-b border-slate-100">
                  
                  {/* Client Logo Slot */}
                  <div className="h-10 w-32 bg-slate-100 border border-slate-200 rounded flex items-center justify-center relative overflow-hidden">
                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">[ LOGO: {story.client} ]</span>
                    {/* <img src={story.logo} alt={story.client} className="absolute inset-0 w-full h-full object-contain p-2" /> */}
                  </div>

                  {/* Author Profile */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <h4 className="text-lg font-extrabold text-slate-900 tracking-tight">{story.author}</h4>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-bold">{story.role}</p>
                    </div>
                    {/* Author Photo Slot */}
                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-slate-200 flex items-center justify-center overflow-hidden relative">
                      <span className="text-[8px] font-mono font-bold text-slate-400 uppercase text-center leading-none">[ PHOTO ]</span>
                      {/* <img src={story.photo} alt={story.author} className="absolute inset-0 w-full h-full object-cover" /> */}
                    </div>
                  </div>
                </div>

                {/* Project Scope */}
                <div className="mb-6">
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 font-bold uppercase block mb-2">Project Scope</span>
                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{story.project}</h3>
                </div>

                {/* Results Text */}
                <p className="text-base text-slate-600 font-medium leading-relaxed mb-10">
                  "{story.results}"
                </p>
              </div>

              {/* Hard Metrics */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-6 rounded-xl border border-slate-100">
                {story.metrics.map((metric, mIdx) => (
                  <div key={mIdx}>
                    <span className="text-[10px] font-mono tracking-widest text-brand-orange-500 font-bold uppercase block mb-1">
                      {metric.label}
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tighter">
                      {metric.val}
                    </span>
                  </div>
                ))}
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
