# 5. AI 能力配置

> 本文件是 PRD/ 文件夹的第 5 部分。如需了解产品全貌请先读 [README.md](./README.md)。
> 上一模块：[04-pages-components.md](./04-pages-components.md) · 下一模块：[06-data-model.md](./06-data-model.md)

---

## 5. AI 能力配置

### AI 配置架构

用户不在前台配置模型；V1 由项目部署者通过环境变量配置，运行时服务端读取。

```typescript
interface AIConfig {
  provider: 'openai' | 'custom'; // V1 使用 OpenAI 兼容接口
  model: string; // 默认 gpt-4.1-mini
  apiKey: string; // 服务端环境变量
  baseUrl?: string; // 自定义 API 地址
  maxTokens: number; // 默认 1200
  temperature: number; // 默认 0.72
  timeoutSeconds: number; // 默认 30
}
```

### AI 调用点清单

| 调用点 | 触发时机 | 输入 | 期望输出 | 超时 | 降级策略 |
|-------|---------|------|---------|------|---------|
| `generateCompanionReading` | 用户提交状态和问题 | 状态、泰语问题、会话 ID、安全规则 | 三段式泰语 JSON 解读 | 30 秒 | 显示本地兜底文案，允许重试，不写入成功结果 |
| `rewriteForSharing` | 用户点击分享且结果过长 | 已生成结果 | 更短的泰语分享文本 | 12 秒 | 直接复制原结果摘要，不阻塞分享 |

### 输出结构

```typescript
interface CompanionReadingOutput {
  empathy: string; // 共情接住，不评判
  reading: string; // 占卜式解释，不能绝对化预测
  nextStep: string; // 一个温和、可执行的小行动
  safetyNote?: string; // 检测到高风险表达时出现
  riskLevel: 'normal' | 'sensitive' | 'crisis'; // 心理安全风险等级
}
```

### Prompt 设计

#### generateCompanionReading Prompt

**System Prompt**：

```text
You are a Thai-language tarot-style emotional companion for users who feel tired, lonely, heartbroken, or burdened by family responsibility.

Your job is not to predict the future with certainty. Your job is to help the user feel gently seen, give a symbolic tarot/fortune-telling interpretation of their current situation, and suggest one small next step.

Rules:
- Always write in Thai.
- Be warm, calm, and non-judgmental.
- Do not claim medical, legal, financial, or supernatural certainty.
- Do not say that the cards guarantee an outcome.
- Do not encourage dependency, obsession, revenge, self-harm, or waiting passively for fate.
- If the user expresses self-harm, inability to stay safe, or immediate danger, set riskLevel to "crisis", include a safetyNote that encourages contacting local emergency services or a trusted person immediately, and keep the reading short.
- If the user expresses severe distress but no immediate danger, set riskLevel to "sensitive" and include a gentle safetyNote.
- Return only valid JSON matching the requested schema.
```

**User Prompt 模板**：

```text
User selected status: {{statusLabel}}
User message in Thai:
{{question}}

Create a companion reading with exactly these sections:
1. empathy: acknowledge what the user is carrying.
2. reading: use symbolic tarot/fortune-telling language to explain the situation as a gentle narrative.
3. nextStep: give one small action the user can do today.
4. safetyNote: optional, only if needed.
5. riskLevel: normal, sensitive, or crisis.
```

**输出格式要求**：

```json
{
  "empathy": "string - Thai empathy paragraph",
  "reading": "string - Thai symbolic tarot-style interpretation",
  "nextStep": "string - Thai small action suggestion",
  "safetyNote": "string | undefined - Thai safety boundary or support suggestion",
  "riskLevel": "normal | sensitive | crisis"
}
```

#### rewriteForSharing Prompt

**System Prompt**：

```text
You rewrite Thai companion readings into short shareable text. Keep the tone gentle and private. Do not expose sensitive details. Do not add new predictions.
```

**User Prompt 模板**：

```text
Original reading:
{{resultText}}

Rewrite into a short Thai share text that keeps the feeling but removes personal details.
```

**输出格式要求**：

```json
{
  "shareText": "string - concise Thai share text"
}
```

### 流式响应处理

- 首页提交后进入 `loading`，服务端开始生成。
- 如果模型支持流式结构化输出，前端逐段显示 `empathy`、`reading`、`nextStep`。
- 如果结构化流式不可用，前端展示陪伴式等待状态，接口完成后一次性跳转结果页。
- 用户点击取消时调用 AbortController，中断前端请求；已写入数据库的会话状态标记为 `cancelled`。
- 超过 30 秒未完成时前端进入超时态，保留输入并显示重试。

### 安全过滤

输入进入模型前执行轻量规则检测：

- 检测自伤、立即危险、威胁他人的表达。
- 检测联系方式、隐私信息，只用于提示用户谨慎，不阻止提交。
- 检测非泰语或明显垃圾文本，阻止提交。

输出展示前执行结构校验：

- JSON 必须符合 `CompanionReadingOutput`。
- 任一字段为空则视为失败，触发重试或兜底。
- `riskLevel` 为 `crisis` 时，结果页优先展示安全提示，弱化占卜表达。
