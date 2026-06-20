import React, { useRef, useMemo, Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────
   3D SCENE COMPONENTS
───────────────────────────────────────────────────── */

/** Floating glass icosahedron shard */
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
  const offset = useRef(Math.random() * 100);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed + offset.current;
    mesh.current.position.y = pos[1] + Math.sin(t * 0.6) * 0.35;
    mesh.current.position.x = pos[0] + Math.sin(t * 0.35) * 0.12;
    mesh.current.rotation.x += 0.0025 * speed;
    mesh.current.rotation.y += 0.003  * speed;
    mesh.current.rotation.z += 0.0015 * speed;
  });

  return (
    <mesh ref={mesh} position={pos} rotation={rot} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.16}
        roughness={0.08}
        metalness={0.25}
      />
    </mesh>
  );
}

/** Slow-rotating wireframe torus */
function WireRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed;
    mesh.current.rotation.x = t * 0.28;
    mesh.current.rotation.z = t * 0.18;
  });
  return (
    <mesh ref={mesh}>
      <torusGeometry args={[radius, 0.035, 16, 80]} />
      <meshStandardMaterial color={color} transparent opacity={0.1} roughness={0.2} />
    </mesh>
  );
}

/** Pulsing central orb */
function CoreOrb() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.1) * 0.035);
    (mesh.current.material as THREE.MeshStandardMaterial).opacity =
      0.5 + Math.sin(t * 0.75) * 0.07;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.65, 32, 32]} />
      <meshStandardMaterial
        color="#FF5A1F"
        transparent
        opacity={0.5}
        roughness={0.08}
        metalness={0.4}
      />
    </mesh>
  );
}

/** Inner glow halo around orb */
function OrbHalo() {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.06);
    (mesh.current.material as THREE.MeshStandardMaterial).opacity =
      0.06 + Math.sin(t * 0.9) * 0.03;
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.1, 32, 32]} />
      <meshStandardMaterial
        color="#FF5A1F"
        transparent
        opacity={0.07}
        roughness={1}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

/** Slow drifting particle field */
function Particles({ count = 60 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.getElapsedTime();
    points.current.rotation.y = t * 0.012;
    points.current.rotation.x = Math.sin(t * 0.07) * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#FF5A1F"
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </points>
  );
}

/** Full assembled scene */
function HeroScene({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null);

  const shards = useMemo<Array<{
    pos: [number,number,number];
    rot: [number,number,number];
    scale: number; color: string; speed: number;
  }>>(() => [
    { pos: [ 2.2,  0.8, -1.0], rot: [0.4, 0.2, 0.1], scale: 0.52, color: "#FF5A1F", speed: 0.55 },
    { pos: [-2.4, -0.5, -2.0], rot: [0.1, 0.5, 0.3], scale: 0.38, color: "#3B82F6", speed: 0.75 },
    { pos: [ 1.0, -1.7, -1.0], rot: [0.8, 0.1, 0.6], scale: 0.32, color: "#FF5A1F", speed: 0.95 },
    { pos: [-1.1,  1.5, -2.8], rot: [0.2, 0.9, 0.4], scale: 0.46, color: "#3B82F6", speed: 0.48 },
    { pos: [ 3.0, -1.1, -2.0], rot: [0.6, 0.3, 0.8], scale: 0.28, color: "#8B5CF6", speed: 0.85 },
    { pos: [-2.9,  0.3, -2.8], rot: [0.3, 0.7, 0.2], scale: 0.42, color: "#FF5A1F", speed: 0.65 },
  ], []);

  /* Smooth mouse-driven rotation */
  useFrame(() => {
    if (!group.current) return;
    const [mx, my] = mouse.current;
    group.current.rotation.y += (mx * 0.14 - group.current.rotation.y) * 0.035;
    group.current.rotation.x += (-my * 0.09 - group.current.rotation.x) * 0.035;
  });

  return (
    <group ref={group}>
      {/* Lighting */}
      <ambientLight intensity={0.75} />
      <directionalLight position={[5, 8, 5]}   intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -3, -3]} intensity={0.35} color="#3B82F6" />
      <pointLight       position={[0, 0, 2]}    intensity={1.4} color="#FF5A1F" distance={9} />

      {/* Core */}
      <CoreOrb />
      <OrbHalo />

      {/* Rings */}
      <WireRing radius={2.0} color="#FF5A1F" speed={0.38} />
      <WireRing radius={3.0} color="#3B82F6" speed={0.22} />

      {/* Shards */}
      {shards.map((s, i) => <GlassShard key={i} {...s} />)}

      {/* Particles */}
      <Particles count={60} />
    </group>
  );
}

