# Blog

## Documents

### 개발 모드 / 배포 모드

```js
// libs/utils.ts
FOLDER_NAME_TO_PARSE = mode("dev"); // data/posts-test를 렌더링함
FOLDER_NAME_TO_PARSE = mode("prod"); // data/posts를 렌더링함
```

### 배포

1. `FOLDER_NAME_TO_PARSE = mode("prod");`로 해준다
2. `npm run deploy`
3. 끝

### posts 규칙

- 내용이 바뀌지 않으면 `lastModifiedAt`을 최신화 하지 않는다.
