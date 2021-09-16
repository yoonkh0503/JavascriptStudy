const CAR_DEFAULT_SPEED = 20;
const CAR_MAX_SPEED = 40;
const container = document.querySelector(".container");

const paintGameHelpMsg = (function() {
    const helpContentChildren = document.querySelector("#startContent").children;
    let count = 0;
    const intervalId = setInterval(() => {
        helpContentChildren[count].classList.remove("hidden");
        count++;
        if(count > 4) {
            clearInterval(intervalId);
        }
    }, 2000);

    const startModal = document.querySelector("#startModal");
    const gameStartBtn = document.querySelector("#startButton");
    gameStartBtn.addEventListener('click', function() {
        container.classList.remove("hidden");
        startModal.classList.add("hidden");
    })
})();

class TrafficLight {
    constructor(color) {
        this.colorTag = document.querySelector(`.${color}`)
    }
    toggle() {
        this.colorTag.classList.toggle('off');
    };
    on() {
        this.colorTag.classList.remove('off');
    };
    off() {
        this.colorTag.classList.add('off');
    };
};

const red = new TrafficLight('red');
const orange = new TrafficLight('orange');
const green = new TrafficLight('green');

const trafficLight = [red, orange, green];
let light = trafficLight.shift(); // trafficLight[0]; 차이는?
light.on();

let second = 500;
let count = 0;
let intervalId = setInterval(function () {
    count++;
    if (count > 5) {
      light.toggle();
    }

    if (count > 15) {
      count = 0;
      light.off();
      trafficLight.push(light);
      light = trafficLight.shift();
      light.on();
      console.log("light status : " + light.colorTag.classList);
    }
  }, second);

// 24 ~ 40 라인을 함수로 만들거나 객체로 만들 수 있을까?


const removePX = (str) => {
    const startIndex = str.indexOf('px');
    str = str.substring(0, startIndex);
    return str || 0;
};

class Car {
    constructor(name, speed) {
        this.name = name;
        this.speed = speed;
    };

    move() {
        const car = document.querySelector(`#car`);
        let left = Number(removePX(car.style.left));
        let position = this.speed;
        console.log("this.speed = " + this.speed);
        return car.style.left = (left + position) + "px";
    };
    
    boostOn = () => {
        if(this.speed < CAR_MAX_SPEED)
        {
            this.speed = CAR_DEFAULT_SPEED * 2;
        }

        return this.speed;
    };
    
    // boostOn() {
    //     this.speed = this.speed * 2;
    // }

    boostOff = () => this.speed = CAR_DEFAULT_SPEED;

    // boostOff() {
    //     this.speed = this.speed / 2;
    // }
    // speed 파라미터를 메서드에서 사용할 수 없음.
    // this 가 Window를 가리키는 경우는 뭐지?
};

const car = new Car("ferrari", CAR_DEFAULT_SPEED);
const modal = document.querySelector("#endModal");

const reStartBtn = document.querySelector("#reStartBtn");
const carImg = document.querySelector("#car");
const body = document.querySelector("body");

window.addEventListener('keydown', function(target) {
    const isRedLight = light.colorTag.className.includes('red');
    const isFinish = document.querySelector(".finish2").offsetLeft < carImg.offsetLeft
    if(target.ctrlKey === true) {
        if(modal.classList.contains('hidden')) {
            car.move();
        }
        // console.log(light.colorTag.className.includes('red')); // 빨간불인 상태.

        if(isRedLight || isFinish) {
            gameOver();
        }
    }

    if(target.shiftKey === true) {
        car.boostOn();
        boostNotice.classList.remove("hidden");
        setTimeout(car.boostOff, 2000);
        setTimeout(function() {
            boostNotice.classList.add("hidden");
        } , 2000);
    }
});

const gameOver = function() { // 빨간불에서 움직여서 게임이 끝날 때 or 자동차가 피니쉬 라인을 통과했을 때 호출되는 함수
    modal.classList.remove("hidden");
    container.classList.add("hidden");
};

const gameRestart = function() {
    container.classList.remove("hidden");
    modal.classList.add("hidden");
    carImg.style.left = 0;
};

reStartBtn.addEventListener('click', gameRestart);

const boostNotice = document.createElement("h1");
boostNotice.textContent = "부스트 ON!"
body.appendChild(boostNotice);
boostNotice.classList.add("hidden");


/* To Do
- 빨간불인 상태일 때 이동하게 되면 게임 종료되는 기능 구현해야함.
- 자동차가 finish Line을 넘으면 게임이 종료되는 기능 구현해야함.
- 게임설명 및 난이도를 고를 수 있도록 모달 추가해야함.
- 재시작 기능 구현해야함.
*/

























/* 
Summary : 2021.09.14 신호등 레이싱 게임
------------------------------------------------------------------------
Description
- Type : Feat
- 빨간불인 상태일 때 이동하게 되면 게임 종료되는 기능 구현.
- 자동차 이미지가 Finish Line을 통과하면 게임이 종료되는 기능 구현.
- 게임 종료 후 재시작 할 수 있도록 재시작 기능 구현.
- ctrl , shift 키 입력 시 자동차가 움직이도록, 부스트 기능을 사용하는 기능 구현.
------------------------------------------------------------------------
- Type : Refact
- 이전에 구현되어있는 신호등 파일을 가져와서 해당 파일에서 다시 구현함.
- 신호등을 클래스 생성자를 이용해 인스턴스로 사용하도록 수정함.
- 자동차를 클래스 생성자를 이용해 인스턴스로 사용하도록 수정함.
------------------------------------------------------------------------
To Do List
- 게임설명 및 난이도를 선택할 수 있는 모달 창 추가
- 부스트 기능 개선이 필요함. 현재 shift키를 누를때마다 스피드가 증가하는 문제가 있음.
setter와 getter가 필요할지 고려해야함.
*/

/*
Summary : 2021.09.17 신호등 레이싱 게임
------------------------------------------------------------------------
Description
- type : Feat
- 게임 첫 시작 시 게임에 대한 설명을 해주는 paintGameHelpMsg 함수 구현.
- 부스트 사용 시 부스트 On이 되었다는 메시지가 출력되는 기능 구현.
------------------------------------------------------------------------
- type : Fix
- Shift 키를 누르면 부스트 모드가 되는데, 이때 단순히 this.speed * 2 로 처리를 해주고 있음.
이렇게 되면 shift키를 계속 누르면 속도가 끝없이 증가하기 때문에 CAR_MAX_SPEED , CAR_DEFAULT_SPEED
변수를 만들어서 사용함. 부스트가 되면 CAR_MAX_SPEED 만큼 증가할 수 없도록, 부스트 모드가 끝나면
CAR_DEFAULT_SPEED 로 돌아오도록 수정함.
- 게임 시작 시 도움말을 보여주는 기능을 추가하였는데, 같은 css 클래스를 사용하다보니 게임 종료 모달창도 도움말 모달로
노출되는 문제가 발생함.
해당 문제 수정을 위해 도움말 모달, 도움말 콘텐트, 도움말 모달 게임시작 버튼, 게임 종료 모달, 게임종료 후 재시작 버튼 Element에
id를 부여함.
*/