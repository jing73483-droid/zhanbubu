"use client";

import { Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TarotCardView } from "@/components/reading/TarotCardView";
import { copy } from "@/lib/i18n";
import { tenOfWandsCard } from "@/lib/tarot";
import type { Locale, TarotCard } from "@/types/reading";

type CardDrawProps = {
  locale: Locale;
  selectedCard: TarotCard | null;
  onDraw: (card: TarotCard) => void;
  disabled?: boolean;
};

export function CardDraw({ locale, selectedCard, onDraw, disabled }: CardDrawProps) {
  const text = copy[locale];
  const card = selectedCard ?? tenOfWandsCard;
  const [isRevealing, setIsRevealing] = useState(false);

  function drawCard() {
    if (disabled || selectedCard || isRevealing) return;

    setIsRevealing(true);
    window.setTimeout(() => {
      onDraw(tenOfWandsCard);
      setIsRevealing(false);
    }, 240);
  }

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] p-4">
      <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold leading-[1.65] text-[var(--color-text-soft)]">{text.cardLabel}</p>
          <p className="mt-1 text-sm font-medium leading-[1.65] text-[var(--color-text-muted)]">
            {selectedCard ? `${text.drawnCard}: ${card.name[locale]}` : text.cardHint}
          </p>
        </div>

        <button
          type="button"
          className="rounded-[var(--radius-xl)] focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)]"
          disabled={disabled || Boolean(selectedCard)}
          onClick={drawCard}
          aria-label={text.drawCard}
        >
          <TarotCardView card={card} locale={locale} revealed={Boolean(selectedCard) || isRevealing} />
        </button>
      </div>

      {selectedCard ? (
        <div className="card-reading-copy mt-5 rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-accent)_34%,transparent)] bg-[var(--color-accent-soft)] px-4 py-3">
          <p className="text-sm font-bold leading-[1.65] text-[var(--color-text)]">
            {text.cardInterpretationLabel}
          </p>
          <p className="mt-2 text-sm font-medium leading-[1.75] text-[var(--color-text-soft)]">
            {selectedCard.interpretation[locale]}
          </p>
        </div>
      ) : null}

      <Button
        type="button"
        variant={selectedCard ? "secondary" : "primary"}
        className="mt-5 w-full"
        disabled={disabled || isRevealing}
        onClick={drawCard}
      >
        <Sparkles aria-hidden size={18} />
        {selectedCard ? `${text.drawnCard}: ${card.name[locale]}` : text.drawCard}
      </Button>
    </section>
  );
}
