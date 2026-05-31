type SafetyNoteProps = {
  children: string;
};

export function SafetyNote({ children }: SafetyNoteProps) {
  return (
    <p className="rounded-[var(--radius-lg)] border border-[color-mix(in_srgb,var(--color-warm)_24%,transparent)] bg-[var(--color-warm-soft)] px-4 py-3 text-sm font-medium leading-[1.65] text-[var(--color-text-soft)]">
      {children}
    </p>
  );
}
