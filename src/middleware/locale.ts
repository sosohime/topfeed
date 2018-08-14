import { Context } from "../types";
export interface LocaleConfig {
	defaultLocale?: string;
	allowLangs?: string[];
	cookieField?: string;
	queryField?: string;
	messages?: {
		[locale: string]: {
			[key: string]: string;
		};
	};
}
export default (config: LocaleConfig) => async (ctx: Context, next: any) => {
	const {
		defaultLocale = "en",
		allowLangs = ["en", "pt", "ja", "hi", "id"],
		cookieField = "locale",
		queryField = "locale",
		messages = {}
	} = config;
	// 优先从query获取locale信息
	let locale = ctx.query[queryField];
	// 从cookie获取locale信息
	if (!locale) {
		locale = ctx.cookies.get(cookieField); // 优先获取cookie里locale设置
	}
	// 最后从accept-header header里获取locale信息
	if (!locale) {
		locale = <string>ctx.acceptsLanguages(allowLangs) || defaultLocale;
	}
	ctx.locale = locale;
	ctx.messages = messages[ctx.locale] || messages[defaultLocale];
	await next();
};
