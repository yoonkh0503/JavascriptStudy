# JavascriptStudy
자바스크립트 공부 및 웹게임 개발 연습!

# 숫자 야구 게임 구현

## 2021-08-01 
숫자 야구 게임의 조건

1. 사용자로부터 1~9 까지의 번호 3개를 입력받는다.
2. 컴퓨터는 1~9까지 랜덤한 숫자 3개를 저장한다. 
3. 사용자, 컴퓨터 모두 중복된 숫자는 입력할 수 없고, 저장할 수 없다.
4. 숫자 값과 위치가 모두 맞다면 1 Strike.
5. 숫자 값이 맞고, 위치가 다르다면 1 Ball.
6. 둘 다 틀리면 처리하지 않는다.
7. 사용자 3 Strike가 될 때까지 컴퓨터의 값은 변경되면 안된다.

### 주요 기능
1.  컴퓨터는 1~9까지 랜덤한 숫자를 가진다. 이때 중복되는 숫자가 없어야 한다.
=> 아래 함수로 구현함.

```const numArr = ["1","2","3","4","5","6","7","8","9"];
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
