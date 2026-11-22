import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	// 图片路径支持三种格式：
	// 1. public 目录（以 "/" 开头，不优化）："/assets/images/avatar.webp"
	// 2. src 目录（不以 "/" 开头，自动优化但会增加构建时间，推荐）："assets/images/avatar.webp"
	// 3. 远程 URL："https://example.com/avatar.jpg"
	// [custom] TODO 占位：头像仍为上游示例图，替换为你的原创或授权头像
	avatar: "assets/images/avatar.avif",

	// 名字（[custom] TODO 占位）
	name: "Your Name",

	// 个人签名
	bio: "博学而笃志，切问而近思",

	// 链接配置
	// 已经预装的图标集：fa7-brands，fa7-regular，fa7-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			// [custom] TODO 占位：替换为你的 GitHub 主页
			url: "https://github.com/your-username",
			showName: false,
		},
		{
			name: "Email",
			icon: "fa7-solid:envelope",
			// [custom] TODO 占位：替换为你的公开联系邮箱
			url: "mailto:you@example.com",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
		{
			name: "Atom",
			icon: "fa7-solid:atom",
			url: "/atom/",
			showName: false,
		},
	],
};
