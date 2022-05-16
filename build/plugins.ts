import type { WebpackPluginInstance, Compiler } from "webpack";
import { pathResolve } from "./utils";
import { projectName, projectLogo } from "./config";

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

export type webpackPluginsType = (
  | ((this: Compiler, compiler: Compiler) => void)
  | WebpackPluginInstance
)[];

const plugins: webpackPluginsType = [
  new HtmlWebpackPlugin({
    title: projectName,
    template: pathResolve("public/index.html"),
    chunks: ["app"],
    filename: "index.html",
    favicon: projectLogo,
    meta: {
      viewport:
        "width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no",
    },
    minify: {
      collapseWhitespace: true,
    },
    hash: true,
  }),
  new CleanWebpackPlugin(),
];

export default plugins;
