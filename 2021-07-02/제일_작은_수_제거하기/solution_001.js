function solution(arr) {
    let answer = [];
    let min = arr[0];

    if(arr.length === 1)
    {
        answer = [-1];
        return answer;
    }

    for(let i = 0; i < arr.length; i++)
    {
        if(arr[i] < min) { min = arr[i]; }
        
    }
    
    const deleteIndex = arr.indexOf(min);
    console.log("deleteIndex : " + deleteIndex);
    const removeMin = arr.splice(deleteIndex,1);
    
    return arr;
}

console.log(solution([4,3,2,1])); // [4,3,2]
console.log(solution([10])); // [-1]