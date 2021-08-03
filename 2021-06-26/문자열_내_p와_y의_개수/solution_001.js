function solution(s) {
    var answer = true;
    const arr = s.split('');

    var countp = 0;
    var county = 0;

    for(i=0; i<arr.length; i=i+1)
    {
        if(arr[i] == 'p' || arr[i] == 'P')
        {
            countp = countp + 1;
        }
        if(arr[i] == 'y' || arr[i] == 'Y') {
            county = county + 1;
        }
    }

    answer = (countp == county);
    return answer;
}
console.log(solution("pPoooyY")); // true
console.log(solution("Pyy")); // false
