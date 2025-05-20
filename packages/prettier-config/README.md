# prettier-config

- 프론트엔드 컨벤션을 위한 prettier package 입니다.
- [주의사항](#주의사항)과 [사용법](#사용법)을 참고하여 세팅해주세요.

## 주의사항

1. prettierrc의 확장자는 `cjs`로 해야합니다 (prettierrc.cjs)
2. 현재 eslint package가 cjs의 require문을 사용 할 경우 error로 인식하기 때문에 eslint.config.(m)js에서 `*.cjs` 혹은 `prettierrc.cjs`를 ignores에 넣어줘야합니다.

## 사용법

### nextjs 설정

```js
// prettierrc.(c)js
module.exports = require("@rrrrrrrrrrr/prettier-config");
```
