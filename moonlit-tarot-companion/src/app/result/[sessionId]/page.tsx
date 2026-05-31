"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { ReadingResult } from "@/components/reading/ReadingResult";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/i18n";
import { getLocalReadingSession } from "@/lib/mock-reading";
import type { ReadingSession } from "@/types/reading";

type ResultPageProps = {
  params: Promise<{ sessionId: string }>;
};

export default function ResultPage({ params }: ResultPageProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [session, setSession] = useState<ReadingSession | null>(null);

  useEffect(() => {
    params.then(({ sessionId: id }) => setSessionId(id));
  }, [params]);

  useEffect(() => {
    if (!sessionId) return;
    setSession(getLocalReadingSession(sessionId));
  }, [sessionId]);

  const locale = session?.locale ?? "zh";
  const text = copy[locale];

  return (
    <main className="min-h-screen px-5 py-6">
      <div className="mx-auto w-full max-w-[860px]">
        <Link href="/" className="inline-flex">
          <Button type="button" variant="ghost" className="min-h-11 px-3 text-sm">
            <ArrowLeft aria-hidden size={17} />
            {text.resultBack}
          </Button>
        </Link>

        <div className="motion-enter mt-5">
          {session ? (
            <ReadingResult session={session} locale={locale} />
          ) : (
            <div className="card p-6 text-base leading-[1.75] text-[var(--color-text-soft)]">
              {text.resultMissing}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
