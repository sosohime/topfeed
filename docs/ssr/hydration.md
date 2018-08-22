# 客户端注水(client-side hydration)

所谓客户端激活，指的是 React 在浏览器端接管由服务端发送的静态 HTML，使其变为由 React 管理的动态 DOM 的过程。

在 `entry/ssr/index.tsx` 中，我们用下面这行挂载(mount)应用程序：

```js
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
```

由于服务器已经渲染好了 HTML，我们显然无需将其丢弃再重新创建所有的 DOM 元素。相反，我们需要"注水"这些静态的 HTML，然后使他们成为动态的（能够响应后续的数据变化）。

如果你检查服务器渲染的输出结果，你会注意到应用程序的根元素上添加了一个特殊的属性：

```html
<div id="app" data-reactroot>
</div>
```

`data-reactroot` 特殊属性，让客户端 React 知道这部分 HTML 是由 React 在服务端渲染的，并且应该以激活模式进行挂载。

```js
// 强制使用应用程序的激活模式
app.$mount("#app", true);
```

在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树(virtual DOM tree)，是否与从服务器渲染的 DOM 结构(DOM structure)匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。**在生产模式下，此检测会被跳过，以避免性能损耗。**

### 一些需要注意的坑

使用「SSR + 客户端混合」时，需要了解的一件事是，React16 之后客户端和服务端渲染不一致的情况下，不再使用客户端渲染的内容，而是直接在服务端上进行 hydrate，因此可能导致 hydrate 错误，因此务必确保服务端和客户端渲染内容一致，如果要渲染不一致的内容，需要将逻辑放在`componentDidMount`之后操作。
