// let loginUser = '';

// export default {loginUser};

class Customer {
    constructor(id, passward, money, point, cart) {
        this.id = id;
        this.passward = passward;
        this.money = money;
        this.point = point;
        this.cart = cart;
    }

    buy(selectingProduct) { // product의 재고도 차감해줘야함.
        const userSelectText = selectingProduct;
        const productList = JSON.parse(localStorage.getItem("productList")); // localStorage에 있는 걸 가져오면 인스턴스가 아닌가?
        let buyingProduct = '';

        for(let i = 0; i < productList.length; i++) {
            if(userSelectText === productList[i].name) {
                buyingProduct = productList[i];
                console.log(this.id + " 유저가 " + buyingProduct.name + " 을 구매했습니다.");
                console.log(buyingProduct.stockNum + " 수량이 남았습니다.");
                return buyingProduct;
            }
        }
    }

    cart(obj) {
        console.log(obj + " 를 장바구니에 담았습니다.");
    }
};

class SuperUser {
    constructor(superId, passward, authority, customerList) {
        this.superId = superId;
        this.passward = passward;
        this.authority = authority;
        this.customerList = customerList;
    }
    setUser() { // 회원가입
        for(let i = 0; i < this.customerList.length; i++) {
            localStorage.setItem("userList", JSON.stringify(this.customerList));
        }
    };

    setProduct(productList) {
        for(let i = 0; i < productList.length; i++) {
            localStorage.setItem("productList", JSON.stringify(productList));
        }
    }
};

const customer1 = new Customer("abc", "12345", 1000000, 10000, []);
const customer2 = new Customer("cde", "12345", 1000000, 10000, []);
const superUser = new SuperUser("super", 1234, true, []);

superUser.customerList.push(customer1);
superUser.customerList.push(customer2);
superUser.setUser();
superUser.setProduct(bookList);

const login = function() {
    const inputVal = document.querySelector("input").value;
    const form = document.querySelector("form");
    const msg = document.querySelector("#msg");
    for(const user of superUser.customerList) {
        if(user.id === inputVal) { // 로그인 성공
            form.classList.add("hidden");
            msg.textContent = user.id + " 로 로그인 되었습니다.";
            localStorage.setItem("loginUser", JSON.stringify(user));
        }
    }
};

const loginBtn = document.querySelector("button");
loginBtn.addEventListener('click', function(event) {
    login();
    paintProduct();
    event.preventDefault();
});

const buyBtn = document.querySelector("#buyBtn");
buyBtn.addEventListener('click', function() {
    const select = document.querySelector("select");
    const selectingText = select.options[select.selectedIndex].text;
    customer1.buy(selectingText);
});

// setTimeout(function() {
//     localStorage.removeItem("loginUser");
// },10000);
