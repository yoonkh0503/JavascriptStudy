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
