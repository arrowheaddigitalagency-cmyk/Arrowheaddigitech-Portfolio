import React, { useRef, useMemo, Suspense, lazy } from "react";
import { ArrowRight, TrendingUp, Star, BarChart2, MousePointer } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────
   3D SCENE — lightweight, GPU-friendly
───────────────────────────────────────────────────── */

/** Single floating glass shard */
function GlassShard({
  pos, rot, scale, color, speed,
}: {
  pos: [number, number, number];
  rot: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const t0 = useRef(Math.random() * 100);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed + t0.current;
    mesh.current.position.y = pos[1] + Math.sin(t * 0.7) * 0.4;
    mesh.current.position.x = pos[0] + Math.sin(t * 0.4) * 0.15;
    mesh.current.rotation.x += 0.003 * speed;
    mesh.current.rotation.y += 0.004 * speed;
    mesh.current.rotation.z += 0.002 * speed;
  });

  return (
    <mesh ref={mesh} position={pos} rotation={rot} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.18}
        roughness={0.05}
        metalness={0.3}
        wireframe={false}
      />
    </mesh>
  );
}

/** Outer wireframe ring */
function WireRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed;
    mesh.current.rotation.x = t * 0.3;
    mesh.current.rotation.z = t * 0.2;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[radius, 0.04, 16, 80]} />
      <meshStandardMaterial color={color} transparent opacity={0.12} roughness={0.2} />
    </mesh>
  );
}

/** Central glowing orb */
function CoreOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04);
    (mesh.current.material as THREE.MeshStandardMaterial).opacity = 0.55 + Math.sin(t * 0.8) * 0.08;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color="#FF5A1F" transparent opacity={0.55} roughness={0.1} metalness={0.4} />
    </mesh>
  );
}

/** Floating particles */
function Particles({ count = 80 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.015;
    points.current.rotation.x = Math.sin(t * 0.08) * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#FF5A1F" transparent opacity={0.35} depthWrite={false} />
    </points>
  );
}

/** Full hero scene */
function HeroScene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);

  const shards = useMemo(() => [
    { pos: [ 2.2,  0.8, -1] as [number,number,number], rot: [0.4, 0.2, 0.1] as [number,number,number], scale: 0.55, color: "#FF5A1F", speed: 0.6 },
    { pos: [-2.5, -0.6, -2] as [number,number,number], rot: [0.1, 0.5, 0.3] as [number,number,number], scale: 0.4,  color: "#3B82F6", speed: 0.8 },
    { pos: [ 1.0, -1.8, -1] as [number,number,number], rot: [0.8, 0.1, 0.6] as [number,number,number], scale: 0.35, color: "#FF5A1F", speed: 1.0 },
    { pos: [-1.2,  1.6, -3] as [number,number,number], rot: [0.2, 0.9, 0.4] as [number,number,number], scale: 0.5,  color: "#3B82F6", speed: 0.5 },
    { pos: [ 3.2, -1.2, -2] as [number,number,number], rot: [0.6, 0.3, 0.8] as [number,number,number], scale: 0.3,  color: "#8B5CF6", speed: 0.9 },
    { pos: [-3.0,  0.4, -3] as [number,number,number], rot: [0.3, 0.7, 0.2] as [number,number,number], scale: 0.45, color: "#FF5A1F", speed: 0.7 },
  ], []);

  useFrame(() => {
    if (!groupRef.current) return;
    const [mx, my] = mouse.current;
    groupRef.current.rotation.y += (mx * 0.15 - groupRef.current.rotation.y) * 0.04;
    groupRef.current.rotation.x += (-my * 0.1 - groupRef.current.rotation.x) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]}  intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -3, -3]} intensity={0.4} color="#3B82F6" />
      <pointLight position={[0, 0, 2]} intensity={1.5} color="#FF5A1F" distance={8} />

      <CoreOrb />
      <WireRing radius={2.2} color="#FF5A1F" speed={0.4} />
      <WireRing radius={3.2} color="#3B82F6" speed={0.25} />

      {shards.map((s, i) => <GlassShard key={i} {...s} />)}
      <Particles count={80} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────
   KPI WIDGETS — glass cards (unchanged)
