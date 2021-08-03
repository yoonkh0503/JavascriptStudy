/* 조건
1. 사용자는 가위바위보 중에 하나를 입력.
2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력.
3. 승패를 출력해줘야 함.
*/

function matchPoint(user, com)
{
    let userPoint = 0;
    let comPoint = 0;

    // 가위, 바위, 보
    //    0     1   2

    // user     com
    //    0       2  => win -2
    //    0       1  => lose -1
    //    0       0  => draw 0

    //    1       0  => win 1
    //    1       2  => lose -1
    //    1       1  => draw 0

    //    2       1  => win 1
    //    2       0  => lose 2
    //    2       2  => draw 0

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
let rpsCount = 0;

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
    if(rpsCount >= 5)
{
    totalLink.textContent = "전적 검색 링크";
}
});
