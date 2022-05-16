import type { Configuration } from "webpack";
import { merge } from "webpack-merge";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

import common from "./webpack.config.common";
import { devServer } from "./config";

const dev: Configuration = {
  mode: "development",
  devServer,
  stats: "minimal",
  plugins: [
    new MiniCssExtractPlugin({
      ignoreOrder: true,
    }),
  ],
};

export default merge(common, dev);
