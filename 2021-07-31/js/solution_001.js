/* 조건
1. 사용자는 가위바위보 중에 하나를 입력.
2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력.
3. 승패를 출력해줘야 함.
4. 컴퓨터가 낼 가위바위보는 유저가 랜덤으로 멈춰서 정하게 함.
5. 유저가 낼 가위바위보는 체크박스로 선택하게 함.
4,5 은 시간이 나면 고쳐보자.
*/

function matchPoint(user, com) // 메시지를 리턴해주는 함수.
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
const matchSearch = document.getElementById("match_search");
const result = document.querySelector("#result");

let rpsCount = 0;
let userWincnt = 0;
let comWincnt = 0;
let rpsTimes = 0;

function winLoseCount(user,com) // 전적 확인 함수
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

const rpsImageId = document.querySelector("#rpsimage");
let userRpsChoose = "";
let time = 0;

function imgRandom() // 이미지 랜덤 출력 함수
{
    time++;
    const randomRps = arr[time % arr.length];
    userRpsChoose = randomRps;
    if(randomRps === "가위")
    {
        rpsImageId.src = "scissors.png";
    }
    else if(randomRps === "바위")
    {
        rpsImageId.src = "rock.png";
    }
    else if(randomRps === "보")
    {
        rpsImageId.src = "paper.png";
    }
}

const imgChanging = setInterval(imgRandom,100);

function imgCheck()
{
    rpsImageId.style = 'border: 5px solid red;';
    
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
    rpsImageId.style = "";
    // setTimeout(imgChanging,1000);??
    // 결과 확인 버튼을 클릭했을 때 인터벌이 다시 실행됐으면 좋겠음.
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

window.addEventListener('keyup', function(event)
{
    console.log("event.code : " + event.code);
    if(event.code === "Space")
    {
        imgCheck();
        clearInterval(imgChanging);
    }
 });
