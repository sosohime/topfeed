# 中间件

中间件完全兼容 Koa 的中间件。

## 编写中间件

### 写法

先写一个简单的 Koa 的 gzip 中间件，来看看中间件的写法。

```js
// app/middleware/gzip.js
const isJSON = require("koa-is-json");
const zlib = require("zlib");

async function gzip(ctx, next) {
	await next();

	// 后续中间件执行完成后将响应体转换成 gzip
	let body = ctx.body;
	if (!body) return;
	if (isJSON(body)) body = JSON.stringify(body);

	// 设置 gzip body，修正响应头
	const stream = zlib.createGzip();
	stream.end(body);
	ctx.body = stream;
	ctx.set("Content-Encoding", "gzip");
}
```

## 中间件最佳实践

### 中间件参数

一般来说中间件也会有自己的配置，因此我们规定业务定义的中间件格式如下：

```js
// middleware.js
function middleware(config){
  return async(ctx,next) {
    ....
  }
}
```

使用方式如下

```js
// app.js
app.use(middleware(config));
```

那么上面的 gzip 中间改写如下

```js
// app/middleware/gzip.js
const isJSON = require("koa-is-json");
const zlib = require("zlib");

module.exports = options => {
	return async function gzip(ctx, next) {
		await next();

		// 后续中间件执行完成后将响应体转换成 gzip
		let body = ctx.body;
		if (!body) return;

		// 支持 options.threshold
		if (options.threshold && ctx.length < options.threshold) return;

		if (isJSON(body)) body = JSON.stringify(body);

		// 设置 gzip body，修正响应头
		const stream = zlib.createGzip();
		stream.end(body);
		ctx.body = stream;
		ctx.set("Content-Encoding", "gzip");
	};
};
```

### 命名中间件

命名中间件是可选的，但是在调试中分配名称很有用。

```js
function logger(format) {
	return async function logger(ctx, next) {};
}
```

### 多个中间件串联

有时您想要将多个中间件 “组合” 成一个单一的中间件，便于重用或导出。你可以使用 koa-compose

```js
const compose = require("koa-compose");

async function random(ctx, next) {
	if ("/random" == ctx.path) {
		ctx.body = Math.floor(Math.random() * 10);
	} else {
		await next();
	}
}

async function backwards(ctx, next) {
	if ("/backwards" == ctx.path) {
		ctx.body = "sdrawkcab";
	} else {
		await next();
	}
}

async function pi(ctx, next) {
	if ("/pi" == ctx.path) {
		ctx.body = String(Math.PI);
	} else {
		await next();
	}
}

const all = compose([random, backwards, pi]);

app.use(all);
```

### 中间件调用中间件

一般不建议在中间件里调用中间件，当封装一些第三方中间件时，这是不可避免的。
可以使用 `await middleware(config)(ctx,next)`形式进行调用
使用方式如下：

```js
import * as path from "path";
import * as serve from "koa-static";

export default app => async (ctx, next) => {
	const root = app.root;
	const dir = path.join(root, "static");
	await serve(dir)(ctx, next);
};
```
