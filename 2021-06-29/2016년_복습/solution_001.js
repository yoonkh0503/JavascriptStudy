function solution(m, d)
{
    const week = ["THU","FRI","SAT","SUN","MON","TUE","WED"]; // 시작 요일 수정
    const month = [31,29,31,30,31,30,31,31,30,31,30,31];
    const divisor = 7; // week.length;
    let daySum = 0;
    let weekCheck = 0;
    let answer = '';

    for(let i = 0; i < m; i++) // m - 1 로 세야함.
    {
        daySum += month[i];
    }
    daySum += d;
    weekCheck = daySum % 7; // weekcheck 변수 삭제.
    answer = week[weekCheck-1];
    return answer;
}

console.log(solution(5,24));