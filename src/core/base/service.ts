import { Core } from "../../core";
import { Context } from "../../typings";
class Service {
	app: Core;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
export default Service;
