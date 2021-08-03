function solution(s)
{
    if(s.length % 2 === 1)
    {
        const indexnum = (s.length / 2) - 0.5;
        return s[indexnum];
    }
    else 
    {
        const indexnum = s.length / 2;
        return s[indexnum -1 ] + s[indexnum];
    }
    
}
console.log(solution("qwer")); // "we"
console.log(solution("abcde")); // "c"
