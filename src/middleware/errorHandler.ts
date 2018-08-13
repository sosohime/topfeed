import { Context } from "../types";

export default () => async (ctx: Context, next: any) => {
	try {
		await next();
		const status = ctx.status || 404;
		if (status === 404) {
			ctx.throw(404);
		}
	} catch (err) {
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.app.emit("error", err, ctx);
		if (ctx.status === 404) {
			await ctx.render("404");
		} else {
			await ctx.render("error", ctx);
		}
	}
};
