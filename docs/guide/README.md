# 快速入门

## 快速初始化

我们直接推荐使用脚手架来新建项目，只需几条简单命令，即可快速生成项目

```bash
$ npm install -g @topfeed/topfeed-cli
$ topfeed init topfeed-example --type=simple
$ cd topfeed-example
$ npm install
```

## 启动项目

```bash
$ npm run client:dev
$ npm run server:dev # 第一次启动时，等待client:dev执行完再启动server
$ open localhost:3333/simple # 一个简单的页面
$ open localhost:3333/ssr # 一个使用页面使用了SSR + I18n + Redux + todo_list
$ open localhoat:3333/spa_ssr # 一个单页的SSR页面，支持SSR + Tree Shaking + Code Splitting + prefetch !!!
```

## 逐步构建

通常可以通上一节的方式，使用 topfeed-init 快速新建项目, 但为了让大家更好的了解 topfeed，接下来，我们将跳过脚手架，手动一步步的搭建出一个单页 SSR 的 Hacker News。最后的项目结果如 [目录结构](/guide/structure.md) 所示。

### 初始化项目

```shell
$ mkdir topfeed-news
$ cd topfeed-news
$ npm init
$ npm i @topfeed/topfeed
$ npm i @topfeed/topfeed-cli
$ npm i nodemon babel-node # 用于自动重启node
$ mkdir client server # 服务端和客户端相关代码
```

添加 `npm scripts` 到 `package.json`

```json
{
	"name": "topfeed-news",
	"scripts": {
		"server:dev": "PORT=5555 nodemon --exec babel-node server/app.ts  --extensions '.js,.ts,.tsx'",
		"client:dev": "topfeed dev --target browser"
	}
}
```

### server Babel 配置

由于我们使用 typescript 进行开发，所以需进行 babel 配置

```js
// .babelrc.js
const nodeConfig = require("@topfeed/topfeed/babel").node;
module.exports = nodeConfig;
```

### 编写 Server 入口

我们将 server 的入口文件进行拆分,`server.ts`负责真正的 server 逻辑，而`app.ts`则是负责启动 server 的处理(process 的错误处理、信号处理等，集群模式启动等，可能存在不同的运维方式)

```ts
// server/app.ts
import * as process from "process";
import { startServer } from "./server";
function signalHandler(signal) {
	console.log("signal:", signal);
}
process.on("SIGINT", signalHandler.bind("SIGINT"));
process.on("SIGTERM", signalHandler.bind("SIGTERM"));
process.on("uncaughtException", function(error) {
	console.log("err:", error);
	process.exit(0);
});
process.on("unhandledRejection", function(rejection) {
	console.log("err", rejection);
});
startServer();
```

```ts
// server/server.ts
import { Application } from "@topfeed/topfeed";
const app = new Application({
	root: __dirname // server代码所在目录
});
export async function startServer() {
	app.listen(process.env.PORT, () => {
		console.log("start server at port:", process.env.PORT);
	});
}
```

### 编写 Controller

如果你熟悉 Web 开发，肯定知道我们第一步需要编写的是 Controller 和 Router;

```ts
// server/controller/homeController.ts
async function main(ctx, next) {
	ctx.body = "welcom to topfeed";
}
export { main };
```

配置路由映射

```ts
// server/router/index.tsx
import { Application } from "@topfeed/topfeed";
import * as homeController from "../controller/homeController";

export default (app: Application) => {
	const router = app.router;
	router.get("/feed", homeController.main);
};
```

此时目录结构如下

```shell
├── app.ts
├── controller
│   └── homeController.ts
├── router
│   └── index.ts
├── server.ts
├── .babelrc.js
```

好，现在可以启动来体验一下了

```sh
$ npm run server:dev
$ open localhost:5555
```

::: warning

- 我们建议所有的文件都使用 ts 进行编写，模块使用 ES module 不要使用 commonjs，由于 commonjs 和 ES module 存在某些交互性问题,混用他们可能导致某些问题，常见的问题可参考[深入 ES Module](https://zhuanlan.zhihu.com/p/40733281)。
  :::

### 静态资源

topfeed 内置了 static 插件，线上环境建议部署到 CDN，无需该插件。
但对于一些固定的资源文件，如 Google 的验证文件，robots 协议等。
此处把静态资源都放到 server/static 目录即可:

```sh
server/static
├── robots.txt
├── sitemap.xml
```

### 模板渲染

绝大多数情况，我们需要读取数据后渲染模板，然后呈现给用户。故我们需要引入对应的模板引擎。
topfeed 默认集成 nunjuck 模板引擎。
启用 nunjuck 模板引擎

```ts
// server/server.ts
import { Application, nunjuck_view } from "@topfeed/topfeed";
const app = new Application({
	root: __dirname // server代码所在目录
});
// 启用nunjuck 进行模板渲染
app.use(
	nunjuck_view({
		path: path.join(__dirname, "view")
	})
);
export async function startServer() {
	app.listen(process.env.PORT, () => {
		console.log("start server at port:", process.env.PORT);
	});
}
```

为列表页编写模板文件，一般放置在`server/view`目录下

```html
<!-- server/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>
```

添加 Controller 和 Router

```ts
// server/controller/news.ts
async function list(ctx, next) {
	const dataList = {
		list: [
			{ id: 1, title: "this is news 1", url: "/news/1" },
			{ id: 2, title: "this is news 2", url: "/news/2" }
		]
	};
	await ctx.render("news", dataList);
}

export { list };

// server/router/index.ts
import { Application } from "@topfeed/topfeed";
import * as homeController from "../controller/homeController";
import * as newsController from "../controller/newsController";

export default (app: Application) => {
	const router = app.router;
	router.get("/", homeController.main);
	router.get("/news", newsController.list);
};
```

### 编写 Middleware

### 模板渲染

### 自定义配置文件
