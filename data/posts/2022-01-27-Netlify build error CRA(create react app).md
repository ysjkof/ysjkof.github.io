---
title: Netlify Build error CRA(create-react-app)
description: 이게 있으면 아카이브에서 내용 요약을 이걸로 보여준다.
tags:
  - 개발
  - 에러
lastModifiedAt: 2022/01/28
publishedDate: 2022/01/28
---

CRA로 웹을 만들어 netlify에 배포했는데 netlify 콘솔에 아래와 같은 에러가 나타남.

```bash
Module not found: Error: Can't resolve '...경로' in '...경로' resolve '...경로' in '/opt/build/repo/src/...'
```

## 깃의 대소문자 관련 문제

콘솔에 `git config core.ignorecase false` 입력

문제 컴포넌트들이 내용은 바뀐게 없는데 git에서 갱신됐다. 이 문제는 해결됐지만 새로운 문제가 나타남

## component의 import에 관한 에러

import 관한 에러가 발생.

import를 자동완성하지 말고 수동으로 써보라지만 안된다.

결국 git을 완전히 초기화 하자 생각함.

폴더를 보는데 **프로젝트 폴더 내부 폴더에** `.git`이 하나 더 있었음 지우고 해결됨.

### 참조

- https://stackoverflow.com/questions/53117333/deploying-gatsby-v2-to-netlify-errors
- https://github.com/gatsbyjs/gatsby/issues/8205
- https://thiporia.tistory.com/36
- https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git
