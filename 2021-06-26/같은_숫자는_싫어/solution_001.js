
function solution(arr)
{
    let answer = [];
    for(let i = 0; i < arr.length; i++)
    {
        for(let j = i + 1; j < arr.length; j++)
        {
            if(arr[i] === arr[j])
            {
                console.log(" arr[i] : " + arr[i]);
                console.log(" arr[j] : " + arr[j]);
                let deletenum = arr.indexOf(arr[j]);
                arr.splice(deletenum,1);
            }
        }
        console.log("================");
    }
    answer = arr;
return answer;
}

console.log(solution([1,1,3,3,0,1,1]))
// 인덱스 번호를 받아서 인덱스에 해당하는 요소를 지워보자
// 의 방식으로 접근 했으나 이렇게 푸는 건 아닌 듯 함.
// 중복된 요소의 인덱스를 찾으면 중복된 요소 중 앞단에 있는 인덱스를 리턴함.
// 따라서 문제 해결은 되지 않음.