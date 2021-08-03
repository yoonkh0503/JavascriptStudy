function solution(number)
{
    let answer = [];
    const digitCnt = String(number).length - 1;
    const numToString = String(number);

    for(let i = digitCnt; i > -1; i--)
    {
        answer[digitCnt - i] = Number(numToString[i]);
        
    }

    return answer;
}

console.log(solution(12345)); // [5,4,3,2,1]