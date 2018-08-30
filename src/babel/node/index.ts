export default (api: any) => {
	return {
		presets: [
			[
				"@babel/env",
				{
					modules: false,
					targets: {
						node: "current"
					}
				}
			],
			"@babel/react",
			"@babel/typescript"
		],
		plugins: [
			"@babel/plugin-transform-runtime",
			"@babel/plugin-proposal-class-properties"
		]
	};
};
