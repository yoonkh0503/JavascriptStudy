function solution(arr1, arr2)
{
    let answer = [];

    for(let i = 0; i < arr1.length; i++)
    {
        const temp = [];
        for(let j = 0; j < arr1[i].length; j++)
        {
            temp.push(arr1[i][j] + arr2[i][j]);
            console.log(temp);
        }
        answer.push(temp);
    }
    return answer;
}

console.log(solution([[1,2],[2,3]] , [[3,4],[5,6]] ));