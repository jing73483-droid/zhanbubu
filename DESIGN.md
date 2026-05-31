# Moonlit Tarot Companion — 设计规范 (DESIGN.md)

> 最后更新: 2026-05-31  
> 上游来源: `PRD/03-design-handoff.md` + `PRD/04-pages-components.md` + 用户确认「暮色温柔，需要神秘紫」  
> 交互档位: L1 静态优雅  
> 证据等级: 🟢 充分

---

## 1. 设计基调

- **氛围关键词**: 暮色温柔、神秘紫、深夜低声陪伴、克制希望、不评判。
- **一句话定调**: 像深夜里一盏很低的紫色灯，让用户可以慢慢把疲惫和放不下说出来。
- **目标用户视角**: 面向深夜独处、情绪承压、刷到泰语占卜内容后想获得解释和安放感的移动端用户。
- **目标地区/语言**: 泰国 / 泰语为唯一用户界面语言；开发文档和后台说明可用中文。
- **视觉边界**: 神秘感来自低饱和紫、细腻层级和文字节奏，不使用恐吓式符号、强宿命暗示、医疗化蓝绿或高饱和赛博紫。

## 2. 色彩系统

V1 默认使用深色暮色主题，服务深夜使用场景；同时提供浅色降级变量，方便后续系统主题切换。所有颜色必须使用 hex，不允许在实现中以颜色名替代。

```css
:root {
  color-scheme: dark;

  /* 夜色底色 */
  --color-bg: #171020;              /* rgb: 23,16,32 */
  --color-bg-soft: #21172d;         /* rgb: 33,23,45 */
  --color-surface: #2a1d37;         /* rgb: 42,29,55 */
  --color-surface-raised: #342343;  /* rgb: 52,35,67 */
  --color-surface-muted: #24192f;   /* rgb: 36,25,47 */

  /* 文本 */
  --color-text: #f6efff;            /* rgb: 246,239,255 */
  --color-text-soft: #ded0ef;       /* rgb: 222,208,239 */
  --color-text-muted: #a99ab8;      /* rgb: 169,154,184 */
  --color-text-faint: #81718f;      /* rgb: 129,113,143 */
  --color-text-inverse: #21172d;    /* rgb: 33,23,45 */

  /* 边框与分隔 */
  --color-border: #49365c;          /* rgb: 73,54,92 */
  --color-border-soft: #3a2a4a;     /* rgb: 58,42,74 */
  --color-focus: #c9a7ff;           /* rgb: 201,167,255 */

  /* 神秘紫强调色 */
  --color-accent: #a985ff;          /* rgb: 169,133,255 */
  --color-accent-hover: #b99cff;    /* rgb: 185,156,255 */
  --color-accent-pressed: #8f6ee6;  /* rgb: 143,110,230 */
  --color-accent-soft: #3b2a55;     /* rgb: 59,42,85 */
  --color-accent-glow: #d8c2ff;     /* rgb: 216,194,255 */

  /* 暖光辅助色 */
  --color-warm: #f3c98b;            /* rgb: 243,201,139 */
  --color-warm-soft: #4a352e;       /* rgb: 74,53,46 */
  --color-rose: #e8a9bd;            /* rgb: 232,169,189 */
  --color-lavender: #d9c7ff;        /* rgb: 217,199,255 */

  /* 语义色 */
  --color-success: #8fd6b3;         /* rgb: 143,214,179 */
  --color-success-bg: #1f3b33;      /* rgb: 31,59,51 */
  --color-warning: #f3c98b;         /* rgb: 243,201,139 */
  --color-warning-bg: #463524;      /* rgb: 70,53,36 */
  --color-danger: #ff9aa8;          /* rgb: 255,154,168 */
  --color-danger-bg: #4a2430;       /* rgb: 74,36,48 */

  /* 阴影 */
  --shadow-soft: 0 18px 50px rgba(8, 5, 14, 0.34);
  --shadow-raised: 0 24px 70px rgba(8, 5, 14, 0.44);
  --shadow-focus: 0 0 0 3px rgba(201, 167, 255, 0.24);
}

[data-theme="light"] {
  color-scheme: light;

  --color-bg: #fbf7ff;              /* rgb: 251,247,255 */
  --color-bg-soft: #f4edf9;         /* rgb: 244,237,249 */
  --color-surface: #ffffff;         /* rgb: 255,255,255 */
  --color-surface-raised: #ffffff;  /* rgb: 255,255,255 */
  --color-surface-muted: #f1e9f7;   /* rgb: 241,233,247 */

  --color-text: #24172f;            /* rgb: 36,23,47 */
  --color-text-soft: #3b2a4a;       /* rgb: 59,42,74 */
  --color-text-muted: #6d5d7a;      /* rgb: 109,93,122 */
  --color-text-faint: #9586a2;      /* rgb: 149,134,162 */
  --color-text-inverse: #fbf7ff;    /* rgb: 251,247,255 */

  --color-border: #dacbe8;          /* rgb: 218,203,232 */
  --color-border-soft: #eadff2;     /* rgb: 234,223,242 */
  --color-focus: #815ee0;           /* rgb: 129,94,224 */

  --color-accent: #7652d6;          /* rgb: 118,82,214 */
  --color-accent-hover: #6846c4;    /* rgb: 104,70,196 */
  --color-accent-pressed: #5838ad;  /* rgb: 88,56,173 */
  --color-accent-soft: #eee6ff;     /* rgb: 238,230,255 */
  --color-accent-glow: #b99cff;     /* rgb: 185,156,255 */

  --color-warm: #b8792f;            /* rgb: 184,121,47 */
  --color-warm-soft: #fff0da;       /* rgb: 255,240,218 */
  --color-rose: #b85f7a;            /* rgb: 184,95,122 */
  --color-lavender: #7652d6;        /* rgb: 118,82,214 */

  --color-success: #2f8f67;         /* rgb: 47,143,103 */
  --color-success-bg: #e3f6ed;      /* rgb: 227,246,237 */
  --color-warning: #b8792f;         /* rgb: 184,121,47 */
  --color-warning-bg: #fff0da;      /* rgb: 255,240,218 */
  --color-danger: #c94d64;          /* rgb: 201,77,100 */
  --color-danger-bg: #ffe8ee;       /* rgb: 255,232,238 */

  --shadow-soft: 0 16px 40px rgba(58, 42, 74, 0.12);
  --shadow-raised: 0 22px 56px rgba(58, 42, 74, 0.16);
  --shadow-focus: 0 0 0 3px rgba(129, 94, 224, 0.20);
}
```

