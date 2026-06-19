import React, { useRef, useMemo } from "react";
import { ArrowRight, CheckCircle, Shield, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// Fallback visual in case WebGL loses context or crashes
const HeroFallback = () => (
  <div className="absolute inset-0 bg-[#0d0d0d] flex items-center justify-center p-8">
    <div className="w-full h-full border border-white/5 bg-white/[0.01] rounded-xl flex flex-col justify-between p-6 relative overflow-hidden">
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">SYSTEM TELEMETRY</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <div className="flex-1 flex items-end justify-between gap-3 mt-8">
        {[40, 60, 45, 80, 55, 95, 70, 85, 100].map((h, i) => (
          <div 
            key={i} 
            className="flex-1 bg-gradient-to-t from-brand-orange-500 to-brand-orange-600 rounded-sm transition-all duration-1000" 
            style={{ height: `${h}%` }} 
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
    </div>
  </div>
);

// 3D Dashboard Component for React Three Fiber Canvas
function DashboardGroup() {
  const groupRef = useRef<THREE.Group>(null);

  // Generate grid points for interactive bar charts
  const bars = useMemo(() => {
    const list = [];
    const step = 1.6;
    for (let x = -2.4; x <= 2.4; x += step) {
      for (let z = -2.4; z <= 2.4; z += step) {
        list.push({
          x,
          z,
          offset: Math.random() * Math.PI * 2,
          color: Math.random() > 0.5 ? "#FF5A1F" : "#3B82F6",
          speed: Math.random() * 1.5 + 1.0,
        });
      }
    }
    return list;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Perspective Parallax Tilt
    const targetRotX = (pointer.y * 0.4) - 0.4; 
    const targetRotY = (pointer.x * 0.4) + 0.4;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);

    // Animate individual heights of coordinate bars
    const children = groupRef.current.children;
    bars.forEach((bar, idx) => {
      const mesh = children[idx + 1] as THREE.Mesh; // Skip first child (grid floor)
      if (mesh) {
        const heightScale = 1.0 + Math.sin(time * bar.speed + bar.offset) * 0.8;
        mesh.scale.set(1, heightScale, 1);
        mesh.position.y = heightScale / 2; // Pin to ground grid
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, -2.5, 0]}>
      {/* Glowing blueprint grid floor */}
      <gridHelper args={[12, 12, "#FF5A1F", "#334155"]} position={[0, 0, 0]} />

      {/* Grid columns */}
      {bars.map((b, idx) => (
        <mesh key={idx} position={[b.x, 0, b.z]}>
          <boxGeometry args={[0.5, 2, 0.5]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.color}
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Floating glowing tech panel rings */}
      <mesh position={[0, 2.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.2, 0.04, 8, 64]} />
        <meshBasicMaterial color="#FF5A1F" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.0, 0.03, 8, 64]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function InteractiveHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden text-left py-20 lg:py-0">
      
      {/* Matrix Mesh Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,#000_50%,transparent_100%)] pointer-events-none" />

      {/* Subtle Radial Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-brand-orange-500/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Premium Copy Editorial */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          {/* Monospaced Protocol Label */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full mb-8 bg-white/5 backdrop-blur-sm self-start"
          >
            <span className="w-2 h-2 rounded-full bg-brand-orange-500 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase font-bold">
              ARROWHEAD DIGITAL SYSTEMS // PLATFORM ACTIVE
            </span>
          </motion.div>

          {/* Brutalist Lead Generation Header */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold text-white leading-[0.95] tracking-tighter"
          >
            DIGITAL SOLUTIONS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 via-amber-400 to-brand-orange-600">
              THAT BRING YOU LEADS.
            </span>
          </motion.h1>

          {/* Description Copy */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg sm:text-xl text-slate-400 font-medium leading-relaxed max-w-xl"
          >
            Arrowhead Marketing helps businesses grow with powerful digital marketing strategies that attract the right audience, build brand awareness, and turn clicks into real customers.
          </motion.p>

          {/* Key Highlights Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl border-t border-white/10 pt-8"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-brand-orange-500 flex-shrink-0" />
              <span className="text-sm font-bold text-slate-200">Build Your Brand</span>
            </div>
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-brand-blue-500 flex-shrink-0" />
              <span className="text-sm font-bold text-slate-200">Get More Leads</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-sm font-bold text-slate-200">Grow With Confidence</span>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-6"
          >
            <a 
              href="#contact" 
              className="group w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase rounded-sm hover:bg-slate-200 transition-colors"
            >
              Get More Leads
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
            <a 
              href="#work" 
              className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded-sm hover:border-white/40 hover:bg-white/5 transition-colors"
            >
              Analyze Case Studies
            </a>
          </motion.div>

        </div>

        {/* Right Side: High Fidelity 3D Interactive Telemetry Canvas */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 h-[500px] w-full relative border border-white/10 rounded-xl bg-white/[0.02] backdrop-blur-md overflow-hidden"
        >
          {/* Dashboard overlay metric cards (glowing HTML panels on top of WebGL) */}
          <div className="absolute top-6 left-6 z-20 p-4 border border-white/10 bg-black/60 backdrop-blur-md rounded-lg flex flex-col pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider font-bold">SYSTEM ROAS</span>
            <span className="text-2xl font-mono font-extrabold text-white mt-1">4.82x</span>
          </div>

          <div className="absolute bottom-6 right-6 z-20 p-4 border border-white/10 bg-black/60 backdrop-blur-md rounded-lg flex flex-col pointer-events-none">
            <span className="text-[10px] font-mono text-slate-400 tracking-wider font-bold">LEAD SPEED</span>
            <span className="text-lg font-mono font-extrabold text-emerald-400 mt-1">ACTIVE (100%)</span>
          </div>

          <CanvasErrorBoundary fallback={<HeroFallback />}>
            <Canvas camera={{ position: [0, 2, 7.5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 10, 5]} intensity={1.5} color="#FF5A1F" />
              <pointLight position={[-5, 5, -5]} intensity={0.8} color="#3B82F6" />
              <DashboardGroup />
            </Canvas>
          </CanvasErrorBoundary>
        </motion.div>

      </div>

      {/* Soft Bottom shadow */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
    </section>
  );
}
