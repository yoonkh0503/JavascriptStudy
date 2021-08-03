function solution(number)
{
    let answer = 0;
    let digitCnt = String(number).length;
    let numToString = String(number);

    for(let i = 0; i < digitCnt; i++)
    {
        answer += Number(numToString[i]);
    }
    
    return answer;

}

console.log(solution(123)); // 6
console.log(solution(987)); // 24
