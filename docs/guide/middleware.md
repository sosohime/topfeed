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

### 配置

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
