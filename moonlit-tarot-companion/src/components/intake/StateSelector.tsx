"use client";

import type { EmotionalStatus, Locale } from "@/types/reading";
import { statusDescriptions, statusLabels } from "@/lib/i18n";

type StateSelectorProps = {
  value: EmotionalStatus | null;
  onChange: (status: EmotionalStatus) => void;
  disabled?: boolean;
  locale: Locale;
};

const statuses: EmotionalStatus[] = ["work", "love", "family", "wealth"];

export function StateSelector({ value, onChange, disabled, locale }: StateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {statuses.map((status) => {
        const selected = value === status;

        return (
          <button
            key={status}
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={() => onChange(status)}
            className={[
              "min-h-[72px] rounded-[var(--radius-lg)] border p-3 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:opacity-50",
              selected
                ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] shadow-[inset_0_0_24px_rgba(216,194,255,0.12)]"
                : "border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-raised)]",
            ].join(" ")}
          >
            <span className="block text-base font-bold leading-[1.4] text-[var(--color-text)]">
              {statusLabels[locale][status]}
            </span>
            <span className="mt-1 block text-xs font-medium leading-[1.55] text-[var(--color-text-muted)]">
              {statusDescriptions[locale][status]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
