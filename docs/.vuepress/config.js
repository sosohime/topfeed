module.exports = {
	title: "Topfeed",
	description: "React + Koa + SSR + I18n 全栈解决方案",
	base: "/topfeed/",
	themeConfig: {
		nav: [
			{ text: "指南", link: "/guide/" },
			{ text: "SSR指南", link: "/ssr/" },
			{ text: "配置参考", link: "/config/" },
			{ text: "教程", link: "/guide/tutorial" },
			{ text: "GitHub", link: "https://github.com/TopFeed/topfeed" }
		],
		sidebar: {
			"/guide/": [
				{
					title: "指南",
					collapsable: false,
					children: [
						"",
						"structure",
						"objects",
						"i18n",
						"ssr",
						"cookie-and-session",
						"typescript",
						"security",
						"middleware",
						"debug-and-test"
					]
				}
			],
			"/ssr/": [
				{
					title: "React SSR 指南",
					collapsable: false,
					children: [
						"",
						"universal",
						"routing",
						"data",
						"build-config",
						"caching",
						"streaming",
						"ab"
					]
				}
			]
		},
		lastUpdated: "Last Updated"
	}
};