───────────────────────────────────────────────────── */

function KpiLeadCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[210px]">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="w-3 h-3 text-emerald-600" />
          </div>
          <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">New Lead</span>
        </div>
        <span className="text-[9px] font-700 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">Qualified</span>
      </div>
      <p className="text-sm font-700 text-ink-900 mb-0.5">Dubai Car Rental Co.</p>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-ink-100">
        <span className="text-[10px] text-ink-400 font-500">via Google Ads</span>
        <span className="text-[10px] font-600 text-brand-orange-500">2m ago</span>
      </div>
    </div>
  );
}

function KpiRatingCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[178px]">
      <div className="flex gap-0.5 mb-1.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-2xl font-extrabold text-ink-900 leading-none">5.0</p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Google Rating</p>
      <p className="text-[10px] font-500 text-ink-300">47 verified reviews</p>
    </div>
  );
}

function KpiRevenueCard() {
  const bars = [38, 55, 42, 72, 50, 84, 62, 91, 56, 88, 70, 96];
  return (
    <div className="kpi-glass rounded-2xl px-4 py-4 w-[220px]">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 text-brand-blue-500" />
          <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Revenue</span>
        </div>
        <span className="text-[10px] font-700 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">↑ 145%</span>
      </div>
      <p className="text-xl font-extrabold text-ink-900 mb-3">$48,200 <span className="text-xs font-600 text-ink-400">/ mo</span></p>
      <div className="flex items-end gap-[3px] h-9">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background: i >= bars.length - 3
                ? "linear-gradient(180deg,#3B82F6,#60a5fa)"
                : "linear-gradient(180deg,#dbeafe,#eff6ff)"
            }}
          />
        ))}
      </div>
    </div>
  );
}

function KpiLiveCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[162px]">
      <div className="flex items-center gap-2 mb-2">
        <div className="relative w-2.5 h-2.5">
          <div className="absolute inset-0 rounded-full bg-emerald-500" />
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
        </div>
        <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Active Now</span>
      </div>
      <p className="text-3xl font-extrabold text-ink-900 leading-none">24</p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Live projects</p>
    </div>
  );
}

