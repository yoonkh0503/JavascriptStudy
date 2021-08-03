function solution(x, n) {
    let answer = [];
    let cntCheck = 1;

    while(cntCheck <= n)
    {
        answer.push(x * cntCheck);
        cntCheck++;
    }

    return answer;

}

console.log(solution(2,5)); // [2, 4, 6, 8, 10]
console.log(solution(4,3)); // [4, 8, 12]
console.log(solution(-4, 2)); // [-4, -8]