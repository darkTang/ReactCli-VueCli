import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";

const isDevelopment = process.env.NODE_ENV !== "production";

const baseConfig: Configuration = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].[hash:10].js",
    chunkFilename: "js/[name].chunk.[hash:10].js",
    assetModuleFilename: "static/[hash:10][ext][query]",
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
          "style-loader",
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
        test: /\.(png|jpe?g|gif|svg|webp|bmp)$/,
        type: "asset", // 默认8kb
      },
      {
        test: /\.(ttf|mp3|mp4)$/,
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
            cacheCompression: false
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
      template: "./index.html",
      filename: "index.html",
      inject: "body",
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name].[hash].css",
    //   chunkFilename: "css/[name].chunk.[hash:10].css",
    // }),
    new ESLintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: true,
  },
};

export default baseConfig;
