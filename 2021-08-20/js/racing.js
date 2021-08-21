const carList = ["car1","car2","car3"];

const randomNum = function(num) {
    return Math.trunc(Math.random() * num);
}

// 숫자만 뽑아내는 함수
// 16px => 16
// 16px1 => 161
// 16px1 => 16

// px 문자를 지우는거
const removePX = function(s) {
    const startIndex = s.indexOf('px');
    s = s.substring(0, startIndex);

    return s || 0;
}

const move = function(carId) {
    const car = document.getElementById(carId);
    let left = Number(removePX(car.style.left));
    let position = randomNum(20);
    car.style.left = (left + position) + "px";

    return car;
}

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

const closeClick = function() {
    const close = document.querySelector("#close");
    close.addEventListener("click",modalHide);
};

const displayClick = function() {
    const modal = document.querySelector(".modal");
    modal.addEventListener("click", event => {
        const evTarget = event.target;
        if(evTarget.classList.contains("modal")) {
            modalHide();
        }
    })
};

const paintRanking = function() {
    const ranking = rankingCalculate();
    const content = document.querySelector(".content");
    for(let i = 0; i < ranking.length; i++) {
        const carId = document.getElementById(ranking[i]);
        const carImgSrc = carId.src;
        console.log("carImgSrc : " + carImgSrc);
        const carImg = document.createElement("img");
        carImg.src = carImgSrc;
        carImg.style.width = "50px";
        carImg.style.height = "50px";
        content.appendChild(carImg);
    }
};

const timer = setInterval(function() {
    const car = move(randomCar());
    if(Number(removePX(car.style.left)) >= 200) {
        console.log("랭킹 : " + rankingCalculate());
        paintRanking();
        modalHideRemove();
        closeClick();
        displayClick();
        clearInterval(timer);
    }
},100);

const modalHideRemove = function() {
    const modal = document.querySelector(".modal");
    modal.classList.remove("hidden");
    console.log("!!!!");
};

const modalHide = function() {
    const modal = document.querySelector(".modal");
    modal.classList.add("hidden");
    reGameBtn();
};

const reGameBtn = function() {
    const button = document.createElement("button");
    button.innerText = "재시작";
    const body = document.querySelector("body");
    body.appendChild(button);
    button.addEventListener("click", reGame);
    console.log("reGameBtn 호출!!");
}

const reGame = function() {
    for(let i = 0; i < carList.length; i++) {
        const car = document.getElementById(carList[i]);
        car.style.left = 0;
    }
    const timer = setInterval(function() {
            const car = move(randomCar());
            if(Number(removePX(car.style.left)) >= 200) {
                console.log("랭킹 : " + rankingCalculate());
                console.log(Array.isArray(rankingCalculate()))
                paintRanking();
                modalHideRemove();
                closeClick();
                displayClick();
                clearInterval(timer);
        }
    },100);
    deleteRanking();
    const body = document.querySelector("body");
    const button = document.querySelector("button");
    body.removeChild(button); // 버튼이 2개 씩 생김;;
};

const deleteRanking = function() {
    for(let i = 0; i < carList.length; i++) {
        const car = document.querySelector(".modal > .content img");
        const content = document.querySelector(".content");
        content.removeChild(car);
    }
};



/*
2021.08.20 자동차 경주 게임
1. 자동차가 움직이는 기능 구현
2. 랭킹을 계산하는 기능 구현.
3. 랜덤한 자동차가 랜덤한 수치만큼 이동하는 기능 구현.
4. 랭킹 계산하여 정렬하는 함수 구현
5. 모달로 랭킹을 보여주는 기능 구현.
6. 재시작 기능 구현. 하지만 재시작 기능에 문제가 있음.
7. 모달을 숨기는 기능을 추가적으로 구현, X 클릭 시, 디스플레이를 클릭 시 모달이 사라지도록 구현.
*/

/* 
To Do
- 1등이 누구인지 실시간으로 알려주는 기능
- 랭킹을 계산해주는 기능 보충이 더 필요함. => 완료.
- 모달과 버튼을 만들어서 재시작이 가능하도록 기능 구현 => 우선 모달은 구현완료.
- 초기화 기능 => 부분적으로 완료.
- 모달 버튼으로 랭킹을 확인할 수 있도록 하자. => 완료.
- 화면 하단에 1등,2등,3등을 보여줬으면 좋겠음.
- 게임 재시작 기능을 개선해보자.
- 랭킹 기능도 도착 순서대로 수정할 수 있을지?
- 이미지 아래에 보이도록? 전 게임 결과가 아래에 보이도록.
*/