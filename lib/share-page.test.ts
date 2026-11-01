import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { canUseWebShare, sharePage, type SharePageData } from "@/lib/share-page";

const sample: SharePageData = {
  title: "Максим Каночкин",
  text: "Драйвер промышленных инноваций",
  url: "https://kanochkinmm.ru",
};

function mockNavigator(partial: {
  share?: typeof navigator.share | undefined;
  canShare?: typeof navigator.canShare | undefined;
  clipboard?: { writeText: (text: string) => Promise<void> } | undefined;
}) {
  const nav = {
    share: partial.share,
    canShare: partial.canShare,
    clipboard: partial.clipboard,
  };

  vi.stubGlobal("navigator", nav);
  return nav;
}

describe("canUseWebShare", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("canUseWebShare_returnsFalse_whenNavigatorMissing", () => {
    vi.stubGlobal("navigator", undefined);
    expect(canUseWebShare(sample)).toBe(false);
  });

  it("canUseWebShare_returnsFalse_whenShareUnsupported", () => {
    mockNavigator({});
    expect(canUseWebShare(sample)).toBe(false);
  });

  it("canUseWebShare_usesCanShare_whenPresent", () => {
    const canShare = vi.fn().mockReturnValue(true);
    mockNavigator({
      share: vi.fn(),
      canShare,
    });
    expect(canUseWebShare(sample)).toBe(true);
    expect(canShare).toHaveBeenCalledWith(sample);

    canShare.mockReturnValue(false);
    expect(canUseWebShare(sample)).toBe(false);
  });

  it("canUseWebShare_returnsTrue_whenShareExistsWithoutCanShare", () => {
    mockNavigator({
      share: vi.fn(),
    });
    expect(canUseWebShare(sample)).toBe(true);
  });
});

describe("sharePage", () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("sharePage_callsNavigatorShare_whenAvailable", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    mockNavigator({
      share,
      canShare: vi.fn().mockReturnValue(true),
    });

    await expect(sharePage(sample)).resolves.toBe("shared");
    expect(share).toHaveBeenCalledWith(sample);
  });

  it("sharePage_passesTitleTextUrl_toShare", async () => {
    const share = vi.fn().mockResolvedValue(undefined);
    mockNavigator({
      share,
      canShare: vi.fn().mockReturnValue(true),
    });

    await sharePage(sample);
    expect(share).toHaveBeenCalledWith({
      title: sample.title,
      text: sample.text,
      url: sample.url,
    });
  });

  it("sharePage_returnsCancelled_onAbortError", async () => {
    const abort = new DOMException("Share canceled", "AbortError");
    mockNavigator({
      share: vi.fn().mockRejectedValue(abort),
      canShare: vi.fn().mockReturnValue(true),
      clipboard: { writeText: vi.fn() },
    });

    await expect(sharePage(sample)).resolves.toBe("cancelled");
  });

  it("sharePage_fallsBackToClipboard_whenShareMissing", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockNavigator({
      clipboard: { writeText },
    });

    await expect(sharePage(sample)).resolves.toBe("copied");
    expect(writeText).toHaveBeenCalledWith(sample.url);
  });

  it("sharePage_fallsBackToClipboard_whenShareThrowsNonAbort", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockNavigator({
      share: vi.fn().mockRejectedValue(new Error("NotAllowedError")),
      canShare: vi.fn().mockReturnValue(true),
      clipboard: { writeText },
    });

    await expect(sharePage(sample)).resolves.toBe("copied");
    expect(writeText).toHaveBeenCalledWith(sample.url);
  });

  it("sharePage_returnsCopied_whenClipboardSucceeds", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockNavigator({
      clipboard: { writeText },
    });

    await expect(sharePage(sample)).resolves.toBe("copied");
  });

  it("sharePage_returnsFailed_whenClipboardDenied", async () => {
    mockNavigator({
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("denied")),
      },
    });

    await expect(sharePage(sample)).resolves.toBe("failed");
  });

  it("sharePage_returnsFailed_whenClipboardMissing", async () => {
    mockNavigator({});
    await expect(sharePage(sample)).resolves.toBe("failed");
  });
});
