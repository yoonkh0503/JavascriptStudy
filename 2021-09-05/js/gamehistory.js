const resultmodal = document.querySelector('.resultmodal');
const matchCnt = JSON.parse(localStorage.getItem('historyKey')).length;

const closeButton = document.querySelector("#close");
closeButton.addEventListener("click",function() { // eventLister를 쓸 때 매개변수 있는 함수는 이런 식으로?
    resultmodal.classList.add('hidden');
});

resultmodal.addEventListener("click", event => {
    const evTarget = event.target;
    if(evTarget.classList.contains("resultmodal")) {
        resultmodal.classList.add('hidden');
    }
});

const paintSelectOpt = (function() {
    const selectBox = document.querySelector('select');
    
    for(let i = 0; i < matchCnt; i++) {
        const selectOpt = document.createElement('option');
        selectOpt.value = i;
        selectOpt.textContent = String(i + 1);
        selectBox.appendChild(selectOpt);
    }
})();

const paintRanking = function() {
    const ranking = JSON.parse(localStorage.getItem("historyKey"));
    console.log("ranking", ranking);
    const rankingEl = document.querySelector(".ranking");

    for(let i = 0; i < ranking[rankingSearch()].length; i++) {
        const carId = ranking[rankingSearch()][i];
        const carImgSrc = `${carId}.png`;

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



const recordSearchBtn = document.querySelector("button");

const rankingSearch = function() {
    const selectList = document.querySelector("select");
    const ranking = selectList.options[selectList.selectedIndex].value;
    return ranking;
};

recordSearchBtn.addEventListener('click',function() {
    const ranking = document.querySelector('.ranking');
    ranking.textContent = '';
    paintRanking();
    resultmodal.classList.remove('hidden');
});