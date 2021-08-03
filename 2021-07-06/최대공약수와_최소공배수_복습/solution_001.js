function solution(n, m)
{
    let maxDivisor = 0;
    let minMultiple = 0;

    const max = n > m ? n : m;

    for(let i = 1; i <= max; i++)
    {
        if(n % i === 0 && m % i === 0)
        {
            maxDivisor = i;
            console.log("maxDivosr is : " + maxDivisor);
        }
    }

    minMultiple = (n * m) / maxDivisor;

    return [maxDivisor, minMultiple];
}

console.log(solution(84,252));
console.log(solution(1,10));
