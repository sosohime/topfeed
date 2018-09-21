# topfeed-cli

为了方便开发者开发，我们提供了一系列命令来简化日常的开发和使用

# dev

开发调试应用

```sh
$ topfeed dev --target browser # 启动前端的browser bundle 代码
$ topfeed dev --target node # 启动前端的node bunlde 代码
$ topfeed dev --target ssr # 同时启动前端的node和browser bundle代码，ssr时使用
```

# build

编译打包应用程序

```sh
$ topfeed build --env production --target browser # 生产环境下打包前端browser代码
$ topfeed build --env development --target browser # 开发环境下打包前端browser代码
```

# init

使用脚手架初始化应用

```js
$ topfeed init topfeed-example --type=simple # 使用simple 脚手架初始化应用
```

# font

将 svg 问题打包为 icon 字体

```sh
$ topfeed font build # 编译打包字体
$ topfeed font view # 预览打包好的icon字体
```

# i18n

从远程仓库下载国际化文案

```sh
$ topfeed i18n download
```

# generate

TODO
自动创建页面(单页|SSR|单页 SSR)/组件级别代码

# mock

TODO
接入 mock 服务
