function solution(s) {
    let answer = '';

    for(let i = 0; i < s.length; i++)
    {
        if(i % 2 === 0)
        {
            answer += s[i].toUpperCase()
        }
        else
        {
            answer += s[i];
        }
    }

    return answer;
}

console.log(solution("try hello world")); // TrY HeLlO WoRlD