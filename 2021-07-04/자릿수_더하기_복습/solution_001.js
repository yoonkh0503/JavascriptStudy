function solution(num)
{
    let answer = 0;

    while(num > 0)
    {
        answer += num % 10;
        let temp = Math.trunc(num / 10);
        num = temp;
    }

    return answer;
}

console.log(solution(123));
console.log(solution(987));
