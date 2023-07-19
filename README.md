# 配置文件
webpack配置文件用ts，webpack.config.ts。
`yarn add typescript ts-node @types/node @types/webpack -D`
另外需要在tsconfig.json文件配置：
```json
{
  "compilerOptions": {
    "module": "commonjs",   // ts-node 不支持 commonjs 以外的其他模块规范。
    "target": "es5",
    "esModuleInterop": true,  // 创建命名空间，允许cjs和esm相互操作
    "allowSyntheticDefaultImports": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]  // 配置别名提示
    }
  },
  "include": ["src/**/*"]
}
```
这时候我们就可以在配置文件中使用esm语法。在js的配置文件最好使用cjs语法。
关于webpack其他配置，见[webpack-core](https://github.com/darkTang/webpack-core)

# 一、ReactCli
配置react脚手架的webpack。

## 1. Babel配置(yarn add babel-loader @babel/core babel-preset-react-app -D)
配置Babel预设`react-app`，因为`react-app`内部已经集成了`@babel/preset-env`、`core-js`、`@babel/plugin-transform-runtime`、`@babel/preset-react`等插件。详见[babel-preset-react-app](https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js)

- 注意：`babel-preset-react-app`此依赖需要配置环境变量才可以，因为该预设需要依赖环境变量，否则项目无法启动，
- 依赖的环境变量并不是代码运行的环境变量，而是babel依赖的环境变变量
- `yarn add cross-env -D`
- `cross-env NODE_ENV=development webpack serve --config ./config/webpack.dev.ts`

## 2. eslint配置(yarn add eslint-config-react-app -D)

## 3. react配置
`yarn add react react-dom`
`yarn add @types/react @types/react-dom -D`

## 4. css模块化（yarn add @types/css-modules -D）
css-loade默认开启了css模块化，但是因为在ts文件中，可能出现无法识别`.module.css`的情况，因此我们需要在`tsconfig.json`文件中配置`types: ["css-modules"]`。

## HMR（yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh -D）
css在style-loader默认是可以进行HMR的，但是JS还是不行，需要我们[手动处理](https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js)。
但是因为是在react项目中，我们可以通过插件帮我们做这件事。

- 在babel-loader的options下面添加plugins`[isDevelopment && require.resolve("react-refresh/babel")]`
- plugins下`isDevelopment && new ReactRefreshWebpackPlugin(),`
