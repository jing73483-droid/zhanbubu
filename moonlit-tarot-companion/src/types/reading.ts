export type EmotionalStatus = "work" | "love" | "family" | "wealth";

export type Locale = "th" | "zh";

export interface TarotCard {
  id: "ten-of-wands";
  name: Record<Locale, string>;
  meaning: Record<Locale, string>;
  interpretation: Record<Locale, string>;
}

export interface IntakePayload {
  status: EmotionalStatus;
  question: string;
  locale: Locale;
  selectedCard?: TarotCard;
}

export interface CompanionReadingOutput {
  empathy: string;
  reading: string;
  nextStep: string;
  safetyNote?: string;
  riskLevel: "normal" | "sensitive" | "crisis";
}

export interface ReadingSession {
  id: string;
  status: EmotionalStatus;
  question: string;
  locale: Locale;
  selectedCard: TarotCard;
  result: CompanionReadingOutput;
  createdAt: string;
}
