const PRODUCT_SET_OFFER = "PRODUCT_SET_OFFER";
const productUpdateOffer = function() {
    const productSetArr = [];
    const productName = document.querySelector("#product_name").value;
    const productPrice = document.querySelector("#product_price").value;
    const productWriter = document.querySelector("#product_writer").value;
    const product_pageNum = document.querySelector("#product_pageNum").value;
    const product_publisher = document.querySelector("#product_publisher").value;
    const product_uniqueKey = document.querySelector("#product_uniqueKey").value;
    const product_stockNum = document.querySelector("#product_stockNum").value;

    productSetArr.push(productName);
    productSetArr.push(productPrice);
    productSetArr.push(productWriter);
    productSetArr.push(product_pageNum);
    productSetArr.push(product_publisher);
    productSetArr.push(product_uniqueKey);
    productSetArr.push(product_stockNum);
    
    console.log("productSetArr", productSetArr);
    localStorage.setItem(PRODUCT_SET_OFFER, JSON.stringify(productSetArr));
};

const productSetBtn = document.querySelector("#productSetBtn");
productSetBtn.addEventListener('click', productUpdateOffer);