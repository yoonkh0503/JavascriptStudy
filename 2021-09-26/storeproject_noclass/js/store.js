const USER_LIST = "USER_LIST";
const CURRENT_LOGIN_USER = "CURRENT_LOGIN_USER";
const PRODUCT_LIST = "PRODUCT_LIST";

const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelector("#loginInput");
const bookContainer = document.querySelector(".bookContainer");
const loginBtn = document.querySelector("#loginBtn");
const userInfoContainer = document.querySelector(".userInfoContainer");
const loginCheckImg = document.querySelector("#loginCheckImg");
const moneyCheckImg = document.querySelector("#moneyCheckImg");


const paintBookChildContainer = (function() {
    const productList = JSON.parse(localStorage.getItem(PRODUCT_LIST));

    console.log("producrList", productList);
    for(let i = 0; i < productList.length; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const buyButton = document.createElement("button");
        const bookInfoButtn = document.createElement("button");

        img.src = `img/${productList[i].name}.png`;
        img.classList.add("bookImg");
        h2.textContent = productList[i].name;
        buyButton.textContent = "구매";
        bookInfoButtn.textContent = "책 정보 확인";
        buyButton.id = "buyBtn";
        bookInfoButtn.id = "infoBtn";
        div.classList.add("bookChild");
        div.id = productList[i].uniqueKey;

        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(buyButton);
        div.appendChild(bookInfoButtn);

        bookContainer.appendChild(div);
    }
})();

const getUserList = () => JSON.parse(localStorage.getItem(USER_LIST));
const getLoginUser = () => JSON.parse(localStorage.getItem(CURRENT_LOGIN_USER));
const getProductList = () => JSON.parse(localStorage.getItem(PRODUCT_LIST));

loginBtn.addEventListener('click', function(target) {
    target.preventDefault();
    if(isValidUser() === true) {
        loginSuccess();
        alert("로그인 되었습니다.");
    }
    else {
        return alert("id를 확인해주세요.");
    }
});

const paintElement = function() {
    loginForm.classList.add("hidden");
    bookContainer.classList.remove("hidden");
    userInfoContainer.classList.remove("hidden");
};

const loginSuccess = function() {
    paintElement();
    setLoginUser();
};

const isValidUser = function() {
    const user = getUserList();
    
    if(user === null) {
        return false;
    }

    for(let i = 0; i < user.length; i++) {
        console.log("user", user[i]);
        if(user[i].id === loginInput.value) {
            return true;
        }
    }
    return false;
};

const isLogin = (function() {
    const loginUser = getLoginUser();
    if(loginUser) {
        paintElement();
    }
})();

const setLoginUser = function() {
    const userList = getUserList();
    
    for(let i = 0; i < userList.length; i++) {
        if(userList[i].id === loginInput.value) {
            localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(userList[i]));
        }
    }
};

loginCheckImg.addEventListener('click', function() {
    const currentUser = getLoginUser();
    alert(currentUser.id + "님이 로그인 중입니다.");
});

moneyCheckImg.addEventListener('click', function() {
    const currentUser = getLoginUser();
    alert(`현재 보유중인 잔액은 ${currentUser.money} 입니다.`);
});

const findProduct = function(uniqueKey) {
    const productList = getProductList();
    for(let i = 0; i < productList.length; i++) {
        if(uniqueKey === String(productList[i].uniqueKey)) {
            return productList[i];
        }
    }
};

const buy = function() {
    const user = getLoginUser();
    const parentElement = this.parentElement;
    const productObj = findProduct(parentElement.id);
    console.log("productObj", productObj);
    console.log("productObj.stockNum", productObj.stockNum);

    if(Number(user.money) >= Number(productObj.price)) {
        const userMoneyChange = user.money - productObj.price;
        userStatusUpdate("money", userMoneyChange);
    }
    else {
        return alert("돈이 부족합니다.");
    }

    if(productObj.stockNum > 0) {
        productStatusUpdate(productObj.uniqueKey, "stockNum", productObj.stockNum - 1);
    }

    else {
        return alert("재고가 없습니다.");
    }

    alert(`${productObj.name}을 구매했습니다.`);
    alert(`잔액은 ${getLoginUser().money} 입니다.`);

};

const showInfo = function() {
    const parentElement = this.parentElement;
    const productObj = findProduct(parentElement.id);
    alert(`${productObj.name}의 가격은 ${productObj.price}원 입니다.`);
    alert(`${productObj.name}의 페이지 수는 ${productObj.pageNum}쪽 입니다.`);
    alert(`${productObj.name}은 현재 ${productObj.stockNum}개 남아있습니다.`);  
};

const buyBtns = document.querySelectorAll("#buyBtn");
const infoBtns = document.querySelectorAll("#infoBtn");

for(let i = 0; i < buyBtns.length; i++) {
    buyBtns[i].addEventListener('click', buy);
}

for(let i = 0; i < infoBtns.length; i++) {
    infoBtns[i].addEventListener('click', showInfo);
}

const userStatusUpdate = function(property, val) {
    const user = getLoginUser();
    user[property] = val;

    localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(user));
};

const productStatusUpdate = function(productUniqueKey, property, val) {
    const productList = getProductList();
    const productObj = findProduct(String(productUniqueKey));
    productObj[property] = val;
    productList[productUniqueKey - 1] = productObj;

    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
};

// 테스트코드 만들어야 함, userStatusUpdate 함수 고쳐야함.

/* Summary : 2021-09-26 StoreProject class를 사용하지 않는 방향으로 구현
==================================================================================
Descriptrion : 
Type : Feat
==================================================================================
- 회원가입 페이지 및 회원가입 기능 구현.
- 상품 등록 페이지 및 상품등록 기능 구현.
- 등록되어 있는 상품을 store 페이지에 그려주는 기능 구현, localStorage에 존재하는
productList를 이용함.
- localStorage에 저장되어 있는 userList를 이용해 로그인 하는 기능 구현, 
존재하는 id가 없는 경우 로그인 되지 않음.
- 상품을 구매하면 유저의 money가 차감되는 기능 구현(userStatusUpdate).
- 상품을 구매하면 상품의 재고가 차감되는 기능 구현(productStatusUpdate).
- 상품을 구매하는 기능 구현(buy 함수).
- 유저 리스트, 프로덕트 리스트, 로그인 유저를 가져오는 get 함수들 구현
(getUserList, getProductList, getLoginUser).
==================================================================================
To Do List
- 테스트 코드 만들어야함. 상품과 유저를 여기 store 파일에 미리 등록시켜놓자.
- userStatusUpdate 함수 수정이 필요함. 로그인 유저의 money만 차감이 되고 있어서, 
userList의 money를 차감해서 저장하도록 수정 필요.
*/
