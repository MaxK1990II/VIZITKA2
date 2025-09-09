"use client";

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { inSphere } from "maath/random";

function useScrollNorm() {
  const get = React.useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
  }, []);
  return get;
}

const Starfield = () => {
  const baseRef = React.useRef<THREE.Points | null>(null);

  const sphere = React.useMemo<Float32Array>(
    () => inSphere(new Float32Array(9003), { radius: 1.35 }) as Float32Array,
    []
  );
  const cloud = React.useMemo<Float32Array>(
    () => inSphere(new Float32Array(9003), { radius: 2.2 }) as Float32Array,
    []
  );
  const count = sphere.length / 3;

  // Static vertex colors
  const colors = React.useMemo<Float32Array>(() => {
    const arr = new Float32Array(count * 3);
    const base = new THREE.Color(0.7, 0.9, 1);
    for (let i = 0; i < count; i++) {
      const inten = 0.65; // stable intensity
      arr[i * 3 + 0] = base.r * inten;
      arr[i * 3 + 1] = base.g * inten;
      arr[i * 3 + 2] = base.b * inten;
    }
    return arr;
  }, [count]);

  React.useEffect(() => {
    if (baseRef.current) {
      const geo = baseRef.current.geometry as THREE.BufferGeometry;
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.attributes.color.needsUpdate = true;
    }
  }, [colors]);

  const getScroll = useScrollNorm();

  useFrame((_, delta) => {
    const s = getScroll();
    if (!baseRef.current) return;

    // Morph sphere <-> cloud and rotate
    const t = s < 0.5 ? s * 2 : (1 - s) * 2;
    baseRef.current.rotation.y += delta * 0.15 * (0.3 + s);
    const a = sphere;
    const b = cloud;
    const pos = (baseRef.current.geometry as THREE.BufferGeometry).attributes
      .position.array as Float32Array;
    for (let i = 0; i < pos.length; i++) pos[i] = a[i] * (1 - t) + b[i] * t;
    (baseRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
  });

  return (
    <>
      <Points ref={baseRef} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent vertexColors size={0.006} sizeAttenuation depthWrite={false} />
      </Points>
    </>
  );
};

export const UniverseBackground = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 2.4], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.6} />
        <Starfield />
      </Canvas>
    </div>
  );
};
