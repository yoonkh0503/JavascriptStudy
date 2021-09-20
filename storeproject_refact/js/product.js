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

