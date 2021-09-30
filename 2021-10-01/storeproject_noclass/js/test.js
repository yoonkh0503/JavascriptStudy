const USER_LIST = "USER_LIST";
const CURRENT_LOGIN_USER = "CURRENT_LOGIN_USER";
const PRODUCT_LIST = "PRODUCT_LIST";

class Product {
    constructor(name, pageNum, price, stockNum, uniqueKey) {
        this.name = name;
        this.pageNum = pageNum;
        this.price = price;
        this.stockNum = stockNum;
        this.uniqueKey = uniqueKey;
    }
}

const testProductArr = [];

const testProduct1 = new Product(
    "자바의정석",
    "2000",
    "20000",
    "100",
    1
);

const testProduct2 = new Product(
    "모던자바스크립트 딥다이브",
    "1000",
    "15000",
    "100",
    2
);

const testProduct3 = new Product(
    "모던자바스크립트 입문",
    "800",
    "18000",
    "100",
    3
);

const testProduct4 = new Product(
    "혼자 공부하는 자바스크립트",
    "500",
    "13000",
    "100",
    4
);

const testProduct5 = new Product(
    "Head First Python",
    "700",
    "22000",
    "100",
    5
);

const testProduct6 = new Product(
    "수학의정석",
    "500",
    "25000",
    "100",
    6
);

testProductArr.push(testProduct1);
testProductArr.push(testProduct2);
testProductArr.push(testProduct3);
testProductArr.push(testProduct4);
testProductArr.push(testProduct5);
testProductArr.push(testProduct6);


localStorage.setItem(PRODUCT_LIST,JSON.stringify(testProductArr));

class User {
    constructor(id, nickName, money) {
        this.id = id;
        this.nickName = nickName;
        this.money = money;
    }
}

const testUserArr = [];

const testUser1 = new User(
    "test1",
    "abc",
    "1000000"
);

const testUser2 = new User(
    "test2",
    "def",
    "1000000"
);

const testUser3 = new User(
    "test3",
    "ghi",
    "1000000"
);

const testUser4 = new User(
    "test4",
    "jkl",
    "1000000"
);

const testUser5 = new User(
    "test5",
    "mno",
    "1000000"
);

testUserArr.push(testUser1);
testUserArr.push(testUser2);
testUserArr.push(testUser3);
testUserArr.push(testUser4);
testUserArr.push(testUser5);

localStorage.setItem(USER_LIST, JSON.stringify(testUserArr));