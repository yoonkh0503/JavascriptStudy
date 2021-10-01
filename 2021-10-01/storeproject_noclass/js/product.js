const PRODUCT_LIST = "PRODUCT_LIST";
const PRODUCT_UNIQUE_KEY = "UNIQUE_KEY";

const productSetBtn = document.querySelector("#productSetBtn");

productSetBtn.addEventListener('click', function(target) {
    target.preventDefault();
    let productArr = JSON.parse(localStorage.getItem(PRODUCT_LIST));
    let uniqueKey = localStorage.getItem(PRODUCT_UNIQUE_KEY);

    if(productArr === null) {
        productArr = [];
    }

    if(uniqueKey === null) {
        uniqueKey = 1;
    }

    const name = document.querySelector("#name");
    const pageNum = document.querySelector("#pageNum");
    const price = document.querySelector("#price");
    const stockNum = document.querySelector("#stockNum");

    const productObj = {
        name : name.value, 
        pageNum : pageNum.value,
        price : price.value,
        stockNum : stockNum.value,
        uniqueKey : uniqueKey
    };

    uniqueKey++;
    productArr.push(productObj);
    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productArr));
    const inputList = document.querySelectorAll("input");
    localStorage.setItem(PRODUCT_UNIQUE_KEY, uniqueKey);

    for(let i = 0; i < inputList.length; i++) {
        inputList[i].value = '';
    }
    return alert("상품이 등록되었습니다.")

});

