module.exports = {
	title: "Hello Topfeed",
	description: "Just Playing around",
	themeConfig: {
		nav: [
			{
				text: "指南",
				link: "/guide"
			},
			{
				text: "API",
				link: "/api"
			},
			{
				text: "示例",
				link: "/examples"
			}
		],
		sidebar: {
			"/guide/": [
				{
					title: "指南",
					collapsable: false,
					children: ["", "getting-started", "i18n"]
				}
			]
		}
	}
};
