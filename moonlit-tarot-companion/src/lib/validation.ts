import { copy } from "@/lib/i18n";
import type { Locale } from "@/types/reading";

export function validateQuestion(value: string, locale: Locale, maxChars = 900) {
  const trimmed = value.trim();
  const text = copy[locale].errors;

  if (!trimmed) return text.empty;
  if (trimmed.length > maxChars) return text.tooLong;

  return null;
}