### 使用规则

- 页面大背景使用 `--color-bg`，首屏允许用 `radial-gradient` 叠加 `--color-accent-soft` 和 `--color-warm-soft` 的低透明度光感。
- 主 CTA 使用 `--color-accent`；保存、分享、次要操作使用透明按钮或 `--color-surface-muted`。
- 警示和安全边界使用暖色 `--color-warning`，不要使用高危红作为常规提醒。
- 错误只用于表单校验、请求失败和安全兜底，不用于制造焦虑。
- 暗色主题必须保证正文与背景对比度 ≥ 4.5:1，按钮文字与按钮底色对比度 ≥ 4.5:1。

## 3. 字体系统

### Next.js `next/font` 引入方式

```ts
import { Cormorant_Garamond, Noto_Sans_SC, Noto_Sans_Thai } from "next/font/google";

export const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-thai",
  display: "swap",
});

export const notoSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sc",
  display: "swap",
});

export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
```

### Google Fonts CSS 备选引入

```css
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap");
```

### 字体用途

- **泰语 UI / 正文**: `"Noto Sans Thai", system-ui, sans-serif`。
- **中文开发说明或后台说明**: `"Noto Sans SC", system-ui, sans-serif`。
- **英文品牌名与轻量装饰标题**: `"Cormorant Garamond", Georgia, serif`，只用于品牌名、结果页小标题或极少量英文，不用于泰语正文。
- **非拉丁文规则**: 泰语正文行高 ≥ 1.75；正文最小 15px，推荐 16px；长文本阅读区推荐 17px；字距不使用负值，泰语正文 `letter-spacing: 0`。

### 字号层级

| 用途 | 字号 | 行高 | 字重 | 说明 |
|------|------|------|------|------|
| Display / 品牌英文 | 40px | 1.05 | 600 | 仅桌面或结果页氛围标题 |
| H1 / 首屏主标题 | 32px | 1.22 | 700 | 移动端最大 32px |
| H2 / 区块标题 | 24px | 1.35 | 700 | 首页输入区、结果区标题 |
| H3 / 卡片标题 | 20px | 1.45 | 600 | 三段式结果标题 |
| Body Large | 17px | 1.85 | 400 | 泰语长文本结果 |
| Body | 16px | 1.75 | 400 | 默认正文和表单文本 |
| Body Small | 14px | 1.65 | 500 | 标签、帮助文本 |
| Caption | 12px | 1.55 | 500 | 字数、时间、状态 |

