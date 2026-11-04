"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { localePath } from "@/lib/i18n/locale";
import { buildApexAbsoluteUrl } from "@/lib/site-url";
import { sharePage } from "@/lib/share-page";
import { useLocale } from "@/lib/i18n/locale-provider";

const TOAST_MS = 2600;

export function SharePageButton() {
  const { copy, locale } = useLocale();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<"copied" | "failed" | null>(null);

  const handleShare = async () => {
    if (busy) return;
    setBusy(true);
    setToast(null);

    const pitch = copy.heroHeadline.replace(/\s+/g, " ").trim();
    const result = await sharePage({
      title: copy.name,
      text: pitch,
      url: buildApexAbsoluteUrl(localePath(locale)),
    });

    setBusy(false);

    if (result === "copied" || result === "failed") {
      setToast(result);
      window.setTimeout(() => setToast(null), TOAST_MS);
    }
  };

  return (
    <div className="bento-share">
      <button
        type="button"
        className="bento-share-btn"
        data-hover
        onClick={handleShare}
        disabled={busy}
        aria-busy={busy}
        aria-label={copy.shareAria}
      >
        <Share2 size={16} strokeWidth={1.75} aria-hidden="true" />
        <span>{copy.shareLabel}</span>
      </button>
      {toast ? (
        <p className="bento-connect-toast" role="status">
          {toast === "copied" ? copy.shareCopiedToast : copy.shareFailedToast}
        </p>
      ) : null}
    </div>
  );
}
