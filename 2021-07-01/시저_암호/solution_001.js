function solution(string, num)
{
    let answer = '';
    let charToNum = 0;

    for(let i = 0; i < string.length; i++)
    {
        charToNum = string.charCodeAt(i);
        
        if(charToNum === 32)
        {
            answer += String.fromCharCode(charToNum);
        }
        else if(charToNum === 122)
        {
            const nextZ = 26;
            answer += String.fromCharCode(charToNum + num - nextZ);
        }

        else
        {
            answer += String.fromCharCode(charToNum + num);
        }
    }

    return answer;
}

console.log(solution("AB",1)); // BC
console.log(solution("z",1)); // a
console.log(solution("a B z",4)); // e F d