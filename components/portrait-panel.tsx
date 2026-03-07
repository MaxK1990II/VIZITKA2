import Image from "next/image";

import { PORTRAIT_CONTENT } from "@/lib/site-content";

import { PanelShell } from "./panel-shell";

type PortraitPanelProps = {
  open: boolean;
  onClose: () => void;
};

export function PortraitPanel({ open, onClose }: PortraitPanelProps) {
  return (
    <PanelShell
      open={open}
      onClose={onClose}
      eyebrow={PORTRAIT_CONTENT.eyebrow}
      title={PORTRAIT_CONTENT.title}
      description={PORTRAIT_CONTENT.description}
    >
      <div className="portrait-layout">
        <div className="portrait-frame">
          <Image
            src={PORTRAIT_CONTENT.imageSrc}
            alt={PORTRAIT_CONTENT.imageAlt}
            fill
            sizes="(max-width: 960px) 100vw, 420px"
            className="portrait-image"
            priority
          />
        </div>

        <div className="portrait-copy">
          <div className="portrait-highlights">
            {PORTRAIT_CONTENT.highlights.map((item) => (
              <span key={item} className="portrait-pill">
                {item}
              </span>
            ))}
          </div>
          {PORTRAIT_CONTENT.paragraphs.map((paragraph) => (
            <p key={paragraph} className="portrait-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}
