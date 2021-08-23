const carList = ["car1","car2","car3"];

const randomNum = function(num) {
    return Math.trunc(Math.random() * num);
};

// 숫자만 뽑아내는 함수
// 16px => 16
// 16px1 => 161
// 16px1 => 16

// px 문자를 지우는거
const removePX = function(str) {
    const startIndex = s.indexOf('px');
    str = str.substring(0, startIndex);

    return s || 0;
};

const move = function(carId) {
    const car = document.getElementById(carId);
    let left = Number(removePX(car.style.left));
    let position = randomNum(70);
    car.style.left = (left + position) + "px";

    return car;
};

//        1등, 2등, 3등
// return [2,  1,   3]
const rankingCalculate = function() {
   for(let i = 0; i < carList.length; i++) {
       for(let j = i + 1; j < carList.length; j++) {
           if(document.getElementById(carList[i]).offsetLeft < document.getElementById(carList[j]).offsetLeft) {
                const temp = carList[i];
                carList[i] = carList[j];
                carList[j] = temp;
           }
       }
   }
   return carList;
};

const randomCar = () => carList[randomNum(3)];

const modalHide = function() {
    const modal = document.querySelector(".modal");
    modal.classList.add("hidden");
    reGameBtn();
};

const close = document.querySelector("#close");
close.addEventListener("click",modalHide);

const modal = document.querySelector(".modal");
modal.addEventListener("click", event => {
    const evTarget = event.target;
    if(evTarget.classList.contains("modal")) {
        modalHide();
    }
});


const paintResult = function(ranking) {
    const result = document.querySelector('.result');

    for(let i = 0; i < ranking.length; i++) {
        const carId = document.getElementById(ranking[i]);
        const carImgSrc = carId.src;

        const carImg = document.createElement("img");
        carImg.src = carImgSrc;
        carImg.classList.add("resultCar")

        const div = document.createElement("div");
        div.appendChild(carImg);
        div.classList.add("resultCarParent")
        result.appendChild(div);
    }
};

const paintRanking = function() {
    const ranking = rankingCalculate();
    const rankingEl = document.querySelector(".ranking");

    paintResult(ranking);

    for(let i = 0; i < ranking.length; i++) {
        const carId = document.getElementById(ranking[i]);
        const carImgSrc = carId.src;
        console.log("carImgSrc : " + carImgSrc);

        const span = document.createElement("span");
        span.textContent = (i + 1) + '등';

        const carImg = document.createElement("img");
        carImg.src = carImgSrc;
        carImg.style.width = "50px";
        carImg.style.height = "50px";

        const p = document.createElement("p");
        p.appendChild(span);
        p.appendChild(carImg);

        rankingEl.appendChild(p);
    }
};


const timer = setInterval(function() {
    const car = move(randomCar());
    const finish = document.querySelector('.finish2').offsetLeft;
    console.log('finish', finish);
    if(Number(removePX(car.style.left)) >= 200) {
        console.log("랭킹 : " + rankingCalculate());
        paintRanking();
        modalHideRemove();
        clearInterval(timer);
    }
},100);

const modalHideRemove = function() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    console.log("modalHideRemove Func");
};


const reGameBtn = function() {
    const button = document.createElement("button");
    button.innerText = "재시작";
    const body = document.querySelector("body");
    body.appendChild(button);
    button.addEventListener("click", reGame);
    console.log("reGameBtn 호출!!");
};

const reGame = function() {
    for(let i = 0; i < carList.length; i++) {
        const car = document.getElementById(carList[i]);
        car.style.left = 0;
    }
    const timer = setInterval(function() {
            const finish = document.querySelector('.finish2').offsetLeft;
            const car = move(randomCar());
            if(Number(removePX(car.style.left)) >= 200) {
                console.log("랭킹 : " + rankingCalculate());
                paintRanking();
                modalHideRemove();
                clearInterval(timer);
        }
    },100);
    deleteRanking();
    deleteResult();
    const body = document.querySelector("body");
    const button = document.querySelector("button");
    body.removeChild(button);
};

const deleteRanking = function() {
    const content = document.querySelector(".content > .ranking");
    const p = document.querySelectorAll(".content > .ranking > p")
    for(let i = 0; i < p.length; i++) {
        content.removeChild(p[i]);
    }
};

const deleteResult = function() {
    const result = document.querySelector(".result");
    while(result.firstChild) { // 명확하게 표현할 수 있을까?
        result.removeChild(result.firstChild);
    }
};



/*
2021.08.24 자동차 경주 게임
1. 자동차가 움직이는 기능 구현
2. 랭킹을 계산하는 기능 구현.
3. 랜덤한 자동차가 랜덤한 수치만큼 이동하는 기능 구현.
4. 랭킹 계산하여 정렬하는 함수 구현
5. 모달로 랭킹을 보여주는 기능 구현.
6. 재시작 기능 구현. 하지만 재시작 기능에 문제가 있음. => addEventListener 가 여러번 등록되는 문제, 수정 완료.
7. 모달을 숨기는 기능을 추가적으로 구현, X 클릭 시, 디스플레이를 클릭 시 모달이 사라지도록 구현.
8. 이전 경기 내용을 지우는 함수 구현.
9. 모달창과 경기 내용을 지울 때 발생하는 버그 수정.
*/


/* 
To Do
- 모든 자동차가 경주를 마쳤을 때 게임이 끝나도록 할 수 있을지?

*/