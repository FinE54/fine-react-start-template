import type { Configuration } from "webpack";
import TsconfigPathsWebpackPlugin from "tsconfig-paths-webpack-plugin";

import { FILE_EXTENSIONS, IS_DEV } from "./constants";
import { pathResolve } from "./utils";

import { fileRules, jsRules, styleRules } from "./rules";
import plugins from "./plugins";

const common: Configuration = {
  devtool: IS_DEV ? "inline-source-map" : false,
  entry: {
    app: "./src/app.tsx",
  },
  output: {
    path: pathResolve("dist"),
    filename: "js/[name].bundle.js",
  },
  module: {
    rules: [].concat(fileRules, jsRules, styleRules),
  },
  resolve: {
    extensions: FILE_EXTENSIONS,
    fallback: { path: require.resolve("path-browserify") },
    plugins: [
      new TsconfigPathsWebpackPlugin({
        configFile: pathResolve("tsconfig.webpack.json"),
        extensions: FILE_EXTENSIONS,
      }),
    ],
  },
  plugins: plugins,
};

export default common;
