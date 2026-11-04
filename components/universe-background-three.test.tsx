import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UniverseBackgroundThree } from "@/components/universe-background-three";

const renderer = vi.hoisted(() => ({ render: vi.fn(), dispose: vi.fn(), fail: false }));
vi.mock("three", async (importOriginal) => ({
  ...await importOriginal<typeof import("three")>(),
  WebGLRenderer: class {
    domElement = document.createElement("canvas");
    render = renderer.render;
    dispose = renderer.dispose;
    setPixelRatio() {}
    setClearColor() {}
    setSize() {}
    constructor() {
      if (renderer.fail) throw new Error("WebGL unavailable");
    }
  },
}));

describe("background animation lifecycle", () => {
  let root: Root;
  let host: HTMLDivElement;
  let frames: Map<number, FrameRequestCallback>;
  let nextId: number;
  let hidden: boolean;
  let reduced: boolean;
  let motionListeners: Set<() => void>;

  beforeEach(() => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    frames = new Map();
    nextId = 0;
    hidden = false;
    reduced = false;
    renderer.fail = false;
    renderer.render.mockClear();
    renderer.dispose.mockClear();
    motionListeners = new Set();
    vi.spyOn(document, "hidden", "get").mockImplementation(() => hidden);
    vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
      frames.set(++nextId, callback);
      return nextId;
    });
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
    vi.stubGlobal("matchMedia", () => ({
      get matches() { return reduced; },
      addEventListener: (_: string, callback: () => void) => motionListeners.add(callback),
      removeEventListener: (_: string, callback: () => void) => motionListeners.delete(callback),
    }));
    host = document.createElement("div");
    document.body.appendChild(host);
    root = createRoot(host);
  });

  afterEach(async () => {
    await act(() => root.unmount());
    expect(frames.size).toBe(0);
    expect(motionListeners.size).toBe(0);
    host.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  function drawFrame() {
    expect(frames.size).toBe(1);
    const [id, callback] = [...frames][0];
    frames.delete(id);
    callback(1000);
  }

  it("stops behind the profile and resumes on return without duplicate loops", async () => {
    await act(() => root.render(<UniverseBackgroundThree mode="desktop" phase="intro" />));
    drawFrame();
    expect(renderer.render).toHaveBeenCalledTimes(1);

    await act(() => root.render(<UniverseBackgroundThree mode="desktop" phase="nebula" />));
    expect(frames.size).toBe(0);
    document.dispatchEvent(new Event("visibilitychange"));
    expect(frames.size).toBe(0);

    await act(() => root.render(<UniverseBackgroundThree mode="desktop" phase="reform" />));
    drawFrame();
    expect(renderer.render).toHaveBeenCalledTimes(2);
    hidden = true;
    document.dispatchEvent(new Event("visibilitychange"));
    expect(frames.size).toBe(0);
    hidden = false;
    document.dispatchEvent(new Event("visibilitychange"));
    document.dispatchEvent(new Event("visibilitychange"));
    expect(frames.size).toBe(1);
  });

  it("renders a still image for reduced motion and follows preference changes", async () => {
    reduced = true;
    await act(() => root.render(<UniverseBackgroundThree mode="mobile" phase="intro" />));
    expect(renderer.render).toHaveBeenCalledTimes(1);
    expect(frames.size).toBe(0);
    reduced = false;
    motionListeners.forEach((listener) => listener());
    drawFrame();
    reduced = true;
    motionListeners.forEach((listener) => listener());
    expect(frames.size).toBe(0);
    await act(() => root.render(<UniverseBackgroundThree mode="mobile" phase="nebula" />));
    const calls = renderer.render.mock.calls.length;
    window.dispatchEvent(new Event("resize"));
    expect(renderer.render).toHaveBeenCalledTimes(calls);
  });

  it("does not crash the portfolio when WebGL is unavailable", async () => {
    renderer.fail = true;
    await act(() => root.render(<UniverseBackgroundThree mode="desktop" phase="intro" />));
    expect(host.querySelector(".universe-layer")).not.toBeNull();
    expect(host.querySelector("canvas")).toBeNull();
    expect(frames.size).toBe(0);
  });

  it("cleans up the first Strict Mode mount before starting another loop", async () => {
    await act(() => root.render(
      <StrictMode><UniverseBackgroundThree mode="mobile" phase="intro" /></StrictMode>,
    ));
    expect(host.querySelectorAll("canvas")).toHaveLength(1);
    expect(frames.size).toBe(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });
});
