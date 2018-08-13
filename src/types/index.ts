import * as KoaApplication from "koa";
import { Core as Application } from "../core";
type PlainObject<T = any> = { [key: string]: T };
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
export type LoggerLevel = "DEBUG" | "INFO" | "WARN" | "ERROR" | "NONE";

export interface Context extends KoaApplication.Context {
	[key: string]: any;
	app: Application;
	service: IService;
	request: Request;
	response: Response;
	helper: Helper;
	locale: string;
	messages: {
		[key: string]: string;
	};
	render: (tpl: string, config?: any) => Promise<any>;
}
export interface IService extends PlainObject {}
export interface IController extends PlainObject {}
export interface Logger {
	info(msg: any, ...args: any[]): void;
	warn(msg: any, ...args: any[]): void;
	debug(msg: any, ...args: any[]): void;
	error(msg: any, ...args: any[]): void;
}
