/* 조건
1. 사용자는 가위바위보 중에 하나를 입력
2. 컴퓨터는 가위바위보 중에 하나를 랜덤으로 출력
3. 승패를 출력해줘야 함.
*/

function matchPoint(user, com)
{
    let userPoint = 0;
    let comPoint = 0;

    let msg = "";
    const point = user - com;

    if(point === -2 || point === -1)
    {
        msg = "유저가 이겼습니다.";
    }
    else if(point === -1 || point === 2)
    {
        msg = "컴퓨터가 이겼습니다.";
    }
    else
    {
        msg = "서로 비겼습니다.";
    }

    return msg;
}


function random()
{
    return Math.trunc(Math.random() * 3);
}

const arr = ['가위','바위','보'];
const result = document.querySelector('#result');
const scissor = document.querySelector('#scissor');
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');

scissor.addEventListener('click', function ()
{
    console.log('가위');
    const user = arr.indexOf('가위');
    const com = random();
    console.log(user, com);
    result.textContent = matchPoint(user, com);
});

rock.addEventListener('click', function ()
{
    console.log('바위');
    const user = arr.indexOf('바위');
    const com = random();
    console.log(user, com);
    result.textContent = matchPoint(user, com);
});


paper.addEventListener('click', function ()
{
    console.log('보');
    const user = arr.indexOf('보');
    const com = random();
    console.log(user, com);
    result.textContent = matchPoint(user, com);
});