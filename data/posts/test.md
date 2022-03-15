---
title: 프로그래머스 테스트, 커피오더
description: 프로그래머스 개발자 채용 시험, SPA를 바닐라js로 만들기
tags:
  - markdown
  - vanillar js
  - 프로그래머스
publishedDate: 2022/03/11
lastModifiedAt: 2022/03/15
---

## 기출문제

기술 : Vanilla JS
제한시간 : 3시간
목표 : 3시간 안에 Vanilla JavaScript로 SPA 쇼핑몰 사이트의 프로토타입을 만든다.

## 결과

3월 6일부터 시작해 3월 9일 오늘 시도에서 20분 남기고 완료할 수 있었다.
컴포넌트를 상호작용이 일어나는 단위로 분리해서 최소한의 렌더링만 일어나게 했다. 컴포넌트가 상호작용 단위로 분리되니 문제를 찾을 때 어디를 집중해서 볼지 구별하기 좋다.
history에 `pushState()`, 이벤트리스너의 `"popstate"`, `Promise.all()`, `이벤트버블링`은 처음봤다.
`createElement` vs `innerHTML`

```js
// App.js
import ProductListPage from "./ProductListPage.js";
import ProductDetailPage from "./ProductDetailPage.js";
import Cart from "./Cart.js";

function App($target) {
  this.render = () => {
    const { pathname } = location;
    $target.innerHTML = "";

    if (pathname === "/web/") {
      new ProductListPage($target, this.render).render();
    } else if (pathname.includes("/web/products/")) {
      new ProductDetailPage($target, this.render).render();
    } else if (pathname === "/web/cart") {
      new Cart($target, this.render).render();
    }
  };
  window.addEventListener("popstate", () => this.render());
}
new App(document.querySelector(".App")).render();
```

