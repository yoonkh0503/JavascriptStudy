function solution(n)
{
    let answer = 0;

    for(let i = 1; i <= n; i++)
    {
        // console.log("n의 제곱은 : " + i * i);
        if(i * i === n)
        {
            console.log("i : " + i);
            answer = i + 1;
            break;
        }
    }
    return answer * answer;
}

console.log(solution(121));