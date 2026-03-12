import { PROFILE } from "@/lib/site-content";

function escapeValue(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

export function createVCardString() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN;CHARSET=UTF-8:${escapeValue(PROFILE.name)}`,
    `N;CHARSET=UTF-8:Каночкин;Максим;;;`,
    `TITLE;CHARSET=UTF-8:${escapeValue(PROFILE.title)}`,
    `ORG;CHARSET=UTF-8:${escapeValue(PROFILE.company)}`,
    `TEL;TYPE=CELL:${PROFILE.phone}`,
    `EMAIL;TYPE=INTERNET:${PROFILE.email}`,
    `URL:${PROFILE.website}`,
    `X-SOCIALPROFILE;TYPE=telegram:https://t.me/${PROFILE.telegram.replace("@", "")}`,
    `ADR;CHARSET=UTF-8:;;;;${escapeValue(PROFILE.location)};;;`,
    `NOTE;CHARSET=UTF-8:${escapeValue(PROFILE.title)}. ${PROFILE.website}`,
    "END:VCARD",
  ];

  return lines.join("\r\n");
}

function createVCardBlob(): Blob {
  const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
  const content = new TextEncoder().encode(createVCardString());
  const combined = new Uint8Array(bom.length + content.length);
  combined.set(bom, 0);
  combined.set(content, bom.length);

  return new Blob([combined], { type: "text/vcard;charset=utf-8" });
}

function createVCardFile(): File {
  const blob = createVCardBlob();
  return new File([blob], "maksim-kanochkin.vcf", {
    type: "text/vcard;charset=utf-8",
  });
}

/**
 * Strategy 1: Web Share API with file
 * Best on iOS Safari, Android Chrome — opens native share sheet
 * with "Add to Contacts" option prominently displayed.
 */
async function tryWebShare(): Promise<boolean> {
  if (
    typeof navigator === "undefined" ||
    !("share" in navigator) ||
    !("canShare" in navigator)
  ) {
    return false;
  }

  const file = createVCardFile();
  if (!navigator.canShare?.({ files: [file] })) return false;

  try {
    await navigator.share({
      files: [file],
      title: PROFILE.name,
      text: `${PROFILE.name} — ${PROFILE.title}`,
    });
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") return true;
    return false;
  }
}

/**
 * Strategy 2: Direct data URI navigation
 * On Android, navigating to a data:text/vcard URI often triggers
 * the system's intent resolver → Contacts app opens directly.
 * On iOS this is a no-op, so we fall through.
 */
function tryDataUri(): boolean {
  try {
    const vcardStr = createVCardString();
    const encoded = btoa(unescape(encodeURIComponent(vcardStr)));
    const dataUri = `data:text/vcard;base64,${encoded}`;

    const link = document.createElement("a");
    link.href = dataUri;
    link.setAttribute("download", "maksim-kanochkin.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch {
    return false;
  }
}

/**
 * Strategy 3: Blob URL download (universal fallback)
 * Downloads .vcf file. On most Android devices, opening the
 * downloaded file triggers the Contacts app automatically.
 */
function downloadViaBlob(): void {
  const blob = createVCardBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "maksim-kanochkin.vcf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export type SaveResult = "shared" | "downloaded";

/**
 * Main entry point: tries all strategies in order of best UX.
 * 1. Web Share API (native share sheet → 1 tap to contacts)
 * 2. data: URI (direct intent on Android)
 * 3. Blob download (universal fallback)
 */
export async function saveContact(): Promise<SaveResult> {
  const shared = await tryWebShare();
  if (shared) return "shared";

  const dataOk = tryDataUri();
  if (dataOk) return "downloaded";

  downloadViaBlob();
  return "downloaded";
}

export function downloadVCard(): void {
  downloadViaBlob();
}
