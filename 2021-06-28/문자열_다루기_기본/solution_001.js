function solution(s) {
    let answer = true;

    if(s.length === 4 || s.length === 6)
    {
        let tmp = Number(s);
        if(isNaN(tmp) === true) { answer = false; } 
        // 문자가 존재한다면 NaN을 반환함. NaN을 반환하는 메서드를 사용했음(isNan)
        // isNan을 안 쓰고 풀어보자.
    }
    else { answer = false;}

    return answer;
}

console.log(solution("a234")); // false;
console.log(solution("1234")); // true;