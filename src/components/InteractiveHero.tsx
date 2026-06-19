import React, { useRef, useMemo, useState, useEffect } from "react";
import { ArrowRight, Activity, Layers, Target, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// Live ticking counters for the dashboard panels
function ActiveLeadCounter({ base = 12450 }) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);
  return <span>{count.toLocaleString()}</span>;
}

// 3D Cinematic Command Center Background
function CommandCenterScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);

  // Generate dense data streams
  const particles = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 40;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !particlesRef.current) return;
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Cinematic slow orbital parallax
    const targetRotX = (pointer.y * 0.15) - 0.2; 
    const targetRotY = (pointer.x * 0.15);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.02);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.02);

    // Flowing data particles
    particlesRef.current.rotation.y = time * 0.05;
    particlesRef.current.rotation.x = time * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Deep infinite grid */}
      <gridHelper args={[100, 100, "#FF5A1F", "#1e293b"]} position={[0, -4, 0]} />
      <gridHelper args={[100, 100, "#3B82F6", "#1e293b"]} position={[0, 4, 0]} />

      {/* Data particle stream */}
      <points ref={particlesRef} geometry={particles}>
        <pointsMaterial size={0.05} color="#FF5A1F" transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Massive glowing core rings */}
      <mesh position={[0, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[15, 0.05, 16, 100]} />
        <meshBasicMaterial color="#FF5A1F" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0, -15]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[25, 0.05, 16, 100]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export default function InteractiveHero() {
  return (
    <section className="relative h-screen w-full bg-[#030712] overflow-hidden flex items-center">
      
      {/* Full-bleed 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <CanvasErrorBoundary fallback={<div className="absolute inset-0 bg-[#030712]" />}>
          <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
            <fog attach="fog" args={['#030712', 5, 30]} />
            <ambientLight intensity={0.2} />
            <CommandCenterScene />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Vignette & Gradient Overlays for Readability */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_100%)] pointer-events-none opacity-80" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712] pointer-events-none opacity-90" />

      {/* Main Content Interface (Overlaying the 3D space) */}
      <div className="relative z-10 w-full h-full max-w-[1600px] mx-auto px-6 sm:px-12 flex flex-col justify-center pointer-events-none">
        
        {/* Top-left Telemetry Tag */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-32 left-6 sm:left-12 flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md"
        >
          <Terminal className="w-4 h-4 text-brand-orange-500" />
          <span className="text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase font-bold">
            GLOBAL COMMAND CENTER // ONLINE
          </span>
        </motion.div>

        {/* Central Brutalist Typography */}
        <div className="max-w-4xl mt-20 pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-[6rem] font-extrabold text-white leading-[0.95] tracking-tighter"
          >
            PRECISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange-500 via-amber-400 to-brand-orange-600">
              GROWTH AT SCALE.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-lg sm:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl border-l-2 border-brand-orange-500 pl-6"
          >
            Arrowhead operates at the intersection of high-end brand positioning and aggressive performance marketing. We engineer systems that capture markets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex items-center gap-6"
          >
            <a 
              href="#contact" 
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-slate-200 transition-colors"
            >
              Initiate Protocol
              <ArrowRight className="ml-3 w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Floating HUD Panels (Edges of screen) */}

        {/* Right HUD: Live Pipeline */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 w-[280px] p-6 border border-white/10 bg-[#030712]/80 backdrop-blur-xl pointer-events-auto"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Pipeline Activity</span>
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] text-slate-500 font-mono mb-1">Leads Routed (24h)</span>
              <div className="text-3xl font-mono font-extrabold text-white">
                <ActiveLeadCounter base={14580} />
              </div>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-mono mb-1">Avg. Conversion Latency</span>
              <div className="text-xl font-mono font-bold text-brand-orange-500">1.24s</div>
            </div>
          </div>
        </motion.div>

        {/* Bottom HUD: System Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          className="absolute bottom-12 right-6 sm:right-12 p-5 border border-white/10 bg-[#030712]/80 backdrop-blur-xl pointer-events-auto flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-brand-blue-500/10 border border-brand-blue-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-brand-blue-500" />
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-400 tracking-widest uppercase">Infrastructure</span>
            <span className="block text-sm font-bold text-white tracking-tight">Enterprise CRM Synced</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
