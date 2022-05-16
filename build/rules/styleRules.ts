import type { RuleSetRule } from "webpack";

import * as MiniCssExtractPlugin from "mini-css-extract-plugin";

export const styleRules: RuleSetRule[] = [
  {
    test: /\.(scss|css)$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          importLoaders: 1,
        },
      },
      "postcss-loader",
    ],
  },
  {
    test: /\.(less)$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: "less-loader",
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
];
