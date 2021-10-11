const PRODUCT_LIST = "PRODUCT_LIST";
const PRODUCT_UNIQUE_KEY = "UNIQUE_KEY";
const productSetBtn = document.querySelector("#productSetBtn");

const save = function(key, value) {
    localStorage.setItem(key, value);
};

const productArrSet = function(productObj) {
    const productArr = getProductList();
    productArr.push(productObj);
    save(PRODUCT_LIST, JSON.stringify(productArr));
};

const getProductList = () => JSON.parse(localStorage.getItem(PRODUCT_LIST));
const getUniqueKey = () => localStorage.getItem(PRODUCT_UNIQUE_KEY);

const uniqueKeySet = function(productArr) {
    if(productArr === null) {
        productArr = [];
    }

    let temp = -1;
    for(let i = 0; i < productArr.length; i++) {
        const key = productArr[i].uniqueKey;
        if(temp < key) {
            temp = key;
        }
    }

    if(getUniqueKey()) {
        temp = getUniqueKey();
    }
    if(temp === -1) {
        save(PRODUCT_UNIQUE_KEY, 1);
    } else {
        save(PRODUCT_UNIQUE_KEY, Number(temp) + 1);
    }
};

const inputClean = function() {
    const inputList = document.querySelectorAll("input");
    for(let i = 0; i < inputList.length; i++) {
        inputList[i].value = '';
    }
};

const productObjConstructor = function() {
    const name = document.querySelector("#name").value;
    const pageNum = document.querySelector("#pageNum").value;
    const price = document.querySelector("#price").value;
    const stockNum = document.querySelector("#stockNum").value;
    const uniqueKey = getUniqueKey();

    const productObj = {
        name,
        pageNum,
        price,
        stockNum,
        uniqueKey
    };

    return productObj;
};

productSetBtn.addEventListener('click', function(target) {
    target.preventDefault();
    uniqueKeySet(getProductList() );
    productArrSet(productObjConstructor() );
    inputClean();
    return alert("상품이 등록되었습니다.")

});