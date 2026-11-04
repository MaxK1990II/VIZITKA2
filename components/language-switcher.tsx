"use client";

import { LOCALES, LOCALE_META, localePath } from "@/lib/i18n/locale";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LanguageSwitcher() {
  const { locale, copy } = useLocale();

  return (
    <nav
      className="bento-lang-switch"
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
            <a
              href={`${localePath(code)}#profile`}
              hrefLang={LOCALE_META[code].htmlLang}
              lang={LOCALE_META[code].htmlLang}
              className={`bento-lang-btn${active ? " is-active" : ""}`}
              data-hover
              aria-current={active ? "page" : undefined}
              aria-label={LOCALE_META[code].nativeName}
              onClick={(event) => {
                event.stopPropagation();
                if (active) event.preventDefault();
              }}
            >
              {LOCALE_META[code].label}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
