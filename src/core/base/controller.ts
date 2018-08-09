import { Core, Context } from "../../core";
export default class Controller {
	app: Core;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
