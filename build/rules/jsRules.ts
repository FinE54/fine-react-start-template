import type { RuleSetRule } from "webpack";

export const jsRules: RuleSetRule[] = [
  {
    test: /\.(j|t)sx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        plugins: ["@babel/plugin-transform-runtime"],
      },
    },
  },
];
