import { Core } from "../../core";
import { Context } from "../../typings";
export default class Controller {
	app: Core;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
