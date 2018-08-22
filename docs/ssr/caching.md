# 缓存和降级

虽然 React 的服务器端渲染(SSR)相当快速，但是由于创建组件实例和虚拟 DOM 节点的开销，无法与纯基于字符串拼接(pure string-based)的模板的性能相当。在 SSR 性能至关重要的情况下，明智地利用缓存策略，可以极大改善响应时间并减少服务器负载。

## 页面级别缓存(Page-level Caching)

在大多数情况下，服务器渲染的应用程序依赖于外部数据，因此本质上页面内容是动态的，不能持续长时间缓存。然而，如果内容不是用户特定(user-specific)（即对于相同的 URL，总是为所有用户渲染相同的内容），我们可以利用名为 [micro-caching](https://www.nginx.com/blog/benefits-of-microcaching-nginx/) 的缓存策略，来大幅度提高应用程序处理高流量的能力。

这通常在 Nginx 层完成，但是我们也可以在 Node.js 中实现它：

```js
const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
});

const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定(non-user-specific)页面才会缓存
};

server.get("*", (req, res) => {
  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      return res.end(hit);
    }
  }

  renderer.renderToString((err, html) => {
    res.end(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
  });
});
```

由于内容缓存只有一秒钟，用户将无法查看过期的内容。然而，这意味着，对于每个要缓存的页面，服务器最多只能每秒执行一次完整渲染。

## 组件级别缓存(Component-level Caching)

Todo ::: tip 暂时不支持，需要评估其实现复杂度和收益 :::

## SSR 降级

在高 qps 下，服务端渲染可能成为服务端瓶颈，需要考虑在高 qps 下 SSR 的降级策略
