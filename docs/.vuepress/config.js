module.exports = {
	title: "Topfeed",
	description: "React + Koa + SSR + I18n 全栈解决方案",
	base: "/topfeed/",
	themeConfig: {
		nav: [
			{ text: "指南", link: "/guide/" },
			{ text: "SSR指南", link: "/ssr/" },
			{ text: "配置参考", link: "/config/" },
			{ text: "API", link: "/api/" },
			{ text: "教程", link: "/tutorials/" },
			{ text: "GitHub", link: "https://github.com/TopFeed/topfeed" }
		],
		sidebar: {
			"/guide/": [
				{
					title: "指南",
					collapsable: false,
					children: [
						"",
						"getting-started",
						"structure",
						"core-concepts",
						"i18n",
						"advanced",
						"typescript"
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
