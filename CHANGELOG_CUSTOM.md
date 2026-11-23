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

## 阶段 6：全屏首屏 + 樱花色毛玻璃（2026-11-23）

参考 justpureh2o.cn（Firefly 全屏壁纸模式）和 anoth3r.top（全屏封面）：首屏是全屏大图和标题，往下滚才是内容卡片。

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/backgroundWallpaper.ts` | `mode` `none` → `fullscreen`，`fullscreen.layout` `classic` → `hero`；横幅标题改为占位，副标题改为读取 `homeConfig.hero` 的座右铭；横幅链接换成占位 GitHub / Email，去掉上游 Sponsor | 用上游自带的全屏壁纸实现「大图先出」。`hero` 布局下卡片半透明、壁纸随下滑模糊，就是毛玻璃效果 |
| `src/config/siteConfig.ts` | `hue` 185 → 350 | 樱花粉强调色 |
| `src/config/effectsConfig.ts` | 樱花特效开启，数量 21 → 12 | 用户选择 |
| `src/components/features/SakuraEffect.astro` | 用户没在设置面板手动开过时，系统「减少动态效果」下不显示樱花 | **上游组件改动**：原组件没有处理 `prefers-reduced-motion` |
| `src/styles/custom/theme.css` | 配色换成樱花粉 / 薰衣草紫 / 天蓝，梅紫色正文；暗色改为「夜樱」梅紫色调；`--card-bg-transparent` 跟随新配色；半透明卡片加白色高光描边；横幅标题加投影；圆角 1.125rem | 明快樱花色 ACG 风 |
| `src/components/pages/home/HomeHero.astro` | 改成自我介绍卡片：问候（名字用主题色）、简介、按钮；终端插画换成原创樱花 SVG；去掉座右铭（已移到首屏） | 首屏已有大标题，避免重复 |
| `src/components/pages/home/HomeSectionHeading.astro` | 区块标题和「View all」放在半透明玻璃胶囊上 | 标题直接叠在壁纸上，深色壁纸处看不清 |
| `HomePortal.astro`、`InterestTags.astro`、`RecentActivity.astro` | 区块间距 1.75rem → 3.5rem（手机 2.25rem），标签和列表加大内边距；兴趣标签改用 `card-base`，跟随毛玻璃透明度 | 首页铺开一些 |

说明：
- 没有给每张卡片加 `backdrop-filter`。模糊来自上游的壁纸模糊渐变（`blurRamp`），开销只有一层，符合 `CLAUDE.md` 里的滚动性能约束。
- 测试：`type-check`、`astro check`（0 错误）、Biome、`pnpm build`（exit 0）通过。用 Edge headless + DevTools 协议截了滚动后的画面：亮色 1440px、暗色 1440px、手机 390px 宽度都正常显示。

## 阶段 7：首页留白（2026-11-23）

参考 anoth3r.top：首屏大图之后只有一列居中的文章列表，两侧留空。

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/sidebarConfig.ts` | 左栏、右栏、移动端底部的所有组件 `enable` → `false`；总开关 `enable` 保持 `true` | 去掉侧边卡片。总开关保持开启，是因为上游只有在「侧栏功能开启但本页没有侧栏列」时才按 `noSidebarContentWidth`（0.6）收窄内容栏并居中；总开关关掉反而会铺满全宽 |
| `src/config/homeConfig.ts` | `enable` → `false` | 首页只保留文章列表：置顶文章在前，其余按发布时间倒序（上游 `getSortedPosts` 的排序）。门户区组件保留，改回 `true` 即恢复 |

说明：文章页的侧栏目录也一起关闭了，右下角的悬浮目录按钮仍可用。测试：`astro check` 0 错误、Biome 通过；截图检查了首页 1440px、手机 390px 和文章页。

## 阶段 8：左栏资料 + 站点信息（2026-11-23）

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/sidebarConfig.ts` | `position` `both` → `left`；恢复个人资料；站点信息从右栏移到左栏、排在资料下方；两者 `position` 改为 `sticky`；移动端底部同样恢复资料和站点信息 | 用户要求。左栏整列随滚动固定，右侧文章列表单独滚动 |

说明：站点信息沿用上游 `showOnPostPage: false`，文章页左栏只显示个人资料。测试：`type-check`、Biome 通过；截图检查了首页滚动前后、手机 390px、文章页。

## 阶段 9：左栏站点信息换成日历（2026-11-23）

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/sidebarConfig.ts` | 左栏：资料下方的站点信息换成日历（含年度热力图，`sticky`，文章页不显示）；站点信息退回右栏并保持关闭；移动端底部只保留个人资料 | 用户要求。移动端不放日历：上游 `Calendar.astro` 用固定 id，同页面只有一个实例能工作，桌面左栏那份已占用，底部那份会渲染成空白（已截图确认） |

