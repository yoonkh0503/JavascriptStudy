function isEqualPy(arr)
{
    let pCnt = 0;
    let yCnt = 0;
    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] === 'p' || arr[i] === 'P')
        {
            pCnt++;
        }
        if(arr[i] == 'y' || arr[i] == 'Y') 
        {
            yCnt++;
        }
    }
    return pCnt === yCnt;
}


function solution(s) {
    const arr = s.split('');
    let answer = isEqualPy(arr);
    return answer;
}
console.log(solution("pPoooyY")); // true
console.log(solution("Pyy")); // false
