import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import * as TerserWebpackPlugin from "terser-webpack-plugin";
import * as CssMinimizerPlugin from "css-minimizer-webpack-plugin";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

import type { webpackPluginsType } from "./plugins";
import common from "./webpack.config.common";

const webpackProdConfigPlugins: webpackPluginsType = [
  new MiniCssExtractPlugin({
    ignoreOrder: true,
    filename: "styles/[name]~[contenthash].css",
    chunkFilename: "styles/[id]~[contenthash].css",
  }),
];
if (process.env.NODE_ENV === "analyzer") {
  webpackProdConfigPlugins.push(new BundleAnalyzerPlugin());
}

const prod: Configuration = {
  mode: "production",
  plugins: webpackProdConfigPlugins,
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          minSize: 120000,
          maxSize: 480000,
          reuseExistingChunk: true,
          minChunks: 1,
        },
        common: {
          name: "common",
          minChunks: 2,
          priority: 0,
          minSize: 120000,
          maxSize: 480000,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

export default merge(common, prod);
