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

### 编写 service

实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应该抽象为业务逻辑层`Service`。
我们来添加一个 Service 抓取 [Hacker News](https://github.com/HackerNews/API)的数据，如下:

```ts
import rp from "request-promise";
import { serverUrl } from "constants/url";

async function list(page = 1, pageSize = 10) {
	let idList: { [key: string]: string } = {};
	try {
		idList = await rp({
			method: "GET",
			uri: `${serverUrl}/topstories.json`,
			qs: {
				orderBy: '"$key"',
				startAt: `"${pageSize * (page - 1)}"`,
				endAt: `"${pageSize * page - 1}"`
			},
			json: true
		});
	} catch (err) {
		idList = {};
	}
	// parallel GET detail
	const newsList = await Promise.all(
		Object.keys(idList).map(key => {
			const url = `${serverUrl}/item/${idList[key]}.json`;
			return rp.get(url, {
				json: true
			});
		})
	);
	return newsList;
}

export { list };
```

然后稍微修改下之前的 Controller:

```ts
import { Context } from "@topfeed/topfeed";
import { list as news_list } from "service/news";
async function list(ctx: Context) {
	const page = (await ctx.query.page) || 1;
	const newsList = await news_list(page);
	await ctx.render("news", {
		list: newsList
	});
}
export { list };
```

## 前端渲染

现在前后端分离已经成为主流趋势，对于复杂的页面后端渲染难以满足需求，因此我们进行前端渲染。

### 生成前端页面

在 topfeed 中，约定的存放页面代码的文件夹是 `client/entry`,接下来我们创建第一个页面组件，新建`client/entry/home/index.tsx` 和 `client/entry/home/app.tsx` 和 `client/entry/home/index.scss`

```ts
// client/entry/home/app.tsx
import React from "react";
import "./index.scss";
export default () => {
	return <div>Welcome to Topfeed</div>;
};
```

```ts
// client/entry/home/index.tsx
import ReactDOM from "react-dom";
import React from "react";
import App from "./app";
ReactDOM.render(<App />, document.getElementById("root"));
```

```css
body {
	background: antiquewhite;
}
```

这样第一个页面就创建完成，接下来我们需要修改对应`home`的页面模板内容，此时`src/view/home.njk`不再负责实际的渲染，而只是负责渲染页面入口和加载对应的 js 和 css 资源，修改如下:

```html
<head>
	{{renderStyles()}}
</head>
<body>
  <div id="root"></div>
	{{renderScripts()}}
</body>
```

::: tip
renderStyles: 用于注入打包的 css 文件
renderScripts: 用于注入前端打包的 js 文件
:::

### 注入资源文件

因为前端打包的 js 和 css 文件包含 hash 值，因此我们需要获取
前端打包生成文件的信息，topfeed 内置了 manifest 的插件，会生成 manifest.json 文件，为此我们需要在服务端注入 manifest 信息，以便后端渲染模板时，能注入正确的资源文件。修改`server/server.ts`如下:

```ts
// server/server.ts
import manifest from 'public/browser/manifest.json' // 获取前端生成的资源清单
...
app.use(
	nunjuck_view({
		manifest, // 注入资源清单到模板
		path: path.join(__dirname, 'view')
	})
);
...
```

### 映射页面关系

完成资源文件注入和后端模板之后，我们还需要确定后端路由和前端页面的映射关系，为此修改`server/controller/homeController.tsx`

```ts
// server/controller/homeController.tsx
import { Context } from "@topfeed/topfeed";
async function main(ctx: Context, next: any) {
	await ctx.render(
		"home", // 对应 server/view/home.njk
		{
			page: "home" // 对应client/entry/home 页面
		}
	);
}
export { main };
```

## 服务端渲染
