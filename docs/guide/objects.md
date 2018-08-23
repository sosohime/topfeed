# 扩展对象

Topfeed 对 Koa 的原生对象进行了一些扩展

### Application

`Application` 是全局应用对象，在一个应用中，只会实例化一个，它继承自 `Koa.Application`，在它上面我们可以挂载一些全局的方法和对象。我们可以轻松的在插件或者应用中扩展 `Application` 对象。

#### 框架扩展

框架会将一些属性自动挂载到 Context 实例上以便应用使用。

- `config`: 全局配置
- `root`: server 项目根目录

#### 业务扩展

为了控制业务的扩展，收敛所有的扩展逻辑，用户在扩展 Application 时需要在 typings 里声明 Application 的扩展，
否则 ts 检查会报错。
扩展方式如下

```ts
```

### Context

Context 是一个请求级别的对象，继承自 Koa.Context。在每一次用户收到请求时，框架会实例化一个 Context 对象，
这个对象封装了这次用户请求的信息，并提供了许多便捷的方法来获取请求参数或设置响应信息。框架会将一些属性自动挂载
到 Context 实例上以方便应用使用。

#### 框架扩展

- `locale`: 用户语言和地区信息，格式为`zh-cn`,`en-us`,`en`之类
- `messages`: 用户语言对应的文案格式为 `{"sign": "登录" }`
- `service`: service 自动挂载
- `render`: 模板渲染

#### 业务扩展

为了控制业务的扩展，收敛所有的扩展逻辑，用户在扩展 Application 时需要在 typings 里声明 Application 的扩展，
否则 ts 检查会报错。

```ts
```
