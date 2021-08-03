/* 조건
1. 사용자는 가위바위보 중에 하나를 입력.
2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력.
3. 승패를 출력해줘야 함.
*/

// user - com 로 값을 구해내는 방법.
function matchPoint(user,com)
{
    let userPoint = 0;
    let comPoint = 0;

    if(user === '가위')
    {
        if(com === '가위')
        {
            userPoint = 0;
            comPoint = 0;
        }
        if(com === '바위')
        {
            userPoint = 0;
            comPoint = 1;
        }
        if(com === '보')
        {
            userPoint = 1;
            comPoint = 0;
        }
    }

    else if(user === '바위')
    {
        if(com === '가위')
        {
            userPoint = 1;
            comPoint = 0;
        }
        if(com === '바위')
        {
            userPoint = 0;
            comPoint = 0;
        }
        if(com === '보')
        {
            userPoint = 0;
            comPoint = 1;
        }
    }
    
    else if(user === '보')
    {
        if(com === '가위')
        {
            userPoint = 0;
            comPoint = 1;
        }
        if(com === '바위')
        {
            userPoint = 1;
            comPoint = 0;
        }
        if(com === '보')
        {
            userPoint = 0;
            comPoint = 0;
        }
    }

    let result = [userPoint,comPoint];
    let msg = "";

    if(result[0] > result[1])
    {
        msg = "유저가 이겼습니다.";
        return msg;
    }
    else if(result[0] === result[1])
    {
        msg = "서로 비겼습니다.";
        return msg;
    }

    return msg = "컴퓨터가 이겼습니다.";
}

function random()
{
    return Math.trunc(Math.random() * 3);
}

const arr = ['가위','바위','보'];
const user = '바위';
const com = arr[random()];

console.log('유저는 ' + user + '를 냈습니다.');
console.log('컴퓨터는 ' + com + '를 냈습니다.');
console.log(matchPoint(user,com));
