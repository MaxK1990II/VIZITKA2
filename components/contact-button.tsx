"use client";

import { Download, Share2 } from "lucide-react";
import { downloadVCard } from "@/lib/vcard";

type ContactButtonProps = {
  isMobile: boolean;
  onAction: () => void;
};

export function ContactButton({ isMobile, onAction }: ContactButtonProps) {
  if (isMobile) {
    return (
      <button
        type="button"
        className="contact-cta-primary"
        onClick={onAction}
      >
        <Share2 size={16} />
        Добавить в контакты
      </button>
    );
  }

  return (
    <button
      type="button"
      className="contact-cta-primary"
      data-hover
      onClick={() => downloadVCard()}
    >
      <Download size={16} />
      Add Contact
    </button>
  );
}
