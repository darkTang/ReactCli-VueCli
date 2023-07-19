import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import { Configuration } from "webpack";
import "webpack-dev-server";

const devConfig: Configuration = merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
});

export default devConfig;
