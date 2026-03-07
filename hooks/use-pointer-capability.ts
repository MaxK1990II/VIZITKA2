"use client";

import { useEffect, useState } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export function usePointerCapability(): boolean {
  const [supportsFinePointer, setSupportsFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(FINE_POINTER_QUERY);
    const updateCapability = () => {
      setSupportsFinePointer(media.matches);
    };

    updateCapability();
    media.addEventListener("change", updateCapability);

    return () => {
      media.removeEventListener("change", updateCapability);
    };
  }, []);

  return supportsFinePointer;
}
