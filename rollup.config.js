import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import uglify from "rollup-plugin-uglify";
import commonJs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
const libName = "topfeed";
console.log();

import { minify } from "uglify-es";
// experimental minifier for ES modules
// https://github.com/TrySound/rollup-plugin-uglify#warning

const pkg = require("./package.json");

// minified production builds
const production = {
	input: "lib/index.js",
	output: [
		{
			file: `${pkg.main}/${libName}.min.js`,
			format: "cjs",
			exports: "named",
			sourcemap: true
		} // CommonJS Modules
	],
	external: ["koa"],
	plugins: [
		json(),
		replace({
			"process.env.NODE_ENV": '"production"'
		}),
		typescript({
			typescript: require("typescript")
		}),
		resolve(),
		commonJs(),
		uglify(
			{
				compress: {
					pure_getters: true,
					unsafe: true
				},
				output: {
					comments: false,
					semicolons: false
				},
				mangle: {
					reserved: ["payload", "type", "meta"]
				}
			},
			minify
		)
	]
};

// full source development builds
const development = {
	input: "lib/index.js",
	output: [
		{ file: `${pkg.main}/${libName}.js`, format: "cjs", exports: "named" }, // CommonJS Modules
		{ file: pkg.module, format: "es", exports: "named", sourcemap: true } // ES Modules
	],
	external: ["koa"],
	plugins: [
		json(),
		replace({
			"process.env.NODE_ENV": '"development"'
		}),
		typescript({
			typescript: require("typescript")
		}),
		resolve(),
		commonJs()
	]
};

// point user to needed build
const root = `'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${libName}.min.js')
} else {
  module.exports = require('./${libName}.js')
}
`;

const rootFile = folder => {
	mkdirSync(join("dist", folder));
	writeFileSync(join("dist", folder, "index.js"), root);
};

export default (() => {
	// generate root mapping files
	mkdirSync("dist");
	rootFile("cjs");

	return [development, production];
})();
