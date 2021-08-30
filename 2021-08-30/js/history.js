// const historyMsg = function() {
//     const historyRankingId = document.querySelector("#historyRanking");
//     const totalGame = localStorage.getItem("carRanking").split(',');
    
//     for(let i = 0; i < totalGame.length; i++) {
//         const li = document.createElement('li');
//         li.textContent = totalGame[i];
//         historyRankingId.appendChild(li);
//     }
    
// };

// historyMsg();
let selectValue = '';

const recordSearch = function(matchNum) {
    let matchRanking = [];

    if(matchNum === 'one') {
        matchRanking = localStorage.getItem("match1").split(',');
        console.log(matchRanking);
    }
    else if(matchNum === 'two') {
        matchRanking = localStorage.getItem("match2").split(',');
    }
    else if(matchNum === 'three') {
        matchRanking = localStorage.getItem("match3").split(',');
    }

    return matchRanking;
};

const paintRanking = function() {
    const ranking = recordSearch(selectValue);
    const rankingEl = document.querySelector(".ranking");

    for(let i = 0; i < ranking.length; i++) {
        const carId = ranking[i];
        const carImgSrc = `${ranking[i]}.png`;

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

const modal = document.querySelector('.modal');
const recordSearchBtn = document.querySelector("button");

recordSearchBtn.addEventListener('click', function() {
    const ranking = document.querySelector(".ranking");
    ranking.textContent = '';
    recordSearch(selectValue);
    paintRanking();
    modal.classList.remove('hidden');
});

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click",function() { // eventLister를 쓸 때 매개변수 있는 함수는 이런 식으로?
    modal.classList.add('hidden');
});

modal.addEventListener("click", event => {
    const evTarget = event.target;
    if(evTarget.classList.contains("modal")) {
        modal.classList.add('hidden');
    }
});

const inputForm = document.getElementsByName("matchnum");
for(let i = 0; i < inputForm.length; i++) {
    inputForm[i].addEventListener('click',function(event) {
        selectValue = event.target.value;
        console.log(selectValue);
    });
}