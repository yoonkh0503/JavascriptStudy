function common(c, num, alphabet)
{
    let result = '';

    for(let i = 0; i < alphabet.length; i++)
    {
        if(c === alphabet[i])
        {
            if( (i + num) >= 26)
            {
                result += alphabet[ (i + num) % 26];
            }   // z일 때 처리해줄 수 있어야 하며, 
                // i + num 이 26일 때도 처리해줄 수 있는 조건
            else
            {
                result += alphabet[i + num];
            }
        }
    }
    return result;
}

// console.log(common('c',2,"abcdefghijklmnopqrstuvwxyz"));

function lower(c, num)
{
    const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz"
    return common(c, num, lowerAlphabet);
}

// console.log(lower('c',2));

function upper(c, num)
{
    const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return common(c, num, upperAlphabet);
}

// console.log(upper('C',2));

function solution(s, num)
{
    let answer = "";

    for(let i = 0; i < s.length; i++)
    {
        if(s[i] === ' ')
        {
            answer += ' ';
            continue;
        }
        answer += lower(s[i], num);
        answer += upper(s[i], num);
    }
    return answer;
}

console.log(solution("AB",1)); // "BC"
console.log(solution("z", 1)); // "a"
console.log(solution("xyz",3)); // "abc"
console.log(solution("a B z", 4)) // "e F d"