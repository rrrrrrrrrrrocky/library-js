# eslint-config

- 프론트엔드 컨벤션을 위한 eslint package 입니다.
- [주의사항](#주의사항)과 [사용법](#사용법)을 참고하여 세팅해주세요.

## 주의사항

1. eslint.config파일은 무조건 js파일로 생성해야합니다. (eslint v9~)
2. `eslint.config.js`로 할 경우 cjs로 읽으면서 동작이 안될 수 있으니 package.json에 `"type": "module"`로 설정하거나 `eslint.config.mjs`로 파일 생성하시길 바랍니다.
3. `ignores` 속성에 eslint 적용이 필요하지 않은 폴더, 확장자 등을 넣으세요.
4. `rrrrrrrrrrr.configs.typescript`를 사용 시, 가장 마지막에 append 해주세요.(rules가 생각과 다르게 override 될 수 있습니다.)
5. 해당 패키지 외 다른 eslint 패키지를 사용 하실 경우 [외부 패키지 추가 예시](#외부-패키지-추가-예시)를 참고해주세요.
6. [rules, plugins 등 추가 예시](#rules-plugins-등-추가-예시)

## 사용법

### nextjs 설정

```js
// eslint.config.(m)js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.next,
  ...rrrrrrrrrrr.configs.typescript, // 가장 마지막에 넣어주세요
  {
    ignores: ["*.cjs", "node_modules", "dist", ".next"],
  },
];

export default eslintConfig;
```

### react-vite 설정

```js
// eslint.config.(m)js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.react,
  ...rrrrrrrrrrr.configs.typescript,
  {
    ignores: ["*.cjs", "node_modules", "dist", ".vite"],
  },
];

export default eslintConfig;
```

### create-react-app 설정 (deprecated)

```js
// eslint.config.(m)js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";
import babelParser from "@babel/eslint-parser";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.react,
  {
    ignores: ["*.cjs", "node_modules"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // Babel 파서를 적용할 파일 확장자 지정
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react", "@babel/preset-typescript"], // 필요시
        },
      },
    },
  },
];

export default eslintConfig;
```

### vanilla-js || vanilla-ts 설정

```js
// eslint.config.(m)js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.base,
  // ...rrrrrrrrrrr.configs.typescript, // vanilla-ts 설정 시 사용하면 됩니다.
  {
    ignores: ["*.cjs"],
  },
];

export default eslintConfig;
```

### 외부 패키지 추가 예시

> 외부 패키지 마다 eslint v9에 호환하는 지원하는 방식이 달라서 예시와 다를 수 있습니다.

```js
// eslint.config.(m)js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";
import reactQuery from "@tanstack/eslint-plugin-query";
import tailwind from "eslint-plugin-tailwindcss";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.base,
  ...rrrrrrrrrrr.configs.typescript,
  ...tailwind.configs["flat/recommended"],
  ...reactQuery.configs["flat/recommended"],
  {
    ignores: ["*.cjs"],
  },
];

export default eslintConfig;
```

### rules, plugins 등 추가 예시

> eslintConfig 배열의 마지막에 새로운 객체를 추가 한 후, 아래의 예시처럼 추가하면 됩니다.

```js
import rrrrrrrrrrr from "@rrrrrrrrrrr/eslint-config";
import storybook from "eslint-plugin-storybook";

const eslintConfig = [
  ...rrrrrrrrrrr.configs.next,
  ...rrrrrrrrrrr.configs.typescript,
  {
    ignores: ["*.cjs", "node_modules", "dist", ".next", ".github", "out"],
  },
  {
    plugins: {
      storybook: storybook.configs.recommended,
    },
    // Storybook 파일에 대한 규칙 비활성화
    files: ["**/*.stories.@(js|jsx|ts|tsx)"],
    rules: {
      "react-hooks/rules-of-hooks": "off",
    },
  },
];

export default eslintConfig;
```
