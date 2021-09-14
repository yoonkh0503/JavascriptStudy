class Customer {
    constructor(id, passward, money, point, cart) {
        this.id = id;
        this.passward = passward;
        this.money = money;
        this.point = point;
        this.cart = cart;
    }

    purchase(obj) {
        if(obj.price > this.money) {
            return alert("돈이 부족합니다.");
        }
        else {
            console.log(obj + " 를 구매했습니다.");
            return this.money - obj.price;
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
};

const customer1 = new Customer("abc", "12345", 1000000, 10000, []);
const customer2 = new Customer("cde", "12345", 1000000, 10000, []);
const superUser = new SuperUser("super", 1234, true, []);

superUser.customerList.push(customer1);
superUser.customerList.push(customer2);
superUser.setUser();

const login = function() {
    const inputVal = document.querySelector("input").value;
    const form = document.querySelector("form");
    const msg = document.querySelector("#msg");
    for(const user of superUser.customerList) {
        if(user.id === inputVal) { // 로그인 성공
            form.classList.add("hidden");
            msg.textContent = user.id + " 로 로그인 되었습니다.";
        }
    }
};

const loginBtn = document.querySelector("button");
loginBtn.addEventListener('click', function(event) {
    login();
    paintProduct();
    event.preventDefault();
});
