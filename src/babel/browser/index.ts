export default (api: any) => {
	const env = api.env();
	return {
		presets: [
			[
				"@babel/env",
				{
					modules: false,
					targets:
						env !== "node"
							? {
									browsers: ["last 2 versions"]
							  }
							: {
									node: "current"
							  }
				}
			],
			"@babel/react",
			"@babel/typescript"
		],
		plugins: [
			env === "node"
				? "dynamic-import-node"
				: "@babel/plugin-syntax-dynamic-import",
			"@babel/plugin-proposal-class-properties",
			"react-loadable/babel"
		]
	};
};
