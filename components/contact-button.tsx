"use client";

import { Download, MessageCircle, Phone, Send, Share2 } from "lucide-react";
import { PROFILE } from "@/lib/site-content";
import { downloadVCard, saveContact } from "@/lib/vcard";
import { useState } from "react";

type ContactButtonProps = {
  isMobile: boolean;
};

export function ContactButton({ isMobile }: ContactButtonProps) {
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");

  const handleSave = async () => {
    if (state === "saving") return;
    setState("saving");
    try {
      await saveContact();
    } catch {
      downloadVCard();
    }
    setState("done");
    setTimeout(() => setState("idle"), 3000);
  };

  const telegramHandle = PROFILE.telegram.replace("@", "");

  return (
    <div className="contact-actions-group">
      <button
        type="button"
        className="contact-cta-primary"
        data-hover
        onClick={handleSave}
        disabled={state === "saving"}
      >
        {isMobile ? <Share2 size={16} /> : <Download size={16} />}
        {state === "done"
          ? "Сохранено"
          : state === "saving"
            ? "..."
            : "Сохранить контакт"}
      </button>

      <div className="contact-quick-actions">
        {PROFILE.phone && (
          <a
            href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}
            className="contact-quick-btn"
            data-hover
            title="Позвонить"
          >
            <Phone size={16} />
          </a>
        )}
        <a
          href={`mailto:${PROFILE.email}`}
          className="contact-quick-btn"
          data-hover
          title="Написать email"
        >
          <Send size={16} />
        </a>
        <a
          href={`https://t.me/${telegramHandle}`}
          className="contact-quick-btn"
          data-hover
          target="_blank"
          rel="noreferrer"
          title="Telegram"
        >
          <MessageCircle size={16} />
        </a>
      </div>
    </div>
  );
}
