import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.typescript,
  ...rrrrrrrrrrr.configs.next,
  {
    ignores: ["*.cjs"],
  },
];

export default eslintConfig;
