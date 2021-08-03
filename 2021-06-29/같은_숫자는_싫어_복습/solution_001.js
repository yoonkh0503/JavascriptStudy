function solution(arr)
{
    let answer = [];
    let temp = null;
    
    for(let i = 0; i < arr.length; i++)
    {
        if(temp !== arr[i])
        {
            temp = arr[i];
            answer += temp;
        }
    }
    answer = answer.split('');

    for(let i = 0; i < answer.length; i++)
    {
        answer[i] = Number(answer[i]);
    }

    return answer;
}

console.log(solution([1,1,3,3,0,1,1])); // 1,3,0,1
console.log(solution([4,4,4,3,3])); // 4,3