import { Context } from "../typings";
import * as crypto from "crypto";
import generate_crsf from "../lib/csrf";

export default (config: any) => async (ctx: Context, next: any) => {
	// csrf token和secret设置
	const { salt } = config;
	const { token, secret } = generate_crsf(salt);
	ctx.cookies.set("csrf-token", token);
	ctx.cookies.set("csrf-secret", secret, {
		httpOnly: false
	});
	// csrf token校验
	if (ctx.method === "POST") {
		const token = ctx.cookies.get("csrf-token");
		const secret = ctx.cookies.get("csrf-secret");
		const hash = crypto.createHash("sha1");
		hash.update(salt);
		hash.update(secret);
		if (hash.digest("hex") !== token) {
			ctx.throw(new Error("csrf_token 校验不通过"));
		}
	}
	await next();
};
