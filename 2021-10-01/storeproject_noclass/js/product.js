const PRODUCT_LIST = "PRODUCT_LIST";
let uniqueKeyValue = 1;
let productArr = JSON.parse(localStorage.getItem(PRODUCT_LIST));

if(productArr === null) {
    productArr = [];
}

const productSetBtn = document.querySelector("#productSetBtn");

productSetBtn.addEventListener('click', function(target) {
    target.preventDefault();

    const name = document.querySelector("#name");
    const pageNum = document.querySelector("#pageNum");
    const price = document.querySelector("#price");
    const stockNum = document.querySelector("#stockNum");

    const productObj = {
        name : name.value, 
        pageNum : pageNum.value,
        price : price.value,
        stockNum : stockNum.value,
        uniqueKey : uniqueKeyValue
    };

    uniqueKeyValue++;
    productArr.push(productObj);
    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productArr));
    const inputList = document.querySelectorAll("input");

    for(let i = 0; i < inputList.length; i++) {
        inputList[i].value = '';
    }
     
    // else {
    //     return alert("중복되는 품번이 있습니다. 품번을 다시 확인해주세요.");
    // }
    return alert("상품이 등록되었습니다.")

});

// const UniqueKeyCheck = function(uniqueKey) {
//     const productList = JSON.parse(localStorage.getItem(PRODUCT_LIST));

//     if(productList === null) {
//         return true;
//     }

//     for(let i = 0; i < productList.length; i++) {
//         if(uniqueKey === productList[i].uniqueKey) {
//             return false;
//         }
//     }
//     return true;
// }