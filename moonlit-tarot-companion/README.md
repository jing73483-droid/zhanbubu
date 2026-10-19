# Moonlit Tarot Companion 应用

Next.js 15 + React 19 + TypeScript + Tailwind CSS 的中泰双语情绪陪伴交互原型。完整背景、文档导航、功能状态与部署方式见 [根目录 README](../README.md)。

## 启动

```bash
npm ci
npm run dev
```

本地地址 http://localhost:3000。

## 静态导出

```bash
npm run build
```

产物在 `out/`；GitHub Pages 子路径构建使用 `GITHUB_PAGES=true npm run build`。

## 当前实现

情绪选择、抽牌、问题输入、三段式示例解读和浏览器草稿保存。示例解读由 `src/lib/mock-reading.ts` 提供，不调用真实 AI。结果页通过 `sessionId` 查询参数读取本地浏览器记录。

## 配置边界

不需要模型密钥或数据库凭据。不应将 API Key 放入前端或 NEXT_PUBLIC 环境变量。真实模型、数据库、付费及埋点需要后续实现。
