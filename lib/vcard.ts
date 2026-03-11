import { PROFILE } from "@/lib/site-content";

function escapeValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\n/g, "\\n");
}

export function createVCardString() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN;CHARSET=UTF-8:${escapeValue(PROFILE.name)}`,
    `N;CHARSET=UTF-8:Каночкин;Максим;;;`,
    `TITLE;CHARSET=UTF-8:${escapeValue(PROFILE.title)}`,
    `ORG;CHARSET=UTF-8:${escapeValue(PROFILE.company)}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`,
    `URL:${PROFILE.website}`,
    `ADR;CHARSET=UTF-8:;;;;${escapeValue(PROFILE.location)};;;`,
    `NOTE;CHARSET=UTF-8:Expert in Industrial AI\\, Robotics\\, Additive Manufacturing. ${PROFILE.website}`,
    "END:VCARD",
  ];

  return lines.join("\r\n");
}

export function createVCardFile() {
  const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
  const content = new TextEncoder().encode(createVCardString());
  const combined = new Uint8Array(bom.length + content.length);
  combined.set(bom, 0);
  combined.set(content, bom.length);

  const blob = new Blob([combined], {
    type: "text/vcard;charset=utf-8",
  });

  return new File([blob], "maksim-kanochkin.vcf", {
    type: "text/vcard;charset=utf-8",
  });
}

export function downloadVCard() {
  const file = createVCardFile();
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = file.name;
  link.click();
  URL.revokeObjectURL(url);
}

export async function shareOrDownloadVCard(): Promise<"shared" | "downloaded"> {
  const file = createVCardFile();

  if (
    typeof navigator !== "undefined" &&
    "share" in navigator &&
    "canShare" in navigator &&
    navigator.canShare?.({ files: [file] })
  ) {
    await navigator.share({
      files: [file],
      title: PROFILE.name,
      text: `${PROFILE.name} — ${PROFILE.title}`,
    });
    return "shared";
  }

  downloadVCard();
  return "downloaded";
}
