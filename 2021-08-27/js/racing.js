let carList = ["car1","car2","car3","car4","car5"];
const randomNum = function(num) {
    return Math.trunc(Math.random() * num);
};

// 숫자만 뽑아내는 함수
// 16px => 16
// 16px1 => 161
// 16px1 => 16

// px 문자를 지우는거
const removePX = function(str) {
    const startIndex = str.indexOf('px');
    str = str.substring(0, startIndex);

    return str || 0;
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



const randomCar = () => carList[randomNum(carList.length)];

const hide = function(className) {
    const element = document.getElementsByClassName(className);
    console.log(element[0].classList);
    element[0].classList.add("hidden");
    // reGameBtn();
};

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click",function() {
    hide("modal");
});



const modal = document.querySelector(".modal");
modal.addEventListener("click", event => {
    const evTarget = event.target;
    if(evTarget.classList.contains("modal")) {
        hide("modal");
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
    reGameBtn();
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

const result = [];

const play = function () {
    const timer = setInterval(function() {
        const car = move(randomCar());
        const finish = document.querySelector('.finish2').offsetLeft;
        if(Number(removePX(car.style.left)) >= finish) {
            if (!result.includes(car)) {
                result.push(car);
            }
        }
        if (result.length === carList.length) {
            paintRanking();
            HideRemove("modal");
            clearInterval(timer);
        }
    },100);
}

const HideRemove = function(className) {
    const element = document.getElementsByClassName(className);
    console.log(element[0].classList);
    element[0].classList.remove("hidden");
    // const modal = document.querySelector(".modal");
    // modal.classList.remove("hidden");
    // console.log("modalHideRemove Func");
};

const reGameBtn = function() {
    const button = document.createElement("button");
    button.innerText = "재시작";
    button.classList.add("reGameButton")
    const body = document.querySelector("body");
    body.appendChild(button);
    button.addEventListener("click", reGame);
    console.log("reGameBtn 호출!!");
};

const reGame = function() {
    for(let i = 0; i < carList.length; i++) {
        const car = document.getElementById(carList[i]);
        car.style.left = 0;
        // console.log(car.id, car.style.left);
    }
    result.length = 0;
    play();
    deleteRanking();
    deleteResult();
    const body = document.querySelector("body");
    const button = document.querySelector(".reGameButton");
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
    result.textContent = '';
    // while(result.firstChild) { // 명확하게 표현할 수 있을까?
    //     result.removeChild(result.firstChild);
    // }
};

const changeCarList = function() {
    const carInput = document.querySelector("#carinput");
    const newCarList = [];
    for(let i = 1; i < Number(carInput.value) + 1; i++) {
        newCarList.push(`car${i}`);
    }
    console.log("newCarList : " + newCarList);
    return newCarList;
};

const gameInit = function() {
    const carInput = document.querySelector("#carinput");
    if(carInput.value === '') {
        return alert("자동차 숫자를 입력하세요.");
    }

    if(isNaN(carInput.value)) {
        return alert("숫자만 입력해주세요.");
    }

    hide("gameStartModal");

    for(let i = 1; i < Number(carInput.value) + 1; i++) {
        const makeLane = document.createElement('div');
        makeLane.classList.add('lane');

        const carImg = document.createElement('img');
        carImg.src = `car${i}.png`;
        carImg.id = carList[i - 1];
        carImg.classList.add("carSize");

        makeLane.appendChild(carImg);
        const container = document.querySelector('.container');
        container.appendChild(makeLane);
        console.log("carList : " , carList);
    }
    carList = changeCarList();
    play();
};

const startButton = document.querySelector(".startButton");
startButton.addEventListener('click',gameInit);




/*

2021.08.27 자동차 경주 게임
1. 자동차가 움직이는 기능 구현
2. 랭킹을 계산하는 기능 구현.
3. 랜덤한 자동차가 랜덤한 수치만큼 이동하는 기능 구현.
4. 랭킹 계산하여 정렬하는 함수 구현
5. 모달로 랭킹을 보여주는 기능 구현.
6. 재시작 기능 구현. 하지만 재시작 기능에 문제가 있음. => addEventListener 가 여러번 등록되는 문제, 수정 완료.
7. 모달을 숨기는 기능을 추가적으로 구현, X 클릭 시, 디스플레이를 클릭 시 모달이 사라지도록 구현.
8. 이전 경기 내용을 지우는 함수 구현.
9. 모달창과 경기 내용을 지울 때 발생하는 버그 수정.
- 모든 자동차가 경주를 마쳤을 때 게임이 끝나도록 개선.
- 게임 시작 버튼을 눌렀을 때 게임이 시작하도록 기능 추가 구현.
- 자동차 대수를 입력 받는 기능 및 모달 창 구현.
*/


/* 
To Do
- 모든 자동차가 경주를 마쳤을 때 게임이 끝나도록 할 수 있을지?

*/