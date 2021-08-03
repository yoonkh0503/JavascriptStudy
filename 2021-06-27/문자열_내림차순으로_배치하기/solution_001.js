function solution(s)
{
    let answer = [];
    answer = s.split('').sort(a,b).join();
    return answer;
}

console.log(solution("Zbcdefg"));
