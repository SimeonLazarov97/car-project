import path from "path";
import Dotenv from 'dotenv-webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: ['babel-polyfill', "./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })
    ]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"),
    }),
    new Dotenv(),
  ],
};


export default config;