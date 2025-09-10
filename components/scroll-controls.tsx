"use client";

import React from "react";

export const ScrollControls = () => {
  const smooth = { behavior: "smooth" as const };
  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, ...smooth })}
        className="px-4 py-2 rounded-lg bg-neutral-900/70 border border-neutral-700 text-neutral-200 hover:bg-neutral-800"
        aria-label="Scroll to top"
      >
        Reverse
      </button>
      <button
        onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, ...smooth })}
        className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-500"
        aria-label="Scroll to bottom"
      >
        Play
      </button>
    </div>
  );
};

