"use client";

import Link from "next/link";
import { locales, type Locale } from "./i18n/locales";
import { savePosition } from "./scrollPosition";

type LanguageSwitcherProps = {
  current: Locale;
  label: string;
  accentColor: string;
};

export default function LanguageSwitcher({ current, label, accentColor }: LanguageSwitcherProps) {
  return (
    <nav
      aria-label={label}
      className="flex items-center gap-0.5 rounded-full bg-neutral-100 p-1 ring-1 ring-black/5"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="ml-1.5 mr-0.5 hidden h-4 w-4 text-neutral-400 sm:block"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
      </svg>

      {locales.map((locale) => {
        const active = locale.code === current;
        return (
          <Link
            key={locale.code}
            href={locale.href}
            // Scroll is handled by savePosition/restorePosition instead of
            // Next.js jumping back to the top.
            scroll={false}
            onClick={(event) => {
              if (active) {
                event.preventDefault();
                return;
              }
              // A modified click opens a new tab; this page stays put.
              if (!(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) savePosition();
            }}
            lang={locale.code}
            hrefLang={locale.code}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold transition-colors duration-200 sm:px-3 ${
              active ? "bg-black shadow-sm" : "text-neutral-500 hover:bg-white hover:text-black"
            }`}
            style={active ? { color: accentColor } : undefined}
          >
            {locale.label}
          </Link>
        );
      })}
    </nav>
  );
}