## 阶段 10：左栏加站点统计（2026-11-23）

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/sidebarConfig.ts` | 站点统计从右栏移到左栏，位于个人资料和日历之间（`sticky`，文章页不显示，沿用上游设置）；移动端底部未加 | 用户要求 |

说明：三张卡片总高度约 1150px，超过常见笔记本屏幕高度。上游的粘性定位会让左栏先跟着滚动一段，直到日历底部对齐窗口底部后再固定。1440×900 截图中日历底边贴着窗口下沿。

后续调整（同日）：个人资料 `position` 改回 `top`。资料卡随页面滚走，统计卡滚到窗口顶部（导航栏显示时距顶 5.5rem，隐藏时 1rem）后与日历一起停住，不再出现「先跟着滚一段才停」的迟滞。统计 + 日历约 730px 高，窗口高度低于约 820px 时日历底部会被遮住一部分。截图确认 1440×900 下滚动多个位置时两张卡都停在顶部。

## 阶段 11：浏览量 / 访客数占位（2026-11-23）

只做界面位置，**不接入任何统计接口**，数值显示 `--`。后续计划接入 Umami，并排除站长本人的访问。

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/viewStatsConfig.ts`（新增） | 总开关、文章页 / 站点统计分别开关、占位文字 | 集中配置；注释里写明后续脚本填数的 data 属性约定 |
| `src/components/layout/PostMeta.astro` | 文章详情页信息栏加「浏览量 --」（`data-view-stat="post-views"`，`data-path="/posts/<id>/"`）；评论系统自带浏览量已启用时不显示，避免重复 | **上游组件改动**。复用上游的图标、样式和 `pageViews` 文案。文章列表卡片不传 `id`，所以不显示 |
| `src/components/widget/SiteStats.astro` | 站点统计末尾加「访客数」「总浏览量」两行（`data-stat-id="site-visitors"` / `"site-pageviews"`） | **上游组件改动**，沿用原有行样式 |
| `src/i18n/i18nKey.ts`、`src/i18n/languages/*.ts` | 新增 `siteStatsVisitors`、`siteStatsPageViews`，6 种语言 | `Translation` 类型要求每种语言都有全部键 |

测试：`type-check`、`astro check`（0 错误）、Biome 通过；截图确认文章页信息栏和左栏统计卡显示占位，首页文章卡片不显示。

