# 调试指南

### 查看内部 webpack 配置

因为 topfeed-cli 内置了 webpack 的配置，如果你想要查看内部 webpack 的配置，可以通过 DEBUG 进行查看内部命令启动是的 webpack 配置

```bash
DEBUG=topfeed npx topfeed dev --target ssr
```
