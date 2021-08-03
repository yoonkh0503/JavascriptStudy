function solution(str)
{
    const arr = str.split('');

    for(let i = 0; i < str.length; i++)
    {
        for(let j = i + 1; j < str.length; j++)
        {
            if(arr[i] < arr[j])
            {
                console.log("arr[i] : " + arr[i]);
                console.log("arr[j] : " + arr[j]);
                console.log("=========================");
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                console.log("str : " + arr);
            }
        }
        console.log("-------------------");
    }
    return arr.join('');
}

console.log(solution("Zbcdefg"));