function solution(n) {
    let answer = 0;
    // let divisor = 0;
    for(let i = 2; i <= n; i++)
    {
        let divisor = 0; // divisor 변수를 for문 지역 변수로 선언 및 초기화
                         // 함수 전역 변수로 선언하게 되면 for문 마지막 단에서 비교하는 구문이 의미가 없어지기 때문.
        for(let j = 2; j <= i; j++)
        {
            if(i % j === 0)
            {
                // console.log("i : " + i);
                // console.log("j : " + j);
                // console.log("===============");
                divisor += 1;
            }
        }
        if(divisor === 1) { answer += 1; }
    }
    return answer;
}

console.log(solution(1000000000));