function solution(arr, divisor)
{
    let answer = [];


    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] % divisor === 0) { answer.push(arr[i]); }
    }

    if(answer.length === 0) { answer.push(-1); }
    
    answer.sort(function(a,b) { // sort 메서드는 어떻게 동작하는걸까?
        return a-b;
    });
    return answer;
}
console.log(solution([5,9,7,10],5)); // [5,10]
console.log(solution([2,36,1,3],1)); // [1,2,3,36]
console.log(solution([3,2,6],10)); // [-1]