/* ─────────────────────────────────────────────────────
   MAIN HERO — clean, premium, no KPI widgets
───────────────────────────────────────────────────── */

export default function InteractiveHero() {
  const heroRef  = useRef<HTMLElement>(null);
  const mouseRef = useRef<[number, number]>([0, 0]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5],  [1, 0]);

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
      {/* ── Subtle background layers ──────────────── */}
      <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
      <div
        className="absolute -top-[10%] right-[-5%] w-[620px] h-[620px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,220,195,0.45) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(191,219,254,0.3) 0%, transparent 70%)" }}
      />

      {/* ── 3D Canvas — right half, full height ──────── */}
      <div className="absolute top-0 right-0 w-full lg:w-[58%] h-full pointer-events-none z-0">
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

      {/* ── Copy — left column ───────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="container-xl w-full pt-28 pb-12 lg:pt-20 lg:pb-12">
          <div className="max-w-[560px]">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="pill-badge pill-orange self-start mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange-500 animate-pulse shrink-0" />
              Web Development · AI Websites · Digital Growth
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2.75rem] sm:text-5xl xl:text-[3.75rem] font-extrabold text-ink-900 leading-[1.07] tracking-tight mb-5"
            >
              Building Digital
              <span className="block">Systems That</span>
              <span className="block text-gradient-orange">Actually Grow.</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-ink-500 leading-relaxed mb-8 max-w-[460px]"
            >
              Custom Websites, AI-Powered Experiences, and Growth Infrastructure
              designed to generate leads, increase credibility, and scale businesses.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
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

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-ink-100"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 + i * 0.07 }}
                >
                  <p className="text-[1.65rem] font-extrabold text-ink-900 leading-none">{s.value}</p>
                  <p className="text-[11px] text-ink-400 font-600 mt-0.5 uppercase tracking-wider">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>

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
            {[0, 1].map((pass) => (
              <div key={pass} className="flex items-center shrink-0">
                {[
                  { name: "YalaRide",            logo: "/src/assets/images/client-logos/yalaride.png"           },
                  { name: "America Needs Nurses", logo: "/src/assets/images/client-logos/america-needs-nurses.png" },
                  { name: "Go Jetter Tours",      logo: "/src/assets/images/client-logos/go-jetter-tours.png"   },
                  { name: "Priceless Rent-A-Car", logo: "/src/assets/images/client-logos/priceless-rentacar.png"},
                  { name: "Cars Compound",        logo: "/src/assets/images/client-logos/cars-compound.png"     },
                  { name: "Atlanta Car Rental",   logo: "/src/assets/images/client-logos/atlanta-car-rental.png"},
                  { name: "Drive Kleen",          logo: "/src/assets/images/client-logos/drive-kleen.png"       },
                  { name: "VIP Cars",             logo: "/src/assets/images/client-logos/vip-cars.png"          },
                  { name: "Moiz & Sons Elevator", logo: "/src/assets/images/client-logos/moiz-sons-elevator.png"},
                ].map((client) => (
                  <div
                    key={`${pass}-${client.name}`}
                    className="px-8 flex items-center justify-center h-8"
                  >
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-6 w-auto object-contain opacity-40 hover:opacity-70 transition-opacity grayscale"
                      onError={(e) => {
                        /* fallback to text if logo file not yet placed */
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const span = document.createElement("span");
                        span.className = "text-xs font-700 text-ink-300 hover:text-ink-600 uppercase tracking-widest cursor-default whitespace-nowrap";
                        span.textContent = client.name;
                        el.parentElement?.appendChild(span);
                      }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
