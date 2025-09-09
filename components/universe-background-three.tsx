"use client";

import React from "react";
import * as THREE from "three";

function generateInSphere(count: number, radius: number): Float32Array {
  const arr = new Float32Array(count * 3);
  let i = 0;
  while (i < count) {
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

function getScrollNorm(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
}

export const UniverseBackgroundThree: React.FC = () => {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const mountedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    mountedRef.current = true;
    const host = hostRef.current;
    if (!host) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    // Scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 2.6);

    // Stars geometry
    const num = 3001; // divisible by 1*3? We'll use count points, each uses one vertex; but BufferGeometry expects triplets for position attribute
    const sphere = generateInSphere(num, 1.35);
    const cloud = generateInSphere(num, 2.2);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(sphere, 3));

    const baseColor = new THREE.Color(0x99e6ff);
    const colors = new Float32Array((sphere.length / 3) * 3);
    for (let i = 0; i < sphere.length / 3; i++) {
      colors[i * 3 + 0] = baseColor.r * 0.7;
      colors[i * 3 + 1] = baseColor.g * 0.7;
      colors[i * 3 + 2] = baseColor.b * 0.7;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      color: baseColor,
      size: 0.01,
      sizeAttenuation: true,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    // Resize
    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Animate
    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;
    const animate = () => {
      if (!mountedRef.current) return;
      const s = getScrollNorm();
      const t = s < 0.5 ? s * 2 : (1 - s) * 2; // 0..1..0

      // Rotate
      group.rotation.y += 0.003 + s * 0.01;

      // Morph
      for (let i = 0; i < posArray.length; i++) {
        posArray[i] = sphere[i] * (1 - t) + cloud[i] * t;
      }
      positionAttr.needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />
  );
};
