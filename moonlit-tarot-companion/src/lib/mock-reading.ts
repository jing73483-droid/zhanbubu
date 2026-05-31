import { statusLabels } from "@/lib/i18n";
import { tenOfWandsCard } from "@/lib/tarot";
import type { CompanionReadingOutput, IntakePayload, ReadingSession } from "@/types/reading";

const SESSION_PREFIX = "moonlit.session.";

function makeId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createMockResult(payload: IntakePayload): CompanionReadingOutput {
  const statusLabel = statusLabels[payload.locale][payload.status];
  const card = payload.selectedCard ?? tenOfWandsCard;
  const cardName = card.name[payload.locale];

  if (payload.locale === "zh") {
    return {
      empathy: `我先看见的是：你正在把「${statusLabel}」这件事放在心里反复掂量。你写下来的问题不需要马上被解决，它至少值得先被认真听见。`,
      reading: `这次出现的是「${cardName}」。它不是在催你继续硬撑，而是在提醒你：真正消耗你的，也许不只是事情本身，还有你一直独自背着所有重量的方式。`,
      nextStep:
        "今天先做一件很小的事：把最让你卡住的一句话单独写出来，然后只问自己一个问题：我现在最需要被减轻的部分是什么？",
      safetyNote: "这不是医疗、法律或财务建议，也不是确定预测。它只是一段帮助你整理情绪的陪伴式解读。",
      riskLevel: "normal",
    };
  }

  return {
    empathy: `ฉันเห็นว่าหัวใจของคุณกำลังวนอยู่กับเรื่อง "${statusLabel}" และมันไม่ใช่เรื่องเล็กเลยที่ต้องแบกไว้คนเดียวแบบนี้`,
    reading: `ไพ่ที่เปิดออกมาคือ "${cardName}" ไพ่ใบนี้ไม่ได้บอกให้คุณแบกต่อไปเรื่อยๆ แต่ชวนให้มองว่า สิ่งที่หนักที่สุดอาจเป็นการพยายามถือทุกอย่างไว้คนเดียวมานานเกินไป`,
    nextStep:
      "วันนี้ลองทำเพียงอย่างเดียวพอ เขียนหนึ่งประโยคที่หนักที่สุดออกมา แล้วถามตัวเองเบาๆ ว่า ตอนนี้ฉันอยากให้ส่วนไหนของชีวิตเบาลงก่อน",
    safetyNote:
      "นี่ไม่ใช่คำวินิจฉัยหรือคำทำนายที่แน่นอน เป็นเพียงคำอ่านเพื่อช่วยสะท้อนความรู้สึกอย่างอ่อนโยน",
    riskLevel: "normal",
  };
}

export function createLocalReadingSession(payload: IntakePayload): ReadingSession {
  const session: ReadingSession = {
    id: makeId(),
    status: payload.status,
    question: payload.question,
    locale: payload.locale,
    selectedCard: payload.selectedCard ?? tenOfWandsCard,
    result: createMockResult(payload),
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(`${SESSION_PREFIX}${session.id}`, JSON.stringify(session));
  window.localStorage.setItem("moonlit.latestSessionId", session.id);

  return session;
}

export function getLocalReadingSession(sessionId: string): ReadingSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(`${SESSION_PREFIX}${sessionId}`);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ReadingSession;
  } catch {
    return null;
  }
}
