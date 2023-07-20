import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import { Configuration } from "webpack";
import "webpack-dev-server";

const devConfig: Configuration = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  // 设置react的jsx和tsx的HMR，对于普通的ts/js文件依然没有HMR
  plugins: [new ReactRefreshWebpackPlugin()],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
});

export default devConfig;
