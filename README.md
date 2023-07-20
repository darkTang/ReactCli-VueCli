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

## 5. HMR（yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh -D）
css在style-loader默认是可以进行HMR的，但是JS还是不行，需要我们[手动处理](https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js)。
但是因为是在react项目中，我们可以通过插件帮我们做这件事。

- plugins下`new ReactRefreshWebpackPlugin(),`
- 注意：设置react的jsx和tsx的HMR，对于普通的ts/js文件依然没有HMR

## 6. 路由跳转刷新资源路径不存在导致的404
配置路由跳转，当我们点击home路由时，再刷新浏览器，会请求/home路径下的资源，因为没有/home路径，因此会导致页面404。

- 解决：配置devServer的`historyApiFallback: true`，当页面出现404时，会自动返回index.html文件

## 7. lazy路由懒加载
因为ts-loader只在你需要确保 tsconfig.json 的 compilerOptions 中 module 选项的值为 commonjs,否则 webpack 的运行会失败报错，因为 ts-node 不支持 commonjs 以外的其他模块规范。但是因为懒加载是在ES2020及以上版本才支持，因此，我们还是需要设置module 选项的值为 ES2020/ESNext，并且添加：
```json
"ts-node": {
   "compilerOptions": {
     "module": "CommonJS"
   }
 },
```
这样，只需要在react文件中，通过lazy和suspense就可以实现了。

