import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-[linear-gradient(135deg,var(--color-accent),var(--color-accent-hover))] text-[var(--color-text-inverse)] shadow-[0_12px_32px_rgba(169,133,255,0.24)] hover:-translate-y-px hover:bg-[linear-gradient(135deg,var(--color-accent-hover),var(--color-accent))] active:translate-y-0 active:bg-[var(--color-accent-pressed)]",
  secondary:
    "border-[var(--color-border-soft)] bg-[var(--color-surface-muted)] text-[var(--color-text)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-raised)]",
  ghost:
    "border-transparent bg-transparent text-[var(--color-text-soft)] hover:bg-[color-mix(in_srgb,var(--color-lavender)_8%,transparent)] hover:text-[var(--color-text)]",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={[
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-pill)] border px-5 text-base font-bold leading-none transition duration-200 ease-out focus-visible:outline-none focus-visible:shadow-[var(--shadow-focus)] disabled:pointer-events-none disabled:opacity-50",
        variantClass[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
