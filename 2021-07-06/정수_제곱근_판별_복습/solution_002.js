function solution(n)
{
    const numbers = [];

    for(let i = 1; i <= n; i++)
    {
        numbers.push(i)
    }

    const answer = numbers.filter(x => x * x === n);
    const result = answer[0] + 1;
    return result * result;
}

console.log(solution(121)); // 144
