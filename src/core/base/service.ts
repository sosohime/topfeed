import { Context, Application } from "typings";
class Service {
	app: Application;
	constructor(public ctx: Context) {
		this.ctx = ctx;
		this.app = ctx.app;
	}
}
export default Service;
