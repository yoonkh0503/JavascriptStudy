(function() {
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
    const logOutImg = document.querySelector("#logOutImg");
    

    const addHidden = (element) => element.classList.add("hidden");
    const removeHidden = (element) => element.classList.remove("hidden");

    const paintBookChildContainer = function() {
        const productList = JSON.parse(localStorage.getItem(PRODUCT_LIST));
        let result = '';
        for(let i = 0; i < productList.length; i++) {
            const temp = `<div id="${productList[i].uniqueKey}" class="bookChild">
                            <h2>${productList[i].name}</h2>
                            <img class="bookImg" src="img/${productList[i].name}.png">
                            <button id="buyBtn">구매</button>
                            <button id="infoBtn">책 정보 확인</button>
                          </div>`
            result += temp;
        }
        bookContainer.innerHTML = result;
    };
    
    const getUserList = () => JSON.parse(localStorage.getItem(USER_LIST));
    const getLoginUser = () => JSON.parse(localStorage.getItem(CURRENT_LOGIN_USER));
    const getProductList = () => JSON.parse(localStorage.getItem(PRODUCT_LIST));

    const getObj = (list, property, keyValue) => {
        for(let i = 0; i < list.length; i++) {
            if(String(keyValue) === String(list[i][`${property}`])) {
                return list[i];
            }
        }
    };
    
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
        // loginForm.classList.add("hidden");
        addHidden(loginForm);
        // bookContainer.classList.remove("hidden");
        removeHidden(bookContainer);
        // userInfoContainer.classList.remove("hidden");
        removeHidden(userInfoContainer);
    };
    
    const loginSuccess = function() {
        paintElement();
        setLoginUser();
        paintBookChildContainer();
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
    
    const isLogin = getLoginUser();
    if(isLogin) {
        paintElement();
        paintBookChildContainer();
    }
    
    const setLoginUser = function() {
        const currentUser = getObj(getUserList(), "id", loginInput.value);
        localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(currentUser));
        // // for(let i = 0; i < userList.length; i++) {
        // //     if(userList[i].id === loginInput.value) {
        // //         localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(userList[i]));
        // //     }
        // }
    };
    
    loginCheckImg.addEventListener('click', function() {
        const currentUser = getLoginUser();
        alert(currentUser.id + "님이 로그인 중입니다.");
    });
    
    moneyCheckImg.addEventListener('click', function() {
        const currentUser = getLoginUser();
        alert(`현재 보유중인 잔액은 ${currentUser.money} 입니다.`);
    });
    

    const moneyCheck = (user, productObj) => {
        if(Number(user.money) >= Number(productObj.price)) {
            const userMoneyChange = user.money - productObj.price;
            userStatusUpdate("money", userMoneyChange);
            return false;
        }
        return true;
    }
    
    const buy = function() {
        const user = getLoginUser();
        const parentElement = this.parentElement;
        const productObj = getObj(getProductList(), "uniqueKey", parentElement.id);
        console.log("productObj" , productObj);
        const isMoneyCheck = moneyCheck(user, productObj);

        if(isMoneyCheck) {
            return alert("돈이 부족합니다.");
        }
    
        if(productObj.stockNum > 0) {
            productStatusUpdate(productObj.uniqueKey, "stockNum", productObj.stockNum - 1);
        }

        else {
            return alert("재고가 없습니다.");
        }
        
        console.log("productObj", productObj);
        console.log("productObj.stockNum", productObj.stockNum);
    
        alert(`${productObj.name}을 구매했습니다.`);
        alert(`잔액은 ${getLoginUser().money} 입니다.`);
    };
    
    const showInfo = function() {
        const parentElement = this.parentElement;
        const productObj = getObj(getProductList(), "uniqueKey", parentElement.id)
        console.log("productObj" , productObj);
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
        const currentUser = getLoginUser();
        const userList = getUserList();

        currentUser[property] = val;
        localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(currentUser));
    
        for(let i = 0; i < userList.length; i++) {
            if(userList[i].id === currentUser.id) {
                userList[i] = currentUser;
                console.log("currentUser[i] ", currentUser);
            }
        }

        localStorage.setItem(USER_LIST, JSON.stringify(userList));
    };
    
    const productStatusUpdate = function(productUniqueKey, property, val) {
        const productList = getProductList();
        const productObj = getObj(productList, "uniqueKey", productUniqueKey);
        productObj[property] = val;
        productList[productUniqueKey - 1] = productObj;
    
        localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
    };

    const logOut = () => {
        localStorage.removeItem(CURRENT_LOGIN_USER);
        const bookChilds = document.querySelectorAll(".bookChild");

        for(let i = 0; i < bookChilds.length; i++) {
            bookContainer.removeChild(bookChilds[i]);
        }

        removeHidden(loginForm);
        addHidden(userInfoContainer);
        alert("로그아웃 되었습니다.");
    };

    logOutImg.addEventListener('click', logOut);
    
})();











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


/* Summary : 2021-09-27 StoreProject userListUpdate 함수 버그 수정 및 유효성 검사 추가
==================================================================================
Descriptrion : 
Type : Feat, Fix
==================================================================================
- userStatusUpdate 함수에서 현재 로그인 된 유저 객체의 프로퍼티만 바뀌는 문제가 있었음.
전체 유저 리스트의 프로퍼티도 업데이트되도록 수정함.
- 테스트 코드 추가, 프로덕트와 유저 리스트를 미리 등록해놓은 상태에서 실행되도록 테스트 코드를 추가해두었음.
- membership, product 파일에서 userArr, productArr 값을 초기화할 때, 등록된 key 값이 없을때에만
초기화화도록 수정함.
key 값이 존재하는데, userArr, productArr을 초기화해버리면 기존에 존재하던 userList , productList 도
전부 초기화되는 문제가 발생하여 null인지 체크하는 코드 추가.
*/


/* Summary : 2021-10-01 StoreProject 리팩토링 및 로그아웃 기능 추가 
==================================================================================
Descriptrion : 
Type : Feat, Refactor
==================================================================================
- list , property, keyValue를 파라미터로 받고, 리스트에 프로퍼티 값과 keyValue를 비교하여
리스트의 요소를 반환하는 getObj 함수 구현.
- findProduct 함수 제거, getObj 함수가 있기 때문에 findProduct는 제거함. findProduct는 프로덕트의
유니크 키 값만 가지고 비교를 하기 때문에 범용적으로 쓰기엔 비효율적이기 때문임.
- addHidden , removeHidden 함수 구현.
- logOut 함수 구현. 웹페이지에 있는 로그아웃 이미지 클릭 시 로그인유저 데이터를 지우고, 각 엘리먼트들은 지우거나
hidden으로 변경되도록.
==================================================================================
To Do List
- 프로덕트 삭제 기능 구현해야함.
- 프로덕트가 삭제 되었을 때 유니크 키가 정상적으로 저장되는지 테스트 필요.
*/