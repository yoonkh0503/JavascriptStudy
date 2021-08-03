function solution(n) {
    let answer = '';
    let str = "박수";
    
    for(let i = 1; i <= n; i++)
        {
            answer += str[i%2];
        }
    return answer;
}

console.log(solution(3)); // 수박수
console.log(solution(4)); // 수박수박
console.log(solution(10)); // 수박수박수박수박수박
