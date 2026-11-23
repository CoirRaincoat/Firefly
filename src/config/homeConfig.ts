/**
 * [custom] 首页门户区配置（Hero / 兴趣标签 / 精选项目 / 最近动态）
 *
 * 只在首页第 1 页显示，由 src/components/pages/home/HomePortal.astro 读取。
 * 文字均为占位，请替换为真实内容；不要填写未经核实的经历。
 */

export interface HomeInterestTag {
	/** 显示名称 */
	name: string;
	/** Iconify 图标名，如 "material-symbols:terminal" */
	icon: string;
	/** 可选：链接到文章标签筛选（/archive/?tag=...）。没有对应文章时留空，避免点进空列表 */
	tag?: string;
}

export interface HomeAction {
	label: string;
	href: string;
	icon: string;
	/** primary 为实心主按钮，其余为描边按钮 */
	primary?: boolean;
}

export interface HomeConfig {
	enable: boolean;
	hero: {
		/** 自我介绍卡片的问候语，{name} 会替换为 profileConfig.name */
		greeting: string;
		/** 座右铭（中 / 英）。首屏副标题已改为名句轮播（backgroundWallpaper.ts），这两项目前未被引用 */
		motto: string;
		mottoEn: string;
		intro: string;
		actions: HomeAction[];
	};
	interests: {
		enable: boolean;
		title: string;
		items: HomeInterestTag[];
	};
	featuredProjects: {
		enable: boolean;
		title: string;
		/** 显示数量；按 projects 的 order 降序取前 N 个 */
		limit: number;
	};
	recentActivity: {
		enable: boolean;
		title: string;
		limit: number;
	};
	recentPosts: {
		title: string;
	};
}

export const homeConfig: HomeConfig = {
	// [custom] 暂时关闭门户区：首页只显示文章列表（置顶在前，其余按发布时间倒序）。
	// 组件保留在 src/components/pages/home/，改回 true 即恢复自我介绍、兴趣、精选项目、最近笔记
	enable: false,
	hero: {
		greeting: "Hi, I'm {name}",
		motto: "博学而笃志，切问而近思",
		mottoEn:
			"Learn widely and hold firm; question closely and reflect on what is near.",
		intro:
			"这里收录我的项目、技术文章和日常笔记。（占位简介，请替换为你自己的一两句话）",
		actions: [
			{
				label: "Projects",
				href: "/projects/",
				icon: "material-symbols:rocket-launch-outline-rounded",
				primary: true,
			},
			{
				label: "Blog",
				href: "/archive/",
				icon: "material-symbols:article-outline-rounded",
			},
			{
				label: "About",
				href: "/about/",
				icon: "material-symbols:person-outline-rounded",
			},
		],
	},
	interests: {
		enable: true,
		title: "Interests",
		items: [
			{ name: "AI & LLM", icon: "material-symbols:neurology-outline" },
			{ name: "Open Source", icon: "fa7-brands:github" },
			{ name: "Systems", icon: "material-symbols:memory-outline" },
			{ name: "Cybersecurity", icon: "material-symbols:shield-lock-outline" },
			{ name: "Programming", icon: "material-symbols:code-rounded" },
			{ name: "ACG", icon: "material-symbols:auto-awesome-outline" },
		],
	},
	featuredProjects: {
		enable: true,
		title: "Featured Projects",
		limit: 3,
	},
	recentActivity: {
		enable: true,
		title: "Recent Notes",
		limit: 3,
	},
	recentPosts: {
		title: "Recent Posts",
	},
};
