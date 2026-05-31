import { Sparkles } from "lucide-react";
import type { Locale, TarotCard } from "@/types/reading";

type TarotCardViewProps = {
  card: TarotCard;
  locale: Locale;
  compact?: boolean;
  revealed?: boolean;
};

function CardBack() {
  return (
    <div className="tarot-card-face">
      <div className="tarot-card-rays" />
      <div className="tarot-card-back-mark" />
      <div className="tarot-card-sigil">
        <Sparkles aria-hidden size={34} />
      </div>
    </div>
  );
}

function CardFront({ card, locale, compact }: { card: TarotCard; locale: Locale; compact: boolean }) {
  return (
    <div className="tarot-card-face">
      <div className="tarot-card-rays" />
      <div className="tarot-card-moon" />
      <div className="ten-wands-scene" aria-hidden>
        {Array.from({ length: 10 }, (_, index) => (
          <span key={index} className={`wand wand-${index + 1}`} />
        ))}
      </div>
      <div className="tarot-card-ground" />
      <div className="tarot-card-title-ribbon">
        <p className="text-center text-base font-bold leading-[1.25] text-[var(--color-accent-glow)]">
          {card.name[locale]}
        </p>
      </div>
      {!compact ? (
        <p className="absolute top-5 left-5 z-[1] font-[var(--font-display)] text-2xl font-semibold leading-none text-[var(--color-warm)]">
          X
        </p>
      ) : null}
    </div>
  );
}

export function TarotCardView({ card, locale, compact = false, revealed = true }: TarotCardViewProps) {
  return (
    <div className={compact ? "flex items-center gap-4" : "flex flex-col items-center"}>
      <div className={["tarot-flip-shell", compact ? "w-[96px]" : ""].join(" ")}>
        <div className={["tarot-flip-card", compact ? "!w-[96px]" : "", revealed ? "is-flipped" : ""].join(" ")}>
          <div className="tarot-card-side">
            <CardBack />
          </div>
          <div className="tarot-card-side tarot-card-front">
            <CardFront card={card} locale={locale} compact={compact} />
          </div>
        </div>
      </div>
      <div className={compact ? "" : "mt-4 text-center"}>
        <p className="text-base font-bold leading-[1.45] text-[var(--color-text)]">{card.name[locale]}</p>
        <p className="mt-1 max-w-[280px] text-sm font-medium leading-[1.65] text-[var(--color-text-muted)]">
          {card.meaning[locale]}
        </p>
      </div>
    </div>
  );
}
