/**
 * [custom] 浏览量 / 访客数占位配置
 *
 * 目前只渲染界面位置，不接入任何统计接口，数值统一显示 placeholder。
 * 规划：后续接入 Umami（排除站长本人的访问），由客户端脚本按下列 data 属性填入真实数字：
 * - 文章页信息栏：`[data-view-stat="post-views"][data-path="/posts/<id>/"]`
 * - 站点统计卡片：`[data-stat-id="site-visitors"]`、`[data-stat-id="site-pageviews"]`
 */

export interface ViewStatsConfig {
	/** 总开关：关闭后文章页和站点统计都不显示这几项 */
	enable: boolean;
	/** 文章页信息栏显示「浏览量」 */
	showPostViews: boolean;
	/** 站点统计卡片显示「访客数」「总浏览量」 */
	showSiteStats: boolean;
	/** 未接入接口时显示的占位文字 */
	placeholder: string;
}

export const viewStatsConfig: ViewStatsConfig = {
	enable: true,
	showPostViews: true,
	showSiteStats: true,
	placeholder: "--",
};
