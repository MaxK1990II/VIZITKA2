"use client";

import { useEffect, useState } from "react";

type DeviceProfile = {
  isMobile: boolean;
  isCoarsePointer: boolean;
  supportsFinePointer: boolean;
};

export function useDeviceProfile(): DeviceProfile {
  const [profile, setProfile] = useState<DeviceProfile>({
    isMobile: false,
    isCoarsePointer: false,
    supportsFinePointer: false,
  });

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 767px)");
    const coarseMedia = window.matchMedia("(pointer: coarse)");
    const fineMedia = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      setProfile({
        isMobile: window.innerWidth <= 767 || mobileMedia.matches,
        isCoarsePointer: coarseMedia.matches,
        supportsFinePointer: fineMedia.matches,
      });
    };

    update();

    mobileMedia.addEventListener("change", update);
    coarseMedia.addEventListener("change", update);
    fineMedia.addEventListener("change", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);

    return () => {
      mobileMedia.removeEventListener("change", update);
      coarseMedia.removeEventListener("change", update);
      fineMedia.removeEventListener("change", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return profile;
}
