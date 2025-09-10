"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Динамический импорт компонента Three.js только на клиенте
const MobiusOceanFlowComponent = dynamic(
  () => import('./mobius-ocean-flow-core').then((mod) => ({ default: mod.MobiusOceanFlowCore })),
  {
    ssr: false,
    loading: () => (
      <div 
        style={{ 
          position: "fixed", 
          inset: 0, 
          zIndex: 0, 
          pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(0,20,40,0.3) 0%, rgba(0,5,15,0.8) 100%)"
        }}
      />
    )
  }
);

export const MobiusOceanFlow: React.FC = () => {
  return <MobiusOceanFlowComponent />;
};
