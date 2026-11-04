import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DemoShowcase } from "@/components/demo-showcase";
import { COBOT_DEMO } from "@/lib/cobot-demo";
import { COBOT_DEMO_COPY } from "@/lib/i18n/demo";

describe("demo viewer lifecycle", () => {
  let root: Root;
  let host: HTMLDivElement;
  const copy = COBOT_DEMO_COPY.ru;

  beforeEach(async () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    // jsdom does not yet implement the native dialog lifecycle.
    Object.defineProperties(HTMLDialogElement.prototype, {
      showModal: { configurable: true, value: function (this: HTMLDialogElement) {
        this.setAttribute("open", "");
      } },
      close: { configurable: true, value: function (this: HTMLDialogElement) {
        if (!this.open) return;
        this.removeAttribute("open");
        this.dispatchEvent(new Event("close"));
      } },
    });
    host = document.createElement("div");
    document.body.appendChild(host);
    root = createRoot(host);
    await act(() => root.render(
      <DemoShowcase copy={copy} source={COBOT_DEMO.source} poster={COBOT_DEMO.poster} />,
    ));
  });

  afterEach(async () => {
    await act(() => root.unmount());
    host.remove();
    Reflect.deleteProperty(HTMLDialogElement.prototype, "showModal");
    Reflect.deleteProperty(HTMLDialogElement.prototype, "close");
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  async function click(label: string) {
    const button = host.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
    expect(button).not.toBeNull();
    await act(() => button!.click());
  }

  it("loads the simulation only on demand and disposes it on close", async () => {
    expect(host.querySelector("iframe")).toBeNull();
    await click(copy.launch);
    const firstFrame = host.querySelector("iframe")!;
    expect(firstFrame.getAttribute("src")).toBe(COBOT_DEMO.source);
    expect(host.querySelector("dialog")?.open).toBe(true);
    expect(host.querySelector('[role="status"]')).not.toBeNull();
    await act(() => firstFrame.dispatchEvent(new Event("load")));
    expect(host.querySelector('[role="status"]')).toBeNull();

    await click(copy.close);
    expect(host.querySelector("iframe")).toBeNull();
    expect(firstFrame.isConnected).toBe(false);
    expect(host.querySelector("dialog")?.open).toBe(false);

    await click(copy.launch);
    expect(host.querySelector("iframe")).not.toBe(firstFrame);
    expect(host.querySelector('[role="status"]')).not.toBeNull();
  });

  it("disposes the simulation when the browser cancels the dialog", async () => {
    await click(copy.launch);
    await act(() => host.querySelector("dialog")!.dispatchEvent(new Event("cancel")));
    expect(host.querySelector("iframe")).toBeNull();
    expect(host.querySelector("dialog")?.open).toBe(false);
  });

  it("closes with Escape while focus is inside the embedded document", async () => {
    await click(copy.launch);
    const frame = host.querySelector("iframe")!;
    await act(() => frame.dispatchEvent(new Event("load")));
    await act(() => frame.contentDocument!.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true, cancelable: true }),
    ));
    expect(host.querySelector("iframe")).toBeNull();
    expect(host.querySelector("dialog")?.open).toBe(false);
  });
});
