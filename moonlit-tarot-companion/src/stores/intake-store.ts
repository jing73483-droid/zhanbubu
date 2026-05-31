"use client";

import { create } from "zustand";
import type { EmotionalStatus } from "@/types/reading";

const DRAFT_KEY = "moonlit.lastIntakeDraft";
const VALID_STATUSES = new Set(["work", "love", "family", "wealth"]);

type IntakeState = {
  status: EmotionalStatus | null;
  question: string;
  setStatus: (status: EmotionalStatus) => void;
  setQuestion: (question: string) => void;
  restoreDraft: () => void;
};

function persistDraft(status: EmotionalStatus | null, question: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    DRAFT_KEY,
    JSON.stringify({ status, question, updatedAt: new Date().toISOString() }),
  );
}

export const useIntakeStore = create<IntakeState>((set, get) => ({
  status: null,
  question: "",
  setStatus: (status) => {
    set({ status });
    persistDraft(status, get().question);
  },
  setQuestion: (question) => {
    set({ question });
    persistDraft(get().status, question);
  },
  restoreDraft: () => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return;

    try {
      const draft = JSON.parse(raw) as {
        status: EmotionalStatus | null;
        question: string;
        updatedAt: string;
      };
      const age = Date.now() - new Date(draft.updatedAt).getTime();
      if (age > 7 * 24 * 60 * 60 * 1000) return;
      set({
        status: draft.status && VALID_STATUSES.has(draft.status) ? draft.status : null,
        question: draft.question,
      });
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  },
}));
