function solution(s)
{
    let answer = true;
    let tmpArr = s.split('');

    if(tmpArr.length === 4 || tmpArr.length === 6)
    {
        for(let i = 0; i < tmpArr.length; i++)
        {
            let tmp = Number(tmpArr[i]);
            if(tmp) { continue; }
            else { answer = false; }
        }
    }
    return answer;
}

console.log(solution("a234")); // false
console.log(solution("1234")); // true
console.log(solution("1e11")); // false
