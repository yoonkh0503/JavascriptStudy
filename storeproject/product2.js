// import { loginUser } from './customer2.js';

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
// const book2 = new Book("Head First Python", 20000, "paul bedder", 700); // 해외 책이라서, 번역자도 필요함.
const book2 = new ForeignBook("Head First Python", 20000, "paul bedder", 700, "우정은", "한빛미디어",2,100);
const book3 = new Ebook("니체는 나체다.", 8900, "유영만", 400 ,"생각속의 집", ["아이폰","아이패드","안드로이드","PC"],3,100);

const bookList = [book1,book2,book3];

const paintProduct = function() {
    const bookContainer = document.querySelector("#bookContainer");
    const selectBox = document.createElement("select");
    selectBox.name = "bookList";
    bookContainer.appendChild(selectBox);
    const buyBtn = document.querySelector("#buyBtn");
    buyBtn.classList.remove("hidden");

    for(let i = 0; i < bookList.length; i++) {
        const option = document.createElement("option");
        option.value = bookList[i].uniqueKey;
        option.textContent = bookList[i].name;
        selectBox.appendChild(option);
    }
};


/*
Summary : 2021-09-16 BookStore Project
----------------------------------------------------------------
type : Feat
Description :
----------------------------------------------------------------
- 등록한 책 리스트를 selectBox로 보여주는 기능 구현.
- Customer 클래스 구현.
- SuperUser 클래스 구현.
- Book 클래스 구현.
- Book 클래스를 상속받는 ForeignBook, Ebook 클래스 구현.
- 구매 버튼, 로그인 버튼 구현.
- 로그인 함수 구현.
- Customer.buy 함수 구현. 하지만 개선해야할 점들이 많음. 
----------------------------------------------------------------
To Do List :
- 책 구매 기능 구현, 책에서는 판매가 되었다는 동작 체크가 되야함.
- customer 쪽에서도 구매 기능 구현이 되어야함. => 완료.
- SuperUser 쪽에서 회원을 관리하고 있음. product 쪽에서도 전체 상품 리스트를 관리할 수 있어야함.
- 추후엔 책 뿐만 아니라 다른 상품들도 등록할 수 있어야 함.
- Product Class를 상속받아서 구현해볼 것.
- localStorage에서 parse or getItem 할 때 인스턴스로 저장되는 게 아닌지? 인스턴스 메소드를 못 쓰는 것으로 보임.
- product 파일에서 selling 함수 구현 필요.
*/