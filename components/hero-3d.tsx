"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

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
  const ref = useRef<any>();
  const sphere = useMemo(() => random.inSphere(new Float32Array(9003), { radius: 1.15 }), []);
  const cloud = useMemo(() => random.inSphere(new Float32Array(9003), { radius: 2.2 }), []);
  const getScroll = useScrollNorm();

  useFrame((_, delta) => {
    const s = getScroll();
    if (!ref.current) return;
    // s=0 — собрана сфера; s~0.5 — максимально разлетается; s~1 — снова собирается
    const t = s < 0.5 ? s * 2 : (1 - s) * 2; // 0..1..0
    ref.current.rotation.y += delta * 0.2 * (0.3 + s);
    // Лерп между шаром и облаком
    const a = sphere;
    const b = cloud;
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i++) {
      pos[i] = a[i] * (1 - t) + b[i] * t;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
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
