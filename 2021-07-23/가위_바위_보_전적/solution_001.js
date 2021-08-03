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
const result = document.querySelector("#result");
const comStatus = document.querySelector("#com");
const totalLink = document.getElementById("link");
const matchSearch = document.getElementById("match_search");
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
    if(user === - 1)
    {
        alert("가위,바위,보 중에 하나를 입력하세요.")
        return;
    }
    console.log(user);
    const com = random(); // 0 ~ 2
    console.log(user, com);
    comStatus.textContent = "컴퓨터는 " + arr[com] + "를 냈습니다.";
    result.textContent = matchPoint(user,com);
    rpsCount++;
    console.log(rpsCount);
    winLoseCount(user,com);
    if(rpsCount >= 5)
{
    totalLink.textContent = "전적 검색 링크";
}
});

matchSearch.addEventListener('click', function() {
    if(rpsCount < 5)
    {
        alert("5회 이상 진행 후 전적확인을 눌러주세요.");
        return;
    }
    const rpsCnt = document.getElementById("rps_cnt");
    const userCnt = document.getElementById("user_wincnt");
    const comCnt = document.getElementById("com_wincnt");
    
    rpsCnt.textContent = "가위바위보 진행 횟수 : " + rpsTimes;
    userCnt.textContent = "유저가 이긴 횟수 : " + userWincnt;
    comCnt.textContent = "컴퓨터가 이긴 홧수 : " + comWincnt;
    
})

/*
let rpsCount = 0;
let userWincnt = 0;
let comWincnt = 0;
let rpsTimes = 0;
위 변수들을 어떻게 하면 다른 페이지로 전달할 수 있을까...
*/