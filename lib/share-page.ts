export type SharePageResult = "shared" | "copied" | "cancelled" | "failed";

export type SharePageData = {
  title: string;
  text: string;
  url: string;
};

function isAbortError(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "name" in err &&
    (err as { name: string }).name === "AbortError"
  );
}

export function canUseWebShare(data: SharePageData): boolean {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }

  if (typeof navigator.canShare === "function") {
    try {
      return navigator.canShare(data);
    } catch {
      return false;
    }
  }

  // Older share() implementations without canShare — url/text shares are typically fine.
  return true;
}

async function copyUrl(url: string): Promise<"copied" | "failed"> {
  if (
    typeof navigator === "undefined" ||
    !navigator.clipboard ||
    typeof navigator.clipboard.writeText !== "function"
  ) {
    return "failed";
  }

  try {
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}

/**
 * Share the portfolio URL via the system share sheet when available,
 * otherwise fall back to copying the link to the clipboard.
 */
export async function sharePage(data: SharePageData): Promise<SharePageResult> {
  if (canUseWebShare(data)) {
    try {
      await navigator.share(data);
      return "shared";
    } catch (err) {
      if (isAbortError(err)) return "cancelled";
      // Non-abort share failure → clipboard fallback
    }
  }

  return copyUrl(data.url);
}
