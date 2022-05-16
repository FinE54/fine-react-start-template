import * as path from "path";

export function pathResolve(name: string) {
  return path.resolve(__dirname, "./../" + name);
}
