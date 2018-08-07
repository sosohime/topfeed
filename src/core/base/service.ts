import { Context, Application } from "../../typings";

class Service {
	constructor(public ctx: Context, public app: Application) {
		this.ctx = ctx;
		this.app = app;
	}
}
export default Service;
