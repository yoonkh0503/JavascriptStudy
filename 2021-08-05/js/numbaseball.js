// 숫자 야구 게임.
// 1. 사용자로부터 1~9 까지의 번호 3개를 입력받는다.
// 2. 컴퓨터는 1~9까지 랜덤한 숫자 3개를 저장한다. 
// 3. 사용자, 컴퓨터 모두 중복된 숫자는 입력할 수 없고, 저장할 수 없다.
// 4. 숫자 값과 위치가 모두 맞다면 1 Strike.
// 5. 숫자 값이 맞고, 위치가 다르다면 1 Ball.
// 6. 둘 다 틀리면 처리하지 않는다.
// 7. 사용자 3 Strike가 될 때까지 컴퓨터의 값은 변경되면 안된다.


const numArr = ["1","2","3","4","5","6","7","8","9"];
function randomNum() // 1~9 까지 숫자를 3개를 받는다. String으로 저장.
// 중복이 없어야함.
{
    let num = '';
    let isStop = false;

    while(!isStop) // 무한루프가 발생할 가능성?
    {
        const rNum = Math.trunc(Math.random() * numArr.length);
        console.log('--------------', rNum);
        const removedNum = numArr.splice(rNum - 1 , 1); // 원본인 numArr도 지워주도록
        console.log("removed arr : " + removedNum);
        num += removedNum;
        if(num.length === 3)
        {
            isStop = true;
        }
    }
    console.log("num : " + num);
    return num;
}

const comRandomNum = randomNum();
const button = document.querySelector("button");
const strikeStatus = document.querySelector("#status p:first-child")
const ballStatus = document.querySelector("#status p:last-child")

button.addEventListener('click', gameCheck)

function gameCheck()
{
    let gamePlayCnt = 0;
    const balls = document.querySelectorAll('.ball');
    const strikes = document.querySelectorAll('.strike');

    for(let i = 0; i < balls.length; i++)
    {
        balls[i].style.backgroundColor = "";
        strikes[i].style.backgroundColor = "";
    }
    
    const userInputValue = document.querySelector("input").value;
    if(userInputValue.length > 3)
    {
        return alert("숫자 3자리를 입력해주세요.");
    }

    else if(isInvalidUserInput(userInputValue))
    {
        return alert("중복된 숫자가 있습니다.");
    }

    else if(isNaN(userInputValue))
    {
        return alert("숫자만 입력해주세요.");
    }
    document.querySelector("input").value = '';
    console.log("유저가 입력한 값 : ", userInputValue);
    document.querySelector("h2").innerText = `입력한 숫자 : ${userInputValue}`;
    const ballStrikeInfo = comUserCheck(userInputValue,comRandomNum);

    // 왜 이 부분이 gameCheck 함수보다 먼저 실행될까?
    // if(isGameReStart(gameCheck["strike"])); 
    // {
    //     const question = confirm("게임을 다시 시작하시겠습니까?");
    //     if(question)
    //     {
    //         return window.location.reload();
    //     }
    // }

    gamePlayCnt++;
    if(gamePlayCnt)
    {
        button.textContent = "숫자 제출";
    }
}


// 볼, 스트라이크 유무를 확인하는 함수
function comUserCheck(user, com) // String, String
{
    let strikeCnt = 0;
    let ballCnt = 0;
    const userArr = user.split('');
    const comArr = com.split('');
    for (let i = 0; i < userArr.length; i++) {
        for (let j = 0; j < comArr.length; j++) {
            if(userArr[i] === comArr[j] && i === j)
            {
                strikeCnt++;
                console.log(`${strikeCnt} Strike !!!!!!!!!!!!!!!!`);
            }
            else if(userArr[i] === comArr[j])
            {
                ballCnt++;
                console.log(`${ballCnt} ball !!!!!!!!!!!!!!!!!!!!!`);
            }
        }
    }
    paintingStrikeBall(ballCnt,strikeCnt);
    const gameInfoObj = {
        ball : ballCnt,
        strike : strikeCnt
    };
    return gameInfoObj;
}


function isGameReStart(srikeCnt) // 3Strike 가 됐을 때 게임을 재시작하는 함수.
{ // 미완성.
    return (srikeCnt === 3 ? true : false );
}

function paintingStrikeBall(ballCnt,strikeCnt)
{
    const balls = document.querySelectorAll('.ball');
    const strikes = document.querySelectorAll('.strike');

    for (let i = 0; i < ballCnt; i++) {
        console.log('ball', i);
        balls[i].style.backgroundColor = '#1db71d';
    }
    for(let i = 0; i < strikeCnt; i++)
    {
        strikes[i].style.backgroundColor = "red";
    }
}

function isInvalidUserInput(inputNum)
{
    for(let i = 0; i < inputNum.length - 1; i++)
    {
        for(let j = i + 1; j < inputNum.length; j++)
        {
            if(inputNum[i] === inputNum[j])
            {
                return true;
            }
        }
    }
    return false;
}


// To Do
// 1. 3 Strike가 되면 게임 재시작 하는 기능
// 2. 다시 시작 버튼 만들기.
// 3. 기권 버튼 만들기.
// 4. 기권하게 되면 컴퓨터 답을 알려주도록

/* 8.5 구현한 기능
1. 버튼을 클릭할 때 볼, 스트라이크가 화면에서 초기화되도록 개선
2. 볼, 스트라이크를 그려주는 함수는 별도로 분리함.
3. comUserCheck 함수에서 볼과 스트라이크 정보를 오브젝트 타입으로 리턴 받는 것으로 수정.
4. 사용자가 숫자 3개를 초과하여 입력했을 때 얼럿이 뜨도록 검사
5. 사용자가 입력한 숫자 중 중복된 값이 있을 경우 게임이 진행이 불가하도록 함수 구현
*/

