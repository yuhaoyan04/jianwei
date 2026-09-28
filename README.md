<div align="center">
  <img src="docs/banner.svg" width="780" alt="见微 / Jianwei" />
</div>

# 见微 / Jianwei

> 从细节，看见世界的结构。

见微是一个**内容优先**的个人知识实验室。每篇文章按 **直觉 → 数学 → Demo → 现实意义** 展开，内容按 **板块 → 模块 → 文章** 三级组织，一个概念可拆成多篇小文章慢慢长成一张知识网。

站点默认零 JavaScript、静态 CDN 缓存，读者打开即秒开。

🟢 **在线预览**：<https://jianwei-lab.pages.dev>

---

## 特性

- **内容优先，零 JS 默认** — Astro 编译为纯 HTML，首屏无 JavaScript 阻塞。
- **三级内容模型** — 板块（Section）→ 模块（Series）→ 文章（Article），用文件系统当 CMS，Git 即版本控制。
- **类型化 frontmatter** — 基于 Zod 的 Content Collections schema，字段写错构建即报错。
- **MDX + KaTeX** — 正文 Markdown 写作速度，需要时升级为组件；数学公式 `$...$` / `$$...$$` 原生支持。
- **多风格 + 多字体 + 亮暗** — 三套配色（见微 / 墨 / 石）× 四种字体（宋 / 楷 / 黑 / 码）× 亮/暗/跟随系统，读者自助切换并持久化。
- **边缘部署** — Cloudflare Pages 全球 CDN，`git push` 或一条命令即上线。

## 技术栈

| 层 | 选型 |
| --- | --- |
| 站点框架 | [Astro](https://astro.build) 5 |
| 内容格式 | Markdown + [MDX](https://mdxjs.com) |
| 数学渲染 | remark-math + rehype-katex |
| 样式 | 原生 CSS 变量（无 UI 框架） |
| 托管 | [Cloudflare Pages](https://pages.cloudflare.com) |
| 包管理 | pnpm |

## 快速开始（复现）

**前置要求**：Node.js ≥ 18，[pnpm](https://pnpm.io)，Git。

```bash
# 1. 克隆
git clone https://github.com/yuhaoyan04/knowledge-lab.git
cd knowledge-lab

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器（默认 http://localhost:4321）
pnpm dev
```

构建生产版本：

```bash
pnpm build      # 输出到 dist/
pnpm preview    # 本地预览构建产物
```

## 内容模型

```
板块 Section        例：math-finance / ai-frontier / reading-cognition / build-in-public
  └─ 模块 Series    例：泰勒展开、Transformer 原理、Knowledge Lab 构建
       └─ 文章      例：泰勒展开（一）：从直线到曲线
```

- **板块**：顶层分类，4 个固定板块。
- **模块**：一个概念/主题的合集，可由多篇小文章组成，用 `series` 标识。
- **文章**：最小单元，属于某个模块，用 `seriesPart` 排序。

文章 frontmatter 不含 `section` 字段——**板块从所属模块派生**，避免冗余与不一致。

## 目录结构

```
knowledge-lab/
├─ src/
│  ├─ content/
│  │  ├─ series/              # 模块定义（.md）
│  │  └─ articles/            # 文章（.md / .mdx）
│  ├─ components/             # Header / Footer / ThemeSettings / PostList …
│  ├─ layouts/                # BaseLayout / ArticleLayout
│  ├─ lib/                    # sections.ts / content.ts / readingTime.ts
│  ├─ pages/
│  │  ├─ index.astro          # 首页
│  │  ├─ posts.astro          # 全部文章（按年）
│  │  └─ [section]/[module]/[article].astro   # 三级路由
│  └─ styles/global.css        # 主题系统（配色 + 字体）
├─ astro.config.mjs            # Astro 配置 + Markdown 插件链
├─ content.config.ts           # 内容集合 schema
└─ package.json
```

## 写作指南

新增一篇文章只需两步：

1. 在 `src/content/series/` 下建一个模块（若已有则跳过）：

   ```md
   ---
   title: 泰勒展开
   summary: 从直线逼近到曲线，理解函数的局部近似。
   section: math-finance
   tags: [微积分, 近似]
   order: 1
   ---
   ```

2. 在 `src/content/articles/` 下建一篇 `.mdx`：

   ```md
   ---
   title: 泰勒展开（一）：从直线到曲线
   summary: 用切线去逼近函数，是微积分最朴素也最有力的想法。
   prerequisite: 了解导数。
   series: taylor-expansion
   seriesPart: 1
   tags: [微积分, 泰勒]
   published: 2026-10-01
   githubDemo: https://github.com/your/repo
   ---

   ## 直觉
   …

   ## 数学
   $$ \cdots $$

   ## Demo
   …

   ## 现实意义
   …
   ```

保存后 `pnpm dev` 即时预览。文章模板固定渲染：标题 → 摘要 → meta（日期·分钟·字数）→ 先修要求 → 目录 → 正文 → Demo 链接 → 标签 → 上一篇/下一篇。

## 主题与字体

右上角 ◐ 打开面板，可切换：

- **风格**：见微（暖奶白） / 墨（纯黑白） / 石（冷蓝灰）
- **字体**：宋（衬线） / 楷（楷书） / 黑（无衬线） / 码（等宽）
- **明暗**：亮 / 暗 / 自动跟随系统

选择持久化在 `localStorage`，加载前早期注入避免闪烁。所有配色与字体走 CSS 变量，定义于 `src/styles/global.css`。

## 部署

两种方式任选其一。

**方式一：wrangler CLI 直接部署**

```bash
pnpm build
pnpm exec wrangler pages deploy dist --project-name jianwei-lab --branch main --commit-dirty
```

**方式二：连接 GitHub 自动部署**

1. 在 [Cloudflare Pages](https://dash.cloudflare.com) 创建项目并连接本仓库。
2. 构建命令填 `pnpm build`，输出目录填 `dist`，Node 版本 `22`。
3. 之后每次 `git push` 自动构建并部署到全球边缘节点。

默认获得 `*.pages.dev` 域名，也可在控制台绑定自定义域名。

## 相关

- 首篇 Build In Public 文章：<https://jianwei-lab.pages.dev/build-in-public/knowledge-lab/hello-knowledge-lab/>
- 详细搭建过程见上文「Demo」一节。

## License

[MIT](./LICENSE) © 2026 yuhaoyan04
