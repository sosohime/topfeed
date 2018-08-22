# 编写通用代码

在进一步介绍之前，让我们花点时间来讨论编写"通用"代码时的约束条件 - 即运行在服务器和客户端的代码。由于用例和平台 API 的差异，当运行在不同环境中时，我们的代码将不会完全相同。所以这里我们将会阐述你需要理解的关键事项。

## 服务器和浏览器的差异

服务器和浏览器的差异主要如下：

1. 每个用户的浏览器实例是互相独立的，这使得在不同用户的浏览器全局环境不会互相污染，每个用户的服务器却是共享的，因此全局环境存在相互污染的可能，因此要求服务器环境下的 global 是只读的，否则可能因为用户之间的环境污染导致出错，且 global 的环境下不应该存放任何与用户相关的信息。
2. 服务器的是长期运行的，浏览器通常打开的时间不会太长，因此开发者编写代码时常常忽视对内存的回收，服务器随着用户的增加和时间的累计，导致泄漏的内存很快会累计导致服务器难以承受，因此编写通用代码时需要注意对内存的回收

## 组件生命周期钩子函数

由于没有动态更新，所有的生命周期钩子函数中，只有 `constructor`和`componentWillMount` 和 `render` 会在服务器端渲染(SSR)过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 `componentDidMount` 或 `componentWillUnmount`），只会在客户端执行。

此外还需要注意的是，你应该避免在`constructor`和 `componentWillMount` 和 `render` 生命周期时产生全局副作用的代码，例如在其中使用 `setInterval` 设置 timer。在纯客户端(client-side only)的代码中，我们可以设置一个 timer，然后在 `componentWillUnmount` 生命周期时将其销毁。但是，由于在 SSR 期间并不会调用销毁钩子函数，所以 timer 将永远保留下来。为了避免这种情况，请将副作用代码移动到 `componentDidMount`。

## 访问特定平台(Platform-Specific) API

通用代码不可接受特定平台的 API，因此如果你的代码中，直接使用了像 `window` 或 `document`，这种仅浏览器可用的全局变量，则会在 Node.js 中执行时抛出错误，反之也是如此。

对于共享于服务器和客户端，但用于不同平台 API 的任务(task)，建议将平台特定实现包含在通用 API 中，或者使用为你执行此操作的 library。例如，[axios](https://github.com/axios/axios) 是一个 HTTP 客户端，可以向服务器和客户端都暴露相同的 API。

对于仅浏览器可用的 API，通常方式是，1.在「纯客户端(client-only)」的生命周期钩子函数中惰性访问(lazily access)它们。

请注意，考虑到如果第三方 library 不是以上面的通用用法编写，则将其集成到服务器渲染的应用程序中，可能会很棘手。你*可能*要通过模拟(mock)一些全局变量来使其正常运行（如可以通过 jsdom 来 mock 浏览器的 dom 对象，进行 html 解析），但这只是 hack 的做法，并且可能会干扰到其他 library 的环境检测代码。

## 使用 webpack 控制代码只在客户端/浏览器执行

相比于在运行时区分客户端代码和服务端代码，编译时区分是更好的办法，借助于 webpack 的 definePlugin，我们可以在编译期间控制代码只运行在客户端或者服务端。

```js
if (__BROWSER__) {
  // node的bundle不包含该代码
  window.location = "xxx";
}
if (__NODE__) {
  // browser的bundle不包含该代码
  const file = fs.readFileSync("./config");
}
```

```js
// webpack.config.node.js
module.exports = {
  ...
  plugins: [
     new webpack.DefinePlugin({
      __BROWSER__: false,
      __NODE__: true
    })
  ]
  ...
}
```

```js
// webpack.config.browser.js
module.exports = {
  ...
  plugins: [
     new webpack.DefinePlugin({
      __BROWSER__: true,
      __NODE__: false
    }),
  ]
  ...
}
```
