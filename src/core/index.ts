import * as Koa from "koa";
import Loader from "./loader";
import Service from "./base/service";
import Controller from "./base/controller";
import { Context } from "../types";
import * as compose from "koa-compose";

class Core extends Koa {
	static Controller: typeof Controller = Controller;
	static Service: typeof Service = Service;
	loader: Loader;
	root: string;
	config: any;
	// @ts-ignore
	use(middleware: compose.Middleware<Context>): this;
	constructor() {
		super();
		this.root = process.cwd();
		this.loader = new Loader(this as any);
		this.init();
	}
	init() {
		// 初始化负责挂载service extend
		this.loader.load();
	}
}

export { Core, Controller, Service };
