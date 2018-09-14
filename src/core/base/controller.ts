import { Context, Application } from "typings";
export default class Controller {
	app: Application;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
