function solution(n, m) {
    let answer = [];
    let nDivisor = "";
    let mDivisor = "";
    let nDivisorArr = [];
    let mDivisorArr = [];
    let maxDivisor = 0;
    let minMultiple = 0;

    for(let i = 1; i <= n; i++)
    {
        if(n % i === 0)
        {
            nDivisor += String(i) + ','; // n의 약수들
        }
    }

    for(let j = 1; j <= m; j++)
    {
        if(m % j === 0)
        {
            mDivisor += String(j) + ','; // m의 약수들
        }
    }

    nDivisorArr = nDivisor.split(',');
    mDivisorArr = mDivisor.split(',');

    for(let i = 0; i < nDivisorArr.length; i++)
    {
        for(let j = 0; j < mDivisorArr.length; j++)
        {
            if(nDivisorArr[i] === mDivisorArr[j])
            
            {
                if(nDivisorArr[i] > maxDivisor) { maxDivisor = nDivisorArr[i]; }
            }
        }
    }
    answer[0] = Number(maxDivisor);

    minMultiple = (n * m) / maxDivisor;

    answer[1] = minMultiple;
    return answer;
}

console.log(solution(3,12)); // [3,12]
console.log(solution(1,10));  // [1,10]
