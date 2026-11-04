"use client";

import { useEffect, useRef } from "react";
import { ensurePortfolioAnalytics, SCROLL_THRESHOLDS, trackPortfolioEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n/locale";

/** Mount before the intro so profile_open can be compared with all page views. */
export function AnalyticsBootstrap({ locale }: { locale: Locale }) {
  const pageInstanceToken = useRef(Symbol("portfolio-page"));
  useEffect(() => { ensurePortfolioAnalytics(locale, pageInstanceToken.current); }, [locale]);
  return null;
}

/** Mount only with the visible profile. Disabled entirely until a counter ID is supplied. */
export function PortfolioAnalytics({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (!ensurePortfolioAnalytics(locale)) return;
    trackPortfolioEvent("profile_open", locale);
    let active = true;

    function onClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>("[data-analytics-event]");
      if (element) {
        trackPortfolioEvent(element.dataset.analyticsEvent, locale, {
          channel: element.dataset.analyticsChannel,
        });
      }
    }
    // Capture also sees actions inside dialogs that stop click propagation.
    document.addEventListener("click", onClick, true);

    const stage = document.querySelector<HTMLElement>(".bento-stage");
    const demo = document.getElementById("cobot-demo");
    let demoObserver: IntersectionObserver | undefined;
    if (stage && demo && typeof IntersectionObserver !== "undefined") {
      demoObserver = new IntersectionObserver((entries) => {
        if (!active) return;
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.15)) {
          trackPortfolioEvent("demo_view", locale);
          demoObserver?.disconnect();
        }
      }, { root: stage, threshold: 0.15 });
      demoObserver.observe(demo);
    }

    let animationFrame: number | undefined;
    function measureDepth() {
      animationFrame = undefined;
      if (!active || !stage || stage.clientHeight <= 0 || stage.scrollHeight <= 0) return;
      const bottom = Math.max(0, stage.scrollTop) + stage.clientHeight;
      const percent = bottom >= stage.scrollHeight - 2 ? 100 : bottom / stage.scrollHeight * 100;
      for (const threshold of SCROLL_THRESHOLDS) {
        if (percent >= threshold) trackPortfolioEvent("scroll_depth", locale, { threshold });
      }
    }
    function scheduleMeasurement() {
      if (animationFrame === undefined) animationFrame = requestAnimationFrame(measureDepth);
    }
    stage?.addEventListener("scroll", scheduleMeasurement, { passive: true });
    window.addEventListener("resize", scheduleMeasurement);
    scheduleMeasurement();

    return () => {
      active = false;
      document.removeEventListener("click", onClick, true);
      stage?.removeEventListener("scroll", scheduleMeasurement);
      window.removeEventListener("resize", scheduleMeasurement);
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      demoObserver?.disconnect();
    };
  }, [locale]);

  return null;
}
