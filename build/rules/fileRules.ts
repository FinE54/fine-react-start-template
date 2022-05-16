import type { RuleSetRule } from "webpack";

export const fileRules: RuleSetRule[] = [
  {
    test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
    type: "asset/resource",
    generator: {
      filename: "assets/image/[hash][ext][query]",
    },
  },
  {
    test: /\.(woff(2)?|eot|ttf|otf|)$/,
    type: "asset/inline",
  },
];
