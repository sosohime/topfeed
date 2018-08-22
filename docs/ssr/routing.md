# 路由和代码分割

## 使用 `@reach/router` 的路由

你可能已经注意到，我们的服务器代码使用了一个 `*` 处理程序，它接受任意 URL。这允许我们将访问的 URL 传递到我们的 React 应用程序中，然后对客户端和服务器复用相同的路由配置！

为此，建议使用 `@reach/router`。我们首先创建一个文件，在其中创建 router。

```js
// entry/spa/routers.tsx
import Loadable from "react-loadable";
import Loading from "components/loading";
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

现在我们需要在 `index.tsx` 中实现客户端和服务器端路由逻辑：

```js
import App from "./app";
import configureStore from "./models/configure";
import ReactDOM from "react-dom";
import React from "react";
import { ServerLocation } from "@reach/router";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
import "./index.less";
export interface ContextProps {
  initial_state: any;
  url: string;
}

const clientRender = () => {
  const initial_state = window.__INITIAL_STATE__;
  const store = configureStore(initial_state);
  ReactDOM.hydrate(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

const serverRender = (props: ContextProps) => {
  const store = configureStore(props.initial_state);
  return (
    <Provider store={store}>
      <ServerLocation url={props.url}>
        <App />
      </ServerLocation>
    </Provider>
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
    const initial_state = {
      locale: {
        locale: ctx.locale,
        messages: ctx.messages
      }
    };
    try {
      const html = ReactDOM.renderToString(
        <App initial_state={initial_state} />
      );
      await ctx.render("spa", {
        page: "spa_ssr",
        html,
        initial_state: JSON.stringify(initial_state)
      });
    } catch (err) {
      if (isRedirect(err)) {
        ctx.redirect(err.uri);
      } else {
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
import Loadable from "react-loadable";
import Loading from "components/loading";
export default [
  {
    name: "feed",
    path: "/spa/feed",
    component: Loadable({
      loader: () =>
        import(/* webpackPrefetch: true */ "containers/spa-ssr/feed"),
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
