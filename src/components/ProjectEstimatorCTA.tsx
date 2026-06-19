import React, { useRef, useMemo, useState } from "react";
import { ArrowRight, Phone, Mail, Globe, MapPin, Send } from "lucide-react";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// 3D Background specific to the contact experience
function ContactDust({ count = 80 }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += 0.015; // Slow float upward
      array[i * 3] += Math.sin(time * 0.3 + i) * 0.004;

      if (array[i * 3 + 1] > 8) {
        array[i * 3 + 1] = -8;
        array[i * 3] = (Math.random() - 0.5) * 20;
      }
    }
    posAttr.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#FF5A1F"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ProjectEstimatorCTA() {
  const [formState, setFormState] = useState({ name: "", email: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormState({ name: "", email: "", msg: "" });
    }
  };

  const contactDetails = [
    {
      label: "Phone",
      val: "+92 300 0955490",
      href: "tel:+923000955490",
      icon: <Phone className="w-5 h-5 text-brand-orange-500" />
    },
    {
      label: "Email",
      val: "info@arrowheaddigitech.com",
      href: "mailto:info@arrowheaddigitech.com",
      icon: <Mail className="w-5 h-5 text-brand-blue-500" />
    },
    {
      label: "Website",
      val: "www.arrowheaddigitech.com",
      href: "https://www.arrowheaddigitech.com",
      icon: <Globe className="w-5 h-5 text-emerald-500" />
    },
    {
      label: "Location",
      val: "Lahore, Pakistan",
      href: "https://maps.google.com",
      icon: <MapPin className="w-5 h-5 text-indigo-500" />
    }
  ];

  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] text-white relative overflow-hidden text-left border-t border-white/5">
      
      {/* 3D WebGL Canvas for background particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60">
      <CanvasErrorBoundary fallback={null}>
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[2, 3, 2]} color="#FF5A1F" intensity={1.5} />
          <pointLight position={[-2, -3, 2]} color="#3B82F6" intensity={1.5} />
          <ContactDust count={90} />
        </Canvas>
      </CanvasErrorBoundary>
      </div>

      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 w-full">
        
        {/* Monospaced Protocol Label */}
        <div className="flex items-center gap-3 mb-16 border-b border-white/10 pb-6">
          <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-slate-400">
            SYSTEM.INITIATE_PROTOCOL_LEADS();
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Copy & Details Cards (Spans 6) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tighter leading-[0.95] mb-8">
              LET'S GROW <br />
              YOUR BUSINESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 to-amber-400">
                TOGETHER.
              </span>
            </h2>

            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-lg mb-12">
              Ready to get more leads, more sales, and more profit? Arrowhead Marketing helps businesses build a stronger brand, attract the right customers, and turn digital attention into real business growth.
            </p>

            {/* Direct Line Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {contactDetails.map((det, i) => (
                <a
                  key={i}
                  href={det.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex gap-4 items-center border border-white/10 rounded-lg p-5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-brand-orange-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,90,31,0.05)]"
                >
                  <div className="p-2 border border-white/10 rounded bg-white/5 group-hover:bg-white/10 transition-colors">
                    {det.icon}
                  </div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">{det.label}</span>
                    <span className="block text-sm font-bold text-slate-200 group-hover:text-white transition-colors mt-0.5">{det.val}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Premium Glowing Input Form (Spans 6) */}
          <div className="lg:col-span-6 border border-white/10 rounded-2xl bg-white/[0.01] backdrop-blur-md p-8 sm:p-10 relative">
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-20"
              >
                <div className="w-16 h-16 rounded-full border border-emerald-500/20 bg-emerald-500/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">Protocol Successful</h3>
                <p className="text-sm text-slate-400 font-medium max-w-xs">
                  Your details have been successfully transmitted. Our growth team will establish contact within 1 hour.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-mono tracking-widest uppercase text-slate-500 font-bold">01. Identity Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-lg px-4 py-4 text-base font-bold placeholder-slate-600 focus:outline-none focus:border-brand-orange-500 focus:shadow-[0_0_20px_rgba(255,90,31,0.2)] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-mono tracking-widest uppercase text-slate-500 font-bold">02. Communication Channel</label>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-lg px-4 py-4 text-base font-bold placeholder-slate-600 focus:outline-none focus:border-brand-orange-500 focus:shadow-[0_0_20px_rgba(255,90,31,0.2)] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[9px] font-mono tracking-widest uppercase text-slate-500 font-bold">03. Project Strategy / Scope</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your growth objective..."
                    value={formState.msg}
                    onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                    className="w-full bg-slate-950 border border-white/10 text-white rounded-lg px-4 py-4 text-base font-bold placeholder-slate-600 focus:outline-none focus:border-brand-orange-500 focus:shadow-[0_0_20px_rgba(255,90,31,0.2)] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full flex items-center justify-center gap-4 bg-white text-black py-4 font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-brand-orange-500 hover:text-white transition-colors"
                >
                  Initiate Connection
                  <Send className="w-4 h-4 group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}

// Icon wrapper for submitted state
function CheckCircle2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
