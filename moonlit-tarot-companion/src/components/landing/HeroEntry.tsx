"use client";

import { FormEvent, useEffect, useState } from "react";
import { Moon, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { CardDraw } from "@/components/intake/CardDraw";
import { QuestionInput } from "@/components/intake/QuestionInput";
import { SafetyNote } from "@/components/intake/SafetyNote";
import { StateSelector } from "@/components/intake/StateSelector";
import { copy } from "@/lib/i18n";
import { createLocalReadingSession } from "@/lib/mock-reading";
import { tenOfWandsCard } from "@/lib/tarot";
import { validateQuestion } from "@/lib/validation";
import { useIntakeStore } from "@/stores/intake-store";
import type { Locale, TarotCard } from "@/types/reading";

type HeroEntryProps = {
  locale: Locale;
};

export function HeroEntry({ locale }: HeroEntryProps) {
  const router = useRouter();
  const text = copy[locale];
  const { status, question, setStatus, setQuestion, restoreDraft } = useIntakeStore();
  const [selectedCard, setSelectedCard] = useState<TarotCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    restoreDraft();
  }, [restoreDraft]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!status) {
      setError(text.errors.status);
      return;
    }

    const validationError = validateQuestion(question, locale);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setIsSubmitting(true);

    window.localStorage.setItem(
      "moonlit.pendingIntake",
      JSON.stringify({
        status,
        question,
        locale,
        selectedCard: selectedCard ?? tenOfWandsCard,
        updatedAt: new Date().toISOString(),
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 520));
    const session = createLocalReadingSession({
      status,
      question,
      locale,
      selectedCard: selectedCard ?? tenOfWandsCard,
    });
    router.push(`/result?sessionId=${encodeURIComponent(session.id)}`);
  }

  return (
    <section className="mx-auto flex min-h-[calc(100svh-56px)] w-full max-w-[760px] flex-col justify-center px-5 pb-10 pt-6 sm:px-6">
      <div className="motion-enter">
        <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-3 py-2 text-sm font-semibold leading-none text-[var(--color-text-soft)]">
          <Moon aria-hidden size={16} />
          {text.heroEyebrow}
        </div>

        <h1 className="max-w-[680px] text-[32px] font-bold leading-[1.22] text-[var(--color-text)]">
          {text.heroTitle}
        </h1>
        <p className="mt-4 max-w-[620px] text-base leading-[1.75] text-[var(--color-text-soft)]">
          {text.heroBody}
        </p>
      </div>

      <form className="card motion-enter mt-6 p-5 sm:p-7" onSubmit={onSubmit}>
        <div>
          <p className="mb-3 text-sm font-semibold leading-[1.65] text-[var(--color-text-soft)]">
            {text.statusLabel}
          </p>
          <StateSelector value={status} onChange={setStatus} disabled={isSubmitting} locale={locale} />
        </div>

        <div className="mt-5">
          <CardDraw
            locale={locale}
            selectedCard={selectedCard}
            onDraw={setSelectedCard}
            disabled={isSubmitting}
          />
        </div>

        <div className="mt-5">
          <QuestionInput
            value={question}
            onChange={setQuestion}
            maxChars={900}
            error={error}
            disabled={isSubmitting}
            locale={locale}
            label={text.questionLabel}
            placeholder={text.questionPlaceholder}
          />
        </div>

        <div className="mt-5">
          <SafetyNote>{text.safety}</SafetyNote>
        </div>

        <Button className="mt-5 w-full" type="submit" disabled={isSubmitting}>
          <Sparkles aria-hidden size={18} />
          {isSubmitting ? text.submitting : text.submit}
        </Button>
      </form>
    </section>
  );
}