## 4. 间距、圆角与布局

### 栅格与 token

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  --container-mobile: 100%;
  --container-tablet: 720px;
  --container-desktop: 960px;
}
```

- **断点**: Mobile `≤640px` / Tablet `641-1024px` / Desktop `≥1025px`。
- **移动端容器**: `max-width: 100%`; 左右 padding `20px`，结果页可用 `16px`。
- **桌面端容器**: 首页 `max-width: 760px`; 结果页 `max-width: 860px`; 居中展示，不做复杂双栏。
- **栅格**: 移动端单列；桌面端结果页允许 `minmax(0, 1fr)` 主列 + `280px` 操作列，但 V1 默认保持单列阅读优先。
- **圆角**: 输入框和卡片用 `16px`; 弹层用 `24px`; 小标签用 `999px`。不要大面积使用超过 `24px` 的圆角。

## 5. 组件基础样式

以下样式为 Tailwind/CSS 实现的设计契约；实际代码可抽成 `components/ui` 基础组件，再由业务组件组合。

### 5.1 基础按钮 Button

```css
.btn {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-pill);
  padding: 0 20px;
  font-family: var(--font-thai), var(--font-sc), system-ui, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 1;
  border: 1px solid transparent;
  transition: background-color 180ms ease-out, border-color 180ms ease-out, color 180ms ease-out, transform 180ms ease-out, box-shadow 180ms ease-out;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.48;
  transform: none;
  box-shadow: none;
}

.btn-primary {
  color: var(--color-text-inverse);
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  box-shadow: 0 12px 32px rgba(169, 133, 255, 0.24);
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--color-accent-hover), var(--color-accent));
  transform: translateY(-1px);
}

.btn-primary:active:not(:disabled) {
  background: var(--color-accent-pressed);
  transform: translateY(0);
}

.btn-secondary {
  color: var(--color-text);
  background: var(--color-surface-muted);
  border-color: var(--color-border-soft);
}

.btn-secondary:hover:not(:disabled) {
  border-color: var(--color-border);
  background: var(--color-surface-raised);
}

.btn-ghost {
  color: var(--color-text-soft);
  background: transparent;
}

.btn-ghost:hover:not(:disabled) {
  color: var(--color-text);
  background: rgba(217, 199, 255, 0.08);
}
```

### 5.2 卡片 Card

```css
.card {
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.018)), var(--color-surface);
  box-shadow: var(--shadow-soft);
}

.card-interactive {
  transition: border-color 180ms ease-out, background-color 180ms ease-out, transform 180ms ease-out, box-shadow 180ms ease-out;
}

.card-interactive:hover {
  border-color: var(--color-border);
  transform: translateY(-1px);
  box-shadow: var(--shadow-raised);
}

.card-interactive:focus-within {
  border-color: var(--color-focus);
  box-shadow: var(--shadow-focus), var(--shadow-soft);
}
```

### 5.3 输入框 Input / Textarea

```css
.field {
  width: 100%;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-family: var(--font-thai), var(--font-sc), system-ui, sans-serif;
  font-size: 17px;
  line-height: 1.85;
  padding: 16px;
  transition: border-color 180ms ease-out, background-color 180ms ease-out, box-shadow 180ms ease-out;
}

.field::placeholder {
  color: var(--color-text-faint);
}

.field:hover:not(:disabled) {
  border-color: var(--color-border);
}

.field:focus {
  outline: none;
  border-color: var(--color-focus);
  box-shadow: var(--shadow-focus);
  background: var(--color-surface);
}

.field:disabled {
  opacity: 0.56;
  cursor: not-allowed;
}

