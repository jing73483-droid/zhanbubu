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

      <p className="mx-auto max-w-[760px] px-5 pt-4 text-sm text-[var(--color-text-soft)]" role="note">{locale === "zh" ? "交互演示 · 使用本地模板生成示例解读，未连接 AI 服务。输入保存在当前浏览器，请勿填写敏感信息。" : "เดโม · ใช้ข้อความตัวอย่าง ไม่ได้เชื่อมต่อ AI ข้อมูลบันทึกในเบราว์เซอร์นี้ กรุณาอย่ากรอกข้อมูลอ่อนไหว"}</p>
      <HeroEntry locale={locale} />
    </main>
  );
}
