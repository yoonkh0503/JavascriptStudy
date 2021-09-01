const carList = ["car1","car2","car3","car4","car5"];
const randomNum = function(num) {
    return Math.trunc(Math.random() * num);
};
let playCnt = 1;

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
   localStorage.setItem(`match${playCnt}`,JSON.stringify(carList));
   return carList;
};

const randomCar = () => carList[randomNum(carList.length)];

const hide = function(className) {
    const element = document.querySelector('.' + className);
    element.classList.add("hidden");
};

const HideRemove = function(className) {
    const element = document.querySelector('.' + className);
    element.classList.remove("hidden");
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

const paintTime = function(time) {
    const TIME_RATE = 1000;
    const pTag = document.querySelector(".ranking > p");
    const timeMsg = document.createElement('h3');
    timeMsg.textContent = time / TIME_RATE + ' 초';
    pTag.appendChild(timeMsg);
}

const result = [];

const play = function () {
    const startTime = Date.now();
    let endTime = 0;
    const timer = setInterval(function() {
        const car = move(randomCar());
        const finish = document.querySelector('.finish2').offsetLeft;
        if(Number(removePX(car.style.left)) >= finish) {
            if(!result.includes(car)) {
                const temp = Date.now() - startTime;
                endTime = temp;
                result.push(car);
            }
        }
        if (result.length === carList.length) {
            paintRanking();
            paintTime(endTime);
            HideRemove("modal");
            playCnt++;
            clearInterval(timer);
            paintLink();
        }
    },100);
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

const validInput = function(value) {
    let validInput = {
        status : true,
        msg : ''
    };

    if(value === '') {
        validInput.status = false;
        validInput.msg = "값을 입력해주세요.";
    }
    else if(isNaN(value)) {
        validInput.status = false;
        validInput.msg = "숫자만 입력해주세요.";
    }
    else if(value < 1 || (value > carList.length)) {
        validInput.status = false;
        validInput.msg = "1 ~ 5 사이의 숫자를 입력해주세요.";
    }
    
    return validInput;
};

const gameInit = function() {
    const carInput = document.querySelector("#carinput");
    if(validInput(carInput.value).status) {
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
        }
        carList.length = carInput.value;
        play();
    }

    else {
        return alert(validInput(carInput.value).msg)
    }
};

const startButton = document.querySelector(".startButton");
startButton.addEventListener('click',gameInit);

const carInput = document.querySelector("#carinput");
const msg = document.querySelector("#msg");
carInput.addEventListener('keyup',function() {
    if(!validInput(carInput.value).status) {
        msg.style.color = "red";
        msg.textContent = validInput(carInput.value).msg;
    }
    else {
        msg.style.color = "green";
        msg.textContent = "올바른 값입니다."
    }
});

const paintLink = function() {
    const body = document.querySelector('body');
    const aTag = document.createElement('a');
    aTag.href = "gamehistory.html";
    aTag.textContent = "전적 검색";
    body.appendChild(aTag);
};


/*

2021.08.30 자동차 경주 게임 개선
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
- Hide, HideRemove 함수에서, getElementsClassByName 메서드를 사용하지 않고 querySelector 메서드를 사용하는 걸로 수정.
- 자동차 숫자 입력 창에서 올바른 값이 아니라면 경고 메시지를 실시간으로 보여주도록 이벤트 리스너 추가
- 1등의 경주 기록을 보여주는 기능 추가.
- validInput 함수 수정, status와 msg 필드를 가지고 있는 오브젝트를 리턴하는 것으로 수정함.
- 게임을 진행하고 나면 전적검색 페이지로 이동할 수 있는 링크 태그 추가
- 게임 결과를 localStorage에 Set 하는 기능 추가.
- 전적검색 페이지에서 radio 버튼 구현.
- 선택한 radio 버튼에 따라 각 회차 별 게임 전적을 모달에 보여주도록 기능 추가.
- 선택한 radio value 값을 가져오는 기능 추가.


Summary : 2021.09.01 localStorage 개선 및 history 페이지에서 radio 옵션이 아닌 select 옵션을 사용하도록 변경
Descriptrion :
- Type : Feat, Chore
- 전적검색 페이지에서 radio 박스 제거
- radio box 대신 select 속성으로 변경, 1개만 선택이 가능하며(태생적으로) 증가하는 matchCnt를 append를 계속 할 수 있기 때문.
- localStorage.getItem으로 배열을 넘겨주도록 함. JSON.stringify 사용.
- JSON.parse 메서드 사용하여 배열로 저장된 value 값을 배열 그대로 받아오도록 수정.
*/


/* 
To Do
- 리팩토링을 계속 생각해보자.
- 1등으로 도착한 자동차의 시간을 보여주자.
- 전적 검색 페이지를 따로 만들어서, 페이지로 이동하면 전적을 볼 수 있게 하자.
- 모든 자동차의 도착 시간이 노출되도록 => 코드 받을 것.
- 승률을 보여주는 것도 어떨까?

*/