# 部署说明

本站是纯静态输出（`dist/`），任何静态托管都能用。仓库里已有三套上游提供的部署配置，下面说明各自要注意的地方。**目前尚未部署过，以下步骤未实际验证。**

## 上线前

先完成 `CHANGELOG_CUSTOM.md` 末尾「上线前必须处理」清单，至少：

1. `src/config/siteConfig.ts` 的 `site_url` 改成真实域名。canonical、sitemap、RSS、robots.txt、OG 图片地址都从它生成，现在全是 `https://example.com`。
2. 替换占位昵称、邮箱、GitHub，以及上游的头像、Logo、favicon。
3. 删除或替换 `src/content/dynamic/` 下的 4 条演示动态（它们在生产构建中可见）。

## 本地验证

```powershell
pnpm install
pnpm build      # 输出到 dist/
pnpm preview    # http://localhost:4321 ，停止用 pnpm astro preview stop
```

环境要求：Node.js >= 22.23.0（`package.json` engines），pnpm 11.22.0（`packageManager` 字段强制）。

## 方式一：Vercel（上游默认）

`vercel.json` 已配置 `pnpm build`、输出 `dist`、安全响应头和 `/_astro/` 长缓存。在 Vercel 导入仓库即可，无需额外设置。

## 方式二：Cloudflare Workers

`wrangler.jsonc` 把 `./dist` 作为静态资源目录。构建时设置环境变量 `CF_WORKERS=1`，`astro.config.mjs` 会切换到 Cloudflare 适配器。

## 方式三：GitHub Pages

> ⚠️ `.github/workflows/deploy.yml` 在**推送到 `master` 时自动触发**部署。如果你的 fork 开启了 Pages，推送即上线；未完成上线清单前不要推送，或先在仓库设置里关闭 Pages / 禁用该 workflow。

- 部署到 `https://<用户名>.github.io/`（用户站点仓库）时无需额外配置。
- 部署到 `https://<用户名>.github.io/<仓库名>/`（项目站点）时，需要在 `astro.config.mjs` 设置 `base`，这一步本次未改动、未验证。
- workflow 使用 Node 22；若构建报 engines 版本错误，把 `node-version` 改为 `22.23.0` 或更高。

## 环境变量

都是可选的，不包含任何密钥。本项目代码和文档里不应出现 API Key、Token 或密码；评论系统、统计等第三方服务如需密钥，请放在部署平台的环境变量里。

| 变量 | 作用 | 默认 |
| --- | --- | --- |
| `CF_WORKERS` | 设置后使用 Cloudflare 适配器构建 | 未设置（纯静态） |
| `PUBLIC_SITE_LANG` | 覆盖 `siteConfig.lang`，如 `en` | 使用配置文件 |
| `PUBLIC_DISPLAY_SETTINGS` | 覆盖显示设置面板的总开关 | 使用 `displaySettingsConfig.ts` |

## 构建过程中的网络访问

- `scripts/` 中的 GitHub 卡片脚本会请求 GitHub API，未登录时可能触发 403 限流，会退回使用缓存数据，不影响构建结果。
- 字体由 Astro Font API 从 Fontsource 下载并缓存。
