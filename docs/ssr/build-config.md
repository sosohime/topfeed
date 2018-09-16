# 构建配置

我们假设你已经知道，如何为纯客户端(client-only)项目配置 webpack。

## 介绍构建步骤

到目前为止，我们还没有讨论过如何将相同的 React 应用程序提供给客户端。为了做到这一点，我们需要使用 webpack 来打包我们的 React 应用程序。事实上，我们可能需要在服务器上使用 webpack 打包 React 应用程序，因为：

- 通常 React 应用程序是由 webpack 构建，许多 webpack 特定功能不能直接在 Node.js 中运行（例如通过 `file-loader` 导入文件，通过 `css-loader` 导入 CSS）。

- 尽管 Node.js 最新版本能够完全支持 ES2015 特性，我们还是需要转译客户端代码以适应老版浏览器。这也会涉及到构建步骤。

所以基本看法是，我们将应用程序打包成两个版本，客户端版本和服务器版本，服务器需要「服务器 bundle」然后用于服务器端渲染(SSR)，而「客户端 bundle」会发送给浏览器，用于混合静态标记。

![架构](https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png)

我们将在后面的章节讨论规划结构的细节 - 现在，先假设我们已经将构建过程的规划都弄清楚了，我们可以在启用 webpack 的情况下编写我们的 React 应用程序代码。

### bundle 生成

我们内置的 webpack 会自动的生成两份 borwser|node 两份 bundle,browser bundle 用于客户端注水，node bundle 用于服务端渲染，同时会生成 browser 的构建清单（manifest），用于支持为前端资源注入正确的 hash 值。在 topfeed.config.js 里可以配置 bundle 的生成路径

```js
// topfeed.config.js
module.exports = {
	outputPath: path.resolve(__dirname, "server/public") // node和browser的编译生成地址
};
```

上述配置会在`server/public/browser`里生成 browser 的 bundle 文件，在`server/public/node`里生成 server 的 bundle 文件，同时为 browser 生成构建清单在`server/public/manifest.json`。

### 生成 clientManifest

除了 server bundle 之外，我们还可以生成客户端构建清单(manifest)，使用客户端清单和服务器 bundle 之后，现在具有了服务端和客户端的构建信息，因此可以渲染 HTML 了。好处是双重的:

1. 在生成的文件名中有哈希时，可以取代 html-webpack-plugin 来注入正确的资源 URL。
2. 在通过 webpack 的按需代码分割特性渲染 bundle 时，我们可以确保对 chunk 进行最优化的资源预加载/数据预取，并且还可以将所需的异步 chunk 智能地注入为 `<script>` 标签，以避免客户端的瀑布式请求(waterfall request)，以及改善可交互时间(TTI - time-to-interactive)。

3. 为模板配置 manifest

```js
import { Core } from "@topfeed/topfeed";
import clientManifest from "./public/browser/manifest.json";
import { locale, nunjuck_view } from "@topfeed/topfeed/middleware";
const app = new Core({
	root: __dirname
});
app.use(
	nunjuck_view({
		manifest: clientManifest, // 为模板注入manifest用于资源注入
		path: path.join(__dirname, "view")
	})
);
```

2. 手动进行资源注入大多数场景下都需要手动进行资源注入，在这种情况下我们可以在 nunjuck 的模板里进行资源注入

```html
// page.njk
<head>
	{{renderStyles()}}
</head>
<body>
  <div id="root">
	 {{html|safe}}
	</div>
	{{renderState()}}
	{{renderScripts()}}
</body>
```
