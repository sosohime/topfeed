import { Context, Core } from "../../core";
class Service {
	app: Core;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
export default Service;
