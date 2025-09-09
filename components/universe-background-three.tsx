"use client";

import React from "react";
import * as THREE from "three";

function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    const v = new THREE.Vector3(x, y, z).multiplyScalar(radius);
    points.push(v);
  }
  return points;
}

function getScrollNorm(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
}

function makeLabelTexture(text: string): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  // soft glow
  ctx.shadowColor = "rgba(255,255,255,0.5)";
  ctx.shadowBlur = 18;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // dynamic font size based on length
  const base = text.length <= 3 ? 130 : text.length <= 5 ? 110 : 90;
  ctx.font = `bold ${base}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.fillText(text, size / 2, size / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.premultiplyAlpha = true;
  return tex;
}

const SKILL_LABELS = [
  "CODE", "AI", "ML", "3D", "CAD", "ROBOT", "IOT", "CLOUD", "DEVOPS", "R&D",
  "VISION", "UX", "LEAN", "QA", "DATA", "AUTOMATE", "RISK", "SECURE"
];

export const UniverseBackgroundThree: React.FC = () => {
  const hostRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const mountedRef = React.useRef<boolean>(false);

  React.useEffect(() => {
    mountedRef.current = true;
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(0, 0, 3.0);

    // Build icons
    const COUNT = 84;
    const baseRadius = 1.4;
    const targetsA = fibonacciSphere(COUNT, baseRadius);
    const targetsB = fibonacciSphere(COUNT, baseRadius * 1.6);

    const group = new THREE.Group();
    scene.add(group);

    const sprites: THREE.Sprite[] = [];
    const materials: THREE.SpriteMaterial[] = [];

    for (let i = 0; i < COUNT; i++) {
      const label = SKILL_LABELS[i % SKILL_LABELS.length];
      const tex = makeLabelTexture(label);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false, color: 0xffffff, opacity: 0.9 });
      const spr = new THREE.Sprite(mat);
      // world scale tuned by text length
      const len = label.length;
      const s = len <= 3 ? 0.6 : len <= 5 ? 0.72 : 0.85; // bigger text => slightly larger sprite
      spr.scale.set(s, s, 1);
      const p = targetsA[i];
      spr.position.copy(p);
      group.add(spr);
      sprites.push(spr);
      materials.push(mat);
    }

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

    const animate = () => {
      if (!mountedRef.current) return;
      const s = getScrollNorm();
      const t = s < 0.5 ? s * 2.0 : (1.0 - s) * 2.0; // 0..1..0 expansion

      // Subtle rotation
      group.rotation.y += 0.0012 + s * 0.002;

      // Morph positions between two shells
      for (let i = 0; i < COUNT; i++) {
        const a = targetsA[i];
        const b = targetsB[i];
        const spr = sprites[i];
        spr.position.set(
          a.x * (1 - t) + b.x * t,
          a.y * (1 - t) + b.y * t,
          a.z * (1 - t) + b.z * t
        );
        // Face the camera (sprites always billboard), add slight individual spin by changing material rotation
        materials[i].rotation += 0.0006 + (i % 5) * 0.0001;
        // Distance-based subtle opacity for depth
        const dz = (spr.position.z + 3.0) / 6.0; // ~0..1
        materials[i].opacity = 0.6 + (1 - dz) * 0.35; // 0.6..0.95
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      mountedRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      for (const m of materials) m.map?.dispose();
      for (const m of materials) m.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};
