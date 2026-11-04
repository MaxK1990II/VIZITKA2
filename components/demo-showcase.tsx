"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Play, X } from "lucide-react";
import type { DemoShowcaseCopy } from "@/lib/cobot-demo";
import styles from "./demo-showcase.module.css";

type Props = {
  copy: DemoShowcaseCopy;
  source: string;
  poster: string;
};

/** The simulation is mounted only while its viewer is open. */
export function DemoShowcase({ copy, source, poster }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const launchButton = useRef<HTMLButtonElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (window.location.hash === "#cobot-demo") {
      launchButton.current?.closest("section")?.scrollIntoView();
      launchButton.current?.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (open) dialog.current?.showModal();
    else dialog.current?.close();
  }, [open]);

  useEffect(() => {
    if (!open || !loaded) return;
    // Keyboard events in our same-origin demo do not reach the outer dialog.
    const frameWindow = iframe.current?.contentWindow;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !event.defaultPrevented) {
        event.preventDefault();
        setOpen(false);
      }
    }
    frameWindow?.addEventListener("keydown", onKeyDown);
    return () => frameWindow?.removeEventListener("keydown", onKeyDown);
  }, [open, loaded]);

  function launch() {
    setLoaded(false);
    setOpen(true);
  }

  return (
    <section id="cobot-demo" className={styles.showcase} aria-labelledby="cobot-demo-title">
      <div className={styles.copy}>
        <p className={styles.eyebrow}>{copy.eyebrow}</p>
        <p className={styles.identity}>AL-FLOW <span aria-hidden="true">/</span> CS620</p>
        <h2 id="cobot-demo-title">{copy.title}</h2>
        <p className={styles.description}>{copy.description}</p>
        <ol className={styles.stages}>
          {copy.stages.map((stage, index) => (
            <li key={stage}><span aria-hidden="true">0{index + 1}</span>{stage}</li>
          ))}
        </ol>
        <p className={styles.note}>{copy.modelNote}</p>
      </div>

      <button ref={launchButton} type="button" className={styles.preview} onClick={launch} aria-label={copy.launch} aria-haspopup="dialog" data-analytics-event="demo_launch">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={poster} width={1440} height={900} alt="" loading="lazy" decoding="async" />
        <span className={styles.launch}>
          <span className={styles.play}><Play size={19} fill="currentColor" aria-hidden="true" /></span>
          <span>{copy.launch}</span>
          <ArrowUpRight size={18} aria-hidden="true" />
        </span>
      </button>

      <dialog
        ref={dialog}
        className={styles.viewer}
        aria-label={copy.title}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <header className={styles.toolbar}>
          <p>AL-FLOW <span>/ CS620</span></p>
          <div>
            <a href={source} target="_blank" rel="noopener noreferrer" data-analytics-event="demo_launch">
              <span>{copy.openSeparately}</span><ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <button type="button" onClick={() => setOpen(false)} aria-label={copy.close} autoFocus>
              <X size={22} aria-hidden="true" />
            </button>
          </div>
        </header>
        <div className={styles.frame}>
          {open ? (
            <>
              {!loaded ? <p role="status" className={styles.loading}>{copy.loading}</p> : null}
              <iframe
                ref={iframe}
                src={source}
                title={copy.title}
                allow="fullscreen"
                allowFullScreen
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
              />
            </>
          ) : null}
        </div>
      </dialog>
    </section>
  );
}
