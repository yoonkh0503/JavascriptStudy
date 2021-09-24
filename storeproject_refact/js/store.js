class Book {
    constructor(name, price, writer, pageNum, publisher, uniqueKey, stockNum) {
        this.name = name;
        this.price = price;
        this.writer = writer;
        this.pageNum = pageNum;
        this.publisher = publisher;
        this.uniqueKey = uniqueKey;
        this.stockNum = stockNum;
    };

    preview() {
        console.log(`${this.name} 책의 ${this.pageNum * 0.1}쪽 만 미리 보여줍니다.`);
    }

    sell() {
        this.stockNum = this.stockNum - 1;
    }

    
};

class ForeignBook extends Book {
    constructor(name, price , writer , pageNum , translater, publisher,uniqueKey,stockNum) {
        super(name, price, writer, pageNum, publisher,uniqueKey, stockNum);
        this.translater = translater;
    }
    
    originBook() {
        console.log("원서를 출력합니다.");
    }
};

class Ebook extends Book {
    constructor(name, price, writer, pageNum, publisher, devices, uniqueKey, stockNum) {
        super(name, price, writer, pageNum, publisher, uniqueKey, stockNum);
        this.devices = devices;
    }
    devicesNotice() {
        for(const device of this.devices) {
            console.log("EBook이 지원되는 기기는 " + device + " 입니다.");
        }
    }
};

const book1 = new Book("자바의정석", 30000, "남궁성", 1300, "도우출판",1,100);
const book2 = new ForeignBook("Head First Python", 20000, "paul bedder", 700, "우정은", "한빛미디어",2,100);
const book3 = new Ebook("니체는 나체다.", 8900, "유영만", 400 ,"생각속의 집", ["아이폰","아이패드","안드로이드","PC"],3,100);
// ========================================================================================================================================

class Customer {
    constructor(id, passward, money, point, cart) {
        this.id = id;
        this.passward = passward;
        this.money = money;
        this.point = point;
        this.cart = cart;
    }

    buy(productObj) {
        if(this.money > productObj.price) {
            productObj.sell();
            this.money = this.money - productObj.price;
            console.log(productObj.name + " 를 구매했습니다.");
        }
        else {
            return alert("돈이 부족합니다.")
        }
    };
}

// buy 함수가 호출되지 않음. user.js:11 Uncaught TypeError: Cannot read property 'price' of undefined at Customer.buy
// 에러 발생.

const user1 = new Customer("abc", "1234", 100000, 0, []);


// ========================================================================================================================================

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

    findCurrentUser() {
        let currentUser;
        for(let i = 0; i < manager.userList.length; i++) {
            if(localStorage.getItem(LOGIN_USER_KEY) === manager.userList[i].id) {
                currentUser = manager.userList[i];
                console.log("currentUser", currentUser);
            }
        }
        return currentUser;
    };

    findProduct() {
        const select = document.querySelector("select");
        const selectingValue = select.options[select.selectedIndex].value;
        let selectProduct;

        for(let i = 0; i < manager.productList.length; i++) {
            if(selectingValue === String(manager.productList[i].uniqueKey)) {
                selectProduct = manager.productList[i];
                console.log("selectProduct", selectProduct);
            }
        }
        return selectProduct;
    };

    isSuper() {
        if(localStorage.getItem(LOGIN_USER_KEY) === this.id) {
            const superLink = document.querySelector("#superLink");
            superLink.classList.remove("hidden");
        }
    };

    productupdate() {
        if(localStorage.getItem("PRODUCT_SET_OFFER")) {
            const newProductArr = JSON.parse(localStorage.getItem("PRODUCT_SET_OFFER"));
            const uniqueKey = newProductArr[5];
            window['book' + uniqueKey] = new Book(
                newProductArr[0],newProductArr[1],newProductArr[2],
                newProductArr[3],newProductArr[4],newProductArr[5],
                newProductArr[6]
            );
            console.log("book4", window['book' + uniqueKey]);
            manager.productList.push(window['book' + uniqueKey]);
        }
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
        manager.productupdate();
        target.preventDefault();
        localStorage.setItem(LOGIN_USER_KEY, input.value);
        manager.isSuper();
        manager.paintProduct();
        alert("로그인 되었습니다.");
    }
    else {
        alert("가입된 유저가 아닙니다.")
    }
});

const buyBtn = document.querySelector("#buyBtn");
buyBtn.addEventListener('click', function() {
    const currentUser = manager.findCurrentUser();
    const selectProduct = manager.findProduct();
    currentUser.buy(selectProduct);

    alert(`${selectProduct.name} 을 구매했습니다. ${selectProduct.name} 의 수량은 ${selectProduct.stockNum} 개 남았습니다.`)
    alert(`제품 구매 후 잔액은 ${currentUser.money}원 입니다.`);
});


const isLogin = (function() {
    let isLogin = false;
    if(localStorage.getItem(LOGIN_USER_KEY)) {
        const loginForm = document.querySelector("#loginForm");
        loginForm.classList.add("hidden");
        isLogin = true;
    }

    if(isLogin) { 
        manager.isSuper();
        manager.paintProduct();
    }
})();
// manager.isSuper();
// manager.paintProduct();

