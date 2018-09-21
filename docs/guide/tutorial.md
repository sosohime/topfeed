# 教程

通常可以通上一节的方式，使用 topfeed-init 快速新建项目, 但为了让大家更好的了解 topfeed，接下来，我们将跳过脚手架，手动一步步的搭建出一个单页 SSR 的 [Hacker News](https://news.ycombinator.com/)。最后的项目结果如 [目录结构](/guide/structure.md) 所示,最终代码地址[topfeed-news](https://github.com/TopFeed/topfeed-news);

## 模板渲染

### 初始化项目

```shell
$ mkdir topfeed-news
$ cd topfeed-news
$ npm init
$ npm i @topfeed/topfeed
$ npm i @topfeed/topfeed-cli
$ npm i -D nodemon babel-node # 用于自动重启node
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

由于我们使用 typescript 进行开发，所以需进行 babel 配置,topfeed 提供了默认的 babel 配置，直接使用即可。

```js
// server/.babelrc.js
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

`server/server.ts`是真正处理业务逻辑的地方。

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
import * as homeController from "controller/homeController";

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
topfeed 默认集成 nunjuck 模板引擎。按如下方式启用 nunjuck 模板引擎

```ts
// server/server.ts
import { Application, nunjuck_view } from "@topfeed/topfeed";
const app = new Application({
	root: __dirname // server代码所在目录
});
// 启用nunjuck 进行模板渲染
app.use(
	nunjuck_view({
		path: path.join(__dirname, "view") // 模板所在文件夹
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
import * as homeController from "controller/homeController";
import * as newsController from "controller/newsController";

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
// server/serice/news.ts
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
// client/entry/home/index.scss
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

- renderStyles: 用于注入打包的 css 文件
- renderScripts: 用于注入前端打包的 js 文件
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

前端渲染可以更加方便实现复杂的业务逻辑但是对 SEO 不够友好和首屏速度较慢，而服务端渲染模板对 SEO 比较友好且首屏速度较快，但是难以适应较复杂的业务逻辑，为此结合两者，我们可以进行采用服务端渲染，
服务端渲染涉及到的知识较多，详细的服务端渲染指南请参考[SSR 指南](/ssr/)

### bundle 生成

服务端渲染需要分别为`browser`和`node`层生成`bundle`，以便`browser`端渲染和`server`端渲染，为此`topfeed`提供了服务端渲染的支持,修改`client:dev` scripts 如下:

```json
// package.json
{
	"scripts": {
		"client:dev": "CONF_DEV=development topfeed dev --target ssr" // 此时修改 target为ssr会生成两份bundle
	}
}
```

### 通用入口

server render 和 browser render 的使用方式不一致，为此我们需要分别为 browser 和 server 编写入口文件。
为了简便，我们将两个入口统一写在`client/entry/index.tsx`里，通过

```tsx
import ReactDOM from "react-dom";
import App from "./app";

const clientRender = () => {
	ReactDOM.hydrate(<App />, document.getElementById("root"));
};

const serverRender = () => {
	return <App />;
};
export default (__BROWSER__ ? clientRender() : serverRender); // 通过 __BROWSER__ 区分server 和 browser入口
```

### server render

编写完前端代码后，通过`npm run client:dev` 其会自动在`server/public`下生成`node`和`server`两个目录，其包含了`node`和`server`的两份打包 bundle，目录结构如下：

```sh
├── public
│   ├── browser
│   │   ├── home.css
│   │   ├── home.css.map
│   │   ├── home.js
│   │   ├── home.js.map
│   │   ├── manifest.json
│   └── node
│       ├── feed.js
│       ├── home.css
│       └── home.js
```

:::tip
对于前端 bundle，生产环境下的生成文件应该要包含 hash 值以用于更新，而服务端的代码由于存储到服务端故不需要 hash 值，而在开发环境下，为了热更新，故前端的 bundle 也没有 hash 值。
:::
生成 bundle 之后，我们就可以在`server/controller/homeController.tsx`里调用生成的 bundle 文件进行服务端渲染了。

```ts
// server/controller/homeController.tsx
import { Context } from "@topfeed/topfeed";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "public/node/home"; // home页对应的bundle入口
async function main(ctx: Context, next: any) {
	try {
		const html = renderToString(<App />);
		await ctx.render("home", {
			page: "home", // 和 public/node/home对应
			html // ssr 渲染的结果
		});
	} catch (err) {
		ctx.throw(500, err); // 处理服务端渲染时的异常报错
	}
}
export { main };
```

:::warning
暂时 babel-node 只支持在`.tsx`里混入`jsx`语法，因此这里我们需要在将后缀改为`tsx`。
:::
服务端渲染生成内容后，我们需要将生成的内容注入模板，修改`server/view/home.njk`如下

```html
<head>
	{{renderStyles()}}
</head>
<body>
  <!-- 注入服务端渲染生成的内容 -->
  <div id="root">{{html|safe}}</div>
	{{renderScripts()}}
</body>
```

:::warning
服务端渲染的时候需要特别注意保证服务端渲染生成的内容和客户端首屏渲染的内容完全一致，否则会导致各种诡异的 bug，一些常见的问题如[服务端渲染](https://zhuanlan.zhihu.com/p/33887159),这里一个常见的问题是

```html
   <!-- 正确 -->
  <div id="root">{{html|safe}}</div>
  <!-- 错误，含有冗余的空白文本节点，会造成服务端渲染warning -->
  <div id="root">
    {{html|safe}}
  </div>
```

:::

### Model

对于稍微上规模的代码，状态管理是不可或缺的，`Redux` 是一个很好的状态管理库，但是其使用方式稍显冗杂，因此我们使用了[Rematch](https://github.com/rematch/rematch)作为状态管理库，其兼容了 `Redux` 的使用方式的同时，大大简化了 `Redux` 的使用，同时对 `Typescript` 的支持也比较好。下面我们使用 `rematch` 来实现一个简化的 `TodoList`。
首先安装 `rematch`:

```sh
npm i @rematch/core@next # 我们使用了next的某些新特性，此处需要加入@next
```

创建 model，我们将 model 存放在 entry 里，里面包含三类文件

- `todo_list.tsx`:子 reducer，在实际应用中我们通常对 reducer 进行拆分，每个 reducer 处理各自的逻辑，最后通过 combineReducer 将各子 reducer 组合成一个 rootReducer
- `index.tsx`: rootReducer, 通过 export 继承的方式`export * from xxx, export * from yyy` 将各子 reducer 进行合并。
- `configure.tsx`:createStore, 负责生成最终的 store,包括集成 redux 插件等工作（SSR 情况下会做更多的工作）。

```tsx
// entry/home/model/configure.tsx
import { init } from "@rematch/core";
import immerPlugin from "@rematch/immer";
import * as models from ".";
export type models = typeof models;
export default function configure() {
	const store = init({
		models,
		plugins: [immerPlugin()] // 实现immutable
	});
	return store;
}
```

:::tip Immutable
因为 `redux` 要求 reducer 是个纯函数，这意味着我们不能修改原来的对象，而是生成原有对象的深度拷贝，手动实现深度拷贝是很烦人的(代码里充斥着...的解构操作,代码可读性也变得很差)，因此我们考虑使用 `immer` 来实现 `Immutable`，这样大大简化了状态的更新操作。
:::

```tsx
// entry/home/models/todo_list.tsx
import { createModel } from "@rematch/core"; // createModel负责根据传入的object生成对应typesript定义
import { TodoItem } from "typings";
export const todo_list = createModel({
	state: [] as TodoItem[], // 这里as TodoItem 保证createModel能够创建正确的类型
	reducers: {
		// 同步action
		add(state: TodoItem[], payload: TodoItem) {
			state.push(payload);
		},
		delete(state: TodoItem[], payload: TodoItem) {
			const idx = state.findIndex(item => item.todo === payload.todo);
			if (idx !== -1) {
				state.splice(idx, 1);
			}
			return state;
		},
		toggle(state: TodoItem[], payload: TodoItem) {
			for (const item of state) {
				if (item.todo === payload.todo) {
					item.done = !item.done;
				}
			}
			return state;
		}
	},
	effects: (dispatch: any) => ({
		// 异步action
		async delay_delete(payload: TodoItem) {
			await new Promise(resolve => {
				setTimeout(() => {
					resolve();
				}, 1000);
			});
			dispatch.todo_list.delete(payload);
		}
	})
});
```

```tsx
// client/typings/state/todo.tsx
export interface TodoItem {
	todo: string;
	done: boolean;
}
```

:::tip
开发中我们发现组件需要频繁的 connect 到 redux 里，且组件频繁复用一些模型定义（如文章类型，作者类型，读者类型等），因此我们将 redux 每个 reducer 的 state 类型定义统一维护，方便使用时方便使用这些类型定义。甚至这些定义并不需要用户手动定义，通过一些工具可以根据`Swagger`和`Thrift`自动生成`rpc`和`http`接口的对应的.d.ts 定义，这样极大地便利了后期的维护和重构。
:::
:::tip
`rematch`的`model`对象由几个基本的属性，需要大家了解。

- `state`: 当前`model`状态的初始值，表示当前状态。
- `reducer`: 用于处理同步操作，可以修改`state`,`reducer`是一个纯函数，接受当前`state`以及一个数据体(`payload`)作为参数，返回新的`state`。
- `effects`: 用于处理异步操作和业务逻辑，返回一个 promise，入参是 dispatch，可以通过 dispatch 调用其他的 reducer 和 effects。
  :::

```tsx
// entry/home/model/index.tsx
/**
 * combineReducer 生成rootReducer
 * rootReducer: { todo_list: todo_list_reducer }
 **/
export * from "./todo_list";
```

创建完 model 之后就可以在组件里使用 redux 了，我们还是使用 react-redux 来连接 redux 和组件。
创建 todo_list 组件，我们规定所有的业务组件放在`client/components`目录下。

```tsx
// client/components/todo_list.tsx
import * as React from "react";
import { connect } from "react-redux";
import { models } from "entry/home/models/configure";
import "./index.scss";
import { RematchDispatch, RematchRootState } from "@rematch/core";
export interface AboutProps
	extends Partial<ReturnType<typeof mapState>>,
		Partial<ReturnType<typeof mapDispatch>> {}
class TodoList extends React.Component<AboutProps> {
	state = {
		todo: ""
	};
	handleToggle = (item: any) => {
		this.props.toggle!(item);
	};
	handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({
			todo: e.target.value
		});
	};
	handleDelete = (item: any) => {
		this.props.delete_item!(item);
	};
	handleKeyboard = (event: React.KeyboardEvent) => {
		if (event.keyCode !== 13) {
			return;
		}
		event.preventDefault();
		this.props.add_item!({
			todo: this.state.todo,
			done: false
		} as any);
		this.setState({
			todo: ""
		});
	};
	render() {
		const { todo_items } = this.props;
		const list_dom = todo_items!.map(todo_item => {
			return (
				<div className="todo-item" key={todo_item.todo}>
					<input
						type="checkbox"
						checked={todo_item.done}
						onChange={() => this.handleToggle(todo_item)}
					/>
					<span>{todo_item.todo}</span>
					<button
						className="delete"
						onClick={() => this.handleDelete(todo_item)}
					>
						delete
					</button>
					<button
						className="delay-delete"
						onClick={() => this.props.delay_delete!(todo_item as any)}
					>
						delay_delete
					</button>
				</div>
			);
		});
		return (
			<div className="ssr-container">
				<div className="todo-list">
					<input
						type="text"
						value={this.state.todo}
						onChange={this.handleChange}
						onKeyDown={this.handleKeyboard}
					/>
					{list_dom}
				</div>
			</div>
		);
	}
}

