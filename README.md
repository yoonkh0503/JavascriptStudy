# JavascriptStudy
자바스크립트 공부 및 웹게임 개발 연습!

# 2021-07-31


## 가위바위보 게임 구현
* 조건
    1. 사용자는 가위바위보 중에 하나를 입력.
    2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력.
    3. 승패를 출력해줘야 함.

### 주요 기능

1. 컴퓨터와 유저의 가위바위보 결과에 따라 승패를 출력해주는 함수 구현
```
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
```

2. 지난 승부의 결과도 보여주고 싶다. 말하자면 컴퓨터와 유저의 전적을 보여주고 싶다.


이를 위해 유저의 승리 횟수와 컴퓨터의 승리 횟수를 기록하기 위한 함수 구현

```
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
```

3. 초기엔 사용자가 텍스트를 입력하거나 체크박스에서 가위,바위,보 중 하나를 선택하도록 했는데, 재미를 위해 가위바위보 이미지가 랜덤하게 노출되고

스페이스바를 선택했을 때 가위바위보 중 랜덤하게 선택되도록 수정하였다. 스페이스바를 눌렀을 때 이미지 체크가 되는 함수 구현, 붉은색으로 체크가 된다.

```
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
```

4. 이미지가 계속해서 변하는 함수. 이미지가 계속해서 변한다. 이렇게 구현한 함수는 setInterval 메서드를 통해

계속해서 변하도록 사용하였다.

```
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
```

5. 이벤트 리스너들은 아래 코드 주석으로 대체하겠습니다.

```
checkResult.addEventListener('click', function () { 웹페이지에 있는 결과 확인 버튼을 클릭하면 진행되는 이벤트
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

matchSearch.addEventListener('click', function() { 전적 확인 버튼을 클릭했을 때 진행되는 이벤트
    const modal = document.querySelector('.modal');
    modal.classList.remove('hidden');
    const rpsCnt = document.getElementById("rps_cnt");
    const userCnt = document.getElementById("user_wincnt");
    const comCnt = document.getElementById("com_wincnt");
    rpsCnt.textContent = "가위바위보 진행 횟수 : " + rpsTimes;
    userCnt.textContent = "유저가 이긴 횟수 : " + userWincnt;
    comCnt.textContent = "컴퓨터가 이긴 횟수 : " + comWincnt;
});

window.addEventListener('keyup', function(event) 엔터키를 입력했을 때 모달 클래스를 숨겨주도록 이벤트 실행
{
    if(event.key === 'Enter')
    {
        console.log(event.key);
        const modal = document.querySelector('.modal');
        modal.classList.add('hidden');
    }
});

window.addEventListener('keyup', function(event) 스페이스바를 입력했을 때 이미지가 랜덤으로 바뀌는 함수 중
{
    console.log("event.code : " + event.code);
    if(event.code === "Space")
    {
        imgCheck();
        clearInterval(imgChanging);
    }
 });

```


# 2021-08-04


## 숫자 야구 게임 구현

* 숫자 야구 게임의 조건

    1. 사용자로부터 1~9 까지의 번호 3개를 입력받는다.
    2. 컴퓨터는 1~9까지 랜덤한 숫자 3개를 저장한다. 
    3. 사용자, 컴퓨터 모두 중복된 숫자는 입력할 수 없고, 저장할 수 없다.
    4. 숫자 값과 위치가 모두 맞다면 1 Strike.
    5. 숫자 값이 맞고, 위치가 다르다면 1 Ball.
    6. 둘 다 틀리면 처리하지 않는다.
    7. 사용자 3 Strike가 될 때까지 컴퓨터의 값은 변경되면 안된다.

### 주요 기능
1.  컴퓨터는 1~9까지 랜덤한 숫자를 가진다. 이때 중복되는 숫자가 없어야 한다.


-> 아래 함수로 구현함.

```
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
```

2. 유저가 입력한 값과 컴퓨터의 값을 비교한다.

유저가 입력한 값이 컴퓨터의 입력한 값과 동일한 원소가 있다면 ball 이라고 보여준다.


유저가 입력한 값과 인덱스까지 맞다면 Strike 라고 보여준다.


아래 코드로 구현했다.

