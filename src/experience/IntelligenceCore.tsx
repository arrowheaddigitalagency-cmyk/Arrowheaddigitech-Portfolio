'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/** Arrowhead brand crystal — orange / blue / silver (logo DNA). */
function ArrowheadCrystal({ progress }: { progress: React.RefObject<number> }) {
  const root = useRef<THREE.Group>(null);
  const crystal = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const field = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 1.8 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.62;
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame(({ clock, camera, pointer }, delta) => {
    if (!root.current) return;
    const t = clock.elapsedTime;
    const p = progress.current ?? 0;
    const d = Math.min(delta, 0.05);

    root.current.rotation.y += d * 0.18;
    root.current.rotation.x = THREE.MathUtils.lerp(
      root.current.rotation.x,
      pointer.y * 0.2 + p * 0.35,
      0.05,
    );
    root.current.position.x = THREE.MathUtils.lerp(root.current.position.x, 0.52 + pointer.x * 0.3, 0.05);
    root.current.position.y = Math.sin(t * 0.55) * 0.1;

    if (crystal.current) {
      crystal.current.rotation.y = t * 0.35;
      crystal.current.rotation.z = Math.sin(t * 0.4) * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.y = -t * 0.14;
      shell.current.rotation.x = t * 0.09;
    }
    if (rings.current) {
      rings.current.children.forEach((child, i) => {
        child.rotation.z = t * (0.12 + i * 0.04) * (i % 2 ? -1 : 1);
        child.rotation.x = 0.5 + i * 0.1;
        child.rotation.y = t * 0.05 * (i + 1);
      });
    }
    if (field.current) field.current.rotation.y = t * 0.045;

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.4 - p * 1.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.15 - p * 0.2, 0.04);
    camera.lookAt(0.3, 0, 0);
  });

  return (
    <group ref={root} position={[0.52, 0.02, 0]} scale={0.98}>
      <mesh scale={[3.6, 3.6, 3.6]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#FF5A1F" transparent opacity={0.045} depthWrite={false} />
      </mesh>

      <group ref={rings}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[0.55 + i * 0.12, i * 0.35, 0]}>
            <torusGeometry args={[1.75 + i * 0.3, i === 0 ? 0.055 : 0.015, 12, 140]} />
            <meshStandardMaterial color={i === 0 ? '#dce4f1' : '#b77953'} metalness={0.9} roughness={0.19} />
          </mesh>
        ))}
      </group>

      <mesh ref={shell} scale={[1.7, 2.05, 1.7]}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#c8ced8" wireframe transparent opacity={0.32} />
      </mesh>

      <mesh ref={crystal} scale={[1, 1, 1]}>
        <torusKnotGeometry args={[0.9, 0.3, 180, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#FF6B35"
          emissive="#FF5A1F"
          emissiveIntensity={0.04}
          metalness={0.65}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.12}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[0.4, 1]} />
        <meshBasicMaterial color="#9ec0ff" wireframe transparent opacity={0.65} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 20, 20]} />
        <meshBasicMaterial color="#ffe8dc" />
      </mesh>

      {[0, 1, 2].map((i) => (
        <mesh
          key={`facet-${i}`}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 0.85,
            0.1,
            Math.sin((i / 3) * Math.PI * 2) * 0.85,
          ]}
          scale={0.26}
        >
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={i === 1 ? '#849fcc' : '#e6e9f0'} metalness={0.95} roughness={0.12} />
        </mesh>
      ))}

      <points ref={field}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particlePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#ffc4a8"
          size={0.032}
          sizeAttenuation
          transparent
          opacity={0.88}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function StudioEnvironment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const target = generator.fromScene(room, 0.04);
    scene.environment = target.texture;
    room.dispose();
    generator.dispose();
    return () => { scene.environment = null; target.dispose(); };
  }, [gl, scene]);
  return null;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-5, -2, -3]} intensity={0.9} color="#3B82F6" />
      <pointLight position={[0, 0.5, 3]} intensity={3.8} color="#FF5A1F" distance={20} />
      <pointLight position={[2.2, -0.5, -1.5]} intensity={1.6} color="#3B82F6" distance={14} />
    </>
  );
}

export default function IntelligenceCore({ progress }: { progress: React.RefObject<number> }) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.02,
    });
    if (host.current) observer.observe(host.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="webgl-core">
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        camera={{ position: [0, 0.15, 5.4], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <StudioEnvironment />
        <SceneLights />
        <ArrowheadCrystal progress={progress} />
      </Canvas>
    </div>
  );
}
