import { Application } from "../../types";
import { Context } from "../../types";
export default class Controller {
	app: Application;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
