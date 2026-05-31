# Moonlit Tarot Companion — 项目规范

> 本文件夹是面向 AI 编程 Agent（Cursor / Claude Code / Trae / Codex 等）的项目执行规范。
> 按模块拆成多个文件，Agent 做项目时按任务阶段按需加载对应文件。

| 字段 | 内容 |
|------|------|
| 版本 | v1.0 |
| 创建日期 | 2026-05-31 |
| 最后更新 | 2026-05-31 |
| 目标 Agent | Cursor / Claude Code / Trae / Codex |
| 技术栈 | Next.js 15 + TypeScript + Tailwind CSS 4 + Vercel AI SDK + Supabase + Vercel |
| 上游来源 | BRD.md + MRD.md |
| 证据等级 | yellow，PRD 必须继承数据边界 |

---

## 30 秒电梯介绍

**产品是什么**：一个面向泰语情绪承压用户的移动优先 Web 占卜式陪伴产品。

**给谁用**：在分手、家庭责任、孤独或长期疲惫中寻找解释和安慰的泰语用户。

**核心价值**：让用户把难以公开表达的情绪放进一个安全、私密、占卜语境友好的入口，获得“共情接住 + 占卜式解释 + 温和行动建议”的一次性解读。

**V1 核心功能**（最多 3 个）：

1. 情绪/关系状态选择 + 泰语长文本输入。
2. AI 生成三段式占卜式陪伴解读。
3. 结果页继续追问、保存/分享、等待名单和付费意愿测试入口。

---

## 文件导航

| 文件 | 内容 | 什么时候读 |
|------|------|----------|
| [01-overview.md](./01-overview.md) | 项目概述、MVP 范围、核心用户流程 | 首次启动必读 |
| [02-tech-stack.md](./02-tech-stack.md) | 技术栈、初始化命令、目录结构、环境变量 | 首次启动必读 |
| [03-design-handoff.md](./03-design-handoff.md) | 给 design-spec 的设计输入清单（不含 token） | 跑 /design-spec 前读 |
| `../DESIGN.md` | 完整视觉规范，由 /design-spec 产出 | 写样式时读 |
| [04-pages-components.md](./04-pages-components.md) | 路由表、组件树、Props 接口 | 搭页面骨架时读 |
| [05-ai-capabilities.md](./05-ai-capabilities.md) | AI 调用点、Prompt、流式处理、安全边界 | 接入 AI 功能时读 |
| [06-data-model.md](./06-data-model.md) | 实体接口、ER 图、Supabase SQL | 设计数据表时读 |
| [07-business-logic.md](./07-business-logic.md) | 每个功能的流程图和业务规则 | 实现具体功能时读 |
| [08-state-management.md](./08-state-management.md) | Store 划分、状态流转、持久化策略 | 处理状态时读 |
| [09-error-handling.md](./09-error-handling.md) | 错误分类、Loading、空状态 | 兜底异常时读 |
| [10-roadmap.md](./10-roadmap.md) | V2 功能、停止扩大投入信号、技术债 | 规划未来迭代时读 |
| [APPENDIX-data-index.md](./APPENDIX-data-index.md) | 上游数据索引和证据边界 | 验证某条需求来源时读 |

---

## Agent 加载建议

**首次启动必读**（按顺序）：

1. [README.md](./README.md)（本文件）——了解产品全貌和技术栈。
2. [01-overview.md](./01-overview.md)——确认 MVP 范围和核心流程。
3. [02-tech-stack.md](./02-tech-stack.md)——执行初始化命令。
4. `../DESIGN.md`（如已存在）——读完整视觉规范。

**按任务加载**：做到哪一步，再读哪个文件。不要一次性把所有文件都读进上下文。

**执行原则**：

- 每完成一个模块，暂停确认再继续。
- 遇到设计决策不确定的地方，停下来问用户。
- 所有决策以文件里写的为准，不要自己发明。
- V1 不允许新增第 4 个核心功能；新增需求先放入 [10-roadmap.md](./10-roadmap.md)。

---

## 设计规范是否已就绪？

- ✅ **如果项目根目录已有 `../DESIGN.md`**：本 PRD + DESIGN.md 都准备好了，可以开工。
- ⚠️ **如果还没有 `../DESIGN.md`**：先在项目根目录运行 `/design-spec`——它会读取本 PRD 的 [03-design-handoff.md](./03-design-handoff.md) + [04-pages-components.md](./04-pages-components.md)，产出完整的 `../DESIGN.md`。不要在没有 DESIGN.md 的情况下直接开工写代码。

---

## 上游数据追溯

本 PRD 基于以下上游文档的数据建立：

- **BRD.md**：方向判断 = conditional；证据等级 = yellow。
- **MRD.md**：P0/P1/P2 需求依据的索引在 [APPENDIX-data-index.md](./APPENDIX-data-index.md)。
- **数据源**：`/Users/huangjing/Documents/占卜/数据文件/all_comments.json`。
- **数据边界**：TikTok 泰语评论样本，不能外推整体东南亚市场，不能证明真实付费转化。

---

## 可选模块决策

- **AI 能力模块**：已生成 [05-ai-capabilities.md](./05-ai-capabilities.md)，因为 V1 核心依赖 AI 生成。
- **数据模型模块**：已生成 [06-data-model.md](./06-data-model.md)，因为 V1 需要记录匿名会话、事件、等待名单和反馈。
- **数据索引附录**：已生成 [APPENDIX-data-index.md](./APPENDIX-data-index.md)，因为本 PRD 继承 BRD/MRD。

---

## 质量审查记录

**文件结构**：

- [x] 所有必生成文件存在。
- [x] 可选文件决策一致。
- [x] README 导航表和实际文件同步。

**各模块质量**：

| 文件 | 结果 | 备注 |
|------|------|------|
| 01-overview.md | 通过 | V1 控制为 3 个核心功能，P0 有验收标准和不做清单 |
| 02-tech-stack.md | 通过 | 技术栈已按用户确认方案固化，版本号具体 |
| 03-design-handoff.md | 通过 | 只含设计输入，不含视觉 token |
| 04-pages-components.md | 通过 | 核心组件均有 TypeScript Props |
| 05-ai-capabilities.md | 通过 | AI 调用点、Prompt、降级策略齐全 |
| 06-data-model.md | 通过 | 实体接口、关系图、Supabase SQL 齐全 |
| 07-business-logic.md | 通过 | 3 个核心功能均有 Mermaid 流程和边界情况 |
| 08-state-management.md | 通过 | Store 按职责拆分，标注持久化策略 |
| 09-error-handling.md | 通过 | AI 超时、失败、空状态和 Loading 均覆盖 |
| 10-roadmap.md | 通过 | V2 功能来自 V1 不做清单和 BRD 风险判断 |
| APPENDIX-data-index.md | 通过 | PRD 使用的数据索引均可回溯到上游 |

**跨文件一致性**：

- [x] 数据一致性：V1 功能与 MRD/BRD 的 P0 和最小版本对齐。
- [x] 索引回溯：正文引用的数据索引已写入附录。
- [x] 反模糊：关键功能、错误、数据、AI 输出均有具体定义。
- [x] 技术栈一致性：Next.js + TypeScript + AI SDK + Supabase 在各模块一致。
- [x] 设计交接清单完整：03 §3.6 的页面/组件能在 04 找到对应条目。
- [x] 03-design-handoff.md 不越界：视觉 token 留给后续 `/design-spec`。
