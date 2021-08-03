function solution(num1,num2)
{
    let answer = 0;
    let maxnum = 0;
    let minnum = 0;
    let result = 0;

    if(num1 > num2)
    {
        maxnum = num1;
        minnum = num2;
    }
    else
    {
        maxnum = num2;
        minnum = num1;
    }

    for(let i = minnum; i <= maxnum; i++)
    {
        result += i;
    }

    answer = result;
    return answer;
}

console.log(solution(3,5)); // 12
console.log(solution(3,3)); // 3
console.log(solution(5,3)); // 12
