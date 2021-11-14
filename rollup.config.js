import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import prettier from "rollup-plugin-prettier";

import pkg from "./package.json";

export default {
  input: pkg.source,
  plugins: [
    resolve({
      moduleDirectory: ["node_modules"],
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".ts", ".js"],
      babelHelpers: "runtime",
    }),
    commonjs({
      extensions: [".ts", ".js"],
    }),
    prettier(),
  ],
  output: [
    {
      name: "sunda",
      file: pkg.main,
      format: "umd",
      sourcemap: true,
    },
    {
      name: "sunda",
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
};
