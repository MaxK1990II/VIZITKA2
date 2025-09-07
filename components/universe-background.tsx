"use client";

import React, { useEffect, useMemo, useRef } from "react";
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
  const baseRef = useRef<THREE.Points | null>(null);
  const flareRef = useRef<THREE.Points | null>(null);

  const sphere = useMemo<Float32Array>(() => inSphere(new Float32Array(9003), { radius: 1.35 }) as Float32Array, []);
  const cloud = useMemo<Float32Array>(() => inSphere(new Float32Array(9003), { radius: 2.2 }) as Float32Array, []);
  const count = sphere.length / 3;

  // Текстура круглого спрайта для флеров
  const flareTexture = useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size; canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.5, "rgba(255,255,255,0.6)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(size/2, size/2, size/2, 0, Math.PI*2); ctx.fill();
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter; tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  // Цвета базовых звёзд
  const colors = useMemo<Float32Array>(() => new Float32Array(count * 3), [count]);
  const baseIntensity = useMemo<Float32Array>(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const v = Math.abs(Math.sin(i * 12.9898 + 0.5));
      arr[i] = 0.55 + 0.35 * v; // 0.55..0.9
    }
    return arr;
  }, [count]);
  const life = useRef<Float32Array>(new Float32Array(count));

  // Геометрия для вспышек
  const maxFlares = 300;
  const flarePositions = useMemo<Float32Array>(() => new Float32Array(maxFlares * 3), [maxFlares]);

  useEffect(() => {
    const base = new THREE.Color(0.7, 0.9, 1);
    for (let i = 0; i < count; i++) {
      const inten = baseIntensity[i];
      colors[i * 3 + 0] = base.r * inten;
      colors[i * 3 + 1] = base.g * inten;
      colors[i * 3 + 2] = base.b * inten;
    }
    if (baseRef.current) {
      const geo = baseRef.current.geometry as THREE.BufferGeometry;
      geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geo.attributes.color.needsUpdate = true;
    }
  }, [colors, baseIntensity, count]);

  const getScroll = useScrollNorm();

  useFrame((_, delta) => {
    const s = getScroll();
    if (!baseRef.current) return;

    // Морфинг: сфера ↔ облако
    const t = s < 0.5 ? s * 2 : (1 - s) * 2;
    baseRef.current.rotation.y += delta * 0.15 * (0.3 + s);
    const a = sphere;
    const b = cloud;
    const pos = (baseRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length; i++) pos[i] = a[i] * (1 - t) + b[i] * t;
    (baseRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;

    // Запуск вспышек (редко)
    const l = life.current;
    const spawnAttempts = 1;
    for (let k = 0; k < spawnAttempts; k++) {
      const idx = (Math.random() * count) | 0;
      if (l[idx] <= 0 && Math.random() < 0.0008) l[idx] = 0.0001;
    }

    // Обновляем базовые цвета и собираем массив вспышек
    const base = new THREE.Color(0.7, 0.9, 1);
    let changed = false;
    let flareCount = 0;
    for (let i = 0; i < count; i++) {
      if (l[i] > 0) {
        l[i] += delta * 2.8;
        if (l[i] >= 2) l[i] = 0;
      } else if (Math.random() < 0.000005) {
        l[i] = 0.0001;
      }
      const flash = l[i] > 0 ? (l[i] < 1 ? l[i] : 2 - l[i]) : 0; // 0->1->0
      const inten = Math.min(1, baseIntensity[i] * 0.85 + flash * 0.95);
      const r = base.r * inten, g = base.g * inten, bcol = base.b * inten;
      const j = i * 3;
      if (colors[j] !== r || colors[j + 1] !== g || colors[j + 2] !== bcol) {
        colors[j] = r; colors[j + 1] = g; colors[j + 2] = bcol; changed = true;
      }
      if (flash > 0.7 && flareCount < maxFlares) {
        flarePositions[flareCount * 3 + 0] = pos[j + 0];
        flarePositions[flareCount * 3 + 1] = pos[j + 1];
        flarePositions[flareCount * 3 + 2] = pos[j + 2];
        flareCount++;
      }
    }
    if (changed && baseRef.current) {
      const geo = baseRef.current.geometry as THREE.BufferGeometry;
      let colorAttr = geo.getAttribute("color") as THREE.BufferAttribute | null;
      if (!colorAttr) {
        geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
        colorAttr = geo.getAttribute("color") as THREE.BufferAttribute;
      }
      colorAttr.needsUpdate = true;
    }
    if (flareRef.current) {
      const geo = flareRef.current.geometry as THREE.BufferGeometry;
      const attr = geo.getAttribute("position") as THREE.BufferAttribute | null;
      if (!attr) geo.setAttribute("position", new THREE.BufferAttribute(flarePositions, 3));
      else (attr.array as Float32Array).set(flarePositions);
      geo.setDrawRange(0, flareCount);
      geo.attributes.position.needsUpdate = true;
    }

  });

  return (
    <>
      <Points ref={baseRef} positions={sphere} stride={3} frustumCulled>
        <PointMaterial transparent vertexColors size={0.006} sizeAttenuation depthWrite={false} />
      </Points>
      {/* Слой ярких флеров — круглый спрайт */}
      <points ref={flareRef} frustumCulled={false}>
        <bufferGeometry />
        <pointsMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color={new THREE.Color(1, 1, 1)}
          size={0.035}
          sizeAttenuation
          map={flareTexture}
        />
      </points>
      {/* Линии отключены */}
    </>
  );
};

export const UniverseBackground = () => {
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
