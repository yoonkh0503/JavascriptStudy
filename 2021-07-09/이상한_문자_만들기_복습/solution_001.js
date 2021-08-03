function word(arrayToStr)
{
    let result = '';
    for(let i = 0; i < arrayToStr.length; i++)
    {
        if(i % 2 === 0)
        {
            result += arrayToStr[i].toUpperCase();
        }
        else if(i % 1 === 0)
        {
            result += arrayToStr[i].toLowerCase();
        }
    }
    return result;
}

function solution(s)
{
    const sToArray = s.split(' ');
    for(let i = 0; i < sToArray.length; i++)
    {
        sToArray[i] = word(sToArray[i]);
    }

    return sToArray.join(' ');
}

console.log(solution("try hello world")); // TrY HeLlo WoRld
console.log(solution("TRY HELLO WORLD")); // Try HeLlo WoRld
console.log(solution("This Is JAVAScript")); // This Is JaVaScRiPt 