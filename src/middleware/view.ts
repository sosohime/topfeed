import * as koaNunjucks from "koa-nunjucks-2";
import * as stringify from "js-stringify";
import { Context } from "../types";
export default (config: {
	manifest: { [key: string]: string };
	path: string;
}) => async (ctx: Context, next: any) => {
	const { manifest, path } = config;
	const middleware = koaNunjucks({
		ext: "njk",
		path,
		configureEnvironment: (env: any) => {
			function injectJS(page: string, prefetch_js: string[] = []) {
				const safe = env.filters.safe;
				const mainJS = [...prefetch_js, `${page}.js`].map(
					x => (manifest as any)[x]
				);
				const ret = safe(
					mainJS.map(src => `<script src="${src}"></script>`).join("\n")
				);
				return ret;
			}
			function injectCSS(page: string, prefetch_css: string[] = []) {
				const safe = env.filters.safe;
				const mainCSS = [`${page}.css`, ...prefetch_css].map(
					x => (manifest as any)[x]
				);
				const ret = safe(
					mainCSS
						.map(
							src => `<link rel="stylesheet" href="${src}" type="text/css" />`
						)
						.join("\n")
				);
				return ret;
			}
			env.addGlobal("renderStyles", function injectJS(this: any) {
				const { page, prefetch_css } = this.ctx;
				return injectCSS(page, prefetch_css);
			});
			env.addGlobal("renderScripts", function injectCSS(this: any) {
				const { page, prefetch_js } = this.ctx;
				return injectJS(page, prefetch_js);
			});
			env.addGlobal("renderState", function injectState(this: any) {
				const { initial_state } = this.ctx;
				const safe = env.filters.safe;
				const state = stringify(JSON.stringify(initial_state));
				return safe(
					`<script>window.__INITIAL_STATE__ = JSON.parse(${state})</script>`
				);
			});
			env.addGlobal("renderProps", function injectProps(this: any) {
				const { initial_props } = this.ctx;
				const safe = env.filters.safe;
				const state = stringify(JSON.stringify(initial_props));
				return safe(
					`<script>window.__INITIAL_PROPS__ = JSON.parse(${state})</script>`
				);
			});
			env.addFilter("xss", (str: string) => {
				const safe = env.filters.safe;
				return safe(stringify(str));
			});
			env.addFilter("injectJS", (page: string, prefetch: string[] = []) => {
				const safe = env.filters.safe;
				const mainJS = [...prefetch, `${page}.js`].map(
					x => (manifest as any)[x]
				);
				const ret = safe(
					mainJS.map(src => `<script src="${src}"></script>`).join("\n")
				);
				return ret;
			});
			env.addFilter(
				"injectCSS",
				(page: string, prefetch: string | string[] = []) => {
					const safe = env.filters.safe;
					const mainCSS = [`${page}.css`, ...prefetch].map(
						x => (manifest as any)[x]
					);
					const ret = safe(
						mainCSS
							.map(
								src => `<link rel="stylesheet" href="${src}" type="text/css" />`
							)
							.join("\n")
					);
					return ret;
				}
			);
		},
		nunjucksConfig: {
			trimBlocks: true
		}
	});
	await middleware(ctx, next);
};
