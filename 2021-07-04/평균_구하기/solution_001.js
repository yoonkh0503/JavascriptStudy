function solution(arr)
{
    let sum = 0;

    for(let i = 0; i < arr.length; i++)
    {
        sum += arr[i];
    }

    const average = sum / arr.length;

    return average;
}

console.log(solution([1,2,3,4])); // 2.5
console.log(solution([5,5])); // 5
