/** A single cancellable RAF chain. Stopping inside a frame must not restart it. */
export function createAnimationLoop(render: FrameRequestCallback) {
  let running = false;
  let frame: number | null = null;

  const tick: FrameRequestCallback = (time) => {
    frame = null;
    if (!running) return;
    render(time);
    if (running) frame = requestAnimationFrame(tick);
  };

  return {
    start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    },
  };
}
