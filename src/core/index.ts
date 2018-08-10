import * as Koa from "koa";
import Loader from "./loader";
import Service from "./base/service";
import Controller from "./base/controller";
export interface Context extends Koa.Context {
	app: Core;
	locale: string;
	messages: {
		[key: string]: string;
	};
	render: (tpl: string, config?: any) => Promise<any>;
}
class Core extends Koa {
	static Controller: typeof Controller = Controller;
	static Service: typeof Service = Service;
	loader: Loader;
	root: string;
	config: any;
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

export { Core, Service, Controller };
