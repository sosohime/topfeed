(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{165:function(t,n,s){"use strict";s.r(n);var a=s(0),e=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"目录结构"}},[t._v("目录结构")]),t._v(" "),s("p",[t._v("我们简单了解目录约定规范")]),t._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[t._v("topfeed-project\n├── README.md\n├── client\n│   ├── assets // 静态资源\n│   │   ├── fonts // 字体，根据topfeed buildfont生成\n│   │   └── svg // 字体对应的svg\n│   ├── components // 业务组件\n│   │   ├── avatar\n│   │   ├── layout\n│   ├── constants // 业务常量\n│   │   ├── api\n│   ├── containers // 页面container\n│   │   ├── simple\n│   │   ├── ssr\n│   │   ├── spa-ssr\n│   │   │   ├── feed "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("子页面"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   │   └── story（子页面）\n│   ├── entry\n│   │   ├── simple "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("简单页面"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   └── spa-ssr\n│   │       ├── app.tsx // 通用 entry"),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("universal entry"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │       ├── index.less // 页面相关样式\n│   │       ├── index.tsx // client和server的入口文件"),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("内部区分browser和server"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │       ├── models // redux的model\n│   │           ├── configure.tsx redux的configstore\n│   │           ├── index.tsx 所有的model组合\n│   │           ├── detail.tsx 子页面detail对应的reducer/action/state\n│   │           └── feed.tsx   子页面feed对应的reducer/action/state\n│   │       └── routes.tsx // 单页路由\n│   ├── lib "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公用的库"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── models （所有页面公用的reducer"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── locale.tsx\n│   │   └── user_info.tsx\n│   ├── plugins "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("自定义的babel和webpack的插件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── babel-preset-topfeed\n│   │   └── extract-keys-webpack-plugin\n│   ├── scripts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("前端使用的脚本"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   └── get_entry.js （获取webpack入口脚本"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── style "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("所有页面公用的主题样式"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── common.less\n│   │   └── theme\n│   ├── tsconfig.json\n│   ├── typings "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("前端的业务相关ts定义"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   └── ui "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("业务无关的ui组件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n├── nginx "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("本地和生产环境nginx配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n├── server （node层代码）\n│   ├── app.ts （部署运维相关代码"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── config （node相关配置）\n│   ├── constants （node层业务常量"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── controller\n│   │   ├── aboutController.ts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("render相关controller"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   ├── api （api相关controller"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   │   │   └── userController.ts\n│   │   └── studioController.ts\n│   ├── lib （node 公共lib"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── locales "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("i18n的所有语言"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── middleware "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公共中间件"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── public\n│   │   ├── browser // webpack target"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("browser生成的代码\n│   │   └── node // webpack target"),s("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v("node 生成的代码\n│   ├── router "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node层 router"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── server.ts "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("server业务逻辑代码"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── "),s("span",{attrs:{class:"token function"}},[t._v("service")]),t._v(" "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("访问后端api层的请求服务"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── tsconfig.json "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("node层ts配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   ├── typings （node层业务ts定义"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│   └── view "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("模板"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│       ├── base "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("公共模板"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n│       │   ├── common_header.njk\n│       │   ├── simple_layout.njk\n│       ├── error.njk\n│       ├── feed.njk\n└── topfeed.config.js "),s("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("项目全局配置"),s("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])])])])}],!1,null,null,null);e.options.__file="structure.md";n.default=e.exports}}]);