const mapState = ({ todo_list }: RematchRootState<models>) => {
	return {
		todo_items: todo_list
	};
};
const mapDispatch = ({ todo_list }: RematchDispatch<models>) => {
	return {
		add_item: todo_list.add,
		toggle: todo_list.toggle,
		delete_item: todo_list.delete,
		delay_delete: todo_list.delay_delete
	};
};
export default connect(
	mapState,
	mapDispatch as any
)(TodoList);
```

## SPA

对于 SPA，前端和后端有着相似的分层架构，服务端和前端的分层如下图(节选自[软件分层](https://www.yuque.com/ant-design/course/abl3ad))所示：
![layer](/topfeed/layer.png)
上图中，左侧时服务端代码的层次结构，由 Controller,Service,Data Access 三层组成服务端系统：

1. Controller 层负责与用户直接打交道，渲染页面、提供接口等，侧重于展示型逻辑。
2. Service 层负责处理业务逻辑，供 Controller 层调用，通常是会调用 Data Access 层进行数据源操作处理。
3. Data Access 层顾名思义，负责与数据源对接，进行纯粹的数据读写，供 Service 层调用。

Node 层通常有两种使用场景，

1. 完全充当服务端，其架构和上述的服务端架构完全相同。
2. 充当中间层（topfeed 主要关注 node 充当中间层使用），这时候通常只有两层结构，即 Contoller 层和 Service 层，Controller 层作用和上述一样，Service 层则负责调用实际的后端调用(rpc 调用或者 http 调用),对应的后端分层实际上也被缩减为两层 Service 层和 Data Access 层。

上图的右侧是前端代码的结构，同样需要进行必要的分层：

1. Page 负责与用户直接打交道：渲染页面、接受用户的操作输入，侧重于展示型交互性逻辑。
2. Model 负责处理业务逻辑，为 Page 做数据、状态的读写、变换、暂存等。
3. Service 负责与 HTTP 接口对接，进行纯粹的数据读写。

:::tip
在 Node 层充当中间层和服务端渲染的场景下，Node 层和前端都有 Service 层，且其实际的工作都是负责和后端的 http 接口对接，这时候我们可以对两者的 service 层进行复用，实际上对于同构应用(Universal application)，Node 层和前端存在大量的公用逻辑(路由，数据格式化处理，数据请求等)，因此我们考虑将 client 和 server 公用的逻辑存放到 shared 目录下,最终结构是

```sh
├── server server端代码
├── client client端代码
├── shared server和client公用代码
```

:::

### 创建 Page

Hacker News 的 news 分为三个子页面，Feed 页面包含了一个文章列表，Detail 页则包含了每条文章的详细信息和对应评论,User 页包含了用户的个人信息。
首先先构建三个页面。

```tsx
// client/container/news/feed
import React from "react";
import Layout from "components/layout";
import Article from "components/article";
import { getTopStories } from "shared/service/news";
export interface FeedProps {
	path: string;
	page: number;
}
export interface FeedState {
	list: {
		url: string;
		title: string;
	}[];
}
export default class Feed extends React.Component<FeedProps, FeedState> {
	readonly state: FeedState = { list: [] };
	async componentDidMount() {
		const { page = 1 } = this.props;
		const newsList = await getTopStories(page);
		this.setState({
			list: newsList
		});
	}
	render() {
		const { list } = this.state;
		return (
			<Layout>
				<div className="news-view view v-trnasition" />
				{list.map((item, idx) => (
					<Article key={idx} item={item} index={idx} />
				))}
			</Layout>
		);
	}
}
```

```tsx
// client/container/news/detail
import React from "react";
import Layout from "components/layout";
import Article from "components/article";
import Comment from "components/comment";
import { getItem } from "shared/service/news";
import { NewsItem } from "typings";

