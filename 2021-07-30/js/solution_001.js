/* 조건
1. 사용자는 가위바위보 중에 하나를 입력.
2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력.
3. 승패를 출력해줘야 함.
*/

function matchPoint(user, com)
{
    let userPoint = 0;
    let comPoint = 0;
    let msg = "";
    const x = user - com;
    if (x === -2 || x === 1) {
        // win
        msg = "유저가 이겼습니다.";
    } else if (x === -1 || x === 2) {
        // lose
        msg = "컴퓨터가 이겼습니다.";
    } else {
        // draw
        msg = "서로 비겼습니다.";
    }

    return msg;
}

function random()
{
    return Math.trunc(Math.random() * 3);
}

const arr = ['가위','바위','보'];
const checkResult = document.querySelector('#checkResult');
const comStatus = document.querySelector("#com");
const totalLink = document.getElementById("link");
const matchSearch = document.getElementById("match_search");
const result = document.querySelector("#result");

let rpsCount = 0;
let userWincnt = 0;
let comWincnt = 0;
let rpsTimes = 0;

function winLoseCount(user,com)
{
    const rpsResult = user - com;
    if (rpsResult === -2 || rpsResult === 1) {
        // win
        userWincnt++;
    }
    else if (rpsResult === -1 || rpsResult === 2) {
        // lose
        comWincnt++;
    }
    rpsTimes++;
}

const image = document.querySelectorAll("img");
let userRpsChoose = "";

function imgCheck()
{
    const s = document.querySelector('#scissors');
    const r = document.querySelector('#rock');
    const p = document.querySelector('#paper');

    [s, r, p].forEach(function (x) {
        x.style = '';
    });

    if(this.id === "scissors")
    {
        userRpsChoose = "가위";
    }
    else if(this.id === "rock")
    {
        userRpsChoose = "바위";
    }
    else if(this.id === "paper")
    {
        userRpsChoose = "보";
    }
    this.style = 'border: 5px solid red;';
}

for(let i = 0; i < image.length; i++)
{
    image[i].addEventListener('click',imgCheck);
}

checkResult.addEventListener('click', function () {
    const user = arr.indexOf(userRpsChoose);
    if(user === -1)
    {
        alert("가위,바위,보 중에 하나를 선택해주세요.");
        return;
    }

    alert(`${userRpsChoose}를 선택하셨습니다.`);
    console.log(user);
    const com = random(); // 0 ~ 2
    console.log(user, com);
    comStatus.textContent = "컴퓨터는 " + arr[com] + "를 냈습니다.";
    result.textContent = matchPoint(user,com);
    rpsCount++;
    console.log(rpsCount);
    winLoseCount(user,com);
});

matchSearch.addEventListener('click', function() {
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');

    const rpsCnt = document.getElementById("rps_cnt");
    const userCnt = document.getElementById("user_wincnt");
    const comCnt = document.getElementById("com_wincnt");

    rpsCnt.textContent = "가위바위보 진행 횟수 : " + rpsTimes;
    userCnt.textContent = "유저가 이긴 횟수 : " + userWincnt;
    comCnt.textContent = "컴퓨터가 이긴 횟수 : " + comWincnt;
});

const content = document.querySelector('.content');

content.addEventListener('click', function ()
{
    const modal = document.querySelector('.modal');
    modal.classList.add('hidden');
});

window.addEventListener('keyup', function(event)
{
    if(event.key === 'Enter')
    {
        console.log(event.key);
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
    }
});

const imgGroup = document.getElementById("rpsimage");
let time = 0;
let isPause = true;

function imgmove(times)
{
    time += times;
    imgGroup.style.marginLeft = `${time}px`;
    console.log(time);
    if(time >= 100)
    {
        isPause = false;
    }
}

setInterval(function() {
    if(isPause)
    {
        imgmove(3);
    }
},
500);

// 가위바위보 게임 개선안
// 1. 컴퓨터가 랜덤하게 내는 걸로.
// 2. 모달 디자인을 예쁘게 해보자.
// 3. 유저는 가위바위보를 선택할 수 있게.

// 숫자 야구 게임
// 숫자 야구 게임 만들어오기.