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
    }
}

// buy 함수가 호출되지 않음. user.js:11 Uncaught TypeError: Cannot read property 'price' of undefined at Customer.buy
// 에러 발생.

const user1 = new Customer("abc", "1234", 100000, 0, []);