export interface DetailProps {
	item_id?: number;
	path: string;
}
export interface DetailState {
	item: any;
	comments: NewsItem[];
}
export default class Detail extends React.Component<DetailProps, DetailState> {
	state: DetailState = {
		item: {},
		comments: []
	};
	async componentDidMount() {
		const newsInfo = await getItem(this.props.item_id!);
		const commentList = await Promise.all(
			newsInfo.kids.map((_id: number) => getItem(_id))
		);
		console.log("news:", newsInfo);
		this.setState({
			item: newsInfo,
			comments: commentList
		});
	}
	render() {
		const { item, comments } = this.state;
		return (
			<Layout>
				<div className="item-view view v-transition">
					<Article item={item} />
					{comments.length > 0 && (
						<ul className="comments">
							{comments.map(comment => (
								<Comment key={comment.id} comment={comment} />
							))}
						</ul>
					)}
					{comments.length == 0 && <p>No comments yet.</p>}
				</div>
			</Layout>
		);
	}
}
```

```tsx
// client/contaner/news/user
import React from "react";
import Layout from "components/layout";
import * as Util from "lib/util";
import { IUser } from "typings";
import { getUser } from "shared/service/news";
export interface UserState {
	user: IUser;
}
export default class User extends React.Component<
	{
		user_id: number;
		path: string;
	},
	{
		user: IUser;
	}