function KpiConvCard() {
  return (
    <div className="kpi-glass rounded-2xl px-4 py-3.5 w-[178px]">
      <div className="flex items-center gap-2 mb-2">
        <MousePointer className="w-3.5 h-3.5 text-brand-orange-500" />
        <span className="text-[10px] font-700 text-ink-400 uppercase tracking-widest">Conversion</span>
      </div>
      <p className="text-2xl font-extrabold text-ink-900 leading-none">3.2<span className="text-base">x</span></p>
      <p className="text-[10px] font-600 text-ink-400 mt-1">Avg. lift delivered</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────────────────── */

export default function InteractiveHero() {
  const heroRef   = useRef<HTMLElement>(null);
  const mouseRef  = useRef<[number, number]>([0, 0]);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  /* Track mouse for 3D scene interaction — throttled to RAF */
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = [
      ((e.clientX - rect.left) / rect.width  - 0.5) * 2,
      ((e.clientY - rect.top)  / rect.height - 0.5) * 2,
    ];
  };

  const stats = [
    { value: "150+", label: "Clients"   },
    { value: "250+", label: "Projects"  },
    { value: "12+",  label: "Years"     },
    { value: "98%",  label: "Retention" },
  ];

  return (
    <section
      ref={heroRef}
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-white overflow-hidden flex flex-col"
    >
      {/* ── Background layers ──────────────────────── */}
      <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
      <div className="absolute -top-[10%] right-[-5%] w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,220,195,0.5) 0%, transparent 70%)" }} />
      <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(191,219,254,0.35) 0%, transparent 70%)" }} />

      {/* ── 3D canvas — fills the right half ─────────── */}
      <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full pointer-events-none z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 40 }}
            gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
            dpr={[1, 1.5]}
          >
            <HeroScene mouse={mouseRef} />
          </Canvas>
        </Suspense>
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="container-xl w-full grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 xl:gap-16 items-center pt-28 pb-12 lg:pt-20 lg:pb-12">

          {/* LEFT ── Copy */}
          <div className="flex flex-col max-w-[540px]">

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="pill-badge pill-orange self-start mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse shrink-0" />
              Web Development · AI Websites · Digital Growth
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl xl:text-[3.6rem] font-extrabold text-ink-900 leading-[1.07] tracking-tight mb-5"
            >
              Building Digital
              <span className="block">Systems That</span>
              <span className="block text-gradient-orange">Actually Grow.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-ink-500 leading-relaxed mb-7 max-w-[460px]"
            >
              Custom Websites, AI-Powered Experiences, and Growth Infrastructure designed to generate leads, increase credibility, and scale businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <a href="#work" className="btn-primary btn-primary-shimmer py-3.5 px-7 text-sm">
                View Case Studies
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#contact" className="btn-outline py-3.5 px-7 text-sm group">
                Book Strategy Call
                <ArrowRight className="w-4 h-4 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="flex flex-wrap gap-x-7 gap-y-3 pt-5 border-t border-ink-100"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 + i * 0.07 }}
                >
                  <p className="text-[1.6rem] font-extrabold text-ink-900 leading-none">{s.value}</p>
                  <p className="text-[11px] text-ink-400 font-600 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT ── KPI cards layered over the 3D scene */}
          <div className="relative hidden lg:block" style={{ height: "520px" }}>

            {/* Depth glow behind cards */}
            <div className="absolute top-[15%] left-[8%] right-[8%] bottom-[10%] rounded-[32px] pointer-events-none"
              style={{ background: "linear-gradient(135deg,rgba(255,220,200,0.2) 0%,rgba(191,219,254,0.2) 100%)", filter: "blur(48px)" }} />

            {/* KPI Revenue — top-left */}
            <motion.div
              className="absolute top-[4%] left-[-4%] z-20"
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiRevenueCard />
            </motion.div>

            {/* KPI Rating — top-right */}
            <motion.div
              className="absolute top-[8%] right-[0%] z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiRatingCard />
            </motion.div>

            {/* KPI Lead — mid-left */}
            <motion.div
              className="absolute top-[42%] left-[-5%] z-20"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiLeadCard />
            </motion.div>

            {/* KPI Live — mid-right */}
            <motion.div
              className="absolute top-[38%] right-[1%] z-20"
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2.1 }}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <KpiLiveCard />
            </motion.div>

            {/* KPI Conversion — bottom-left */}
            <motion.div
              className="absolute bottom-[6%] left-[4%] z-20"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <KpiConvCard />
            </motion.div>

            {/* Dot cluster */}
            <div className="absolute top-[55%] right-[20%] grid grid-cols-4 gap-1.5 pointer-events-none z-0 opacity-40">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-ink-200" />
              ))}
            </div>
          </div>

        </div>
      </motion.div>

      {/* ── Client ticker ─────────────────────────────── */}
      <div className="relative z-10 border-t border-ink-100 bg-surface-1 overflow-hidden">
        <div className="py-3 text-center">
          <span className="text-[10px] font-700 text-ink-300 uppercase tracking-[0.2em]">
            Trusted by businesses across 25+ industries
          </span>
        </div>
        <div className="pb-4 flex whitespace-nowrap overflow-hidden">
          <div className="flex items-center animate-marquee shrink-0">
            {[...Array(2)].map((_, pass) => (
              <div key={pass} className="flex items-center gap-0 shrink-0">
                {[
                  "YalaRide", "America Needs Nurses", "Go Jetter Tours",
                  "Priceless Rent-A-Car", "Cars Compound", "Atlanta Car Rental",
                  "Drive Kleen", "VIP Cars", "Moiz & Sons Elevator",
                ].map((name) => (
                  <span key={`${pass}-${name}`} className="px-8 text-xs font-700 text-ink-300 hover:text-ink-600 transition-colors cursor-default uppercase tracking-widest">
                    {name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
