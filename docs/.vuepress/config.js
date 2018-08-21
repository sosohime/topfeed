module.exports = {
	title: "Topfeed",
	description: "SSR FrameWork",
	base: "/topfeed/",
	themeConfig: {
		nav: [
			{ text: "指南", link: "/guide/" },
			{ text: "API", link: "/api/" },
			{ text: "教程", link: "/tutorials/" },
			{ text: "GitHub", link: "https://github.com/TopFeed/topfeed" }
		],
		sidebar: {
			"/guide/": [
				{
					title: "指南",
					collapsable: false,
					children: ["", "getting-started", "i18n", "advanced"]
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
