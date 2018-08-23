(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{163:function(t,s,a){"use strict";a.r(s);var n=a(0),o=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[a("h1",{attrs:{id:"i18n-l10n-流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#i18n-l10n-流程","aria-hidden":"true"}},[t._v("#")]),t._v(" i18n && L10n 流程")]),t._v(" "),a("p",[t._v("Topfeed 使用 react-intl-universal 来处理 I18n && L10n，其整个接入流程如下,")]),t._v(" "),a("h4",{attrs:{id:"_1-server-端通过-locale-中间件，根据用户的-locale-信息，按照-locale-过滤选取所需语言的文案，将文案挂载到-context-messsage-和将-locale-信息挂载到-context-locale-中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-server-端通过-locale-中间件，根据用户的-locale-信息，按照-locale-过滤选取所需语言的文案，将文案挂载到-context-messsage-和将-locale-信息挂载到-context-locale-中","aria-hidden":"true"}},[t._v("#")]),t._v(" 1.server 端通过 locale 中间件，根据用户的 locale 信息，按照 locale 过滤选取所需语言的文案，将文案挂载到 context.messsage 和将 locale 信息挂载到 context.locale 中")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// locale/en.json")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"sign"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"sign"')]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// locale/zh.json")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token string"}},[t._v('"sign"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"登录"')]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// server.ts")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" langs "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"./locale"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// langs = {en: {sign:'sign'}, zh: {sign:'登录'}}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" locale "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"@topfeed/topfeed"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\napp"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("use")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t"),a("span",{attrs:{class:"token function"}},[t._v("locale")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tmessages"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" langs\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token comment"}},[t._v("// 如果是用户是en，那么 ctx.locale = 'zh' && ctx.messages = {sign:'登录'}")]),t._v("\n")])])]),a("h4",{attrs:{id:"_2-将用户的-locale-和-messages-传入页面的-initial-state-中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-将用户的-locale-和-messages-传入页面的-initial-state-中","aria-hidden":"true"}},[t._v("#")]),t._v(" 2. 将用户的 locale 和 messages 传入页面的 initial_state 中")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token comment"}},[t._v("// feedCtroller.ts")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("main")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ctx"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("next"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" init_state "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      i18n"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v("ctx"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        messages"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ctx"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("messages\n      "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{attrs:{class:"token keyword"}},[t._v("await")]),t._v(" ctx"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v("'feed'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      page"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v("'feed'")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      initial_state\n    "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"_3-将用户的-initial-state-注入到模板"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-将用户的-initial-state-注入到模板","aria-hidden":"true"}},[t._v("#")]),t._v(" 3. 将用户的 initial_state 注入到模板")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("head")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t{{renderStyles()}}\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("head")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("<")]),t._v("div")]),t._v(" "),a("span",{attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{attrs:{class:"token attr-value"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v('"')]),t._v("root"),a("span",{attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\t {{html|safe}}\n\t"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("div")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  {{renderState()}}\n  "),a("span",{attrs:{class:"token comment"}},[t._v("\x3c!--\n    这里将上部的initial_state赋值给了window.__INITIAL_STATE__ ,\n    此时window.__INITIAL_STATE__ = { locale: 'zh', message: { sign: '登录'}}}\n  --\x3e")]),t._v("\n\t{{renderScripts()}}\n"),a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token tag"}},[a("span",{attrs:{class:"token punctuation"}},[t._v("</")]),t._v("body")]),a("span",{attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h4",{attrs:{id:"_5-entry-入口处通过客户端通过-window-initial-state初始化-store，服务端通过-props-来初始-store"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5-entry-入口处通过客户端通过-window-initial-state初始化-store，服务端通过-props-来初始-store","aria-hidden":"true"}},[t._v("#")]),t._v(" 5. entry 入口处通过客户端通过 window."),a("strong",[t._v("INITIAL_STATE")]),t._v("初始化 store，服务端通过 props 来初始 store")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("clientRender")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" initial_state "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" window"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("__INITIAL_STATE__"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" store "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("configureStore")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("initial_state"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tReactDOM"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("hydrate")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("Provider store"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("store"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("App "),a("span",{attrs:{class:"token operator"}},[t._v("/")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("Provider"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tdocument"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("getElementById")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"root"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("serverRender")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" ContextProps"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" store "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("configureStore")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("initial_state"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("Provider store"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("store"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("App "),a("span",{attrs:{class:"token operator"}},[t._v("/")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("Provider"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("__BROWSER__ "),a("span",{attrs:{class:"token operator"}},[t._v("?")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("clientRender")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" serverRender"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_6-在-page-组件中初始化前端的-i18n-和-l10n-信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_6-在-page-组件中初始化前端的-i18n-和-l10n-信息","aria-hidden":"true"}},[t._v("#")]),t._v(" 6. 在 Page 组件中初始化前端的 i18n 和 L10n 信息")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" React "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" intl "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react-intl-universal"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" IntlPolyfill "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"intl"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nglobal"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Intl "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" IntlPolyfill"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" connect "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react-redux"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"intl/locale-data/jsonp/en.js"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("//处理货币，日期等本地化信息")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"intl/locale-data/jsonp/zh.js"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("interface")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("PageProps")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tlocale"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" string"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tmessages"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("key"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" string"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" string "),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Page")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("React"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Component")]),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("PageProps"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token function"}},[t._v("constructor")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" PageProps"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("super")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" currentLocale "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t\tintl"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("init")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\tcurrentLocale"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\t\tlocales"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t\t\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("[")]),t._v("currentLocale"),a("span",{attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("messages\n\t\t\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{attrs:{class:"token comment"}},[t._v("// 使用node下发的locale和messages来初始化intl")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\t"),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("props"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("children"),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("mapState")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("state"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" any"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tmessages"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" state"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("messages"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\t\tlocale"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" state"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{attrs:{class:"token function-variable function"}},[t._v("mapDispatch")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("state"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" any"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tupdate_locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" state"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("locale"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("update_locale\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token function"}},[t._v("connect")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\tmapState"),a("span",{attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\tmapDispatch\n"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Page"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("h4",{attrs:{id:"_7-每个-entry-都需要包裹在-page-组件里，保证-intl-的初始化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_7-每个-entry-都需要包裹在-page-组件里，保证-intl-的初始化","aria-hidden":"true"}},[t._v("#")]),t._v(" 7.每个 entry 都需要包裹在 Page 组件里，保证 intl 的初始化")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("*")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("as")]),t._v(" React "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Page "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"components/page"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Feed "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"container/feed"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("App")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("React"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Component")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("Page"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("Feed "),a("span",{attrs:{class:"token operator"}},[t._v("/")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("Page"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\t\t"),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("h4",{attrs:{id:"_8-在组件里就可以通过-intl-来使用文案了"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_8-在组件里就可以通过-intl-来使用文案了","aria-hidden":"true"}},[t._v("#")]),t._v(" 8.在组件里就可以通过 intl 来使用文案了")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{attrs:{class:"token keyword"}},[t._v("import")]),t._v(" intl "),a("span",{attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{attrs:{class:"token string"}},[t._v('"react-intl-universal"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("class")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("Feed")]),t._v(" "),a("span",{attrs:{class:"token keyword"}},[t._v("extends")]),t._v(" "),a("span",{attrs:{class:"token class-name"}},[t._v("React")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t"),a("span",{attrs:{class:"token function-variable function"}},[t._v("handleClick")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\tconsole"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token function"}},[t._v("log")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),t._v("intl"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token keyword"}},[t._v("get")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"sign"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token function"}},[t._v("render")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\t\t"),a("span",{attrs:{class:"token operator"}},[t._v("<")]),t._v("div onClick"),a("span",{attrs:{class:"token operator"}},[t._v("=")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{attrs:{class:"token keyword"}},[t._v("this")]),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),t._v("handlClick"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token operator"}},[t._v(">")]),a("span",{attrs:{class:"token punctuation"}},[t._v("{")]),t._v("intl"),a("span",{attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{attrs:{class:"token keyword"}},[t._v("get")]),a("span",{attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{attrs:{class:"token string"}},[t._v('"sign"')]),a("span",{attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{attrs:{class:"token operator"}},[t._v("<")]),a("span",{attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),a("span",{attrs:{class:"token operator"}},[t._v(">")]),a("span",{attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\t"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])])}],!1,null,null,null);o.options.__file="i18n.md";s.default=o.exports}}]);