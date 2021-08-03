// 공백을 만나게 되면 반복되는 숫자가 초기화되야함.
function solution(s) {
    let answer = "";
    let arrayToStr = "";
    const sToArray = s.split(' ');

    for(let i = 0; i < sToArray.length; i++)
    {
        if(i > 0) { answer += ' '; }
        arrayToStr = String(sToArray[i]); // arrayToStr = "try" "hello" "world"
        for(let j = 0; j < arrayToStr.length; j++)
        {
            if(j % 2 === 0){ answer += arrayToStr[j].toUpperCase(); }
            else { answer += arrayToStr[j]; }
        }
    }
    return answer;
}

console.log(solution("try hello world")); // TrY HeLlO WoRlD 