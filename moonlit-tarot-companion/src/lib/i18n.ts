import type { EmotionalStatus, Locale } from "@/types/reading";

type Copy = {
  brand: string;
  languageLabel: string;
  heroEyebrow: string;
  heroTitle: string;
  heroBody: string;
  statusLabel: string;
  questionLabel: string;
  questionPlaceholder: string;
  cardLabel: string;
  cardHint: string;
  drawCard: string;
  drawnCard: string;
  cardInterpretationLabel: string;
  safety: string;
  submit: string;
  submitting: string;
  resultBack: string;
  resultEyebrow: string;
  resultTitle: string;
  resultMissing: string;
  resultSections: {
    empathy: string;
    reading: string;
    nextStep: string;
    safetyNote: string;
  };
  errors: {
    status: string;
    empty: string;
    tooLong: string;
  };
};

export const statusLabels: Record<Locale, Record<EmotionalStatus, string>> = {
  th: {
    work: "งาน",
    love: "ความรัก",
    family: "ครอบครัว",
    wealth: "โชคลาภ",
  },
  zh: {
    work: "工作",
    love: "感情",
    family: "家庭",
    wealth: "财运",
  },
};

export const statusDescriptions: Record<Locale, Record<EmotionalStatus, string>> = {
  th: {
    work: "เรื่องงานที่กดทับใจ",
    love: "เรื่องคนที่ยังอยู่ในใจ",
    family: "หน้าที่ที่แบกไว้เงียบๆ",
    wealth: "เงิน โอกาส และจังหวะ",
  },
  zh: {
    work: "压在心里的工作压力",
    love: "那个还放在心里的人",
    family: "安静扛着的责任",
    wealth: "钱、机会和当下节奏",
  },
};

export const copy: Record<Locale, Copy> = {
  th: {
    brand: "Moonlit Tarot Companion",
    languageLabel: "ภาษา",
    heroEyebrow: "พื้นที่เล็กๆ สำหรับคืนที่ใจหนัก",
    heroTitle: "เล่าเรื่องที่ยังวางไม่ลง แล้วค่อยๆ อ่านมันด้วยแสงที่อ่อนโยน",
    heroBody:
      "เลือกความรู้สึกตอนนี้ แล้วเขียนสิ่งที่อยากให้ไพ่ช่วยสะท้อนกลับมาให้ชัดขึ้น",
    statusLabel: "ตอนนี้เรื่องไหนอยู่ใกล้ใจที่สุด",
    questionLabel: "เขียนเรื่องของคุณ",
    questionPlaceholder:
      "เช่น ช่วงนี้งานกดดันมาก รู้สึกเหมือนพยายามอยู่คนเดียวและไม่รู้จะไปต่อยังไง...",
    cardLabel: "เลือกไพ่สำหรับคำอ่านนี้",
    cardHint: "แตะเพื่อเปิดพลังของไพ่ก่อนเริ่มอ่าน",
    drawCard: "จั่วไพ่",
    drawnCard: "ไพ่ที่ได้",
    cardInterpretationLabel: "ความหมายของไพ่ใบนี้",
    safety:
      "คำอ่านนี้เป็นพื้นที่สะท้อนใจ ไม่ใช่คำวินิจฉัยหรือคำทำนายที่แน่นอน หากคุณไม่ปลอดภัยตอนนี้ โปรดติดต่อคนที่ไว้ใจหรือบริการฉุกเฉินในพื้นที่ทันที",
    submit: "เริ่มอ่านให้ฉัน",
    submitting: "กำลังรับฟัง...",
    resultBack: "กลับไปแก้ไข",
    resultEyebrow: "คำอ่านจากแสงจันทร์",
    resultTitle: "สิ่งที่ไพ่สะท้อนกลับมา",
    resultMissing: "ไม่พบคำอ่านนี้ ลองกลับไปเริ่มใหม่อีกครั้ง",
    resultSections: {
      empathy: "รับฟังความรู้สึก",
      reading: "ภาพสะท้อนจากไพ่",
      nextStep: "ก้าวเล็กๆ วันนี้",
      safetyNote: "ขอบเขตที่อ่อนโยน",
    },
    errors: {
      status: "กรุณาเลือกสถานะหนึ่งอย่างก่อน",
      empty: "ลองเขียนความรู้สึกของคุณสักเล็กน้อย",
      tooLong: "ข้อความยาวเกินไป ลองย่อให้สั้นลงเล็กน้อย",
    },
  },
  zh: {
    brand: "Moonlit Tarot Companion",
    languageLabel: "语言",
    heroEyebrow: "给心很重的夜晚，一个很小的入口",
    heroTitle: "把暂时放不下的事写下来，让它在温柔的光里被看见",
    heroBody: "选择此刻最贴近你的状态，再写下你想让牌面帮你照见的问题。",
    statusLabel: "现在最靠近你的状态",
    questionLabel: "写下你的问题",
    questionPlaceholder: "例如：ช่วงนี้งานกดดันมาก รู้สึกเหมือนพยายามอยู่คนเดียวและไม่รู้จะไปต่อยังไง...",
    cardLabel: "为这次解读选择卡牌",
    cardHint: "先点亮卡牌，再开始解读",
    drawCard: "抽一张牌",
    drawnCard: "已抽到",
    cardInterpretationLabel: "这张牌的解析",
    safety:
      "这是一段情绪陪伴式解读，不是医疗诊断或确定预测。如果你此刻不安全，请立刻联系可信任的人或当地紧急服务。",
    submit: "开始解读",
    submitting: "正在倾听...",
    resultBack: "返回修改",
    resultEyebrow: "月光下的解读",
    resultTitle: "牌面照见的内容",
    resultMissing: "没有找到这次解读，可以回到首页重新开始。",
    resultSections: {
      empathy: "先接住你的感受",
      reading: "牌面式解释",
      nextStep: "今天可以做的一小步",
      safetyNote: "温柔边界",
    },
    errors: {
      status: "请先选择一个状态",
      empty: "请先写下一点你的感受",
      tooLong: "内容有点长，请稍微精简后再提交",
    },
  },
};
