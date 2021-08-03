function solution(num) {
    let answer = '';

    if(num % 2 === 1) { answer = "Odd"; }
    else if(num % 2 === -1) { answer = "Odd";}
    else { answer = "Even";}

    return answer;
}

console.log(solution(3)); // "Odd"
console.log(solution(4)); // "Even"
console.log(solution(-9)); // "Odd"