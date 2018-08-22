# 数据预取和状态

## 数据预取存储容器(Data Store)

在服务器端渲染(SSR)期间，我们本质上是在渲染我们应用程序的"快照"，所以如果应用程序依赖于一些异步数据，**那么在开始渲染过程之前，需要先预取和解析好这些数据**。

另一个需要关注的问题是在客户端，在挂载(mount)到客户端应用程序之前，需要获取到与服务器端应用程序完全相同的数据 - 否则，客户端应用程序会因为使用与服务器端应用程序不同的状态，然后导致混合失败。

为了解决这个问题，获取的数据需要位于视图组件之外，即放置在专门的数据预取存储容器(data store)或"状态容器(state container)）"中。首先，在服务器端，我们可以在渲染之前预取数据，并将数据填充到 store 中。此外，我们将在 HTML 中序列化(serialize)和内联预置(inline)状态。这样，在挂载(mount)到客户端应用程序之前，可以直接从 store 获取到内联预置(inline)状态。

为此，我们将使用官方状态管理库 [Rematch](https://github.com/rematch/rematch)。我们先创建一个 `models` 文件夹，里面会增删改查 todoItem 的逻辑：

```js
// entry/universal/models/index.tsx
export * from "./todo_list"; //combineReducers
// entry/universal/models/todo_list.tsx
import { createModel } from "@rematch/core";

export interface TodoItem {
  todo: string;
  done: boolean;
}
export const todo_list = createModel({
  state: [
    // 状态
    {
      todo: "Learn Typescript",
      done: false
    },
    {
      todo: "Try immer",
      done: false
    }
  ],
  reducers: {
    // 同步action
    add(state: TodoItem[], payload: TodoItem) {
      state.push(payload);
    },
    delete(state: TodoItem[], payload: TodoItem) {
      const idx = state.findIndex(item => item.todo === payload.todo);
      if (idx !== -1) {
        state.splice(idx, 1);
      }
      return state;
    },
    toggle(state: TodoItem[], payload: TodoItem) {
      for (const item of state) {
        if (item.todo === payload.todo) {
          item.done = !item.done;
        }
      }
      return state;
    }
  },
  effects: (dispatch: any) => ({
    // 异步action
    async delay_delete(payload: TodoItem) {
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      dispatch.todo_list.delete(payload);
    }
  })
});
```

创建通用 entry

```js
// universal/entry/universal/app.js
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

browser 和 server 公用入口

```js
// universal/entry/universal/index.js
import App from "./app";
import configureStore from "./models/configure";
import ReactDOM from "react-dom";
import React from "react";
import { ServerLocation } from "@reach/router";
import Loadable from "react-loadable";
import { Provider } from "react-redux";
export interface ContextProps {
  initial_state: any;
  url: string;
}

const clientRender = () => {
  const initial_state = window.__INITIAL_STATE__;
  const store = configureStore(initial_state);
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <Provider store={store}>
        <App />
      </Provider>,
      document.getElementById("root")
    );
  });
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

## 带有逻辑配置的组件(Logic Collocation with Components)

::: tip @reach/router 暂时好像不支持 matchRoute 操作，没有办法根据当前 url 获取到匹配的 route 组件，待支持后可以在 route 组件上暴露出一个自定义静态函数`asyncData`。注意，由于此函数会在组件实例化之前调用，所以无法访问`this`。暂时将数据预取逻辑完全放在服务端 :::

## 服务器端数据预取(Server Data Fetching)

:::tip 受限于@reach/router 对于 matchRoute 操作的支持，暂时没有办法根据当前 rul 自动执行匹配路由组件的 asynData 操作，故暂时完全在服务端做数据预取逻辑 :::

```js
// server/controller/universalController.ts
import { isRedirect } from "@reach/router";
import * as ReactDOM from "react-dom/server";
import * as React from "react";
import prefetch from "lib/prefetch";
import { Context } from "@topfeed/topfeed";
import App from "../public/node/universal";
const render = {
  async main(ctx: Context) {
    //
    const prefetch_data = prefetch(ctx.url); // 暂时在服务端根据url预取组件所需的初始化状态
    const initial_state = {
      locale: {
        locale: ctx.locale,
        messages: ctx.messages
      },
      prefetch_data: prefetch_data
    };
    try {
      await ctx.render("spa", {
        page: "spa_ssr",
        html,
        initial_state
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

通过调用`render('spa',{inital_state})`我们可以在模板上将服务端生成的`initial_state`，作为`window.__INITIAL_STATE__`状态,手动注入到模板中。而在客户端中，在挂载到应用程序之前，store 就应该能获取到状态: 模板注入`window.__INITIAL_STATE__`

```html
<head>
	{{renderStyles()}}
</head>
<body>
  <div id="root">
	 {{html|safe}}
	</div>
	<script>
	  {{renderState()}} // 注入initial_state状态
	</script>
	{{renderScripts()}}
</body>
```

## 客户端数据预取(Client Data Fetching)

在客户端，处理数据预取有两种不同方式：

1. **在路由导航之前解析数据：**

使用此策略，应用程序会等待视图所需数据全部解析之后，再传入数据并处理当前视图。好处在于，可以直接在数据准备就绪时，传入视图渲染完整内容，但是如果数据预取需要很长时间，用户在当前视图会感受到"明显卡顿"。因此，如果使用此策略，建议提供一个数据加载指示器(data loading indicator)。且渲染的内容和用户数据没有关联，因此可以更好地将服务端渲染的内容进行缓存。 ::: tip 待支持 matchRoute 后，我们可以通过检查匹配的组件，并在全局路由钩子函数中执行 `asyncData` 函数，来在客户端实现此策略。注意，在初始路由准备就绪之后，我们应该注册此钩子，这样我们就不必再次获取服务器提取的数据。 :::

2. **匹配要渲染的视图后，再获取数据：**

此策略将客户端数据预取逻辑，放在视图组件的 `componentDidMount` 函数中。当路由导航被触发时，可以立即切换视图，因此应用程序具有更快的响应速度。然而，传入视图在渲染时不会有完整的可用数据。因此，对于使用此策略的每个视图组件，都需要具有条件加载状态。

这两种策略是根本上不同的用户体验决策，应该根据你创建的应用程序的实际使用场景进行挑选。但是无论你选择哪种策略，当路由组件重用（同一路由，但是 params 或 query 已更改，例如，从 `user/1` 到 `user/2`）时，也应该调用 `asyncData` 函数。我们也可以通过纯客户端(client-only)的全局 mixin 来处理这个问题： ::: tip 后续可以在每个路由组件上自定义钩子，在路由切换时自动调用更新 redux 的状态 :::

## Store 代码拆分(Store Code Splitting)

TODO ::: tip 在大型应用程序中，我们的 Redux store 可能会分为多个模块。当然，也可以将这些模块代码，分割到相应的路由组件 chunk 中。假设我们有以下 store 模块：

由于模块现在是路由组件的依赖，所以它将被 webpack 移动到路由组件的异步 chunk 中。 :::
