const carList = ["car1","car2","car3","car4","car5"];
const carListLength = carList.length;

const paintOption = (function() {
    const checkBox = document.querySelector("#carSelect");
    for(let i = 0; i < carList.length; i++) {
        const option = document.createElement("option");
        option.value = i + 1;
        option.textContent = i + 1;
        checkBox.appendChild(option);
    }
}());

const randomNum = (num) => Math.trunc(Math.random() * num);

const randomCar = () => {
    const laneCnt = document.getElementsByClassName("lane");
    return carList[randomNum(laneCnt.length)];
}

const removePX = (str) => {
    const startIndex = str.indexOf('px');
    str = str.substring(0, startIndex);
    return str || 0;
};

const move = function(carId) {
    const car = document.querySelector(`#${carId}`);
    let left = Number(removePX(car.style.left));
    let position = randomNum(70);
    car.style.left = (left + position) + "px";
    return car;
}

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
};

const reGame = function() {
    for(let i = 0; i < newCarList.length; i++) {
        const car = document.getElementById(newCarList[i]);
        car.style.left = 0;
    }
    result.length = 0;
    play();
    deleteRanking();
    deleteResult();
    const body = document.querySelector("body");
    const button = document.querySelector(".reGameButton");
    const historyTag = document.querySelector("a");
    body.removeChild(button);
    body.removeChild(historyTag);
};

const reGameBtn = function() {
    const button = document.createElement("button");
    button.innerText = "재시작";
    button.classList.add("reGameButton")
    const body = document.querySelector("body");
    body.appendChild(button);
    button.addEventListener("click", reGame);
};

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

const paintLink = function() {
    const body = document.querySelector('body');
    const aTag = document.createElement('a');
    aTag.href = "gamehistory.html";
    aTag.textContent = "전적 검색";
    body.appendChild(aTag);
};

const paintTime = function(timeArr) {
    const TIME_RATE = 1000;
    for(let i = 0; i < timeArr.length; i++)
    {
        const pTags = document.querySelectorAll(".ranking > p");
        const timeMsg = document.createElement('h3');
        timeMsg.textContent = timeArr[i] / TIME_RATE + ' 초';
        pTags[i].appendChild(timeMsg);
    }
};

const newCarList = [];
const historyKey = [];
const rankingCalculate = function() {
    const laneCnt = document.getElementsByClassName("lane");
    for(let i = 0; i < laneCnt.length; i++) {
        newCarList[i] = carList[i];
    }

    for(let i = 0; i < newCarList.length; i++) {
        for(let j = i + 1; j < newCarList.length; j++) {
            if(document.getElementById(newCarList[i]).offsetLeft < document.getElementById(newCarList[j]).offsetLeft) {
                 const temp = newCarList[i];
                 newCarList[i] = newCarList[j];
                 newCarList[j] = temp;
            }
        }
    }
    historyKey.push([...newCarList]);
    localStorage.setItem("historyKey",JSON.stringify(historyKey));
    return newCarList;
 };

const result = [];
const play = function () {
    const startTime = Date.now();
    const endTimeArr = [];
    const finish = document.querySelector('.finish2').offsetLeft;
    const laneCnt = document.getElementsByClassName("lane");
    const timer = setInterval(function() {
        const car = move(randomCar());
        if(Number(removePX(car.style.left)) >= finish) {
            if(!result.includes(car)) {
                const temp = Date.now() - startTime;
                endTimeArr.push(temp);
                result.push(car);
            }
        }
        if (result.length === laneCnt.length) {
            paintRanking();
            paintTime(endTimeArr);
            hideRemove("resultmodal");
            clearInterval(timer);
            paintLink();
        }
    },100);
};
const hide = (className) => {
    const changeClass = document.querySelector('.' + className);
    changeClass.classList.add("hidden");
};

const hideRemove = (className) => {
    const changeClass = document.querySelector('.' + className);
    console.log(changeClass,"changeClass");
    changeClass.classList.remove("hidden");
};


const gameInit = function() {
    const carSelectValue = document.querySelector("#carSelect").value;
    const lanes = document.getElementsByClassName("lane");
    hide("modal");
    hideRemove("container");
    
    for(let i = carListLength; i > Number(carSelectValue); i--) {
        lanes[i - 1].remove();
    }
    play();
};

const startButton = document.querySelector(".startButton");
startButton.addEventListener('click',gameInit);

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click",function() { 
    hide("resultmodal");
});

const resultmodal = document.querySelector(".resultmodal");
resultmodal.addEventListener("click", event => {
    const evTarget = event.target;
    if(evTarget.classList.contains("resultmodal")) {
        hide("resultmodal");
    }
});


/* 2021.09.06 레이싱 게임 리팩토링 수정 내용

- 전역변수 playCnt 삭제, historyKey 라는 이름으로 localStorage에 저장할 것이기 때문에 게임 플레이 카운트를
사용할 필요 없음.

- move 함수에서 const car = document.getElementById(carId) 를 const car = document.querySelector(`#${carId}`) 로
변경, getElementById 메서드 대신 querySelector 메서드 사용을 지향하는 방향으로 수정.

- rankingCalculate 함수 사용을 위해 전역변수 newCarList 를 추가.
이유는, 전역변수인 carList 변수 원본을 유지하고 싶었음.
이전 rankingCalculate 함수를 사용하면 carList 변수가 변경되는데, carList 변수 원본은 그대로 유지,
유저가 입력한 자동차 대수만큼의 자동차 랭킹을 기록하는 새로운 변수가 필요했음.

- paintTime 함수 파라미터는 timeArr로 변경함.
이유는 play 함수에서 entTimeArr 이라는 변수에 1등 ~ 마지막 등수까지의 시간을 저장하는 변수를 사용하기로 수정.
timeArr 파라미터의 length 만큼 반복하여 결과 창에서 각 등 수 별 시간을 보여주도록 수정함.

- play 함수에서 carList.length 메서드를 사용하지 않고, laneCnt 변수를 사용하도록 변경.
const laneCnt = document.getElementsByClassName("lane");
자동차 대수 입력이 유저가 직접 입력하지 않고 셀렉트 박스로 변경되었기 때문에, 유저가 선택한 자동차 대수만큼
lane이 셋팅되고 있음.
lane의 개수가 곧 자동차의 대수이므로 lane class의 개수를 조건으로 변경함.

- gameInit 함수에서 car 와 lane을 셋팅해주던 부분 제거.
리팩토링 전엔 car와 lane이 셋팅되지 않은 상태이나, 현재는 car와 lane이 셋팅된 상태에서
입력한 값만큼 지워주고 있으므로, gameInit 함수에서 car와 lane 셋팅 필요가 없음.

- gameInit 함수에서 유저가 입력한 값만큼 자동차가 셋팅되도록 하는 기능 추가.
for문에서 초기값을 carList.length로 설정, 만약 유저가 3을 입력했다면 car1,2,3 만 셋팅이 되어야함.
const lanes = document.getElementsByClassName("lane");
lanes 변수는 배열이므로, 역순으로 lane 클래스로 설정된 elements들을 지우도록 기능 추가.
*/