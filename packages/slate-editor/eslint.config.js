import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

// TODO: react parser를 설정해야 적용이 될 것 같음
const eslintConfig = [
  ...rrrrrrrrrrr.configs.react,
  ...rrrrrrrrrrr.configs.typescript,
  {
    ignores: ["*.cjs"],
  },
];

export default eslintConfig;