## 阶段 12：首屏标题「Somewhere Among the Stars」凯尔特星辰效果（2026-11-23）

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/components/pages/home/CelticTitle.astro`（新增） | 真实文本标题 + 内联 SVG 装饰（椭圆星轨、沿轨道移动的金紫流光、轨道星芒、独立闪烁小星、首字母 S 背后的圆环与三结纹、三结纹分隔线）+ 纯 CSS 动效 | 任务要求；不引入动画库，不用位图 |
| `src/components/layout/BannerHomeTextOverlay.astro` | 主标题由 `.banner-title` 纯文字改为渲染 `CelticTitle` | **上游组件改动**：横幅标题没有插槽，只能在这里替换；副标题、链接按钮不变 |
| `src/config/fontConfig.ts` | 新增 Uncial Antiqua（fontsource，仅 latin、400）；`bannerTitleFont` 改为它 | 沿用上游 Astro Font API 加载方式。原 Zen Maru Gothic 不再被引用，也就不再加载 |
| `src/config/backgroundWallpaper.ts` | `homeText.title` 改为 `Somewhere Among the Stars`，`titleSize` 4.25rem | 标题文字 |

实现要点：
- 首字母只包一层 `<span>`，DOM 文本仍是完整的「Somewhere Among the Stars」（已用脚本读取 `textContent` 确认）。装饰 SVG 都是 `aria-hidden`。
- 动效：标题 1.6s 由模糊、透明、下移淡入；首字母纹样 1.1s 后显现；星轨和星点 0.8s 后淡入，分隔线 1s 后展开。之后标题主体静止，只有流光（14s 一圈）、星点闪烁、分隔线三结纹呼吸在循环。
- 星点与流光同步：星点在椭圆上的弧长比例用脚本数值积分算出，再换算成负的 `animation-delay`，流光经过时星点放大旋转一下。
- 流光用 `stroke-dashoffset` 动画加一层宽而淡的同步描边代替模糊滤镜，不做逐帧滤镜计算。
- 字号：1200px 以上按 3.6vw 单行显示；以下允许换行（`text-wrap: balance`）。Uncial 字形很宽，1024px 时单行放不下，所以单行断点定在 1200px。
- `prefers-reduced-motion: reduce`：关闭全部动画，隐藏流光，标题和静态装饰照常显示（已用 DevTools 协议模拟确认计算样式）。

测试：`astro check` 0 错误、Biome 通过、`pnpm build` exit 0。截图检查了 1440×900（亮色、暗色）、1024×768、820×1180、390×844，以及减少动态效果模式。字体由 Astro 下载，首次访问时标题字体没有预加载，可能短暂显示回退字体，入场模糊动画能遮掉大部分。

## 阶段 13：首屏副标题改为名句轮播（2026-11-23）

| 文件 | 改动 | 原因 |
| --- | --- | --- |
| `src/config/backgroundWallpaper.ts` | `homeText.subtitle` 由座右铭（中 / 英）改为 4 条名句（Sapere aude! / Nullius in verba. / Tennyson《Ulysses》两句），不含序号、中文释义和出处；字号 1.5rem → 1.25rem；打字速度 60ms、删除 25ms、停留 4s；去掉对 `homeConfig` 的引用 | 用户要求。沿用上游打字机效果轮播，不新增组件 |
| `src/styles/custom/theme.css` | `.banner-subtitle` 设 `white-space: pre-line`，预留两行高度（≤640px 预留四行） | 每条名句里的 `\n` 换行能显示；打字过程中上方标题不跳动 |
| `src/config/homeConfig.ts` | 注释说明 `hero.motto` / `mottoEn` 目前未被引用 | 座右铭仍保留在侧栏个人资料签名里（`profileConfig`），未改 |

测试：type-check、Biome 通过；用 DevTools 协议读取副标题，确认有 4 条数据、换行生效；截图检查了 1440×900 和 390×844。

## 上线前必须处理（占位与遗留）

- [ ] 浏览量 / 访客数目前是占位 `--`，接入统计接口前可在 `viewStatsConfig.ts` 关闭，避免上线后显示空值。
- [ ] 全屏壁纸 `d1–d6` / `m1–m6`、文章封面和头像都是上游自带的游戏角色图，授权未确认。上线前换成自己有权使用的图片（`backgroundWallpaper.ts` 的 `src.desktop` / `src.mobile`）。
- [ ] `siteConfig.site_url`、站点标题、导航栏标题、`profileConfig` 昵称 / GitHub / 邮箱：替换占位值。
- [ ] `src/content/dynamic/` 中 4 条上游演示动态：该集合没有 `draft` 字段，**生产构建仍会显示**，上线前删除或替换为真实动态。
- [ ] 头像 `src/assets/images/avatar.avif`、Logo 与 favicon 仍是上游素材，替换为原创或授权图片。
- [ ] 至少发布一篇真实文章和一个真实项目；当前生产构建中文章和项目列表为空。
- [ ] `siteConfig.siteStartDate`（运行天数统计起点）仍为上游的 `2025-01-01`。
- [ ] `siteConfig` 中 Bilibili / Bangumi / VNDB / MAL 的账号仍是上游示例值；对应页面已关闭，启用前需改成自己的账号。
- [ ] OG 默认图和 favicon 仍是上游 `firefly-light.png`（构建产物 `og:image`），替换为自己的图标。
- [ ] `src/config/homeConfig.ts` 中的问候语、简介为占位；`hero.mottoEn` 是座右铭的参考英译，可自行修改。
- [x] 侧边栏「最新动态」组件与首页 Recent Notes 内容重复：阶段 7 已关闭全部侧栏组件和首页门户区。
- [ ] `.github/workflows/deploy.yml` 推送 `master` 即自动部署 GitHub Pages，见 `DEPLOYMENT.md`。
- [ ] 上线后用真实手机检查 390px 宽度，并跑一次 Lighthouse。
