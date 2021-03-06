import * as path from "path";
import * as fs from "fs";
import * as preload_middleware from "../../middleware/pre_load";
import { Application } from "typings";
const CACHE = Symbol("cache");
class Loader {
	constructor(public app: Application) {
		this.app = app;
	}
	load() {
		this.loadMiddleware(this.app.root).loadRouter(this.app.root);
	}
	// 加载router
	loadRouter(root: string) {
		const routerPath = path.join(root, "router");
		if (fs.existsSync(routerPath)) {
			const router = require(routerPath).default;
			router(this.app);
		}
		return this;
	}
	// 加载service
	loadService(root: string) {
		const servicePath = path.join(root, "service");
		if (fs.existsSync(servicePath)) {
			const services = require(path.join(root, "service"));
			this.loadToContext(services, this.app, "service");
		}
		return this;
	}
	loadMiddleware(root: string) {
		for (const [, middleware] of Object.entries(preload_middleware)) {
			this.app.use(middleware(this.app));
		}
		return this;
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
		return this;
	}
	loadHelper() {}
}

export default Loader;