> {
	state = {
		user: {}
	} as UserState;
	async componentDidMount() {
		const userInfo = await getUser(this.props.user_id);
		this.setState({
			user: userInfo
		});
	}
	render() {
		const { user } = this.state;
		return (
			<Layout>
				<div className="user-view view v-transition">
					<ul>
						<li>
							<span className="label">user:</span> {user.id}
						</li>
						<li>
							<span className="label">created:</span>{" "}
							{Util.relativeTime(user.created)}
						</li>
						<li>
							<span className="label">karma:</span> {user.karma}
						</li>
						<li>
							<span className="label">about:</span>
							<div className="about">{user.about}</div>
						</li>
					</ul>
					<p className="links">
						<a href={`https://news.ycombinator.com/submitted?id=${user.id}`}>
							submissions
						</a>
						<br />
						<a href={`https://news.ycombinator.com/threads?id=${user.id}`}>
							comments
						</a>
					</p>
				</div>
			</Layout>
		);
	}
}
```

### 创建 Service

对于 SPA，调用的 service 分为两类

1. 服务端和客户端通用的 servcie，如首屏数据的加载所需要调用的 service，我们把这些公用的 servic 存放在 shared 目录下。
2. 服务端和客户端不共用的 service，如服务端的 rpc 调用，前端特有的网络请求服务等则将这些放在 client 和 server 各自的 service 里。
   下面我们创建 News 所需的公用的 service

```tsx
// shared/service/news.ts
import { serverUrl } from "../constants/url";
import http from "../lib/http";
import { NewsItem } from "typings";
async function request(api: string, opts?: object): Promise<any> {
	const result = await http.get(`${serverUrl}/${api}`, opts);
	return result;
}
async function getTopStories(page = 1, pageSize = 10): Promise<NewsItem[]> {
	let idList: number[] = [];
	try {
		idList = await request("topstories.json", {
			params: {
				page,
				pageSize
			}
		});
	} catch (err) {
		idList = [];
	}
	// parallel GET detail
	const newsList = await Promise.all(
		idList.slice(0, 10).map(id => {
			const url = `${serverUrl}/item/${id}.json`;
			return http.get<any, NewsItem>(url);
		})
	);
	return newsList;
}

