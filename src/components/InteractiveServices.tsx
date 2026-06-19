import React, { useRef, useState } from "react";
import { Code, LineChart, Globe, Zap, Target, MousePointerClick, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: any;
  color: string;
  delay: number;
}

const ServiceCard = ({ title, description, icon: Icon, color, delay }: ServiceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative group overflow-hidden rounded-[1.5rem] bg-white/60 backdrop-blur-3xl border border-white hover:border-white shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-500 cursor-pointer h-full"
    >
      {/* Dynamic mouse tracking glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${color}15, transparent 40%)`,
        }}
      />
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl transition-transform duration-500 group-hover:scale-150" style={{ backgroundColor: color }} />

      <div className="relative p-8 sm:p-10 z-10 flex flex-col h-full">
        {/* Faux-3D Icon Container */}
        <div className="mb-8 relative w-16 h-16 group-hover:-translate-y-2 transition-transform duration-500">
          <div className="absolute inset-0 rounded-2xl bg-white shadow-xl rotate-6 group-hover:rotate-12 transition-transform duration-500" />
          <div className="absolute inset-0 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center -rotate-3 group-hover:rotate-0 transition-transform duration-500">
            <Icon className="w-8 h-8" style={{ color }} />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-slate-900 transition-colors">{title}</h3>
        <p className="text-slate-600 font-medium leading-relaxed mb-8 flex-grow">
          {description}
        </p>

        <div className="flex items-center gap-2 mt-auto font-bold text-sm tracking-widest uppercase transition-colors" style={{ color }}>
          Explore Solution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export default function InteractiveServices() {
  const services = [
    {
      title: "Performance Engineering",
      description: "High-velocity React frameworks built for conversion, maintaining sub-second rendering speeds.",
      icon: Code,
      color: "#3B82F6", // Brand Blue
      delay: 0.1
    },
    {
      title: "Predictive Advertising",
      description: "Multi-channel media buying across Meta & Google Ads structured on strict ROAS algorithms.",
      icon: LineChart,
      color: "#FF5A1F", // Brand Orange
      delay: 0.2
    },
    {
      title: "Search Intelligence",
      description: "Dominating local search indices and Google Maps protocols with aggressive SEO directives.",
      icon: Globe,
      color: "#10B981", // Emerald
      delay: 0.3
    },
    {
      title: "Automated Workflows",
      description: "Bespoke CRM pipelines and AI integrations to immediately route acquired leads.",
      icon: Zap,
      color: "#8B5CF6", // Purple
      delay: 0.4
    },
    {
      title: "Conversion Mechanics",
      description: "A/B tested landing pages engineered strictly on cognitive psychology and UI friction elimination.",
      icon: Target,
      color: "#F59E0B", // Amber
      delay: 0.5
    },
    {
      title: "Audience Acquisition",
      description: "Programmatic scaling through verified buyer-intent funnels and retargeting matrices.",
      icon: MousePointerClick,
      color: "#EC4899", // Pink
      delay: 0.6
    }
  ];

  return (
    <section id="services" className="py-32 relative bg-slate-50/50 overflow-hidden text-left">
      
      {/* Background Grid & Lighting */}
      <div className="absolute inset-0 grid-bg-dark opacity-[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-brand-orange-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        
        {/* Header Segment */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-bold tracking-[0.3em] text-brand-orange-500 uppercase block mb-4">
            // OUR DEPLOYMENT VECTORS
          </span>
          <h2 className="text-5xl sm:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            ENGINEERED TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-brand-blue-500">
              SCALE REVENUE.
            </span>
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed mt-6 max-w-xl mx-auto">
            We abandon aesthetic fluff for mathematical certainty. Our systems are built purely to acquire customers and reduce operational friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <ServiceCard 
              key={idx} 
              title={service.title} 
              description={service.description} 
              icon={service.icon} 
              color={service.color} 
              delay={service.delay} 
            />
          ))}
        </div>

      </div>
    </section>
  );
}
