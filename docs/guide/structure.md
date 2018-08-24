# 目录结构

我们简单了解目录约定规范

```bash
topfeed-project
├── README.md
├── client
│   ├── assets // 静态资源
│   │   ├── fonts // 字体，根据topfeed buildfont生成
│   │   └── svg // 字体对应的svg
│   ├── components // 业务组件
│   │   ├── avatar
│   │   ├── layout
│   ├── constants // 业务常量
│   │   ├── api
│   ├── containers // 页面container
│   │   ├── simple
│   │   ├── ssr
│   │   ├── spa-ssr
│   │   │   ├── feed (子页面)
│   │   │   └── story（子页面）
│   ├── entry
│   │   ├── simple (简单页面)
│   │   └── spa-ssr
│   │       ├── app.tsx // 通用 entry(universal entry)
│   │       ├── index.less // 页面相关样式
│   │       ├── index.tsx // client和server的入口文件(内部区分browser和server)
│   │       ├── models // redux的model
│   │           ├── configure.tsx redux的configstore
│   │           ├── index.tsx 所有的model组合
│   │           ├── detail.tsx 子页面detail对应的reducer/action/state
│   │           └── feed.tsx   子页面feed对应的reducer/action/state
│   │       └── routes.tsx // 单页路由
│   ├── lib (公用的库)
│   ├── models （所有页面公用的reducer)
│   │   ├── locale.tsx
│   │   └── user_info.tsx
│   ├── plugins (自定义的babel和webpack的插件)
│   │   ├── babel-preset-topfeed
│   │   └── extract-keys-webpack-plugin
│   ├── scripts (前端使用的脚本)
│   │   └── get_entry.js （获取webpack入口脚本)
│   ├── style (所有页面公用的主题样式)
│   │   ├── common.less
│   │   └── theme
│   ├── tsconfig.json
│   ├── typings (前端的业务相关ts定义)
│   └── ui (业务无关的ui组件)
├── nginx (本地和生产环境nginx配置)
├── server （node层代码）
│   ├── app.ts （部署运维相关代码)
│   ├── config （node相关配置）
│   ├── constants （node层业务常量)
│   ├── controller
│   │   ├── aboutController.ts (render相关controller)
│   │   ├── api （api相关controller)
│   │   │   └── userController.ts
│   │   └── studioController.ts
│   ├── lib （node 公共lib)
│   ├── locales (i18n的所有语言)
│   ├── middleware (公共中间件)
│   ├── public
│   │   ├── browser // webpack target=browser生成的代码
│   │   └── node // webpack target=node 生成的代码
│   ├── router (node层 router)
│   ├── server.ts (server业务逻辑代码)
│   ├── service (访问后端api层的请求服务)
│   ├── tsconfig.json (node层ts配置)
│   ├── typings （node层业务ts定义)
│   └── view (模板)
│       ├── base (公共模板)
│       │   ├── common_header.njk
│       │   ├── simple_layout.njk
│       ├── error.njk
│       ├── feed.njk
└── topfeed.config.js (项目全局配置)
```

- `client/assets` 前端静态资源目录,fonts 用于存放自动生成的字体，svg 用于存放对应 fonts 的 svg 文件
- `client/components` 前端业务组件
- `client/constants` 前端业务常量
- `client/containers` 前端子页面组件
- `client/entry` 前端每个 webpack 的 entry 入口文件
- `client/lib` 前端公共的库
- `client/models` 多个 entry 公用的 models
- `client/plugins` 前端的 webpack 或者 babel 的插件
- `client/scripts` 前端的脚本文件
- `client/style` 所有页面公用的主题样式
- `client/typings` 前端的业务相关 ts 定义
- `client/ui` 前端的与业务无关的 UI 组件
- `server/router` 用于配置 URL 路由规则
- `server/controller**` 用于解析用户的输入，处理后返回相应的结果
- `server/service/**` 用于编写业务层逻辑
- `server/middleware/**` 用于编写中间件
- `server/public/**` 用于存放前端的编译产出文件
- `server/config/*` 用于存放不同环境的配置文件
- `server/server.ts` 用于存放服务端业务入口代码
- `server/app.ts` 服务端入口代码，可以存放运维部署相关的逻辑
- `server/view` 用于存放服务端模板
- `server/static` 服务端静态资源目录
- `server/locales` 所有语言的 i18n 文案翻译
- `server/typings` 服务端业务 ts 定义
- `server/lib` 服务端公共 lib
- `server/constants` 服务端公共常量
- `server/modle` 数据库相关的领域模型(可选)