async function getItem(id: number): Promise<NewsItem> {
	return await request(`item/${id}.json`);
}

async function getUser(id: number) {
	return await request(`user/${id}.json`);
}

export { getTopStories, getItem, getUser };
```

### 创建 Router

对于 SPA，按需加载时必不可少的，`webpack`的[dynamic import](https://webpack.js.org/guides/code-splitting/)对动态按需加载提供了很好的支持，但是我们仍然需要自己处理一些超时、请求失败等情形，所幸[react-loadable](https://github.com/jamiebuilds/react-loadable)封装了大部分的逻辑，同时对 SPA 的服务端也提供了很好的支持。下面我们就使用`react-loadable`和 `react-router`来定义前端路由.
首先定义路由

```tsx
// client/entry/news/routes.tsx
import Loadable from "react-loadable";
import Loading from "components/loading";
export default [
	{
		name: "feed",
		path: "/news",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/feed"), // 开启prefetch优化路由切换的加载时间
			delay: 500,
			loading: Loading
		})
	},
	{
		name: "detail",
		path: "/news/item/:item_id",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/detail"),
			delay: 500,
			loading: Loading
		})
	},
	{
		name: "user",
		path: "/news/user/:user_id",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/user"),
			delay: 500,
			loading: Loading
		})
	}
];
```

同时我们也需要修改对应的入口文件

```tsx
import * as React from "react";
import { Route } from "react-router-dom";
import Routers from "./routes";
export default class App extends React.Component {
	render() {
		return (
			<div className="news-container">
				{Routers.map(({ name, path, component: Component }) => {
					return <Route key={name} path={path} component={Component} />;
				})}
			</div>
		);
	}
}
```

由于使用了按需加载，为了避免加载所需组件代码时的 loading 闪烁，我们可以预先加载所需组件 react-loadble 通过 `Loadable.preloadReady` 可以实现组件的 preload。故修改加载入口如下:

```tsx
import App from "./app";
import ReactDOM from "react-dom";
import React from "react";
import Loadable from "react-loadable";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
const clientRender = () => {
	Loadable.preloadReady().then(() => {
		ReactDOM.render(
			<BrowserRouter>
				<App />
			</BrowserRouter>,
			document.getElementById("root")
		);
	});
};
export default clientRender();
```

## SPA + SSR + Code Splitting

上面的 SPA 各个页面获取首屏数据的逻辑都是存放在各页面组件的`componentDidMount`中进行的，我们能够感受到明显的页面闪烁问题，下面考虑对 SPA 实现 SSR。
:::tip React Suspense

SPA + SSR 一个较为棘手的地方在于如何处理数据预取,详细指南参考[数据预取和状态](/ssr/data.md),其复杂主要在于

1. 保证服务端渲染时和客户端注水时获取的状态保持一致，这可以将服务端预取到的状态同步到客户端实现（涉及到 XSS 安全问题）。
2. 对于 SPA 用户访问一个页面分为下面两种情形：
   - 用户直接浏览器输入地址访问当前页面，这样首先由服务端进行渲染，由服务端负责首屏数据的预取，然后客户端使用服务端同步的状态进行注水操作即可。
   - 用户在前端从 A 页面跳转到 B 页面，此时 B 页面并不经过而是直接在前端渲染，因此需要在切换路由时，进行客户端数据的预取，而客户端的预取又分为两种情况：
     1. 在路由导航之前完成数据的预取，使用预取数据进行渲染，这样的好处是应用代码不用处理数据获取时 loading 切换的工作，只负责数据渲染即可。
     2. 在路由导航之后完成数据的预取，这样需要应用组件里处理数据获取时 loading 状态的切换。
3. 由于同时涉及到客户端预取和服务端预取，如何将两种预取逻辑进行统一管理，避免同时维护两份预取逻辑（通常通过 router 提供的 matchRoute 操作和页面组件的静态方法结合实现)。

由此可以看出对于单页的服务端渲染，其实现略显复杂，为了简化 SSR 的实现，React 团队提出了 Suspense，使用 Suspense 实现 SSR 可以参考[Suspense](https://github.com/acdlite/suspense-ssr-demo),
相关的 Talk 和 issue

- [React Suspense](https://github.com/facebook/react/issues/13206)
- [React SSR Suspense](https://www.youtube.com/watch?v=z-6JC0_cOns)
  :::

### Redux 集成

对于 SPA 的 SSR 我们配合 Redux 进行实现。
首先定义相关 models。

```tsx
// entry/news/models/index.tsx
import { createModel } from "@rematch/core";
import { NewsState } from "typings";
import { getItem, getTopStories, getUser } from "shared/service/news";

