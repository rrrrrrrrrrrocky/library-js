import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.base,
  ...rrrrrrrrrrr.configs.typescript,
  {
    ignores: ["*.cjs"],
  },
];

export default eslintConfig;
