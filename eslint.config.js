import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import configPrettier from "eslint-config-prettier";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {ignores:["node_modules","build",".react-router","*.config.*"]},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  configPrettier, // prettierの設定を追加
  {plugins: {
    prettier: pluginPrettier,
    }
  },
  {
    settings: {
      react: {
        version: "detect", // Reactのバージョンを自動検出
      },
    },
    rules:{
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error"
    },
  },
  {languageOptions: { globals: globals.browser }},
];
