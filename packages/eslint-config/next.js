const react = require("./react.js");
const typescript = require("./typescript.js");
// TODO: next에서 9버전 아직 지원 안함 (아래 함수들로 처리하는 내용이 있어 해봤으나 안됨 - 추후 처리 예정)
// const next = require("eslint-config-next");
// const { FlatCompat } = require("@eslint/eslintrc");
// const { fixupConfigRules } = require("@eslint/compat");
// const flatCompat = new FlatCompat();

module.exports = [
  // ...fixupConfigRules(flatCompat.extends("next/core-web-vitals")),
  ...typescript,
  ...react,
  {
    ignores: [".next/*", "node_modules/**"],
    // 아래 셋팅은 필요 없을 수 있음
    settings: {
      next: {
        rootDir: process.cwd(),
      },
    },
  },
];
