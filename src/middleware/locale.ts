import { Context } from "../typings";
export interface LocaleConfig {
	defaultLocale: string;
	allowLangs: string[];
	cookieField: string;
	messages: {
		[locale: string]: {
			[key: string]: string;
		};
	};
}
export default (config: LocaleConfig) => async (ctx: Context, next: any) => {
	const {
		defaultLocale = "en",
		allowLangs = ["en", "zh"],
		cookieField = "locale",
		messages
	} = config;
	let locale = ctx.cookies.get(cookieField); // 优先获取cookie里locale设置
	// 最后从accept-header header里获取locale信息
	if (!locale) {
		locale = <string>ctx.acceptsLanguages(allowLangs) || defaultLocale;
	}
	ctx.locale = locale;
	ctx.messages = locale == "en" ? messages["en"] : messages["zh"];
	await next();
};
