import * as KoaApplication from "koa";
import * as Router from "koa-router";
import Loader from "./loader";
import { Middleware } from "../types";
export interface CoreConfig {
	root?: string; // 应用所在目录
}
class Application extends KoaApplication {
	loader: Loader;
	root: string;
	config: any;
	router: any;
	// @ts-ignore
	use(middleware: Middleware): this;
	constructor(options: CoreConfig) {
		super();
		this.root = options.root || process.cwd();
		this.loader = new Loader(this as any);
		this.router = new Router();
		this.init();
	}
	// @ts-ignore
	async listen(...args): KoaApplication.Server {
		await this.beforeStart();
		super.listen(...args);
	}
	init() {
		// 初始化负责挂载service extend
		this.loader.load();
	}
	async beforeStart() {
		this.use(this.router.routes()).use(this.router.allowedMethods());
	}
}

export { Application };
