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

checkResult.addEventListener('click', function () {
    const user = arr.indexOf(document.getElementById('rps').value); // 1
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

// 로그인 기능 구현
const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const rpsForm = document.querySelector("#rps-form");
const rpsButton = document.querySelector("#rps-button");
const HIDDENKEY = "hidden";
const USERKEY = "user";

function loginSubmit(event)
{
    event.preventDefault();
    const username = loginInput.value;
    loginForm.classList.add(HIDDENKEY);
    localStorage.setItem(USERKEY, username);
    rpsButtonUp();
}

function rpsButtonUp()
{
    rpsForm.classList.remove(HIDDENKEY);
    rpsButton.classList.remove(HIDDENKEY);
    const greet = document.querySelector("h2");
    greet.innerText = `Hello ${localStorage.getItem(USERKEY)}`;
}

const saveUser = localStorage.getItem(USERKEY);

if(saveUser === null)
{
    loginForm.addEventListener("submit",loginSubmit);
}
else
{
    loginForm.classList.add(HIDDENKEY);
    rpsButtonUp();
    
}