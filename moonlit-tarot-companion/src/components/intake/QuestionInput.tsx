"use client";

import { AlertCircle } from "lucide-react";
import type { Locale } from "@/types/reading";

type QuestionInputProps = {
  value: string;
  onChange: (value: string) => void;
  maxChars: number;
  error?: string | null;
  disabled?: boolean;
  locale: Locale;
  label: string;
  placeholder: string;
};

export function QuestionInput({
  value,
  onChange,
  maxChars,
  error,
  disabled,
  label,
  placeholder,
}: QuestionInputProps) {
  const isNearLimit = value.length > maxChars * 0.86;

  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold leading-[1.65] text-[var(--color-text-soft)]">
        {label}
      </span>
      <textarea
        className={["field min-h-42 resize-y", error ? "field-error" : ""].join(" ")}
        value={value}
        disabled={disabled}
        maxLength={maxChars + 1}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="mt-2 flex items-start justify-between gap-3">
        <span className="min-h-5 text-sm font-medium leading-[1.65] text-[var(--color-danger)]">
          {error ? (
            <span className="inline-flex items-center gap-1.5">
              <AlertCircle aria-hidden size={15} />
              {error}
            </span>
          ) : null}
        </span>
        <span
          className={[
            "shrink-0 text-right text-xs font-medium leading-[1.55]",
            isNearLimit ? "text-[var(--color-warning)]" : "text-[var(--color-text-faint)]",
          ].join(" ")}
        >
          {value.length}/{maxChars}
        </span>
      </span>
    </label>
  );
}
