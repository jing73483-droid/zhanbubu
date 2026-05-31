import type { Locale, ReadingSession } from "@/types/reading";
import { copy, statusLabels } from "@/lib/i18n";
import { TarotCardView } from "@/components/reading/TarotCardView";

type ReadingResultProps = {
  session: ReadingSession;
  locale: Locale;
};

export function ReadingResult({ session, locale }: ReadingResultProps) {
  const text = copy[locale];
  const sections = [
    ["empathy", text.resultSections.empathy, session.result.empathy],
    ["reading", text.resultSections.reading, session.result.reading],
    ["nextStep", text.resultSections.nextStep, session.result.nextStep],
  ] as const;

  return (
    <article className="card p-5 sm:p-7">
      <p className="text-sm font-semibold leading-[1.65] text-[var(--color-warm)]">
        {text.resultEyebrow} · {statusLabels[locale][session.status]}
      </p>
      <h1 className="mt-2 text-[32px] font-bold leading-[1.22] text-[var(--color-text)]">
        {text.resultTitle}
      </h1>
      <p className="mt-4 rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] px-4 py-3 text-base leading-[1.75] text-[var(--color-text-soft)]">
        {session.question}
      </p>
      <div className="mt-5 rounded-[var(--radius-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] p-4">
        <TarotCardView card={session.selectedCard} locale={locale} compact />
      </div>

      <div className="mt-7 space-y-7">
        {sections.map(([key, title, body]) => (
          <section key={key} className="border-t border-[var(--color-border-soft)] pt-6">
            <h2 className="text-xl font-semibold leading-[1.45] text-[var(--color-text)]">{title}</h2>
            <p className="mt-3 text-[17px] leading-[1.85] text-[var(--color-text-soft)]">{body}</p>
          </section>
        ))}

        {session.result.safetyNote ? (
          <section className="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-warm)_24%,transparent)] bg-[var(--color-warm-soft)] px-4 py-3">
            <h2 className="text-base font-bold leading-[1.6] text-[var(--color-text)]">
              {text.resultSections.safetyNote}
            </h2>
            <p className="mt-2 text-sm font-medium leading-[1.65] text-[var(--color-text-soft)]">
              {session.result.safetyNote}
            </p>
          </section>
        ) : null}
      </div>
    </article>
  );
}
