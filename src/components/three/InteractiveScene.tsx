'use client';

import { Float, PerspectiveCamera } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function CoreSculpture() {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    if (group.current) {
      group.current.rotation.y = t * 0.22 + pointerX * 0.24;
      group.current.rotation.x = Math.sin(t * 0.35) * 0.08 - pointerY * 0.14;
      group.current.position.y = Math.sin(t * 0.7) * 0.12;
    }

    if (ringA.current) {
      ringA.current.rotation.x = t * 0.35;
      ringA.current.rotation.z = t * 0.22;
    }

    if (ringB.current) {
      ringB.current.rotation.y = -t * 0.4;
      ringB.current.rotation.x = t * 0.16;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.5}>
        <mesh castShadow receiveShadow>
          <torusKnotGeometry args={[1.08, 0.28, 180, 24]} />
          <meshStandardMaterial color="#f0a35e" metalness={0.42} roughness={0.18} />
        </mesh>
      </Float>

      <mesh ref={ringA} rotation={[Math.PI / 2.7, 0, 0]}>
        <torusGeometry args={[2.05, 0.026, 12, 170]} />
        <meshStandardMaterial color="#244dd8" emissive="#244dd8" emissiveIntensity={0.1} roughness={0.25} metalness={0.5} />
      </mesh>

      <mesh ref={ringB} rotation={[0.45, 0.5, 0.4]}>
        <torusGeometry args={[2.65, 0.018, 12, 170]} />
        <meshStandardMaterial color="#7c4dff" emissive="#7c4dff" emissiveIntensity={0.12} roughness={0.34} metalness={0.35} />
      </mesh>

      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh position={[-2.1, 1.35, -0.5]} castShadow>
          <octahedronGeometry args={[0.42, 0]} />
          <meshStandardMaterial color="#17a88b" roughness={0.22} metalness={0.35} />
        </mesh>
      </Float>

      <Float speed={1.55} rotationIntensity={0.65} floatIntensity={0.75}>
        <mesh position={[2.1, -1.15, 0.15]} castShadow>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#ef765f" roughness={0.25} metalness={0.22} />
        </mesh>
      </Float>

      <Float speed={1.35} rotationIntensity={0.35} floatIntensity={0.55}>
        <mesh position={[1.9, 1.55, -0.75]} castShadow>
          <boxGeometry args={[0.48, 0.48, 0.48]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.12} />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleHalo() {
  const group = useRef<THREE.Group>(null);
  const particles = useMemo(() => {
    return Array.from({ length: 76 }, (_, index) => {
      const radius = 2.8 + Math.random() * 2.4;
      const angle = (index / 76) * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * 3.6;
      return {
        position: [Math.cos(angle) * radius, vertical, Math.sin(angle) * radius] as [number, number, number],
        size: 0.025 + Math.random() * 0.05,
        color: index % 3 === 0 ? '#244dd8' : index % 3 === 1 ? '#ef765f' : '#17a88b'
      };
    });
  }, []);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.035;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.04;
    }
  });

  return (
    <group ref={group}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position}>
          <sphereGeometry args={[particle.size, 12, 12]} />
          <meshBasicMaterial color={particle.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 0.65, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 0.45, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function InteractiveScene() {
  return (
    <Canvas dpr={[1, 1.75]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} style={{ width: '100%', height: '100%' }}>
      <PerspectiveCamera makeDefault position={[0, 0, 6.4]} fov={46} />
      <CameraRig />
      <ambientLight intensity={2.2} />
      <directionalLight position={[3, 5, 5]} intensity={2.2} />
      <pointLight position={[-4, 2.5, 4]} intensity={22} color="#ef765f" />
      <pointLight position={[4, -2, 4]} intensity={18} color="#244dd8" />
      <CoreSculpture />
      <ParticleHalo />
    </Canvas>
  );
}
