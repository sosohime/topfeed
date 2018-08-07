import * as KoaApplication from "koa";
export as namespace topfeed;

type PlainObject<T = any> = { [key: string]: T };
type Middleware = (context: Context, next: () => Promise<any>) => any;

export class BaseContextClass {
	ctx: Context;
	app: Application;
}
export interface Context extends KoaApplication.Context {
	[key: string]: any;
	service: IService;
	app: Application;
}
export interface Application extends KoaApplication {
	config: Config;
	use(middleware: any): this;
}
export interface Config {
	[key: string]: any;
}
export interface IService extends PlainObject {}

export interface IController extends PlainObject {}

export interface IMiddleware extends PlainObject {}
export interface IHelper extends PlainObject {}
