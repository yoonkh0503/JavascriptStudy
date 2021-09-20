const LOGIN_USER_KEY = "loginUser";

class SuperUser {
    constructor(auth, id, password) {
        this.auth = auth;
        this.id = id;
        this.password = password;
        this.userList = [];
        this.productList = [];
    };

    signUp(userObj) {
        this.userList.push(userObj);
    };

    setProduct(productObj) {
        this.productList.push(productObj);
    };

    loginCheck() {
        const input = document.querySelector("#loginInput");
        if(input.value === this.id) {
            return true;
        }
        
        for(let i = 0; i < this.userList.length; i++) {
            if(this.userList[i].id === input.value) {
                return true;
            }
        }
    };
    
    paintProduct() {
        const bookContainer = document.querySelector("#bookContainer");
        const selectBox = document.createElement("select");
        selectBox.name = "productList";
        bookContainer.appendChild(selectBox);
        bookContainer.classList.remove("hidden");

        for(let i = 0; i < this.productList.length; i++) {
            const option = document.createElement("option");
            option.value = this.productList[i].uniqueKey;
            option.textContent = this.productList[i].name;
            selectBox.appendChild(option);
        }
        const loginForm = document.querySelector("#loginForm");
        loginForm.classList.add("hidden");
    };
};

const manager = new SuperUser(true, 'super','1234');

manager.setProduct(book1);
manager.setProduct(book2);
manager.setProduct(book3);
console.log(manager.productList);
manager.signUp(user1);

const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener('click', function(target) {
    const input = document.querySelector("#loginInput");
    if(manager.loginCheck()) {
        target.preventDefault();
        localStorage.setItem(LOGIN_USER_KEY, input.value);
        manager.paintProduct();
        alert("로그인 되었습니다.");
    }
    else {
        alert("가입된 유저가 아닙니다.")
    }
})

const isLogin = (function() {
    if(localStorage.getItem(LOGIN_USER_KEY)) {
        const loginForm = document.querySelector("#loginForm");
        loginForm.classList.add("hidden");
        manager.paintProduct();
    }
})();

const buyBtn = document.querySelector("#buyBtn");
buyBtn.addEventListener('click', function() {
    const select = document.querySelector("select");
    const selectingValue = select.options[select.selectedIndex].value;
    let currentUser;
    let selectProduct;

    for(let i = 0; i < manager.userList.length; i++) {
        if(localStorage.getItem(LOGIN_USER_KEY) === manager.userList[i].id) {
            currentUser = manager.userList[i];
            console.log("currentUser", currentUser);
        }
    }

    for(let i = 0; i < manager.productList.length; i++) {
        if(selectingValue === String(manager.productList[i].uniqueKey)) {
            selectProduct = manager.productList[i];
            console.log("selectProduct", selectProduct);
        }
    }

    selectProduct.sell();
    console.log(selectProduct.stockNum);
    currentUser.money = currentUser.money - selectProduct.price
    alert(`${selectProduct.name} 을 구매했습니다. ${selectProduct.name} 의 수량은 ${selectProduct.stockNum} 개 남았습니다.`)
    alert(`제품 구매 후 잔액은 ${currentUser.money}원 입니다.`);
});