import { Context, Application } from "../../typings";

export default class Controller {
	constructor(public ctx: Context, public app: Application) {
		this.ctx = ctx;
		this.app = app;
	}
}
