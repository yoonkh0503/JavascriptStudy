function solution(arr)
{
    // 배열을 임시로 복사해서 복사본에서 처리해보자.
    
    let answer = [];
    for(let i = 0; i < arr.length; i++)
    {
        for(let j = 0; j < arr.length; j++)
        {
            if(arr[i] === arr[j] && i !== j)
            {
                //console.log("i : " + i);
                //console.log("arr[i] : " + arr[i]);
                //console.log("j : " + j);
                //console.log("arr[j] : " + arr[j]);
                arr.splice(j,1);
                //console.log("arr : "  + arr);
            }
        }
        //console.log("=======================");

    }
    answer = arr;
    return answer;
}

console.log(solution([1,1,3,3,0,1]))
console.log(solution([4,4,4,3,3]))

// 이중 for 문으로 각 인덱스의 값을 하나 씩 비교하려고 함.
// Ex :
// -> array[0] === array[1~5];
// -> array[0] === array[1~4];
// -> array[0] === array[1~3];
// 해당 방법도 실패, i의 값이 0에서 증가하는 상태여서 비교할 요소를 고정할 수가 없음.


