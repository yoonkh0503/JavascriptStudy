function sumCnt(cntnum)
{
    const limit = 500;
    let cnt = 0;
    let num = 0;

    while(cnt <= limit)
    {
        num = cntnum / 2;
        cnt++;
        if(num % 2 === 1)
        {
            num = (num * 3) + 1;
            cnt++;
        }
        else 
        { 
            num = num / 2;
            cnt++; 
        }
        if(num === 1)
        {
            break;
        }
        cntnum = num;
        if(cnt === 500)
        {
            break;
        }
    }
    return cnt;
}

function solution(num)
{

    if(sumCnt(num) >= 500)
    {
        return -1;
    }
    
    return sumCnt(num);

}

console.log(solution(6)); // 8
console.log(solution(16)); // 4
console.log(solution(626331)); // -1

