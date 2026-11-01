"use client";

import { LOCALES, LOCALE_META } from "@/lib/i18n/locale";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LanguageSwitcher() {
  const { locale, setLocale, copy } = useLocale();

  return (
    <div
      className="bento-lang-switch"
      role="group"
      aria-label={copy.languageSwitcherAria}
    >
      {LOCALES.map((code, index) => {
        const active = locale === code;
        return (
          <span key={code} className="bento-lang-item">
            {index > 0 ? (
              <span className="bento-lang-sep" aria-hidden="true">
                ·
              </span>
            ) : null}
            <button
              type="button"
              className={`bento-lang-btn${active ? " is-active" : ""}`}
              data-hover
              aria-pressed={active}
              aria-label={LOCALE_META[code].nativeName}
              onClick={(event) => {
                event.stopPropagation();
                setLocale(code);
              }}
            >
              {LOCALE_META[code].label}
            </button>
          </span>
        );
      })}
    </div>
  );
}
