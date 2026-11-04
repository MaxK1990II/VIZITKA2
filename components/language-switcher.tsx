"use client";

import { useEffect, useRef } from "react";
import { ChevronDown, Languages } from "lucide-react";
import { LOCALES, LOCALE_META, localePath } from "@/lib/i18n/locale";
import { useLocale } from "@/lib/i18n/locale-provider";
import styles from "./language-switcher.module.css";

export function LanguageSwitcher() {
  const { locale, copy } = useLocale();
  const picker = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (!picker.current?.contains(event.target as Node)) picker.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);

  return (
    <details ref={picker} className={styles.picker} onKeyDown={(event) => {
      if (event.key === "Escape") {
        picker.current?.removeAttribute("open");
        picker.current?.querySelector("summary")?.focus();
      }
    }}>
      <summary aria-label={`${copy.languageSwitcherAria}: ${LOCALE_META[locale].nativeName}`}>
        <Languages size={16} aria-hidden="true" />
        <span>{LOCALE_META[locale].nativeName}</span>
        <ChevronDown size={14} aria-hidden="true" />
      </summary>
      <nav className={styles.options} aria-label={copy.languageSwitcherAria}>
        {LOCALES.map((code) => (
          <a key={code} href={`${localePath(code)}#profile`} hrefLang={LOCALE_META[code].htmlLang}
            lang={LOCALE_META[code].htmlLang} aria-current={code === locale ? "page" : undefined}
            onClick={(event) => { if (code === locale) { event.preventDefault(); picker.current?.removeAttribute("open"); } }}>
            {LOCALE_META[code].nativeName}
          </a>
        ))}
      </nav>
    </details>
  );
}
