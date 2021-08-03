function solution(arr,n)
{
    for(let i = 0; i < arr.length -1; i++)
    {
        for(let j = 0; j < arr.length - 1; j++)
        {
            if(arr[j][n] > arr[j + 1][n])
            {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            else if(arr[j][n] === arr[j + 1][n])
            {
                if(arr[j][n + 1] > arr[j + 1][n + 1])
                {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
    }
    return arr;
}

console.log(solution(["sun","bed","car"],1)); // ["car" , "bed" , "sun"]
console.log(solution(["abce","abcd","cdx"],2)); // ["abcd", "abce", "cdx"]