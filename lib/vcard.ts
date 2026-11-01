import { PROFILE } from "@/lib/site-content";

/**
 * Encode a string as UTF-8 Quoted-Printable.
 * Outlook / Windows Contacts often ignore CHARSET=UTF-8 on raw bytes and
 * fall back to the system code page (Windows-1251) — QP keeps the file ASCII-safe.
 */
function toQuotedPrintable(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let out = "";

  for (const byte of bytes) {
    // Printable ASCII except "=" stays literal; everything else as =XX.
    if (byte >= 0x21 && byte <= 0x7e && byte !== 0x3d) {
      out += String.fromCharCode(byte);
    } else {
      out += `=${byte.toString(16).toUpperCase().padStart(2, "0")}`;
    }
  }

  return out;
}

/**
 * Fold long QP values with soft line breaks ("=\r\n"), RFC 2045.
 *
 * Do NOT use vCard whitespace folding ("\r\n "). Outlook / Windows Contacts
 * often ignore those continuations and only decode the first physical line,
 * truncating Cyrillic to fragments like "Макси" / "Нача" / "Автом".
 */
function foldQuotedPrintable(prefix: string, qp: string): string {
  const max = 75;
  const lines: string[] = [];
  let current = prefix;
  let i = 0;

  while (i < qp.length) {
    const tokenLen = qp[i] === "=" ? 3 : 1;
    if (i + tokenLen > qp.length) {
      // Defensive: malformed trailing "=" — emit literally.
      current += qp.slice(i);
      break;
    }
    const token = qp.slice(i, i + tokenLen);

    if (current.length + tokenLen > max) {
      lines.push(`${current}=`);
      current = "";
    }

    current += token;
    i += tokenLen;
  }

  lines.push(current);
  return lines.join("\r\n");
}

function textField(property: string, value: string): string {
  const prefix = `${property};CHARSET=utf-8;ENCODING=QUOTED-PRINTABLE:`;
  return foldQuotedPrintable(prefix, toQuotedPrintable(value));
}

export function createVCardString() {
  const [firstName = "", ...rest] = PROFILE.name.split(" ");
  const lastName = rest.join(" ") || "";

  // VERSION:2.1 — Outlook handles CHARSET/ENCODING most reliably on 2.1.
  const lines = [
    "BEGIN:VCARD",
    "VERSION:2.1",
    textField("FN", PROFILE.name),
    textField("N", `${lastName};${firstName};;;`),
    textField("TITLE", PROFILE.title),
    textField("ORG", PROFILE.company),
    `TEL;CELL:${PROFILE.phone}`,
    `EMAIL;PREF;INTERNET:${PROFILE.emailPersonal}`,
    `EMAIL;INTERNET:${PROFILE.email}`,
    `URL:${PROFILE.website}`,
    `X-SOCIALPROFILE;TYPE=telegram:https://t.me/${PROFILE.telegram.replace("@", "")}`,
    `X-SOCIALPROFILE;TYPE=github:${PROFILE.githubUrl}`,
    `X-SOCIALPROFILE;TYPE=vk:${PROFILE.vkUrl}`,
    `X-SOCIALPROFILE;TYPE=max:${PROFILE.maxUrl}`,
    `X-SOCIALPROFILE;TYPE=wechat:${PROFILE.wechatId}`,
    textField("ADR", `;;;${PROFILE.location};;;;`),
    textField("NOTE", `${PROFILE.title}. ${PROFILE.website}`),
    "END:VCARD",
  ];

  return lines.join("\r\n");
}

function createVCardBlob(): Blob {
  // QP payload is ASCII — no BOM needed (BOM can confuse some Outlook builds).
  const content = new TextEncoder().encode(createVCardString());
  return new Blob([content], { type: "text/vcard;charset=utf-8" });
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
    const dataUri = `data:text/vcard;charset=utf-8;base64,${encoded}`;

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