```
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
```

# 2021-08-05
## 수정 사항 및 구현 내용


    1. 버튼을 클릭할 때 볼, 스트라이크가 화면에서 초기화되도록 개선
    2. 볼, 스트라이크를 그려주는 함수는 별도로 분리함.
    3. comUserCheck 함수에서 볼과 스트라이크 정보를 오브젝트 타입으로 리턴 받는 것으로 수정.
    4. 사용자가 숫자 3개를 초과하여 입력했을 때 얼럿이 뜨도록 검사
    5. 사용자가 입력한 숫자 중 중복된 값이 있을 경우 게임이 진행이 불가하도록 함수 구현

1. 버튼을 클릭할 때 볼, 스트라이크가 화면에서 초기화되도록 개선
```
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
```

balls 클래스와 strike 클래스를 가져와서 변수에 담은 뒤, 백그라운드 컬러를 초기화해준다.

해당 작업이 필요한 이유는, 숫자를 한번 입력하면 스트라이크와 볼 표시가 지워지지 않고 남아있어서 재시도 할 때

볼인지 스트라이크인지 확인이 어렵기 때문이다. 이런 현상을 수정하기 위해 위의 검사 조건을 추가했다.

2. 볼, 스트라이크를 그려주는 함수는 별도로 분리함.

```
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
```
함수를 분리하는 게 꼭 필요한 작업은 아니었으나 comUserCheck 함수에서 HTML 속성을 건드리는 작업을 하고 싶진 않았다.

함수를 처음 구현할 때도 그런 목적이 아니었기 때문이고, 함수 이름에서 HTML을 수정하는 뜻이 없기 때문에 해당 함수를 사용하면서


혼동이 있을 것 같았다. 그래서 HTML을 그리는 함수를 별도로 분리하였다. 기능상 큰 차이는 없다.

3. comUserCheck 함수에서 볼과 스트라이크 정보를 오브젝트 타입으로 리턴 받는 것으로 수정.

```
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
```

볼과 스트라이크 횟수를 오브젝트로 리턴 받도록 수정하였다.
본래는 리턴값이 없는 함수로 정보를 단순히 출력해주는 목적으로 구현하였지만 게임 시작 버튼을 클릭하였을 때 볼 카운트와 스트라이크 카운트 정보를
받아올 수 없는 구조가 문제였다.
볼 카운트와 스트라이크 카운트 정보를 받아오기 위해 해당 함수에서 오브젝트 형식으로 카운트를 저장하고, 버튼 클릭 이벤트에서 해당 볼 카운트와
스트라이크 카운트를 활용할 수 있도록 하기 위해 위와 같이 수정하였다.

4. 사용자가 숫자 3개를 초과하여 입력했을 때 얼럿이 뜨도록 검사

```
if(userInputValue.length > 3)
    {
        return alert("숫자 3자리를 입력해주세요.");
    }
    // 단순 수정
```

5. 사용자가 입력한 숫자 중 중복된 값이 있을 경우 게임이 진행이 불가하도록 함수 구현

```
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
```

유저가 숫자를 입력할 때 중복된 숫자 입력이 가능하다. 예를 들어 "111" 이라던지 "212" 등의 입력이 가능한데, 
이렇게 입력하게 될 경우 숫자 맞추기가 너무 쉬워질 것이라 생각했다.


컴퓨터는 중복된 값이 나오지 않지만 유저는 중복된 숫자를 입력하는 것도 문제라고 생각하였다.
해서, 위 조건식을 만들어서 검사하기로 하였다.


userInputNum[0] === userInputNum[1] , userInputNum[0] === userInputNum[2]
userInputNum[1] === userInputNum[2]


위와 같이 3번만 비교가 필요하므로 조건문을 다음과 같이 구현하였다.
```
for(let i = 0; i < inputNum.length - 1; i++)
    {
        for(let j = i + 1; j < inputNum.length; j++)
        {
            if(inputNum[i] === inputNum[j])
            {
                return true;
            }
```

만일 하나라도 값이 같다면, 유저가 중복된 숫자를 입력한 것이므로 Invalid한 값이다.


같다면 바로 true를 리턴하고 함수를 종료하게 구현하였다.
