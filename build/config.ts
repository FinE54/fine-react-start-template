import type { Configuration } from "webpack-dev-server";
import { pathResolve } from "./utils";

export const projectName = "React Basic By FinE54";
export const projectLogo = pathResolve("/src/assets/logo.png");

export const baseApiURL = "/api";
export const uploadURL = "/upload";
export const IconFontURL = "";

export const devServer: Configuration = {
  allowedHosts: "all",
  hot: true,
  port: 39000,
  proxy: {
    "/api": {
      target: "http://test.tt.szjfl.cn:39001",
      changeOrigin: true,
      pathRewrite: { "/api": "" },
    },
  },
  client: {
    progress: true,
    overlay: {
      errors: true,
      warnings: false,
    },
  },
};
