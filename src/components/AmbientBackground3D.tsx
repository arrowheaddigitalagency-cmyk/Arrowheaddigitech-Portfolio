import React, { useEffect, useState, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

// Section mapping based on scroll ratio
function getSectionFromRatio(ratio: number) {
  if (ratio > 0.15 && ratio <= 0.33) return "services";
  if (ratio > 0.33 && ratio <= 0.48) return "about";
  if (ratio > 0.48 && ratio <= 0.62) return "process";
  if (ratio > 0.62 && ratio <= 0.77) return "case-studies";
  if (ratio > 0.77 && ratio <= 0.86) return "achievements";
  if (ratio > 0.86 && ratio <= 0.93) return "team";
  if (ratio > 0.93 && ratio <= 0.97) return "testimonials";
  if (ratio > 0.97) return "estimate";
  return "hero";
}

// 1. Stellar Space Dust Particles
function SpaceDust({ count = 120 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orange = new THREE.Color("#FF5A1F");
    const blue = new THREE.Color("#3B82F6");
    const white = new THREE.Color("#FFFFFF");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 55;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      const rand = Math.random();
      let color = white;
      if (rand < 0.35) color = orange;
      else if (rand < 0.75) color = blue;

      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Rise upward
      array[i * 3 + 1] += 0.035;
      // Weave left/right
      array[i * 3] += Math.sin(time * 0.4 + i) * 0.008;

      // Wrap around boundaries
      if (array[i * 3 + 1] > 28) {
        array[i * 3 + 1] = -28;
        array[i * 3] = (Math.random() - 0.5) * 70;
      }
    }
    posAttr.needsUpdate = true;

    // Overall slow rotation of the space field
    pointsRef.current.rotation.y = time * 0.01;
    pointsRef.current.rotation.x = time * 0.005;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.45}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// 2. Interactive Floating Glass Geometry (Parallax layered shapes)
interface ShapeData {
  type: "sphere" | "box" | "torus";
  position: [number, number, number];
  rotationSpeed: [number, number, number];
  driftSpeed: number;
  phase: number;
  scale: number;
}

function GlassShapes({ scrollRatio }: { scrollRatio: number }) {
  const shapesRef = useRef<THREE.Group>(null);

  const shapes: ShapeData[] = useMemo(() => {
    const list: ShapeData[] = [];
    const types: ("sphere" | "box" | "torus")[] = ["sphere", "box", "torus"];
    for (let i = 0; i < 9; i++) {
      list.push({
        type: types[i % 3],
        position: [
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 35,
          (Math.random() - 0.5) * 20 - 5,
        ],
        rotationSpeed: [
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.25,
          (Math.random() - 0.5) * 0.15,
        ],
        driftSpeed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
        scale: Math.random() * 0.8 + 0.8,
      });
    }
    return list;
  }, []);

  useFrame((state) => {
    if (!shapesRef.current) return;
    const time = state.clock.getElapsedTime();

    shapesRef.current.children.forEach((child, index) => {
      const data = shapes[index];
      if (!data) return;

      // Spin rotation
      child.rotation.x = time * data.rotationSpeed[0] + data.phase;
      child.rotation.y = time * data.rotationSpeed[1];
      child.rotation.z = time * data.rotationSpeed[2];

      // Organic hover drift
      const driftY = Math.sin(time * data.driftSpeed + data.phase) * 0.6;
      // Scroll-based parallax translation
      const scrollOffset = scrollRatio * 20.0;
      child.position.y = data.position[1] + driftY - scrollOffset;
    });
  });

  return (
    <group ref={shapesRef}>
      {shapes.map((s, idx) => {
        const key = idx;
        const geom =
          s.type === "sphere" ? (
            <sphereGeometry args={[1.6 * s.scale, 32, 32]} />
          ) : s.type === "box" ? (
            <boxGeometry args={[2.8 * s.scale, 2.8 * s.scale, 0.25]} />
          ) : (
            <torusGeometry args={[1.6 * s.scale, 0.35, 16, 100]} />
          );

        return (
          <mesh key={key} position={s.position}>
            {geom}
            <meshPhysicalMaterial
              color="#ffffff"
              transparent
              opacity={0.16}
              roughness={0.08}
              metalness={0.12}
              transmission={0.93}
              thickness={1.6}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// 3. Interactive Point Light & Directional lighting
function InteractiveLights({ currentSection }: { currentSection: string }) {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);
  const mouseLightRef = useRef<THREE.PointLight>(null);

  const [colors, intensities] = useMemo(() => {
    let l1Color = "#FF5A1F"; // Warm Orange
    let l2Color = "#3B82F6"; // Serene Blue
    let l1Int = 2.2;
    let l2Int = 1.8;

    if (currentSection === "services") {
      l1Color = "#FF4500";
      l2Color = "#FFA500";
      l1Int = 3.8;
      l2Int = 1.0;
    } else if (currentSection === "about") {
      l1Color = "#FF7A00";
      l2Color = "#FF007F";
      l1Int = 2.8;
      l2Int = 2.0;
    } else if (currentSection === "case-studies") {
      l1Color = "#0055FF";
      l2Color = "#00FFFF";
      l1Int = 1.4;
      l2Int = 4.2;
    } else if (currentSection === "estimate") {
      l1Color = "#FF4500";
      l2Color = "#FFFFFF";
      l1Int = 4.5;
      l2Int = 3.5;
    }
    return [
      { l1: new THREE.Color(l1Color), l2: new THREE.Color(l2Color) },
      { l1: l1Int, l2: l2Int }
    ];
  }, [currentSection]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { pointer } = state;

    // Orbiting light 1
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(time * 0.4) * 22;
      light1Ref.current.position.y = Math.cos(time * 0.35) * 16;
      light1Ref.current.color.lerp(colors.l1, 0.08);
      light1Ref.current.intensity = THREE.MathUtils.lerp(light1Ref.current.intensity, intensities.l1, 0.08);
    }

    // Orbiting light 2
    if (light2Ref.current) {
      light2Ref.current.position.x = -Math.sin(time * 0.35) * 26;
      light2Ref.current.position.y = -Math.cos(time * 0.45) * 18;
      light2Ref.current.color.lerp(colors.l2, 0.08);
      light2Ref.current.intensity = THREE.MathUtils.lerp(light2Ref.current.intensity, intensities.l2, 0.08);
    }

    // Smoothly follow the mouse pointer
    if (mouseLightRef.current) {
      const targetX = pointer.x * 24;
      const targetY = pointer.y * 18;
      mouseLightRef.current.position.x = THREE.MathUtils.lerp(mouseLightRef.current.position.x, targetX, 0.1);
      mouseLightRef.current.position.y = THREE.MathUtils.lerp(mouseLightRef.current.position.y, targetY, 0.1);
      mouseLightRef.current.intensity = THREE.MathUtils.lerp(mouseLightRef.current.intensity, 3.0, 0.08);
    }
  });

  return (
    <>
      <pointLight ref={light1Ref} distance={75} decay={2} position={[20, 15, 10]} />
      <pointLight ref={light2Ref} distance={65} decay={2} position={[-25, -15, 5]} />
      <pointLight ref={mouseLightRef} color="#FF9167" distance={45} decay={2} position={[0, 0, 8]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[0, 15, 20]} intensity={0.6} />
    </>
  );
}

// 4. Scene Camera & Fog Configuration
function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0xffffff, 0.005);
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}

// Main 3D Ambient Background component
export default function AmbientBackground3D() {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [currentSection, setCurrentSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const body = document.body;
      const top = doc.scrollTop || body.scrollTop;
      const heightVal = doc.scrollHeight - window.innerHeight;
      const ratio = heightVal > 0 ? top / heightVal : 0;
      setScrollRatio(ratio);
      setCurrentSection(getSectionFromRatio(ratio));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getDynamicBackgroundGradients = () => {
    switch (currentSection) {
      case "services":
        return "radial-gradient(circle at 15% 25%, rgba(255, 90, 31, 0.05) 0%, transparent 55%), radial-gradient(circle at 85% 75%, rgba(255, 180, 0, 0.04) 0%, transparent 60%), #fcfcfd";
      case "about":
        return "radial-gradient(circle at 30% 30%, rgba(255, 90, 31, 0.05) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(59, 130, 246, 0.03) 0%, transparent 60%), #fafbfd";
      case "case-studies":
        return "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 60%), #f9fcff";
      case "team":
      case "achievements":
        return "radial-gradient(circle at 50% 15%, rgba(255, 90, 31, 0.04) 0%, transparent 50%), radial-gradient(circle at 10% 85%, rgba(226, 232, 240, 0.4) 0%, transparent 50%), #fafafc";
      case "testimonials":
        return "radial-gradient(circle at 20% 50%, rgba(255, 90, 31, 0.03) 0%, transparent 45%), radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.03) 0%, transparent 45%), #fcfcfd";
      case "estimate":
        return "radial-gradient(circle at 50% 50%, rgba(255, 69, 0, 0.06) 0%, transparent 70%), radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 1) 0%, transparent 60%), #f8fafc";
      default:
        return "radial-gradient(circle at 30% 40%, rgba(255, 90, 31, 0.05) 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.04) 0%, transparent 50%), #fafbfc";
    }
  };

  return (
    <div
      className="fixed inset-0 w-full h-full -z-20 transition-all duration-1000 ease-out overflow-hidden pointer-events-none"
      id="3d-ambient-viewport"
      style={{ background: getDynamicBackgroundGradients() }}
    >
      <CanvasErrorBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 100 }}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
          style={{ pointerEvents: "none" }}
        >
          <SceneSetup />
          <InteractiveLights currentSection={currentSection} />
          <SpaceDust count={120} />
          <GlassShapes scrollRatio={scrollRatio} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
