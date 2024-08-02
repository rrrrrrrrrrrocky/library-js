/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    './base.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [
    {
      settings: {
        react: {
          // 현재 React 버전을 명시합니다.
          // 명시하지 않을 경우(기본값 'detect') React 라이브러리 전체를 불러오므로
          // 린트 과정에서 속도가 느려질 수 있습니다.
          // 예: '16.9', '17.0', '18.0' 등
          version: 'detect',
        },
      },
      parserOptions: {
        // 사용할 ECMAScript 버전을 지정합니다.
        // "latest"로 설정하여 최신 ECMAScript 버전을 사용합니다.
        ecmaVersion: 'latest',
        // 코드 소스의 타입을 지정합니다.
        // "module"로 설정하여 ES6 모듈 형식을 사용하는 것을 나타냅니다.
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      files: ['*.js?(x)', '*.ts?(x)'],
      rules: {
        // react 설정
        'react-hooks/exhaustive-deps': 'warn',
        'react-hooks/rules-of-hooks': 'error',
        'react/display-name': 'off',
        'react/function-component-definition': [
          'warn',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/jsx-boolean-value': 'warn',
        'react/jsx-curly-brace-presence': 'warn',
        'react/jsx-fragments': 'warn',
        'react/jsx-key': 'warn',
        'react/jsx-no-duplicate-props': [
          'warn',
          {
            ignoreCase: true,
          },
        ],
        'react/jsx-no-useless-fragment': 'warn',
        'react/jsx-sort-props': [
          'warn',
          {
            callbacksLast: true,
            reservedFirst: true,
            shorthandLast: true,
          },
        ],
        'react/no-invalid-html-attribute': 'warn',
        'react/no-unknown-property': [
          'warn',
          {
            ignore: ['sx'],
          },
        ],
        'react/prop-types': 'off',
        'react/self-closing-comp': 'warn',
      },
    },
  ],
};
