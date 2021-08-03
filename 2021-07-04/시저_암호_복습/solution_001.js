function solution(s, num)
{
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let answer = "";

    for(let i = 0; i < s.length; i++)
    {
        if(s[i] === ' ')
        {
            answer += ' ';
            continue;
        }
        for(let j = 0; j < lowerAlphabet.length; j++)
        {
            if(s[i] === lowerAlphabet[j])
            {
                if((j + num) >= 26) { answer += lowerAlphabet[num - 1];}
                else { answer += lowerAlphabet[j + num]; }
            }
        }
        
        for(let k = 0; k < upperAlphabet.length; k++)
        {
            if(s[i] === upperAlphabet[k])
            {
                if((k + num) >= 26) { answer += upperAlphabet[num - 1]; }
                else { answer += upperAlphabet[k + num]; }
            }
        }
    }
    return answer;
}

console.log(solution("AB",1)); // "BC"
console.log(solution("z", 1)) // "a"
console.log(solution("a B z",4)); // "e F d" 
console.log(solution("xyz")); // "abc"
