"use client";

import dynamic from "next/dynamic";
import React from "react";

const UniverseBG = dynamic(() => import("./universe-background").then(m => m.UniverseBackground), {
  ssr: false,
});

export const UniverseBackgroundLazy: React.FC = () => {
  return <UniverseBG />;
};