export const news = createModel({
	state: ({
		detail: {
			item: {},
			comments: []
		},
		user: {},
		list: []
	} as any) as NewsState,
	reducers: {
		updateUser(state: NewsState, payload) {
			state.user = payload;
		},
		updateList(state: NewsState, payload) {
			state.list = payload;
		},
		updateDetail(state: NewsState, payload) {
			state.detail = payload;
		}
	},
	effects: dispatch => ({
		// 获取用户信息
		async loadUser(user_id) {
			const userInfo = await getUser(user_id);
			dispatch.news.updateUser(userInfo);
		},
		// 获取feed列表信息
		async loadList(page) {
			const list = await getTopStories(page);
			dispatch.news.updateList(list);
		},
		// 获取详情页信息
		async loadDetail(item_id) {
			const newsInfo = await getItem(item_id);
			const commentList = await Promise.all(
				newsInfo.kids.map(_id => getItem(_id))
			);
			dispatch.news.updateDetail({
				item: newsInfo,
				comments: commentList
			});
		}
	})
});
```

定义好 model 之后，我们就通过 dipatch redux 的 effects 来做数据的获取逻辑，以 Detail 页面为例,修改如下,
我们在 componentDidmount 之后，dispatch redux 的 loadDetail 来获取文章的详细信息。

```tsx
// container/news/detail
import React from "react";
import Layout from "components/layout";
import Article from "components/article";
import Comment from "components/comment";
import { NewsItem } from "typings";
import { RematchDispatch, RematchRootState } from "@rematch/core";
import { connect } from "react-redux";
import { models } from "entry/news/models/configure";

