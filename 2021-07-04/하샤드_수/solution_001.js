function solution(x) {
    let answer = true;
    let digitSum = 0;
    let tempNum = x;

    while(tempNum > 0)
    {
        digitSum += tempNum % 10;
        let mok = Math.trunc(tempNum / 10);
        tempNum = mok
    }

    if(x % digitSum === 0) { return answer;}
    else { answer = false; }

    return answer;
}

console.log(solution(10)); // true
console.log(solution(12)); // true
console.log(solution(11)); // false
console.log(solution(13)); // false