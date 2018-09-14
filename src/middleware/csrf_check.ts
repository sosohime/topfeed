import { Context } from "../typings";
import * as crypto from "crypto";
export default (config: any) => async (ctx: Context, next: any) => {
	const { salt } = config;
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
