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
			trimBlocks: true,
			stringify
		}
	});
	await middleware(ctx, next);
};
