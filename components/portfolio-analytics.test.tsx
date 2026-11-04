import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalyticsBootstrap, PortfolioAnalytics } from "@/components/portfolio-analytics";

describe("profile analytics lifecycle", () => {
  let root: Root;
  let host: HTMLDivElement;
  let observers: { callback: IntersectionObserverCallback; disconnect: ReturnType<typeof vi.fn>; root: Element | Document | null | undefined }[];
  let frames: Map<number, FrameRequestCallback>;
  let nextFrame: number;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    host = document.createElement("div");
    document.body.appendChild(host);
    root = createRoot(host);
    observers = [];
    frames = new Map();
    nextFrame = 0;
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++nextFrame, callback); return nextFrame; });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => { frames.delete(id); });
    vi.stubGlobal("IntersectionObserver", class {
      disconnect = vi.fn();
      observe = vi.fn();
      constructor(callback: IntersectionObserverCallback, options: IntersectionObserverInit) {
        observers.push({ callback, disconnect: this.disconnect, root: options.root });
      }
    });
  });

  afterEach(async () => {
    await act(() => root.unmount());
    host.remove();
    document.querySelectorAll('script[src*="metrika"]').forEach((script) => script.remove());
    delete window.ym;
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  function flushFrames() {
    const pending = [...frames.values()];
    frames.clear();
    pending.forEach((callback) => callback(0));
  }

  function samplePage(profileVisible = true) {
    return <StrictMode>
      <AnalyticsBootstrap locale="ru" />
      {profileVisible ? <main className="bento-stage">
        <PortfolioAnalytics locale="ru" />
        <section id="cobot-demo">Demo</section>
        <button data-analytics-event="contact_click" data-analytics-channel="email"><span>Email</span></button>
        <button data-analytics-event="demo_launch">Launch</button>
      </main> : null}
    </StrictMode>;
  }

  it("installs no observers, animation work or script without a counter", async () => {
    vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", "");
    await act(() => root.render(samplePage()));
    host.querySelector("button")!.click();
    expect(observers).toHaveLength(0);
    expect(frames.size).toBe(0);
    expect(window.ym).toBeUndefined();
    expect(document.querySelector('script[src*="metrika"]')).toBeNull();
  });

  it("survives StrictMode, tracks the scroll container once and removes listeners on unmount", async () => {
    vi.stubEnv("NEXT_PUBLIC_YANDEX_METRIKA_ID", "12345678");
    await act(() => root.render(samplePage()));
    const calls = window.ym!.a!;
    const stage = host.querySelector<HTMLElement>(".bento-stage")!;
    Object.defineProperties(stage, {
      clientHeight: { value: 250 }, scrollHeight: { value: 1000 },
    });
    flushFrames();
    expect(calls.filter((call) => call[1] === "hit")).toHaveLength(1);
    expect(calls.filter((call) => call[2] === "profile_open")).toHaveLength(1);
    expect(observers.at(-1)!.root).toBe(stage);
    expect(observers[0].disconnect).toHaveBeenCalled();

    // An icon/text child and two deliberate clicks yield exactly two contact events.
    host.querySelector("span")!.click();
    host.querySelector("span")!.click();
    expect(calls.filter((call) => call[2] === "contact_click")).toEqual([
      [12345678, "reachGoal", "contact_click", { event: "contact_click", locale: "ru", channel: "email" }],
      [12345678, "reachGoal", "contact_click", { event: "contact_click", locale: "ru", channel: "email" }],
    ]);

    const visible = [{ isIntersecting: true, intersectionRatio: 0.3 }] as IntersectionObserverEntry[];
    observers.forEach((observer) => observer.callback(visible, {} as IntersectionObserver));
    observers.at(-1)!.callback(visible, {} as IntersectionObserver);
    expect(calls.filter((call) => call[2] === "demo_view")).toHaveLength(1);
    stage.scrollTop = 750;
    window.dispatchEvent(new Event("scroll"));
    expect(frames.size).toBe(0);
    stage.dispatchEvent(new Event("scroll"));
    stage.dispatchEvent(new Event("scroll"));
    expect(frames.size).toBe(1);
    flushFrames();
    stage.dispatchEvent(new Event("scroll"));
    flushFrames();
    expect(calls.filter((call) => call[2] === "scroll_depth").map((call) => (call[3] as { threshold: number }).threshold)).toEqual([25, 50, 75, 100]);

    stage.dispatchEvent(new Event("scroll"));
    await act(() => root.render(samplePage(false)));
    const count = calls.length;
    const afterUnmount = document.createElement("button");
    afterUnmount.dataset.analyticsEvent = "demo_launch";
    document.body.appendChild(afterUnmount);
    afterUnmount.click();
    afterUnmount.remove();
    observers.at(-1)!.callback(visible, {} as IntersectionObserver);
    stage.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("resize"));
    expect(frames.size).toBe(0);
    expect(calls).toHaveLength(count);
    expect(observers.at(-1)!.disconnect).toHaveBeenCalled();

    // Returning from the intro opens the hub again within the same page view.
    await act(() => root.render(samplePage()));
    host.querySelector("span")!.click();
    observers.at(-1)!.callback(visible, {} as IntersectionObserver);
    expect(calls.filter((call) => call[1] === "hit")).toHaveLength(1);
    expect(calls.filter((call) => call[2] === "profile_open")).toHaveLength(1);
    expect(calls.filter((call) => call[2] === "demo_view")).toHaveLength(1);
    expect(calls.filter((call) => call[2] === "contact_click")).toHaveLength(3);

    // Leaving for /press/ and returning mounts a new Bootstrap in the same document.
    await act(() => root.render(null));
    window.history.replaceState(null, "", "/press/");
    window.history.replaceState(null, "", "/");
    await act(() => root.render(samplePage()));
    observers.at(-1)!.callback(visible, {} as IntersectionObserver);
    const returnedStage = host.querySelector<HTMLElement>(".bento-stage")!;
    Object.defineProperties(returnedStage, {
      clientHeight: { value: 250 }, scrollHeight: { value: 1000 },
    });
    flushFrames();
    expect(calls.filter((call) => call[1] === "init")).toHaveLength(1);
    expect(calls.filter((call) => call[1] === "hit")).toHaveLength(2);
    expect(calls.filter((call) => call[2] === "profile_open")).toHaveLength(2);
    expect(calls.filter((call) => call[2] === "demo_view")).toHaveLength(2);
    expect(calls.filter((call) => call[2] === "scroll_depth").map((call) => (call[3] as { threshold: number }).threshold)).toEqual([25, 50, 75, 100, 25]);
  });
});