export interface DetailProps {
	item_id?: string;
	path: string;
	item: NewsItem;
	comments: NewsItem[];
	loadDetail: (id: string) => Promise<any>;
}
class Detail extends React.Component<DetailProps> {
	async componentDidMount() {
		// 通过dispatch effects来初始化客户端首屏数据。
		await this.props.loadDetail(this.props.item_id);
	}
	render() {
		const { item, comments } = this.props;
		return (
			<Layout>
				<div className="item-view view v-transition">
					<Article item={item} />
					{comments.length > 0 && (
						<ul className="comments">
							{comments.map(comment => (
								<Comment key={comment.id} comment={comment} />
							))}
						</ul>
					)}
					{comments.length == 0 && <p>No comments yet.</p>}
				</div>
			</Layout>
		);
	}
}
const mapState = (state: RematchRootState<models>) => {
	return {
		item: state.news.detail.item,
		comments: state.news.detail.comments
	};
};
const mapDispath = (dispatch: RematchDispatch<models>) => {
	return {
		loadDetail: dispatch.news.loadDetail
	};
};
export default connect(
	mapState,
	mapDispath as any
)(Detail);
```

此时的用户首屏数据还是在 componentDidmount 内获取，我们也可以在服务端获取用户首屏数据，然后将首屏数据同步到服务端进行首屏渲染。
对于 SPA 的服务端渲染，我们即需要在服务端获取页面的首屏数据（直接输入 url 访问)，也需要在客户端获取页面的首屏数据（前端路由切换访问）。
而且两处获取首屏数据的逻辑一致，因此我们应尽可能的复用首屏数据的获取逻辑。

### 数据预取

对于服务端数据预取，问题关键是如何根据当前的 url 获取到匹配的页面组件，进而获取该页面所需的首屏数据。
因为首屏数据和页面存在一一对应的关系，因此我们可以考虑将首屏数据挂载到页面组件上。这是`next.js`等框架的做法，如下所示

```tsx
class Page extends React.Component {
	static async getInitialProps(url) {
		const result = await fetchData(url);
		return result;
	}
}
```

这个做法的缺陷是如果我们想对页面组件使用 HOC 进行封装，需要将静态方法透传到包裹组件上，这有时在一定程度上难以实现，典型的如`react-loadable`,无法将组件透传到`Loadable`组件上。

```tsx
{
    name: "detail",
    path: "/news/item/:item_id",
    component: Loadable({ // 因为是异步加载故这里难以将detail的静态方法透传到Loadable上。
      loader: () => import(/* webpackPrefetch: true */ "container/news/detail"),
      delay: 500,
      loading: Loading
    }),
    async asyncData({ dispatch }: Store, { params }: any) {
      await dispatch.news.loadDetail(params.item_id);
    }
  },
```

因此我们考虑将数据预取的逻辑存放在`routes`里,添加了数据预取后的`routes`如下所示。

```tsx
export default [
	{
		name: "detail",
		path: "/news/item/:item_id",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/detail"),
			delay: 500,
			loading: Loading
		}),
		async asyncData({ dispatch }: Store, { params }: any) {
			//添加数据预取逻辑
			await dispatch.news.loadDetail(params.item_id);
		}
	},
	{
		name: "user",
		path: "/news/user/:user_id",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/user"),
			delay: 500,
			loading: Loading
		}),
		async asyncData(store: Store, { params }: any) {
			await store.dispatch.news.loadUser(params.user_id);
		}
	},
	{
		name: "feed",
		path: "/news/feed/:page?",
		component: Loadable({
			loader: () => import(/* webpackPrefetch: true */ "container/news/feed"),
			delay: 500,
			loading: Loading
		}),
		async asyncData(store: Store, { params }: any) {
			await store.dispatch.news.loadList(params.page);
		}
	}
];
```

#### 服务端数据预取

我们这里将实际的获取数据的逻辑封装在 redux 的 effects 里，这样方便服务端和客户端统一调用。
在`routes`里定义了数据预取逻辑后，我们接下来就可以在服务端进行数据预取操作了。
我们使用`react-router`的`matchPath`来根据当前路由匹配对应页面组件，进而做数据预取操作。代码如下：

```tsx
// server/controller/newsController.ts
async function list(ctx: Context) {
	const promises: Promise<any>[] = [];
	const store = configureStore();
	routes.some((route: any) => {
		const match = matchPath(ctx.url, route); // 判断当前页面是否与路由匹配
		if (match) {
			promises.push(route.asyncData(store, match));
		}
	});
	await Promise.all(promises); // 等待匹配页面的effects都派发完毕
	const context: any = {};
	const html = renderToString(
		<App store={store} url={ctx.url} context={context} />
	);
	if (context.url) {
		ctx.redirect(context.status, context.url);
	}
	await ctx.render("news", {
		page: "news",
		html,
		initial_state: store.getState() // 将服务端预取数据后的状态同步到客户端作为客户端的初始状态
	});
}
```

### 客户端注水

实现了服务端预取之后，我们需要将服务端获取的状态同步到客户端，以保证客户端渲染的结果和服务端保持一致。
客户端注水共分为三步

#### 获取服务端完成数据预取后的 initial_state

在`newsController`中可以获取服务端的 initial_state

```tsx
await ctx.render("news", {
	page: "news",
	html,
	initial_state: store.getState() // 将服务端预取数据后的状态同步到客户端作为客户端的初始状态
});
```

#### 将 initial_state 同步到模板上

我们可以使用`renderState`将服务端获取的 initial_state 同步到模板上。

```html
<head>
	{{renderStyles()}}
