import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
// import CopyWebpackPlugin from "copy-webpack-plugin";

const isDevelopment = process.env.NODE_ENV !== "production";

const baseConfig: Configuration = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[contenthash:10].js",
    chunkFilename: "js/[name].chunk.[contenthash:10].js",
    assetModuleFilename: "static/[contenthash:10][ext][query]",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["postcss-preset-env"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|bmp)$/,
        type: "asset", // 默认8kb
      },
      {
        test: /\.(ttf|ico|mp3|mp4)$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        use: "html-loader",
        enforce: "post",
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].chunk.[contenthash:10].css",
    }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../public"),
    //       to: path.resolve(__dirname, "../dist"),
    //       globOptions: {
    //         // 因为HtmlWebpackPlugin已经复制一份，因此我能要忽略index.html文件的复制
    //         ignore: ["**/index.html"],
    //       },
    //     },
    //   ],
    // }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // defaultVendors: {
        //   // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前chunk包含已从主bundle中拆分出的模块，则它将被重用，而不是生成新的模块
        //   name: "node_modules-chunk", // 给打包后的js文件命名，默认为随机数字，这里的name会传给entry入口文件
        // },
        // ---------------------------------------
        // react react-dom react-router-dom一起打包
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "react.chunk",
          reuseExistingChunk: true,
          priority: 40,
        },
        // antd单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "antd.chunk",
          reuseExistingChunk: true,
          priority: 30,
        },
        // 剩下的node_modules单独打包
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: "lib.chunk",
          reuseExistingChunk: true,
          priority: 20,
        },
      },
    },
    runtimeChunk: true, // 是否生成对应的映射文件
  },
  performance: false, // 关闭性能分支，提升打包速度
};

export default baseConfig;
