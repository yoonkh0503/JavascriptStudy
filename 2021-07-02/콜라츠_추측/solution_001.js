function solution(num)
{
    let answer = 0;
    let times = 500;
    let tryCnt = 0;

    while(tryCnt <= times)
    {
        answer = num / 2;
        tryCnt++;
        if(answer % 2 === 1)
        {
            answer = (answer * 3) + 1;
            tryCnt++;
        }
        else 
        { 
            answer = answer / 2;
            tryCnt++; 
        }
        if(answer === 1) { break; }
        num = answer;

        if(tryCnt === 500)
        {
            tryCnt = -1;
            return tryCnt;
        }
    }
    
    return tryCnt;
}

console.log(solution(6)); // 8
console.log(solution(16)); // 4
console.log(solution(626331)); // -1

