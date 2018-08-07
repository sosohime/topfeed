import * as path from "path";
import { Application } from "../../typings";
const CACHE = Symbol("cache");
class Loader {
	constructor(public app: Application) {
		this.app = app;
	}
	load() {
		this.loadService();
	}
	loadToContext(targets: any[], app: Application, property: string) {
		// 挂载到context下
		Object.defineProperty(app.context, property, {
			get() {
				if (!this[CACHE]) {
					this[CACHE] = {};
				}
				if (!this[CACHE][property]) {
					this[CACHE][property] = {};
				}
				for (const [name, target] of Object.entries(targets)) {
					this[CACHE][property][name] = new target(this, app);
				}
				return this[CACHE][property];
			}
		});
	}
	loadService() {
		const services = require(path.resolve(process.cwd(), "server/service"));
		this.loadToContext(services, this.app, "service");
	}
	loadHelper() {}
}

export default Loader;
