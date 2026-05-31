"use client";

import { useState } from "react";
import { Languages } from "lucide-react";
import { HeroEntry } from "@/components/landing/HeroEntry";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/i18n";
import type { Locale } from "@/types/reading";

export default function Home() {
  const [locale, setLocale] = useState<Locale>("th");
  const text = copy[locale];
  const nextLocale: Locale = locale === "th" ? "zh" : "th";

  return (
    <main>
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between bg-[color-mix(in_srgb,var(--color-bg)_82%,transparent)] px-5 backdrop-blur-md">
        <p className="font-[var(--font-display)] text-xl font-semibold leading-none text-[var(--color-text)]">
          {text.brand}
        </p>
        <Button
          type="button"
          variant="ghost"
          className="min-h-11 px-3 text-sm"
          aria-label={text.languageLabel}
          title={text.languageLabel}
          onClick={() => setLocale(nextLocale)}
        >
          <Languages aria-hidden size={17} />
          {locale === "th" ? "中文" : "ไทย"}
        </Button>
      </header>

      <HeroEntry locale={locale} />
    </main>
  );
}