.field-error {
  border-color: var(--color-danger);
  background: var(--color-danger-bg);
}
```

### 5.4 导航与应用框架 AppLayout

- V1 不需要复杂导航；顶部只保留品牌名、语言/状态提示和必要的返回入口。
- 移动端顶部高度 `56px`，左右 padding `20px`；背景默认透明，滚动后使用 `rgba(23, 16, 32, 0.82)` + `backdrop-filter: blur(16px)`。
- 品牌名英文可用 Display 字体；其他 UI 仍使用泰语字体。
- 返回按钮、关闭按钮、分享按钮使用 lucide 图标，触控面积至少 `44px × 44px`。

## 6. 业务组件样式指引

### HeroEntry

- 作为首页第一屏核心体验，移动端最小高度 `100svh`，但底部要露出安全说明或下一段内容的 24px 提示。
- 背景使用深紫底 + 柔和径向光，不使用星空密集点、占卜符号堆叠或过度插画。
- 标题区与输入区之间保持 `24px`；输入卡片 padding 移动端 `20px`，桌面端 `28px`。
- 提交按钮固定在输入流程底部，不做吸底遮挡；提交中按钮显示简短 loading 状态。

### StateSelector

- 四个状态选项使用 2×2 网格，移动端 gap `10px`，每项最小高度 `52px`。
- 默认态: `--color-surface-muted` 背景、`--color-border-soft` 边框。
- 选中态: `--color-accent-soft` 背景、`--color-accent` 边框、可加 1 个柔和紫色内发光。
- 禁用态: opacity `0.5`，保持已选项可见但不可点。
- 情绪标签文案要温和，不用红色或高警示视觉区分情绪。

### QuestionInput

- Textarea 默认高度 `168px`，允许用户拉长但不小于 `144px`。
- 字数统计放在输入框下方右侧，颜色使用 `--color-text-faint`；接近上限时变为 `--color-warning`。
- 错误提示放在输入框下方左侧，使用 `--color-danger` 文本 + 小图标，语气简短明确。
- 泰语长文本输入的行高使用 `1.85`，避免压迫感。

### SafetyNote

- `compact` 版本使用小号暖色提示条，背景 `--color-warm-soft`，边框 `rgba(243, 201, 139, 0.24)`。
- `full` 版本用于结果页或展开态，使用普通卡片，不做强警告样式。
- 禁止使用医疗十字、急救红、大面积警示黄；边界提示应像温柔说明，而不是风险弹窗。

### ReadingStream

- loading / streaming 使用低速脉冲光点或文本逐步出现，周期 `1600ms`，透明度变化不超过 0.35。
- 不使用快速旋转 spinner；等待态文案需要有陪伴感，不制造倒计时焦虑。
- error 状态使用卡片内提示，提供 `重试` 主按钮和 `返回修改` 次按钮。
- cancel 操作使用 ghost 按钮，避免与主重试按钮竞争。

### ReadingResult

- 三段式结果必须有清晰层级: 共情接住、占卜式解释、温和行动建议。
- 每段使用独立 section，不一定都做卡片；移动端建议用纵向流式阅读，段间距 `28px`。
- 段标题使用 `20px / 1.45 / 600`，正文使用 `17px / 1.85 / 400`。
- 占卜式解释段可加入极细上边框或小型紫色标记，但不要加入复杂牌面图案。
- `safetyNote` 出现时放在结果末尾，样式同 `SafetyNote full`。

### FollowupPanel

- 结果读完后出现，视觉上比结果正文低一层，避免压迫用户立即转化。
- 操作密度高但要分组: 继续追问为主 CTA；保存/分享为并列 secondary；付费意愿和等待名单为轻量入口。
- 移动端按钮全宽纵向排列，gap `10px`；桌面端可横向排列但不超过 2 个主按钮同排。
- 复制成功状态使用 `--color-success` 小提示，自动消失时间 `2200ms`。

### WaitlistModal

- 使用居中或底部抽屉式弹层；移动端推荐 bottom sheet，高度不超过 `80svh`。
- 遮罩使用 `rgba(8, 5, 14, 0.62)` + blur `8px`。
- 弹层圆角顶部 `24px`，padding `24px`，表单字段间距 `16px`。
- 关闭按钮触控面积 `44px × 44px`，位于右上角。
- 提交成功态保留温柔语气，使用成功色但不变成强烈绿色通知。

### ShareActions

- 使用图标 + 短文本按钮；图标来自 `lucide-react`，推荐 `Copy`, `Share2`, `Bookmark`。
- 复制、分享、保存均为低压操作，不使用主 CTA 紫色填充，除非页面只有一个操作。
- 分享失败时给出可复制文本，不阻断阅读。

## 7. 动效与交互规范

V1 固定使用 L1 静态优雅，避免在 MVP 阶段加入滚动视差、复杂抽牌动画或 3D。

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes softPulse {
  0%, 100% {
    opacity: 0.42;
    transform: scale(1);
  }
  50% {
    opacity: 0.76;
    transform: scale(1.04);
  }
}

.motion-enter {
  animation: fadeInUp 420ms ease-out both;
}

.motion-pulse {
  animation: softPulse 1600ms ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

- **按钮 hover**: 180-200ms ease-out，最多位移 `1px`。
- **页面入场**: `fadeInUp 420ms`，只对主要容器使用。
- **生成中状态**: `softPulse 1600ms`，节奏慢，不使用闪烁。
- **弹层**: 遮罩 fade `180ms`，内容 translateY `12px → 0`，总时长 `220ms`。
- **禁止**: 快速旋转、强烈抖动、抽牌式强反馈、自动播放音频、鼠标跟随光效。

## 8. 暗色模式策略

- 默认主题即暗色主题，优先服务深夜移动端。
- 浅色主题仅作为系统偏好或后续设置项，不作为 V1 首选视觉。
- 暗色背景不能纯黑；使用 `#171020` 保留柔和紫色温度。
- 大面积文字不要使用纯白；默认 `#f6efff`，次级文本 `#ded0ef` 或 `#a99ab8`。
- 所有暗色卡片边界必须可见，但边框透明度要低，不做高对比硬线。

