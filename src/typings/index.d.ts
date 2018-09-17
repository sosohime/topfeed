import * as KoaApplication from "koa";
import * as compose from "koa-compose";
type PlainObject<T = any> = { [key: string]: T };
export type Middleware = compose.Middleware<Context>;
/**
 * Application
 */
export class Application extends KoaApplication {
	loader: any; // 内部loader
	root: string;
	config: any;
	router: any;
	constructor(config: any);
	use(middleware: Middleware): this;
}
/**
 * 基本Context可以提供扩展
 */
export interface BaseContextClass {
	ctx: Context;
	app: Application;
	config: AppConfig;
	service: IService;
	logger: Logger;
	constructor(ctx: Context): this;
}
// /**
//  * 扩展KoaRouter
//  */
// export interface Router extends KoaRouter {}
/**
 * 扩充Koa的Request
 */
export interface Request extends KoaApplication.Request {}
/**
 * 扩充Koa的Response
 */
export interface Response extends KoaApplication.Response {}
/**
 * 扩展Context的Helper
 */
export interface Helper extends PlainObject {}
/**
 * render View
 */
export interface ContextView {
	render(file: string, options: any): Promise<string>;
}
/**
 * Application的配置
 */
export interface AppConfig extends PlainObject {}
/**
 *  Context Base
 */
export class BaseContextClass {
	ctx: Context;
	app: Application;
	config: AppConfig;
	service: IService;
	logger: Logger;
	constructor(ctx: Context);
}
export type LoggerLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE";

export interface Context extends KoaApplication.Context {
	app: Application;
	service: IService;
	request: Request;
	response: Response;
	helper: Helper;
	locale: string;
	language: string;
	region: string;
	messages: {
		[key: string]: string;
	};
	render: (tpl: string, config?: any) => Promise<any>;
}
export class Service extends BaseContextClass {}
export class Controller extends BaseContextClass {}
export interface IService extends PlainObject {}
export interface IController extends PlainObject {}
export interface Logger {
	info(msg: any, ...args: any[]): void;
	warn(msg: any, ...args: any[]): void;
	debug(msg: any, ...args: any[]): void;
	error(msg: any, ...args: any[]): void;
}
