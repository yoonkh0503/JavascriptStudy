// 연속적인 숫자를 지우자.
// 연속적인지 확인하는 방법은 이전의 인덱스와 값을 비교해보자.

function solution(arr)
{
    let answer = [];
    for(let i = 0; i < 1; i++)
    {
        for(let j = 1; j<arr.length; j++)
        {
            if(arr[i] === arr[j])
            {
                arr.splice(j,1);
            }
        }
        continue;
    }
    answer = arr;
    return answer;
}

console.log(solution([1,1,3,3,0,1,1]));
console.log(solution([4,4,4,3,3]));
