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

    // Per-star variations
    const aSize = new Float32Array(num);
    const aBright = new Float32Array(num);
    const aType = new Float32Array(num); // 0:hex, 1:diamond, 2:5-point
    const aAngle = new Float32Array(num);
    for (let i = 0; i < num; i++) {
      aSize[i] = 0.8 + Math.random() * 1.2; // 0.8..2.0
      aBright[i] = 0.6 + Math.random() * 0.6; // 0.6..1.2
      aType[i] = Math.floor(Math.random() * 3);
      aAngle[i] = Math.random() * Math.PI * 2;
    }
    geometry.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1));
    geometry.setAttribute("aBright", new THREE.BufferAttribute(aBright, 1));
    geometry.setAttribute("aType", new THREE.BufferAttribute(aType, 1));
    geometry.setAttribute("aAngle", new THREE.BufferAttribute(aAngle, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(0xffffff) },
        uOpacity: { value: 0.28 },
        uSize: { value: 12.0 }, // base pixels (will be scaled by aSize)
        uSizeAttenuation: { value: 1.0 },
      },
      vertexShader: `
        attribute float aSize;
        attribute float aBright;
        attribute float aType;
        attribute float aAngle;
        varying float vBright;
        varying float vType;
        varying float vAngle;
        uniform float uSize;
        uniform float uSizeAttenuation;
        void main(){
          vBright = aBright;
          vType = aType;
          vAngle = aAngle;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          float size = uSize * aSize;
          if(uSizeAttenuation > 0.5){ size /= -mvPosition.z; }
          gl_PointSize = size;
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying float vBright;
        varying float vType;
        varying float vAngle;

        mat2 rot(float a){ return mat2(cos(a), -sin(a), sin(a), cos(a)); }

        float shapeDiamond(vec2 p){
          // diamond via L1 norm
          float d = abs(p.x) + abs(p.y);
          return smoothstep(0.9, 0.6, d); // inner bright core
        }
        float shapeHex(vec2 p){
          // regular hexagon mask
          p = rot(0.523599)*p; // rotate 30deg for symmetry
          vec2 q = abs(p);
          float a = max(q.x*0.8660254 + q.y*0.5, q.y);
          return smoothstep(1.0, 0.7, a);
        }
        float shapeStar5(vec2 p){
          float r = length(p);
          float th = atan(p.y, p.x);
          float spikes = 5.0;
          float m = (cos(th*spikes)*0.5+0.5);
          float edge = mix(0.35, 0.8, m);
          return smoothstep(edge, edge-0.15, r);
        }

        void main(){
          vec2 uv = gl_PointCoord * 2.0 - 1.0; // -1..1
          uv = rot(vAngle) * uv;
          float mask;
          if(vType < 0.5){ mask = shapeHex(uv); }
          else if(vType < 1.5){ mask = shapeDiamond(uv); }
          else { mask = shapeStar5(uv); }
          float alpha = clamp(mask * uOpacity * vBright, 0.0, 1.0);
          if(alpha < 0.06) discard;
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

  return <div ref={hostRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
};
