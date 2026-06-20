import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import CanvasErrorBoundary from "./CanvasErrorBoundary";

/* ─── Very subtle drifting particles for the light theme ─ */
function SoftParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orange = new THREE.Color("#FF5A1F");
    const blue   = new THREE.Color("#3B82F6");

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;

      const c = Math.random() < 0.5 ? orange : blue;
      col[i * 3]     = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    const arr = attr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += 0.018;
      arr[i * 3]     += Math.sin(t * 0.3 + i) * 0.005;
      if (arr[i * 3 + 1] > 32) {
        arr[i * 3 + 1] = -32;
        arr[i * 3]     = (Math.random() - 0.5) * 80;
      }
    }
    attr.needsUpdate = true;
    ref.current.rotation.y = t * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        vertexColors
        transparent
        opacity={0.12}
        blending={THREE.NormalBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Fog + scene setup ─────────────────────────────── */
function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2(0xffffff, 0.004);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

export default function AmbientBackground3D() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-white">
      <CanvasErrorBoundary fallback={null}>
        <Canvas
          camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 120 }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
        >
          <SceneSetup />
          <ambientLight intensity={1} />
          <SoftParticles count={60} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
