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
$ open localhoat:3333/spa_ssr # 一个单页的SSR页面，SPA + SSR + Prefetch
```

## 逐步构建

通常可以通上一节的方式，使用 topfeed-init 快速新建项目

### 初始化项目

### 编写 Controller

### 编写 Service

### 编写 Middleware

### 模板渲染

### 自定义配置文件
