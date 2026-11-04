import { isLocale, localePath, type Locale } from "@/lib/i18n/locale";

const EVENTS = [
  "profile_open", "demo_view", "demo_launch", "contact_click", "contact_save",
  "profile_pdf", "press_open", "project_source", "navigation_click", "scroll_depth",
] as const;
const CHANNELS = ["telegram", "email", "github", "vk", "max", "wechat"] as const;
export const SCROLL_THRESHOLDS = [25, 50, 75, 100] as const;

export type AnalyticsEvent = (typeof EVENTS)[number];
type Channel = (typeof CHANNELS)[number];
type Threshold = (typeof SCROLL_THRESHOLDS)[number];
type EventParams = {
  locale: Locale;
  event: AnalyticsEvent;
  channel?: Channel;
  threshold?: Threshold;
};
type EventDetails = { channel?: unknown; threshold?: unknown };
type Metrika = ((...args: unknown[]) => void) & { a?: unknown[][]; l?: number };

declare global {
  interface Window { ym?: Metrika; doNotTrack?: string; }
}

type AnalyticsState = { id: number; page: string | null; seen: Set<string>; pageInstanceToken?: symbol };
const states = new WeakMap<Document, AnalyticsState>();
const SCRIPT_URL = "https://mc.yandex.ru/metrika/tag.js";

export function parseMetrikaId(value: unknown): number | null {
  if (typeof value !== "string" || !/^[1-9]\d*$/.test(value.trim())) return null;
  const id = Number(value.trim());
  return Number.isSafeInteger(id) ? id : null;
}

/** Allow only a small vocabulary; never forward link URLs, text, or arbitrary payloads. */
export function createAnalyticsEvent(
  event: unknown,
  locale: unknown,
  details: EventDetails = {},
): EventParams | null {
  if (!isLocale(locale) || !EVENTS.includes(event as AnalyticsEvent)) return null;
  const params: EventParams = { locale, event: event as AnalyticsEvent };
  if (event === "contact_click") {
    if (!CHANNELS.includes(details.channel as Channel)) return null;
    params.channel = details.channel as Channel;
  }
  if (event === "scroll_depth") {
    if (!SCROLL_THRESHOLDS.includes(details.threshold as Threshold)) return null;
    params.threshold = details.threshold as Threshold;
  }
  return params;
}

function analyticsAllowed(): boolean {
  return typeof window !== "undefined" &&
    navigator.doNotTrack !== "1" && window.doNotTrack !== "1" &&
    !(navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
}

/** Queueing is best effort, and must never interrupt a visitor's action. */
function send(...args: unknown[]): void {
  try { window.ym?.(...args); } catch { /* Analytics failure must not affect the site. */ }
}

/** True means enabled/queued, not that a request was delivered to Yandex. */
export function ensurePortfolioAnalytics(locale: Locale, pageInstanceToken?: symbol): boolean {
  const id = parseMetrikaId(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
  if (!id || !isLocale(locale) || !analyticsAllowed()) return false;

  let state = states.get(document);
  if (!state) {
    if (!window.ym) {
      const queue: Metrika = (...args) => { (queue.a ??= []).push(args); };
      queue.l = Date.now();
      window.ym = queue;
    }
    if (!document.querySelector(`script[src="${SCRIPT_URL}"]`)) {
      const script = document.createElement("script");
      script.src = SCRIPT_URL;
      script.async = true;
      script.referrerPolicy = "no-referrer";
      document.head.appendChild(script);
    }
    state = { id, page: null, seen: new Set() };
    states.set(document, state);
    send(id, "init", {
      defer: true,
      webvisor: false,
      childIframe: false,
      clickmap: false,
      trackLinks: false,
      trackHash: false,
      accurateTrackBounce: false,
      ecommerce: false,
      disableYtm: true,
      sendTitle: false,
    });
  }

  // A new shell after client navigation is a new view, even on the same locale URL.
  // Only Bootstrap supplies a token; reopening the hub must preserve this boundary.
  if (pageInstanceToken && state.pageInstanceToken !== pageInstanceToken) {
    state.pageInstanceToken = pageInstanceToken;
    state.page = null;
    state.seen.clear();
  }

  // Locale changes also start a view; anchors and StrictMode effect replay do not.
  const page = localePath(locale);
  if (state.page !== page) {
    state.page = page;
    state.seen.clear();
    send(state.id, "hit", page, { title: "Portfolio", referer: "", params: { locale } });
  }
  return true;
}

export function trackPortfolioEvent(
  event: unknown,
  locale: Locale,
  details: EventDetails = {},
): void {
  const params = createAnalyticsEvent(event, locale, details);
  if (!params || !ensurePortfolioAnalytics(locale)) return;
  const state = states.get(document)!;
  if (event === "profile_open" || event === "demo_view" || event === "scroll_depth") {
    const key = `${event}:${params.threshold ?? ""}`;
    if (state.seen.has(key)) return;
    state.seen.add(key);
  }
  send(state.id, "reachGoal", params.event, params);
}
