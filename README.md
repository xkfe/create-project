<h1 align="center">✨create-project✨</h1>

<h2 align="center">
<sub>Welcome to use create-xkfe-project</sub>
</h2>

# 📦 使用

```shell
# npm
    npm create xkfe-project@latest

# yarn
    yarn create xkfe-project

# pnpm
    pnpm create xkfe-project
```

> [!TIP]
> 建议添加上标记名（@latest），否则 npm 可能会解析到缓存的过时软件包版本。

## 📖 介绍

`create-xkfe-project` 是一个用于创建前端各种项目的轻量脚手架工具，包含后台、官网、小程序、H5等。它可以帮助你快速创建一个`前端开发模板`，提高效率，也可以集成你自己的模板!

<!-- <p align="center"><img  src=".github/image/demo.png"></p> -->

## 🚤 快速使用

```shell
npx create-xkfe-project@latest --info
# --info 获取当前项目环境信息
```

### 参数说明

| 配置项 | 参数 | 别名 | 可选值 |
|  :---: | :---: | :---: | :---: |
| Template | —— | t | vitesse |
| TypeScript | ts | —— | —— |
| Plugin | pluginList | p | 见[插件列表](#插件列表) |
| Module | moduleList | m | 见[模块列表](#模块列表) |
| UI | ui | u | 见[组件列表](#组件列表) |
| Eslint | eslint | e | —— |
| info | info |  —— | all |

## 🤝 参与贡献

- 提交新功能
- 解决[`issues`](https://github.com/uni-helper/create-uni/issues)
- 提交新[`模板`](./src/question/template/)/[`Plugin`](./src/question/plugin/choices.ts)/[`module`](./src/question/module/choices.ts)/[`UI`](./src/question/UI/)

## 🌸 感谢

项目核心代码来自 [create-uni](https://github.com/uni-helper/create-uni), 感谢 `uni-helper` 团队及`FliPPeDround` 作者对开源社区的贡献。

## 📄 License

[MIT LICENSE](./LICENSE)
