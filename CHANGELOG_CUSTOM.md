# CHANGELOG_CUSTOM

相对于 Firefly 上游（基线 `908e7d7`）的定制改动。源码中的定制处用 `[custom]` 注释标记，同步上游时可搜索该标记。

## 阶段 0：基线

- 新增 `DEVELOPMENT_BASELINE.md`。

## 阶段 1：站点基础配置

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/siteConfig.ts` | 标题、副标题、描述、关键词、`site_url` 改为占位；`hue` 165 → 185；`defaultMode` → `light`；`card.border` → `true`；导航栏标题改为占位 | 站点身份与 Miku Teal 主色，默认亮色 |
| `src/config/siteConfig.ts`（页面开关） | 关闭 friends、guestbook、gallery、booknav、sponsor | 没有真实内容或未配置评论系统，不启用空页面 |
| `src/config/navBarConfig.ts` | 导航改为 Home / Projects / Blog（归档、分类、标签）/ Notes / About；`LinkPresets` 未改 | 任务书 4.1 |
| `src/config/profileConfig.ts` | 昵称、签名、GitHub、邮箱改为占位 | 移除上游作者信息 |
| `src/config/sidebarConfig.ts` | 关闭公告、音乐组件（左栏与移动端） | 无公告内容，不使用音乐 |
| `src/config/musicConfig.ts` | `showInNavbar`、`showInSidebar` → `false` | 同上 |
| `src/config/backgroundWallpaper.ts` | `mode` → `none`，`playerEnable` → `false` | 上游壁纸和视频是现成角色素材，不作为主视觉 |
| `src/content/spec/about.md` | 替换为占位介绍 | 移除上游作者自我介绍 |
| `src/content/posts/**`、`src/content/projects/*` | 演示内容加 `draft: true` | 生产构建隐藏演示内容，开发模式仍可见，便于调样式 |

## 阶段 2：视觉系统

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/styles/custom/theme.css`（新增） | 新增 `--brand-*` 令牌；覆盖上游已有主题变量：亮色页面底 `#FAFCFF`、卡片白、正文 ink `#30394F`、ink 系边框；暗色为 Tokyo Night 中性色（`#1a1b26` / `#1f2335` / `#16161e`）；卡片双层柔和阴影；`--radius-large` 1rem → 0.875rem；等宽字体回退；减少动态效果 | 任务书视觉规范。强调色仍用 `var(--hue)`，设置面板的色相滑块继续可用 |
| `src/layouts/Layout.astro` | 在 `variables.styl` 之后加一行 `import "@/styles/custom/theme.css"` | **唯一的上游样式入口改动**：覆盖层必须在上游变量之后加载才能生效 |
| `src/config/fontConfig.ts` | JetBrains Mono 的回退列表前加 `"Cascadia Code"` | 代码字体本来就是 JetBrains Mono，只补 Windows 回退 |

说明：
- 组件规则放在 `@layer components`，没有使用 `!important`，Tailwind 工具类仍可覆盖。
- 上游已有全站 `:focus-visible` 焦点环（`main.css`，颜色取 `--primary`），没有重复定义。
- 减少动态效果只作用于 `html` 平滑滚动和本站新增的 `home-*` 组件，不改上游组件的动画。
- 亮色 `--primary` 取 `oklch(0.72 0.12 hue)`，约等于 `#39C5BB`；`#39C5BB` 本身在白底上对比度约 2:1，所以正文辅助文字使用更深的 `#5f6b80`，不直接用 `#778397`。

## 阶段 3：首页

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/homeConfig.ts`（新增） | 首页门户区配置：问候语、座右铭、简介、按钮、兴趣标签、各区块开关与数量 | 文案集中配置，均为占位 |
| `src/components/pages/home/HomePortal.astro`（新增） | 组合下列区块 | |
| `src/components/pages/home/HomeHero.astro`（新增） | 问候、座右铭（中英）、简介、Projects / Blog / About 按钮；右侧原创终端风格 SVG 插画 | 不使用角色素材；光标闪烁在减少动态效果时关闭；≤480px 隐藏插画 |
| `src/components/pages/home/InterestTags.astro`（新增） | 兴趣标签网格；配置了 `tag` 的项链接到 `/archive/?tag=…` | 现在没有对应文章，默认都不加链接 |
| `src/components/pages/home/FeaturedProjects.astro`（新增） | 复用 `getSortedProjects()` + `ProjectCard`，取前 3 个 | 没有项目或项目页关闭时整块不渲染 |
| `src/components/pages/home/RecentActivity.astro`（新增） | 构建时读取 `dynamic` 集合，复用 `sortDynamics` / `dynamicPlainText` / `dynamicAnchor`，链接到 `/dynamic/#锚点` | 没有动态或动态页关闭时整块不渲染 |
| `src/components/pages/home/HomeSectionHeading.astro`（新增） | 区块标题 + 「View all」链接 | |
| `src/pages/[...page].astro` | 引入 `HomePortal`，仅在 `page.currentPage === 1` 时渲染；第 1 页没有文章时不显示 Recent Posts 标题 | 方案 A：保留原路由和分页，现有文章列表作为 Recent Posts |

说明：页面原本已有隐藏的 `<h1>`（站点标题），Hero 标题用 `<h2>`，避免一页两个 h1。

## 阶段 4：栏目页

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/styles/custom/theme.css` | 文章卡片、项目卡片悬停时加深阴影并给边框加主题色；不做位移 | 位移会干扰文章列表的瀑布流定位 |
| `src/config/dynamicConfig.ts` | 标题 `Notes`、占位描述；`showComment` → `false` | 与导航一致；评论系统 `type: "none"` 未配置 |

Projects、Blog（归档 / 分类 / 标签）、文章详情页沿用上游组件，只通过主题变量换色，没有改结构。About 在阶段 1 已完成。Gallery、Friends、ACG 相关页面保持关闭。

## 阶段 5：测试记录（2026-11-23 本地，Windows，Node 24.14.1）

新增 `DEPLOYMENT.md`：部署方式、环境变量、上线前步骤。

| 项目 | 结果 |
| --- | --- |
| `pnpm build` | 通过，exit 0，24 个页面 |
| `pnpm type-check` | 通过 |
| `pnpm check`（astro check） | 通过，267 个文件 0 错误 |
| `biome check`（本次改动的配置、组件、样式、`[...page].astro`、`Layout.astro`） | 通过（`homeConfig.ts` 格式问题已用 `biome format` 修复） |
| 生产预览路由 | `/` `/projects/` `/archive/` `/categories/` `/tags/` `/dynamic/` `/about/` `/search/` `/rss.xml` `/atom.xml` `/sitemap-index.xml` `/robots.txt` `/api/dynamic.json` 均 200；`/friends/` `/gallery/` 跳转 `/404/`；不存在的路径 404 |
| 首页门户区只在第 1 页 | 开发模式下 `/` 有 Hero，`/2/` 没有，分页正常 |
| 样式加载顺序 | 构建产物 CSS 中 `theme.css` 的变量声明排在 `variables.styl` 之后 |
| 最近动态锚点 | 生成的 `/dynamic/#dynamic-2026-07-15-…` 与动态页条目 id 规则一致（未在浏览器中点击跳转验证） |
| SEO | 首页有 title、description、canonical、OG、RSS/Atom alternate；sitemap 不含已关闭页面；robots.txt 指向 sitemap。所有绝对地址仍是占位域名 |
| 视觉检查 | 用本机 Edge headless 截图检查：亮色 1440px、600px 宽首页，暗色首页和文章页。390px 截图因 headless 最小窗口宽度限制而被裁切（About 页同样被裁），**真实手机宽度未验证** |
| Lighthouse | **未运行**：本机没有 Lighthouse CLI，按约定不新增依赖 |
| 键盘焦点 | 沿用上游全站焦点环，**未逐项手动 Tab 测试** |

## 上线前必须处理（占位与遗留）

- [ ] `siteConfig.site_url`、站点标题、导航栏标题、`profileConfig` 昵称 / GitHub / 邮箱：替换占位值。
- [ ] `src/content/dynamic/` 中 4 条上游演示动态：该集合没有 `draft` 字段，**生产构建仍会显示**，上线前删除或替换为真实动态。
- [ ] 头像 `src/assets/images/avatar.avif`、Logo 与 favicon 仍是上游素材，替换为原创或授权图片。
- [ ] 至少发布一篇真实文章和一个真实项目；当前生产构建中文章和项目列表为空。
- [ ] `siteConfig.siteStartDate`（运行天数统计起点）仍为上游的 `2025-01-01`。
- [ ] `siteConfig` 中 Bilibili / Bangumi / VNDB / MAL 的账号仍是上游示例值；对应页面已关闭，启用前需改成自己的账号。
- [ ] OG 默认图和 favicon 仍是上游 `firefly-light.png`（构建产物 `og:image`），替换为自己的图标。
- [ ] `src/config/homeConfig.ts` 中的问候语、简介为占位；`hero.mottoEn` 是座右铭的参考英译，可自行修改。
- [ ] 侧边栏「最新动态」组件与首页 Recent Notes 内容重复，可按需在 `sidebarConfig.ts` 关闭其一（本次未改）。
- [ ] `.github/workflows/deploy.yml` 推送 `master` 即自动部署 GitHub Pages，见 `DEPLOYMENT.md`。
- [ ] 上线后用真实手机检查 390px 宽度，并跑一次 Lighthouse。
