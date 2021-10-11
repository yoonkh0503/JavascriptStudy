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
                            <button id="deleteBtn">삭제</button>
                          </div>`
            result += temp;
        }
        bookContainer.innerHTML = result;
        const deleteBtns = document.querySelectorAll("#deleteBtn");
        setBuyInfoEvent();
        deleteEventSet(deleteBtns);
    };

    const deleteProductObj = function(targetUniqueKey) {
        const productList = getProductList();
        const index = productList.findIndex(elem => Number(elem.uniqueKey) === Number(targetUniqueKey));
        const name = productList[index].name;
        productList.splice(index, 1);
        localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
        paintBookChildContainer();
        alert(`${name} 이 삭제되었습니다.`);
    };

    const deleteEventSet = function(list) {
        for(let elem of list) {
            elem.addEventListener('click', function(event) {
                deleteProductObj(event.currentTarget.parentElement.id);
            })
        }
    };

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
        infoAlert(productObj);
    };

    const setBuyInfoEvent = function() {
        const buyBtns = document.querySelectorAll("#buyBtn");
        const infoBtns = document.querySelectorAll("#infoBtn");
    
        for(let i = 0; i < buyBtns.length; i++) {
            buyBtns[i].addEventListener('click', buy);
        }
    
        for(let i = 0; i < infoBtns.length; i++) {
            infoBtns[i].addEventListener('click', showInfo);
        }
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
        addHidden(loginForm);
        removeHidden(bookContainer);
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
    };

    const infoAlert = function(productObj) {
        alert(`${productObj.name}의 가격은 ${productObj.price}원 입니다.`);
        alert(`${productObj.name}의 페이지 수는 ${productObj.pageNum}쪽 입니다.`);
        alert(`${productObj.name}은 현재 ${productObj.stockNum}개 남아있습니다.`); 
    };

    const userStatusUpdate = function(property, val) {
        const currentUser = getLoginUser();
        const userList = getUserList();

        currentUser[property] = val;
        localStorage.setItem(CURRENT_LOGIN_USER, JSON.stringify(currentUser));
    
        const index = userList.findIndex(elem => elem.id === currentUser.id);
        userList[index] = currentUser;

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

/* Summary : 2021-10-01 StoreProject 삭제 기능 추가
==================================================================================
Descriptrion : 
Type : Feat, Fix, Refactor
==================================================================================
- 삭제 버튼 추가, 삭제 기능 추가.
- deleteProductElem 함수로 bookChild Element를 지우는 기능 구현.
- deleteProductObj 함수로 상품 리스트에서 상품 객체를 지우는 기능 구현.
- 상품을 삭제하고 상품 등록을 다시 할 때 새로고침을 하지 않으면 이전 상품 리스트를 참고하는 문제가 있어 수정함.
로컬스토리지에서 값을 가져오는 코드를 상품 등록 이벤트 리스너 안으로 스코프 위치 변경함.
- userStatusUpdate 함수 코드를 간결하게 변경함. findIndex 함수를 사용하여 인덱스를 찾고,
해당 인덱스를 현재 유저의 변경된 값으로 저장하도록 수정함.
- 상품등록 페이지에서 유니크 키도 로컬스토리지에 등록하여 사용하기로 수정. 유니크 키를 로컬스토리지에 저장하지 않으면
스토어 페이지에서 상품을 삭제 후에 유니크 키가 중복될 위험이 있음.
*/

/* Summary : 2021-10-11 StoreProject 리팩토링 및 버그 수정
==================================================================================
Descriptrion : 
Type : Fix, Refactor
==================================================================================
- deleteElem 함수 삭제, deleteObj 함수로 선택한 상품 객체를 로컬 스토리지에서 삭제하고, 다시 로컬
스토리지에 저장된 값을 그려주는 방법으로 변경함.
- showInfo 함수에서 alert을 계속 사용하고 있는데, 이를 infoAlert 함수로 별도로 분리함.
- 새로고침을 했을 때 delete 기능이 정상적으로 동작하지 않음. 버튼이 그려지기 전에 이벤트 리스너가 등록되기 때문임.
이러한 문제 수정을 위해 deleteObj 함수 위치를 변경함.
- deleteObj 함수 이벤트 리스너 등록을 수행하는 함수 deleteEventSet 을 별도로 만듦.
- setBuyInfoEvent 함수는 버튼에 buy와 showInfo 함수를 등록하는 함수임.
새로고침을 했을 때 정상적으로 구매, 정보보기 버튼이 동작하지 않는 문제가 있어 paintBookChildContainer
함수가 실행될 때 같이 실행되도록 구조 변경.
- 기존에 상품등록을 할 때 이벤트 리스너 안에서 모든 걸 진행하고 있었음. 변수 생성이나 검사 등
실행되는 기능들이 많아서 가독성이 떨어지는 문제가 있었음. 이를 해결하기 위해 각 기능들을 함수로 분리함.
- 유니크 키를 체크하는 uniqueKeySet 함수 작성. 유니크키가 null 이거나 등록된 상품 리스트가 없다면 빈 리스트를 만들도록
하는 기능 추가.
- getProductList, getUniqueKey 함수 작성.
- 로컬 스토리지에 key, value를 저장하는 save 함수 작성.
- 전달된 상품 객체를 상품 리스트에 등록하는 productArrSet 함수 작성.
- 상품 객체를 리턴하는 productObjConstructor 함수 작성.
- 인풋 창을 지워주는 inputClean 함수 작성.
*/