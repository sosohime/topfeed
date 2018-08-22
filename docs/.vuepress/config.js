module.exports = {
	title: "Topfeed",
	description: "基于Koa和React的同构最佳实践",
	base: "/topfeed/",
	themeConfig: {
		nav: [
			{ text: "指南", link: "/guide/" },
			{ text: "SSR指南", link: "/ssr/" },
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
						"advanced"
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
						"bundle",
						"build-config"
					]
				}
			]
		},
		lastUpdated: "Last Updated"
	},

	markdown: {
		// options for markdown-it-anchor
		anchor: { permalink: false },
		config: md => {
			md.use(require("markdown-it-katex"));
		}
	}
};