```js
// Api.js
const API_END_POINT = "https://...amazonaws.com/dev/products";
// productId가 있을때 엔드포인트 = "https://...amazonaws.com/dev/products/{productId}"

const fetchUrl = async (productId) => {
  const url = `${API_END_POINT}${productId ? `/${productId}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.log("res.ok false");
    return;
  }
  return await res.json();
};
export default fetchUrl;

// constants.js
export const CART_KEY = "products_cart";
```

```js
// ProductListPage.js
import fetchUrl from "./Api.js";

function ProductListPage($target, appRender) {
  this.component = document.createElement("div");
  this.component.className = "ProductListPage";

  this.render = async () => {
    const productList = await fetchUrl();
    this.component.innerHTML = `
			<h1>상품목록</h1>
			<ul>
				${productList
          .map(
            (product) => `
					<li class="Product" data-product-id=${product.id}>
					<img src=${product.imageUrl}>
					<div class="Product__info">
						<div>${product.name}</div>
						<div>${product.price.toLocaleString()}원</div>
					</div>
					</li>
				`
          )
          .join("")}
			</ul>
		`;

    this.component.addEventListener("click", (e) => {
      const product = e.target.closest(".Product");
      const productId = product.dataset.productId;
      history.pushState(null, null, `/web/products/${productId}`);
      appRender();
    });
    $target.appendChild(this.component);
  };
}

export default ProductListPage;
```

```js
// ProductDetailPage.js
import fetchUrl from "./Api.js";
import { CART_KEY } from "./constants.js";

function ProductDetail__selectedOptions($target, appRender, state) {
  this.state = state;
  this.component = document.createElement("div");
  this.component.className = "ProductDetail__selectedOptions";

  this.getPrice = (productPrice, optionPrice, amount) => {
    const price = (productPrice + optionPrice) * amount;
    return price;
  };

  this.render = () => {
    const { product, selectedOptions, totalPrice } = this.state;
    this.component.innerHTML = `
			<h3>선택된 상품</h3>
			<ul>
				${selectedOptions
          .map(
            (option) => `
					<li>
					${product.name} ${option.name} ${this.getPrice(
              product.price,
              option.price,
              option.amount
            ).toLocaleString()}원
						<div>
							<input data-option-id=${option.id} type='number' value=${
              option.amount
            } min="1" max=${option.stock}>개
						</div>
					</li>
				`
          )
          .join("")}
			</ul>
			<div class="ProductDetail__totalPrice">
			총 상품가격 ${selectedOptions
        .reduce(
          (prev, current) =>
            prev + this.getPrice(product.price, current.price, current.amount),
          0
        )
        .toLocaleString()}원
			</div>
			<button class="OrderButton">주문하기</button>
		`;
    $target.appendChild(this.component);

    this.component.addEventListener("change", (e) => {
      e.stopImmediatePropagation();
      if (e.target.tagName === "INPUT") {
        const amount = e.target.value;
        if (amount < 1) {
          return;
        }
        const index = selectedOptions.findIndex(
          (option) => option.id === +e.target.dataset.optionId
        );
        selectedOptions[index].amount = +amount;
        this.render();
      }
    });

    const orderBtn = this.component.querySelector(".OrderButton");
    orderBtn.addEventListener("click", (e) => {
      let products = selectedOptions.map((option) => ({
        productId: product.id,
        optionId: option.id,
        quantity: option.amount,
      }));
      const cartItems = JSON.parse(localStorage.getItem(CART_KEY));
      if (cartItems) {
        products = products.concat(cartItems);
      }
      localStorage.setItem(CART_KEY, JSON.stringify(products));
      history.pushState(null, null, "/web/cart");
      appRender();
    });
  };

  this.render();
}

function ProductDetailPage($target, appRender) {
  this.component = document.createElement("div");
  this.component.className = "ProductDetailPage";
  this.state = { product: "", selectedOptions: [], totalPrice: [] };

  this.render = async () => {
    const { pathname } = location;
    const [_, productId] = pathname.split("/web/products/");
    this.state.product = await fetchUrl(productId);
    const { product, selectedOptions, totalPrice } = this.state;

    this.component.innerHTML = `
			<h1>${product.name} 상품 정보</h1>
			<div class="ProductDetail">
				<img src=${product.imageUrl}>
				<div class="ProductDetail__info">
					<h2>${product.name}</h2>
					<div class="ProductDetail__price">
						${product.price.toLocaleString()}원
					</div>
					<select>
						<option>선택하세요.</option>
						${product.productOptions
              .map(
                (option) => `
							<option value=${option.id}>${option.name} ${
                  option.price > 0 ? `(+${option.price}원)` : ""
                }</option>
						`
              )
              .join("")}
					</select>
				</div>
			</div>
		`;
    this.component.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT") {
        const optionId = e.target.value;
        const selectedOption = product.productOptions.find(
          (option) => option.id === +optionId
        );
        selectedOption.amount = 1;
        const isThere = this.state.selectedOptions.findIndex(
          (option) => option.id === selectedOption.id
        );
        if (isThere !== -1) {
          console.log("이미 선택된 옵션이라 작업안함");
          return;
        }
        selectedOptions.push(selectedOption);
        productDetail__selectedOptions.render();
      }
    });

    const productDetail__selectedOptions = new ProductDetail__selectedOptions(
      this.component.querySelector(".ProductDetail__info"),
      appRender,
      this.state
    );
    $target.appendChild(this.component);
  };
}
export default ProductDetailPage;
```

## 화면깜빡이지 않고 주소 변경하기

- `history.pushState(state,title,url)` : url에 주소를 넣으면 새로고침 없이 url이 변경된다.
- 브라우저의 뒤로가기, 앞으로가기는 `window.addEventListener("popstate", 함수)`가 작동하는데 `pushState()`로 변하는 url은 감지하지 못한다. 그래서 컴포넌트 내에서 `App.render()를 불러와서 실행`해줬다.

---

# 참조

- [커피 주문 페이지 만들기](https://programmers.co.kr/skill_check_assignments/199) : 로그인 필요
- [해설](https://prgms.tistory.com/113)
- [history.pushState ( 화면 전환 )](https://kwangsunny.tistory.com/28)
