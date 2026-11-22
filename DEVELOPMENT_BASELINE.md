# DEVELOPMENT_BASELINE

改造开始前的原始仓库状态记录（阶段 0）。

## 仓库

- 分支：`master`，与 `origin/master` 同步，工作区干净
- 基线提交：`908e7d7 fix(katex): 覆盖rehype-katex依赖的katex版本 (#718)`
- 远程：`origin` = https://github.com/CoirRaincoat/Firefly.git，`upstream` = https://github.com/CuteLeaf/Firefly.git

## 环境与依赖版本

| 项目 | 版本 |
| --- | --- |
| Firefly | 6.16.9 |
| Astro | 7.3.2 |
| Svelte | 5.57.2 |
| Tailwind CSS | 4.3.3 |
| TypeScript | 6.0.3 |
| Node.js（本机） | 24.14.1（要求 >= 22.23.0） |
| pnpm（本机） | 11.22.0（与 `packageManager` 一致，通过 `npm i -g pnpm@11.22.0` 安装） |

## 命令

| 命令 | 用途 | 基线结果 |
| --- | --- | --- |
| `pnpm install --frozen-lockfile` | 安装依赖 | 通过，无警告 |
| `pnpm dev` | 开发服务器 `localhost:4321` | — |
| `pnpm build` | 生产构建（含 LQIP、字体子集、Pagefind） | 通过，约 49 s，39 个页面 |
| `pnpm preview` | 预览构建产物 | — |
| `pnpm type-check` | `tsc --noEmit` | 通过（需先运行一次 build 或 `astro sync` 生成 `.astro/` 类型） |
| `pnpm check` / `pnpm lint` | Astro 诊断 / Biome | 未在基线运行 |

## 关键目录与路由

| 路由 | 文件 | 说明 |
| --- | --- | --- |
| `/`、`/2/`… | `src/pages/[...page].astro` | 首页与文章分页共用，`PostPage` 渲染列表，数据来自 `getSortedPosts()` |
| `/posts/<slug>/` | `src/pages/posts/[...slug].astro` | 文章详情 |
| `/projects/`、`/projects/<id>/` | `src/pages/projects/` | 项目列表 / 详情，排序 `getSortedProjects()`（`order` 降序） |
| `/dynamic/` | `src/pages/dynamic/index.astro` | 动态页，客户端读取 `/api/dynamic.json` |
| `/archive/`、`/categories/`、`/tags/`、`/series/` | `src/pages/` | 归档、分类、标签、系列 |
| `/about/` | `src/pages/about.astro` + `src/content/spec/about.md` | 关于页 |

- 内容 Schema：`src/content.config.ts`（posts / spec / dynamic / projects）。`dynamic` 集合没有 `draft` 字段。
- 配置：`src/config/*.ts`，经 `src/config/index.ts` 统一导出。
- 样式入口：`Layout.astro` 依次导入 `main.css` → `immersive-reading.css` → `variables.styl`。主题色由 `--hue` 驱动（`oklch(... var(--hue))`）。
- 首页判断：`isHomePage()`（`src/utils/layout-utils.ts`）。

## 现有原生能力

文章、项目、动态、相册、友链、留言板、书签导航、打赏、Bilibili / Bangumi / VNDB / MAL 集成、Pagefind 搜索、Expressive Code、KaTeX、Mermaid、PlantUML、Swup 页面过渡、亮暗主题、RSS / Atom、Sitemap、OG 图片生成、沉浸阅读、加密文章。

## 已知问题

- 构建时有一条 Vite chunk 体积警告；Pagefind 提示不支持中文词干（不影响搜索）。
- 本机 npm 会提示 `.npmrc` 中的 `manage-package-manager-versions` 是未知配置（这是 pnpm 的配置项，可忽略）。
- 仓库自带上游演示内容（文章、项目、动态、关于页、壁纸、头像、音乐），上线前必须替换，处理方式见 `CHANGELOG_CUSTOM.md`。
