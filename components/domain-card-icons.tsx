"use client";

import type { BentoDomainCard } from "@/lib/site-content";
import { useLocale } from "@/lib/i18n/locale-provider";

/**
 * Icons cropped from the design reference (pixel-matched masks).
 * Color comes from CSS mask + --domain-copper.
 */
const DOMAIN_ICONS = {
  brain: "/icons/domain/ai.png",
  robot: "/icons/domain/robot.png",
  cube: "/icons/domain/cube.png",
  shield: "/icons/domain/shield.png",
} as const;

function MaskIcon({ src, label }: { src: string; label: string }) {
  return (
    <span
      className="domain-icons8-icon"
      role="img"
      aria-label={label}
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
      }}
    />
  );
}

export function DomainIcon({ icon }: { icon: BentoDomainCard["icon"] }) {
  const { copy } = useLocale();
  const labels = copy.domainIconLabels;

  if (icon === "brain") {
    return <MaskIcon src={DOMAIN_ICONS.brain} label={labels.brain} />;
  }

  if (icon === "robot") {
    return <MaskIcon src={DOMAIN_ICONS.robot} label={labels.robot} />;
  }

  if (icon === "cube") {
    return <MaskIcon src={DOMAIN_ICONS.cube} label={labels.cube} />;
  }

  return <MaskIcon src={DOMAIN_ICONS.shield} label={labels.shield} />;
}
