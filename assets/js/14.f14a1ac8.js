(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{166:function(t,n,s){"use strict";s.r(n);var e=s(0),a=Object(e.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"目录结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#目录结构","aria-hidden":"true"}},[t._v("#")]),t._v(" 目录结构")]),t._v(" "),s("p",[t._v("我们简单了解目录约定规范")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("topfeed-project\n├── README.md\n├── client\n│   ├── assets // 静态资源\n│   │   ├── fonts // 字体，根据topfeed buildfont生成\n│   │   └── svg // 字体对应的svg\n│   ├── components // 业务组件\n│   │   ├── avatar\n│   │   ├── layout\n│   ├── constants // 业务常量\n│   │   ├── api\n│   ├── containers // 页面container\n│   │   ├── simple\n│   │   ├── ssr\n│   │   ├── spa-ssr\n│   │   │   ├── feed "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("子页面"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   │   └── story（子页面）\n│   ├── entry\n│   │   ├── simple "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("简单页面"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   └── spa-ssr\n│   │       ├── app.tsx // 通用 entry"),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("universal entry"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │       ├── index.less // 页面相关样式\n│   │       ├── index.tsx // client和server的入口文件"),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("内部区分browser和server"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │       ├── models // redux的model\n│   │           ├── configure.tsx redux的configstore\n│   │           ├── index.tsx 所有的model组合\n│   │           ├── detail.tsx 子页面detail对应的reducer/action/state\n│   │           └── feed.tsx   子页面feed对应的reducer/action/state\n│   │       └── routes.tsx // 单页路由\n│   ├── lib "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公用的库"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── models （所有页面公用的reducer"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── locale.tsx\n│   │   └── user_info.tsx\n│   ├── plugins "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("自定义的babel和webpack的插件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── babel-preset-topfeed\n│   │   └── extract-keys-webpack-plugin\n│   ├── scripts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("前端使用的脚本"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   └── get_entry.js （获取webpack入口脚本"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── style "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("所有页面公用的主题样式"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── common.less\n│   │   └── theme\n│   ├── tsconfig.json\n│   ├── typings "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("前端的业务相关ts定义"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   └── ui "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("业务无关的ui组件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n├── nginx "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("本地和生产环境nginx配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n├── server （node层代码）\n│   ├── app.ts （部署运维相关代码"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── config （node相关配置）\n│   ├── constants （node层业务常量"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── controller\n│   │   ├── aboutController.ts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("render相关controller"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── api （api相关controller"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   │   └── userController.ts\n│   │   └── studioController.ts\n│   ├── lib （node 公共lib"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── locales "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i18n的所有语言"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── middleware "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公共中间件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── public\n│   │   ├── browser // webpack target"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("browser生成的代码\n│   │   └── node // webpack target"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("node 生成的代码\n│   ├── router "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node层 router"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── server.ts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("server业务逻辑代码"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── "),s("span",{attrs:{class:"token function"}},[t._v("service")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("访问后端api层的请求服务"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── tsconfig.json "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node层ts配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── typings （node层业务ts定义"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   └── view "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("模板"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│       ├── base "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公共模板"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│       │   ├── common_header.njk\n│       │   ├── simple_layout.njk\n│       ├── error.njk\n│       ├── feed.njk\n└── topfeed.config.js "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("项目全局配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])]),s("ul",[s("li",[s("code",[t._v("client/assets")]),t._v(" 前端静态资源目录,fonts 用于存放自动生成的字体，svg 用于存放对应 fonts 的 svg 文件")]),t._v(" "),s("li",[s("code",[t._v("client/components")]),t._v(" 前端业务组件")]),t._v(" "),s("li",[s("code",[t._v("client/constants")]),t._v(" 前端业务常量")]),t._v(" "),s("li",[s("code",[t._v("client/containers")]),t._v(" 前端子页面组件")]),t._v(" "),s("li",[s("code",[t._v("client/entry")]),t._v(" 前端每个 webpack 的 entry 入口文件")]),t._v(" "),s("li",[s("code",[t._v("client/lib")]),t._v(" 前端公共的库")]),t._v(" "),s("li",[s("code",[t._v("client/models")]),t._v(" 多个 entry 公用的 models")]),t._v(" "),s("li",[s("code",[t._v("client/plugins")]),t._v(" 前端的 webpack 或者 babel 的插件")]),t._v(" "),s("li",[s("code",[t._v("client/scripts")]),t._v(" 前端的脚本文件")]),t._v(" "),s("li",[s("code",[t._v("client/style")]),t._v(" 所有页面公用的主题样式")]),t._v(" "),s("li",[s("code",[t._v("client/stypigns")]),t._v(" 前端的业务相关 ts 定义")]),t._v(" "),s("li",[s("code",[t._v("client/ui")]),t._v(" 前端的与业务无关的 UI 组件")]),t._v(" "),s("li",[s("code",[t._v("server/router")]),t._v(" 用于配置 URL 路由规则")]),t._v(" "),s("li",[s("code",[t._v("server/controller**")]),t._v(" 用于解析用户的输入，处理后返回相应的结果")]),t._v(" "),s("li",[s("code",[t._v("server/service/**")]),t._v(" 用于编写业务层逻辑")]),t._v(" "),s("li",[s("code",[t._v("server/middleware/**")]),t._v(" 用于编写中间件")]),t._v(" "),s("li",[s("code",[t._v("server/public/**")]),t._v(" 用于存放前端的编译产出文件")]),t._v(" "),s("li",[s("code",[t._v("server/config/*")]),t._v(" 用于存放不同环境的配置文件")]),t._v(" "),s("li",[s("code",[t._v("server/server.ts")]),t._v(" 用于存放服务端业务入口代码")]),t._v(" "),s("li",[s("code",[t._v("server/app.ts")]),t._v(" 服务端入口代码，可以存放运维部署相关的逻辑")]),t._v(" "),s("li",[s("code",[t._v("server/view")]),t._v(" 用于存放服务端模板")]),t._v(" "),s("li",[s("code",[t._v("server/static")]),t._v(" 服务端静态资源目录")]),t._v(" "),s("li",[s("code",[t._v("server/locales")]),t._v(" 所有语言的 i18n 文案翻译")]),t._v(" "),s("li",[s("code",[t._v("server/typings")]),t._v(" 服务端业务 ts 定义")]),t._v(" "),s("li",[s("code",[t._v("server/lib")]),t._v(" 服务端公共 lib")]),t._v(" "),s("li",[s("code",[t._v("server/constants")]),t._v(" 服务端公共常量")]),t._v(" "),s("li",[s("code",[t._v("server/modle")]),t._v(" 数据库相关的领域模型(可选)")])])])}],!1,null,null,null);a.options.__file="structure.md";n.default=a.exports}}]);