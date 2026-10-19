// English lives at "/" so the default page keeps its current URL.
export const locales = [
  { code: "en", label: "EN", href: "/" },
  { code: "ko", label: "한국어", href: "/ko" },
  { code: "ja", label: "日本語", href: "/ja" },
] as const;

export type Locale = (typeof locales)[number]["code"];
