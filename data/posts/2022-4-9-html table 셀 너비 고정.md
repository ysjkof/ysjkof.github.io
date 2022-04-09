---
title: html 테이블의 칸 너비 고정하는 방법
description: html table element의 칸의 너비를 고정하려면 css에 `table-layout:fixed;`를 설정한다
tags:
  - html
  - css
  - element table
publishedDate: 2022/04/09
lastModifiedAt: 2022/04/09
---

React로 `{array.map( item => <th>item</th> )}`으로 테이블을 그리는데 칸의 너비가 다 달랐다. 어느건 148px, 어느건 151px 이런식. 고정된 너비를 원했는데 `item`마다 길이가 달라서 테이블이 자동으로 조절한 거 같다.

css에 `table-layout:fixed;`를 설정하면 테이블의 너비가 내용에 따라 동적으로 변하는 걸 막을 수 있다.

```css
// css
table {
  table-layout: fixed; // 기본값 auto
}
```
