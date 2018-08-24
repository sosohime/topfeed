---
sidebar: auto
---

# 配置参考

## 全局 CLI 配置

TODO

## topfeed.config.js

`topfeed.config.js` 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被 `@topfeed/topfeed-cli` 自动加载。

这个文件应该导出一个包含了选项的对象：

```js
// topfeed.config.js
module.exports = {
	// 选项...
};
```

### port

- Type: `number`
- Default: `4002`

webpack DevServer 的启动端口

### outputPath

- Type: `string`
- Default: `server/public`
  webpack 打包的 bundle 的输出目录,ssr 模式打包生成的 node bundle 和 server bundle 文件会放在 `outputPath/node` 和 `outputPath/browser`里

### publicPath

- Type: `string`
- Default: `'/'`
  webpack-dev-server 的 publicPath

### configureWebpack

- Type: `(config:) => webpackConfig`
  调整 webpack 配置最简单的方式就是在 topfeed.config.js 中的 configureWebpack 选项提供一个函数，函数返回一个 webpack 配置

```js
module.exports = {
  configureWebpack = ({buildTarget}) => {
    return { // 自定义webpack配置，会与内部webpack配置进行merge
      plugins: [
        new myWebpackPlugin()
      ],
      resolve: {
				extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
				alias: {
					style: path.resolve(__dirname, 'client/style')
				}
			}
    }
  }
}
```

::: warning
有些 webpack 选项是基于 topfeed.config.js 中的值设置的，所以不能直接修改。例如你应该修改 topfeed.config.js 中的 outputPath 选项而不是修改 output.path；你应该修改 topfeed.config.js 中的 publicPath 选项而不是修改 output.publicPath。这样做是因为 topfeed.config.js 中的值会被用在配置里的多个地方，以确保所有的部分都能正常工作在一起。
:::

### chainWebpack （Advanced)

TODO

### 查看内部 webpack 配置

因为 topfeed-cli 内置了 webpack 的配置，如果你想要查看内部 webpack 的配置，可以通过 DEBUG 进行查看内部命令启动是的 webpack 配置

```bash
DEBUG=topfeed npx topfeed dev --target ssr
```
