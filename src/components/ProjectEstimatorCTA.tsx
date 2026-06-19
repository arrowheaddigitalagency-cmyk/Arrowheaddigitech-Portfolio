import React, { useRef, useMemo, useState } from "react";
import { Phone, Mail, Globe, MapPin, Send, ShieldCheck, Clock, ArrowRight } from "lucide-react";
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

export default function InitiateProtocol() {
  const [formState, setFormState] = useState({ name: "", email: "", budget: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 8000);
      setFormState({ name: "", email: "", budget: "", msg: "" });
    }
  };

  const contactDetails = [
    { label: "Direct Line", val: "+92 300 0955490", href: "tel:+923000955490", icon: <Phone className="w-5 h-5 text-white" /> },
    { label: "Encrypted Email", val: "info@arrowheaddigitech.com", href: "mailto:info@arrowheaddigitech.com", icon: <Mail className="w-5 h-5 text-white" /> },
    { label: "Headquarters", val: "Lahore, Pakistan", href: "https://maps.google.com", icon: <MapPin className="w-5 h-5 text-white" /> }
  ];

  return (
    <section id="contact" className="py-32 bg-[#02040a] text-white relative overflow-hidden text-left border-t border-white/5">
      
      {/* 3D WebGL Canvas for background particles */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-40">
        <CanvasErrorBoundary fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <ambientLight intensity={0.4} />
            <pointLight position={[2, 3, 2]} color="#FF5A1F" intensity={1.5} />
            <pointLight position={[-2, -3, 2]} color="#3B82F6" intensity={1.5} />
            <ContactDust count={90} />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,#1e3a8a20_0%,transparent_70%)] pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Left Column: Command Copy (Spans 5) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-brand-orange-500">
                INITIATE GROWTH PROTOCOL
              </span>
            </div>

            <h2 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tighter leading-[0.95] mb-8">
              COMMENCE <br />
              <span className="text-slate-500">DEPLOYMENT.</span>
            </h2>

            <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md mb-12">
              Submit your project parameters. Our growth engineering team will analyze your requirements and formulate a high-velocity acquisition strategy.
            </p>

            {/* Trust SLA Indicators */}
            <div className="space-y-6 mb-16 border-l-2 border-slate-800 pl-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-500 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Under 15-Minute Response SLA</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">Guaranteed response time during active business hours.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-500 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-white tracking-tight">Enterprise Confidentiality</h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">All project details are secured under strict NDA protocols.</p>
                </div>
              </div>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-col gap-4 max-w-sm">
              {contactDetails.map((det, i) => (
                <a
                  key={i}
                  href={det.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex gap-4 items-center p-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors group"
                >
                  <div className="shrink-0">{det.icon}</div>
                  <div>
                    <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold">{det.label}</span>
                    <span className="block text-sm font-bold text-white mt-1 group-hover:text-brand-orange-500 transition-colors">{det.val}</span>
                  </div>
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: The Application Interface (Spans 7) */}
          <div className="lg:col-span-7 relative">
            
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange-500 to-blue-500 rounded-2xl blur opacity-20 pointer-events-none" />
            
            <div className="relative border border-slate-800 rounded-2xl bg-[#05080f] p-8 sm:p-12 shadow-2xl">
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-32"
                >
                  <ShieldCheck className="w-16 h-16 text-emerald-500 mb-6" />
                  <h3 className="text-3xl font-extrabold text-white tracking-tight mb-4">Protocol Active</h3>
                  <p className="text-slate-400 font-medium max-w-sm">
                    Transmission secured. An Arrowhead Director will establish contact at the provided coordinates shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-3 relative">
                      <label className={`text-[10px] font-mono tracking-widest uppercase font-bold transition-colors ${focusedInput === 'name' ? 'text-brand-orange-500' : 'text-slate-500'}`}>01. Identity</label>
                      <input
                        type="text"
                        required
                        placeholder="Authorized Name"
                        value={formState.name}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-slate-950 border-b-2 border-slate-800 text-white px-0 py-4 text-xl font-bold placeholder-slate-700 focus:outline-none focus:border-brand-orange-500 transition-all rounded-none"
                      />
                    </div>
                    <div className="flex flex-col gap-3 relative">
                      <label className={`text-[10px] font-mono tracking-widest uppercase font-bold transition-colors ${focusedInput === 'email' ? 'text-blue-500' : 'text-slate-500'}`}>02. Comm Channel</label>
                      <input
                        type="email"
                        required
                        placeholder="Corporate Email"
                        value={formState.email}
                        onFocus={() => setFocusedInput('email')}
                        onBlur={() => setFocusedInput(null)}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-slate-950 border-b-2 border-slate-800 text-white px-0 py-4 text-xl font-bold placeholder-slate-700 focus:outline-none focus:border-blue-500 transition-all rounded-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 relative">
                    <label className={`text-[10px] font-mono tracking-widest uppercase font-bold transition-colors ${focusedInput === 'budget' ? 'text-emerald-500' : 'text-slate-500'}`}>03. Capital Allocation</label>
                    <select
                      required
                      value={formState.budget}
                      onFocus={() => setFocusedInput('budget')}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full bg-slate-950 border-b-2 border-slate-800 text-white px-0 py-4 text-xl font-bold focus:outline-none focus:border-emerald-500 transition-all rounded-none appearance-none"
                    >
                      <option value="" disabled className="text-slate-700">Select Project Budget Tier</option>
                      <option value="10k">$10,000 - $25,000</option>
                      <option value="25k">$25,000 - $50,000</option>
                      <option value="50k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+ (Enterprise)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 relative">
                    <label className={`text-[10px] font-mono tracking-widest uppercase font-bold transition-colors ${focusedInput === 'msg' ? 'text-brand-orange-500' : 'text-slate-500'}`}>04. Strategic Objective</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Outline your acquisition targets or technical requirements..."
                      value={formState.msg}
                      onFocus={() => setFocusedInput('msg')}
                      onBlur={() => setFocusedInput(null)}
                      onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                      className="w-full bg-slate-950 border-b-2 border-slate-800 text-white px-0 py-4 text-xl font-bold placeholder-slate-700 focus:outline-none focus:border-brand-orange-500 transition-all resize-none rounded-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full flex items-center justify-between bg-white text-black py-6 px-8 font-extrabold text-lg tracking-widest uppercase hover:bg-brand-orange-500 hover:text-white transition-colors mt-4"
                  >
                    <span>Transmit Requirements</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
