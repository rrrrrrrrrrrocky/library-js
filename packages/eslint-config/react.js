const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const { fixupPluginRules } = require("@eslint/compat");

const base = require("./base.js");

module.exports = [
  ...base,
  {
    ignores: ["node_modules/**"],
  },
  {
    files: ["*.js?(x)", "*.ts?(x)"],
    plugins: {
      react,
      "react-hooks": fixupPluginRules(reactHooks),
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect", // 현재 React 버전을 자동으로 감지합니다.
      },
    },
    rules: Object.freeze({
      ...reactHooks.configs.recommended.rules,
      // React 설정
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react/display-name": "off",
      "react/function-component-definition": [
        "warn",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-boolean-value": "warn",
      "react/jsx-curly-brace-presence": "warn",
      "react/jsx-fragments": "warn",
      "react/jsx-key": "warn",
      "react/jsx-no-duplicate-props": [
        "warn",
        {
          ignoreCase: true,
        },
      ],
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-sort-props": [
        "warn",
        {
          callbacksLast: true,
          reservedFirst: true,
          shorthandLast: true,
        },
      ],
      "react/no-invalid-html-attribute": "warn",
      "react/no-unknown-property": [
        "warn",
        {
          ignore: ["sx"],
        },
      ],
      "react/prop-types": "off",
      "react/self-closing-comp": "warn",
    }),
  },
];
