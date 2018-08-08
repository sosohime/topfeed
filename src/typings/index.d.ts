import * as KoaApplication from "koa";
import * as Topfeed from "../core";
import * as Middleware from "../middleware";
export as namespace topfeed;

type PlainObject<T = any> = { [key: string]: T };
type Middleware = (context: Context, next: () => Promise<any>) => any;

export class Core extends KoaApplication {
	config: Config;
	use(middleware: any): this;
}
export class BaseContextClass {
	ctx: Context;
	app: Application;
}
export interface Context extends KoaApplication.Context {
	[key: string]: any;
	service: Service;
	app: Application;
}
export interface Application extends KoaApplication {
	config: Config;
	use(middleware: any): this;
}
export interface Config {
	[key: string]: any;
}
export class Service extends Topfeed.Service {
	[key: string]: any;
}

export class Controller extends Topfeed.Controller {
	[key: string]: any;
}

export interface IMiddleware extends PlainObject {}
export interface IHelper extends PlainObject {}
