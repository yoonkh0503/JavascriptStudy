let week;

function solution(month,day)
{
    if(b % 7 === 1)
    {
        week = "FRI";
    }
    
    else if(b % 7 === 2)
    {
        week = "SAT";
    }
    
    else if(b % 7 === 3)
    {
        week = "SUN";
    }
    
    else if(b % 7 === 4)
    {
        week = "MON";
    }
    
    else if(b % 7 === 5)
    {
        week = "TUE";
    }
    
    else if(b % 7 === 6)
    {
        week = "WED";
    }
    
    else if(b % 7 === 0)
    {
        week = "THU";
    }

return week;
}
// if,else if 로 다중조건문을 만드는 건 너무 비효율적인 듯 함.
// 월이 바뀔 때마다 시작 날짜의 요일이 바뀌기 때문에 이 로직은 월마다 조건문을 새로 만들어야함.
// 월이 바뀌어도 사용할 수 있는 쉬운 방법을 찾아보자
console.log(solution(2,1))