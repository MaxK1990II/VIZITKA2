"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

const GlobeComponent = () => {
  const ref = useRef<any>();
  // Исправляем количество точек: 5001 делится на 3, что корректно для координат XYZ.
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }));

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#00ffff" // Исправляем цвет на валидный HEX-код
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const Globe = () => {
    return (
        <Canvas camera={{ position: [0, 0, 2] }}>
            <ambientLight intensity={0.5} />
            <GlobeComponent />
        </Canvas>
    )
}
