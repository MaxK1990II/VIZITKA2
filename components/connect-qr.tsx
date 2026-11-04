"use client";

import { QRCodeSVG } from "qrcode.react";
import { PROFILE } from "@/lib/site-content";
import { useLocale } from "@/lib/i18n/locale-provider";

const CONTACT_QR_URL = new URL("/vcard", PROFILE.website).href;

export function ConnectQr() {
  const { copy } = useLocale();

  return (
    <div className="bento-qr">
      <div className="bento-qr-frame">
        <QRCodeSVG
          value={CONTACT_QR_URL}
          size={148}
          level="M"
          marginSize={4}
          role="img"
          bgColor="#f3f1ec"
          fgColor="#141210"
          title={copy.qrContactHint}
        />
      </div>
    </div>
  );
}
