import * as path from "path";
import * as serve from "koa-static";
import { Application } from "../core";

export default (app: Application) => async (ctx: any, next: any) => {
	const root = app.root;
	const dir = path.join(root, "static");
	await serve(dir)(ctx, next);
};
