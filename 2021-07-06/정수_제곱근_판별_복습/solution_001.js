function solution(n)
{
    const numbers = [];

    for(let i = 1; i <= n; i++)
    {
        numbers.push(i)
    }

    const answer = numbers.filter(function (x) {
        if(x * x === n)
        {
            return true;
        }
        return false;
    });

    const result = answer[0] + 1;
    return result * result;
}

console.log(solution(121)); // 144
