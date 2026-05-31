# 2. 技术栈与环境配置

> 本文件是 PRD/ 文件夹的第 2 部分。如需了解产品全貌请先读 [README.md](./README.md)。
> 上一模块：[01-overview.md](./01-overview.md) · 下一模块：[03-design-handoff.md](./03-design-handoff.md)

---

## 2. 技术栈与环境配置

### 技术栈总览

| 层面 | 选型 | 版本 | 用途 |
|------|------|------|------|
| 前端框架 | Next.js App Router | 15.5.2 | Web 应用、服务端 API、部署适配 |
| 语言 | TypeScript | 5.9.x | 类型约束和 Agent 可执行性 |
| React | React | 19.1.x | UI 渲染 |
| 样式方案 | Tailwind CSS | 4.1.x | 响应式样式；具体视觉 token 等 DESIGN.md 产出 |
| AI SDK | Vercel AI SDK | 5.x；`@ai-sdk/react` 2.0.33 | AI 模型调用、流式响应、结构化输出 |
| AI Provider | OpenAI compatible API | 用户配置 | V1 默认使用 OpenAI 兼容接口，便于后续替换模型 |
| 表单 | React Hook Form | 7.62.0 | 输入表单和校验 |
| 校验 | Zod | 4.1.x | 输入、AI 输出、API payload 校验 |
| 状态管理 | Zustand | 5.0.8 | 跨页面临时状态、结果状态、配置状态 |
| 数据库 | Supabase Postgres | `@supabase/supabase-js` 2.57.x | 会话、事件、等待名单、反馈留存 |
| 部署 | Vercel | 平台托管 | Next.js 部署、环境变量管理、预览环境 |

### 为什么选这套

- 产品核心是 AI 解读，Next.js API Route 适合把模型 Key、Prompt 和安全边界放在服务端。
- Vercel AI SDK 能支持流式输出和结构化生成，后续换模型成本低。
- Supabase 覆盖数据库和后续认证需求；V1 只用匿名会话和事件表，不引入账号体系。
- Tailwind CSS 适合快速实现响应式 Web；视觉细节由 PRD 完成后的 `DESIGN.md` 决定。
- 技术栈都属于主流生态，AI 编程 Agent 更容易稳定生成代码。

### 项目初始化命令

```bash
npx create-next-app@15.5.2 moonlit-tarot-companion --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd moonlit-tarot-companion
npm install ai@5 @ai-sdk/react@2.0.33 @ai-sdk/openai@2 zod@4.1 react-hook-form@7.62 zustand@5.0 @supabase/supabase-js@2.57 lucide-react
npm install -D prettier
```

### 项目目录结构

```text
src/
├── app/                              # Next.js App Router 页面和服务端路由
│   ├── api/
│   │   ├── reading/route.ts          # AI 解读生成接口
│   │   ├── events/route.ts           # 行为事件记录接口
│   │   └── waitlist/route.ts         # 等待名单提交接口
│   ├── result/[sessionId]/page.tsx   # 结果页
│   ├── layout.tsx                    # 根布局，加载全局样式和元信息
│   └── page.tsx                      # 首页，承载状态选择和输入
├── components/                       # React 组件
│   ├── ui/                           # 基础 UI 组件；按 DESIGN.md 实现样式
│   ├── landing/HeroEntry.tsx         # 首页首屏输入体验
│   ├── intake/StateSelector.tsx      # 情绪/关系状态选择
│   ├── intake/QuestionInput.tsx      # 长文本输入
│   ├── reading/ReadingStream.tsx     # 解读流式展示
│   ├── reading/ReadingResult.tsx     # 三段式结果展示
│   └── conversion/FollowupPanel.tsx  # 追问、保存、留资入口
├── lib/                              # 业务工具和服务端封装
│   ├── ai/prompts.ts                 # Prompt 和输出 schema
│   ├── ai/generate-reading.ts        # AI 调用封装
│   ├── supabase/server.ts            # 服务端 Supabase client
│   ├── validation.ts                 # Zod schema
│   ├── safety.ts                     # 心理安全和禁用输出规则
│   └── tracking.ts                   # 行为事件封装
├── stores/                           # Zustand Store
│   ├── intake-store.ts               # 输入流程临时状态
│   ├── reading-store.ts              # 解读生成和结果状态
│   └── config-store.ts               # AI 配置和运行配置状态
├── types/                            # TypeScript 类型
│   ├── reading.ts                    # 解读相关实体
│   ├── events.ts                     # 行为事件类型
│   └── database.ts                   # Supabase 生成或手写类型
└── styles/
    └── globals.css                   # Tailwind 入口；具体 token 由 DESIGN.md 指导实现
```

### 环境变量

```env
# App
NEXT_PUBLIC_APP_NAME=Moonlit Tarot Companion
NEXT_PUBLIC_PRIMARY_LANGUAGE=th

# AI 模型配置，服务端使用
AI_PROVIDER=openai
AI_MODEL=gpt-4.1-mini
AI_API_KEY=
AI_BASE_URL=
AI_MAX_TOKENS=1200
AI_TEMPERATURE=0.72
AI_TIMEOUT_SECONDS=30

# Supabase，服务端写入事件和会话
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# 转化验证
NEXT_PUBLIC_ENABLE_PAID_INTENT=true
NEXT_PUBLIC_ENABLE_WAITLIST=true
```

### 环境变量说明

| 变量 | 谁配置 | 默认值 | 用途 |
|------|--------|--------|------|
| `AI_API_KEY` | 项目部署者 | 空 | 服务端调用 AI 模型 |
| `AI_BASE_URL` | 项目部署者 | 空 | OpenAI 兼容模型自定义地址 |
| `AI_MODEL` | 项目部署者 | `gpt-4.1-mini` | V1 默认模型 |
| `SUPABASE_SERVICE_ROLE_KEY` | 项目部署者 | 空 | 服务端写入数据库，禁止暴露到客户端 |
| `NEXT_PUBLIC_SUPABASE_URL` | 项目部署者 | 空 | 客户端和服务端连接 Supabase |
| `NEXT_PUBLIC_ENABLE_PAID_INTENT` | 项目部署者 | `true` | 控制是否展示付费意愿按钮 |

### 可选模块决策

- **生成 `05-ai-capabilities.md`**：产品核心依赖 AI 解读。
- **生成 `06-data-model.md`**：V1 需要持久化匿名会话、事件、等待名单和反馈。
- **生成 `APPENDIX-data-index.md`**：本 PRD 继承 BRD/MRD，需要保留数据追溯。
