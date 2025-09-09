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
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
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
    camera.position.set(0, 0, 2.6);

    const num = 1400;
    const sphere = generateInSphere(num, 1.35);
    const cloud = generateInSphere(num, 2.2);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(sphere, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xffffff) },
        uOpacity: { value: 0.28 },
        uSize: { value: 12.0 },
        uSizeAttenuation: { value: 1.0 },
      },
      vertexShader: `
        uniform float uSize;
        uniform float uSizeAttenuation;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          float size = (uSizeAttenuation > 0.5) ? (uSize / -mvPosition.z) : uSize;
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() {
          vec2 p = gl_PointCoord * 2.0 - 1.0;
          float r = length(p);
          float vx = max(0.0, 1.0 - abs(p.x) * 8.0);
          float vy = max(0.0, 1.0 - abs(p.y) * 8.0);
          float cross = max(vx, vy) * 0.55;
          float core = smoothstep(0.18, 0.0, r);
          float alpha = clamp(cross + core, 0.0, 1.0) * uOpacity;
          if (alpha < 0.06) discard;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    const group = new THREE.Group();
    group.add(points);
    scene.add(group);

    const resize = () => {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const posArray = positionAttr.array as Float32Array;
    const animate = () => {
      if (!mountedRef.current) return;
      const s = getScrollNorm();
      const t = s < 0.5 ? s * 2.0 : (1.0 - s) * 2.0;

      group.rotation.y += 0.001 + s * 0.003;

      for (let i = 0; i < posArray.length; i++) {
        posArray[i] = sphere[i] * (1.0 - t) + cloud[i] * t;
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
    <div ref={wrapperRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <div ref={hostRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
};
