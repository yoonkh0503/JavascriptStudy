function solution(num) {
    let answer = '';
    
    for(let i = 0; i < num.length; i++)
    {
        if(i < num.length - 4)
        {
            answer += '*';
        }
        else
        {
            answer += num[i];
        }
    }
    
    return answer;
}

console.log(solution("01033334444")); // *******4444
console.log(solution("027778888")); // *****8888