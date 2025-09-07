"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from 'three';
import { inSphere } from 'maath/random';

function useScrollNorm() {
  const { size } = useThree();
  const get = React.useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - size.height;
    return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
  }, [size.height]);
  return get;
}

const Particles = () => {
  const ref = useRef<THREE.Points | null>(null);
  const sphere = useMemo<Float32Array>(() => inSphere(new Float32Array(9003), { radius: 1.15 }) as Float32Array, []);
  const cloud = useMemo<Float32Array>(() => inSphere(new Float32Array(9003), { radius: 2.2 }) as Float32Array, []);
  const getScroll = useScrollNorm();

  useFrame((_, delta) => {
    const s = getScroll();
    if (!ref.current) return;
    const t = s < 0.5 ? s * 2 : (1 - s) * 2; // 0..1..0
    ref.current.rotation.y += delta * 0.2 * (0.3 + s);
    const a = sphere;
    const b = cloud;
    const pos = (ref.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i++) {
      pos[i] = a[i] * (1 - t) + b[i] * t;
    }
    (ref.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial transparent color="#00ffff" size={0.006} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

export const Hero3D = () => {
  return (
    <section className="relative h-screen w-full">
      <Canvas camera={{ position: [0, 0, 2.3], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <Particles />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="js-hero-title text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
          Максим Каночкин
        </h1>
        <p className="js-hero-subtitle mt-4 text-lg md:text-xl text-neutral-300">
          Инженер • Новатор • Лидер
        </p>
      </div>
    </section>
  );
};
