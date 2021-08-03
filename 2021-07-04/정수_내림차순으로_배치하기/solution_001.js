function solution(n) {
    n = String(n);
    const arr = n.split('');


    for(let i = 0; i < arr.length; i++)
    {
        for(let j = i + 1; j < arr.length; j++)
        {
            if(arr[i] < arr[j])
            {
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }

    return Number(arr.join(''));
}
console.log(solution(118372));