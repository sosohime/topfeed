export default (api: any) => {
	return {
		presets: [
			[
				"@babel/env",
				{
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
