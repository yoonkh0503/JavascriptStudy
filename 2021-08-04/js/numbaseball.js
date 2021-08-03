// 숫자 야구 게임.
// 1. 사용자로부터 1~9 까지의 번호 3개를 입력받는다.
// 2. 컴퓨터는 1~9까지 랜덤한 숫자 3개를 저장한다. 
// 3. 사용자, 컴퓨터 모두 중복된 숫자는 입력할 수 없고, 저장할 수 없다.
// 4. 숫자 값과 위치가 모두 맞다면 1 Strike.
// 5. 숫자 값이 맞고, 위치가 다르다면 1 Ball.
// 6. 둘 다 틀리면 처리하지 않는다.
// 7. 사용자 3 Strike가 될 때까지 컴퓨터의 값은 변경되면 안된다.


// function noOverlapRandom()
// {
    
//     // let numArr = [1,2,3,4,5,6,7,8,9];
//     // const rNum = Math.trunc(Math.random() * 9);
//     // let newArr = numArr.forEach(element => element !== rNum);
//     // numArr = newArr;
// }

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

function gameCheck()
{
    const userInputValue = document.querySelector("input").value;
    document.querySelector("input").value = '';
    console.log("유저가 입력한 값 : ", userInputValue);
    document.querySelector("h2").innerText = `입력한 숫자 : ${userInputValue}`;
    comUserCheck(userInputValue,comRandomNum);
    
}

// 볼, 스트라이크 유무를 확인하는 함수
function comUserCheck(user, com) // String, String
{
    let strikeCnt = 0;
    let ballCnt = 0;
    const userArr = user.split('');
    const comArr = com.split('');
    console.log("userArr : " + userArr);
    console.log("comArr : " + comArr);

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

    const balls = document.querySelectorAll('.ball');
    for (let i = 0; i < ballCnt; i++) {
        console.log('ball', i);
        balls[i].style.backgroundColor = '#1db71d';
    }
    // strikeStatus.innerText = `${strikeCnt} Strike!!!!!!!`;
    // ballStatus.innerText = `${ballCnt} Ball!!!!!!!!!!!!!`;
}

button.addEventListener('click', gameCheck)

// To Do
// 1. 3 Strike가 되면 게임 재시작 하는 기능
// 2. ball, strike를 직관적으로 나타낼 수 있게??
// 3. 버튼 크기 키우는 법
// 4. place holder 크기 조절이 가능한가?
// 5. 사용자에게 입력 받을 때 예외 처리 할 수 있도록(숫자가 아닌 건 입력 불가, 3자리가 넘어가면 입력 불가)