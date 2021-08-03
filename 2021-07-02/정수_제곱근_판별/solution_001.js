function solution(n) {
    let answer = 0;
    let floorVar = 0;
    let squareVar = 0;
    let rootNum = 0;

    rootNum = Math.sqrt(n);
    console.log("rootNum : " + rootNum);

    floorVar = Math.floor(rootNum);
    console.log("FloorVar : " + floorVar);

    squareVar = Math.pow(floorVar,2);
    console.log("squareVar : " + squareVar);

    if(squareVar === Math.pow(rootNum, 2)) { answer = Math.pow(rootNum+1,2); }
    else { answer = -1; }
    return answer;
}

console.log(solution(121)); // 144
console.log(solution(3)); // - 1
