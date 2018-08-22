# 路由和代码分割

## 使用 `@reach/router` 的路由

你可能已经注意到，我们的服务器代码使用了一个 `*` 处理程序，它接受任意 URL。这允许我们将访问的 URL 传递到我们的 React 应用程序中，然后对客户端和服务器复用相同的路由配置！

为此，建议使用 `@reach/router`。我们首先创建一个文件，在其中创建 router。

```js
// entry/spa/routers.tsx
import Feed from "components/feed";
import Story from "components/story";
export default [
  {
    name: "feed",
    path: "/spa/feed",
    component: Feed
  },
  {
    name: "story",
    path: "/spa/story",
    component: Story
  }
];
```

然后更新 `app.tsx`:

```js
// entry/spa/app.tsx
import * as React from "react";
import { Router, Link } from "@reach/router";
import Routers from "./routes";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Link to="/spa/feed" className="link-item">
          feed
        </Link>
        <Link to="/spa/story" className="link-item">
          story
        </Link>
        <Router>
          {Routers.map(({ name, path, component: Compoennt }) => {
            return <Compoennt key={name} path={path} />;
          })}
        </Router>
      </div>
    );
  }
}
```

现在我们需要在 `index.tsx` 中实现客户端和服务器端路由逻辑：我们通过**BROWSER**来区分 node 和 browser 打包的入口代码。

```js
import App from "./app";
import ReactDOM from "react-dom";
import React from "react";
import { ServerLocation } from "@reach/router";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import "./index.less";
export interface ContextProps {
  url: string;
}
const clientRender = () => {
  ReactDOM.hydrate(<App />, document.getElementById("root"));
};

const serverRender = (props: ContextProps) => {
  return (
    <ServerLocation url={props.url}>
      <App />
    </ServerLocation>
  );
};
export default (__BROWSER__ ? clientRender() : serverRender);
```

假设服务器 bundle 已经完成构建（请再次忽略现在的构建设置），服务器用法看起来如下：

```js
// server.js
import { isRedirect } from "@reach/router";
import * as ReactDOM from "react-dom/server";
import * as React from "react";
import App from "../public/node/spa_ssr";
import { Context } from "@topfeed/topfeed";
const render = {
  async main(ctx: Context) {
    try {
      const html = ReactDOM.renderToString(<App url={ctx.url} />);
      await ctx.render("spa", {
        page: "spa", // 对应前端入口页面
        html
      });
    } catch (err) {
      if (isRedirect(err)) {
        //如果是前端的页面跳转，那么服务端需进行对应跳转
        ctx.redirect(err.uri);
      } else {
        // render时报错
        ctx.throw(500, err.message);
      }
    }
  }
};
export default render;
```

## 代码分割

应用程序的代码分割或惰性加载，有助于减少浏览器在初始渲染中下载的资源体积，可以极大地改善大体积 bundle 的可交互时间(TTI - time-to-interactive)。这里的关键在于，对初始首屏而言，"只加载所需"。我们使用 react-loadable 实现代码分割。使用 react-loadable 后的路由配置示例。

```js
// entry/spa/router.js
import Loadable from "react-loadable";
import Loading from "components/loading";
export default [
  {
    name: "feed",
    path: "/spa/feed",
    component: Loadable({
      loader: () =>
        import(/* webpackPrefetch: true */ "containers/spa-ssr/feed"), // 对于非initial chunk进行prefetch，减小前端页面跳转白屏时间
      loading: Loading
    })
  },
  {
    name: "story",
    path: "/spa/story",
    component: Loadable({
      loader: () =>
        import(/* webpackPrefetch: true */ "containers/spa-ssr/story"),
      loading: Loading
    })
  }
];
```
