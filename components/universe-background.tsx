"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function generatePoints(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let i = 0;
  while (i < count) {
    // Rejection sampling inside a sphere
    const x = (Math.random() * 2 - 1) * radius;
    const y = (Math.random() * 2 - 1) * radius;
    const z = (Math.random() * 2 - 1) * radius;
    if (x * x + y * y + z * z <= radius * radius) {
      const idx = i * 3;
      arr[idx] = x;
      arr[idx + 1] = y;
      arr[idx + 2] = z;
      i++;
    }
  }
  return arr;
}

const Starfield: React.FC = () => {
  const groupRef = React.useRef<THREE.Group | null>(null);
  const positions = React.useMemo(() => generatePoints(3000, 1.8), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          color={0x99e6ff}
          size={0.01}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export const UniverseBackground: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.5} />
        <Starfield />
      </Canvas>
    </div>
  );
};