</head>
<body>
  <div id="root">{{html|safe}}</div>
  <!-- 同步intial_state到模板 -->
	{{renderState()}}
	{{renderScripts()}}
</body>
```

#### 客户端根据模板上的 initial_state 初始化 store

configure 支持传入 intial_state 来初始化 store

```tsx
const clientRender = () => {
	const store = configureStore(window.__INITIAL_STATE__); // 根据window.__INITIAL_STATE__初始化store
	Loadable.preloadReady().then(() => {
		ReactDOM.hydrate(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>,
			document.getElementById("root")
		);
	});
};
```

### 客户端数据预取

受限于`react-router`并没有像`vue-router`提供类似`beforeRouteUpdate`的 api，我们只有在其他地方进行客户端预取操作，考虑如下的 hooks

1. `componentDidMount`: 需要区分是首次渲染还是路由跳转
2. `componentWillReceiveProps`: react-router 切换路由是会进行 mount/unmount 操作，路由组件切换时，页面组件不会触发`componentWillReceiveProps`
3. `history.listen`: 路由切换时触发

综上我们考虑在应用入口处通过 history.listen 里进行客户端数据预取操作。

```tsx
import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { withRouter, matchPath } from "react-router";
import { connect } from "react-redux";
import Routers from "./routes";
import { models } from "./models/configure";
import { RematchDispatch } from "@rematch/core";
import "./index.scss";
class App extends React.Component<{
	history: any;
	dispatch: RematchDispatch<models>;
	location: any;
}> {
	unlisten!: () => void;
	componentDidMount() {
		const { history } = this.props; // 客户端的数据预取操作
		this.unlisten = history.listen(async (location: any) => {
			for (const route of Routers) {
				const match = matchPath(location.pathname, route);
				if (match) {
					await route.asyncData({ dispatch: this.props.dispatch }, match);
				}
			}
		});
	}
	componentWillUnmount() {
		this.unlisten(); // 卸载时取消listen
	}
	render() {
		return (
			<div className="news-container">
				<Switch>
					{Routers.map(({ name, path, component: Component }) => {
						return <Route key={name} path={path} component={Component} />;
					})}
				</Switch>
			</div>
		);
	}
}
const mapDispatch = (dispatch: RematchDispatch<models>) => {
	return {
		dispatch
	};
};
// 通过withRouter来获取history
export default withRouter<any>(
	connect(
		undefined,
		mapDispatch as any
	)(App)
);
```

最终我们修改客户端和服务端公用的入口代码即可。

```tsx
// client/entry/news/index.tsx
import App from "./app";
import ReactDOM from "react-dom";
import React from "react";
import Loadable from "react-loadable";
import configureStore from "./models/configure";
import { Provider } from "react-redux";
import { ContextProps } from "typings";
import routes from "./routes";
import { BrowserRouter, StaticRouter } from "react-router-dom";
const clientRender = () => {
	const store = configureStore(window.__INITIAL_STATE__);
	Loadable.preloadReady().then(() => {
		ReactDOM.hydrate(
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>,
			document.getElementById("root")
		);
	});
};

const serverRender = (props: ContextProps) => {
	return (
		<Provider store={props.store}>
			<StaticRouter location={props.url} context={props.context}>
				<App />
			</StaticRouter>
		</Provider>
	);
};
export default (__BROWSER__ ? clientRender() : serverRender);

export { routes, configureStore };
```

最后因为我们对页面进行了按需加载，所以服务端启动前应该预先下载所有页面组件模块，以防止首次访问页面时，服务端渲染 loading 的页面，故在入口处需要使用`react-loadable`的`preloadAll`方法，进行服务端预加载按需加载的模块。

```tsx
export async function startServer() {
	await Loadable.preloadAll(); // 服务端预加载按需加载模块
	app.listen(process.env.PORT, () => {
		console.log("start server at port:", process.env.PORT);
	});
}
```