## 9. Do's & Don'ts

**Do:**

- 使用低饱和神秘紫建立记忆点。
- 优先保证泰语长文本的阅读舒适度和换行节奏。
- 让核心输入动作在首页首屏直接完成。
- 用温暖的小提示解释产品边界，避免让用户感觉被审判。
- 在结果页保留充足段间距，让用户能慢慢读完。
- 所有触控目标至少 `44px × 44px`。

**Don't:**

- 不要使用高饱和霓虹紫、赛博渐变或密集星座图案。
- 不要把占卜感做成恐吓式、宿命式或宗教化视觉。
- 不要让转化入口压过结果正文。
- 不要使用医疗蓝绿、诊断式卡片或危机感图标作为主视觉。
- 不要给 MVP 阶段塞超出 PRD 范围的视觉花活。
- 不要把泰语正文压到 14px 或使用过紧行高。

---

## 给 Claude Code 的实现指令

```yaml
design_status: ready
project_name: Moonlit Tarot Companion
source:
  - PRD/03-design-handoff.md
  - PRD/04-pages-components.md
theme:
  name: "暮色温柔 + 神秘紫"
  default_mode: dark
  light_mode: optional_system_fallback
interaction_level: L1
tech_stack:
  framework: Next.js App Router 15.5.2
  styling: Tailwind CSS 4.1.x
  icons: lucide-react
font_system:
  thai_ui: Noto Sans Thai
  chinese_docs: Noto Sans SC
  display_latin: Cormorant Garamond
  next_font: use next/font/google with variables --font-thai, --font-sc, --font-display
color_system:
  use_css_variables_from_section_2: true
  primary_accent: "#a985ff"
  default_background: "#171020"
  default_surface: "#2a1d37"
layout:
  mobile_first: true
  breakpoints: ["<=640px", "641-1024px", ">=1025px"]
  grid_base: "4px/8px spacing scale"
  mobile_padding: "20px"
  desktop_home_max_width: "760px"
  desktop_result_max_width: "860px"
motion:
  level: L1
  allowed: ["hover transition", "fadeInUp", "softPulse", "modal fade/slide"]
  disallowed: ["GSAP", "ScrollTrigger", "3D", "cursor following", "fast spinner"]
  reduced_motion_required: true
core_components:
  - AppLayout
  - HeroEntry
  - StateSelector
  - QuestionInput
  - SafetyNote
  - ReadingStream
  - ReadingResult
  - FollowupPanel
  - WaitlistModal
  - ShareActions
implementation_notes:
  - "用户可见文案默认泰语。"
  - "首页首屏必须直接完成状态选择和长文本输入。"
  - "结果页优先阅读体验，转化入口不要压过三段式结果。"
  - "所有按钮、输入框、卡片必须覆盖 default/hover/focus/disabled 或对应状态。"
  - "不要引入医疗化、恐吓式、强宿命感视觉。"
```
