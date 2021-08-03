// 배열로 만들어서 풀어보자.

let week;
const sun = "SUN";
const mon = "MON";
const tue = "TUE";
const wed = "WED";
const thu = "THU";
const fri = "FRI";
const sat = "SAT";


function solution(month,day)
{
    if(month === 1 || month === 4 || month === 7) // 1일이 금요일.
    {
        week = day % 7;
        if(week === 0) {week = thu;}
        else if (week === 1) {week = fri;}
        else if (week === 2) {week = sat;}
        else if (week === 3) {week = sun;}
        else if (week === 4) {week = mon;}
        else if (week === 5) {week = tue;}
        else if (week === 6) {week = wed;}
    }
    else if(month === 10) // 1일이 토요일.
    {
        week = day % 7;
        if(week === 0) {week = fri;}
        else if (week === 1) {week = sat;}
        else if (week === 2) {week = sun;}
        else if (week === 3) {week = mon;}
        else if (week === 4) {week = tue;}
        else if (week === 5) {week = wed;}
        else if (week === 6) {week = thu;}
    }
    else if(month === 5) // 1일이 일요일.
    {
        week = day % 7;
        if(week === 0) {week = sat;}
        else if (week === 1) {week = sun;}
        else if (week === 2) {week = mon;}
        else if (week === 3) {week = tue;}
        else if (week === 4) {week = wed;}
        else if (week === 5) {week = thu;}
        else if (week === 6) {week = fri;}
    }
    else if(month === 2 || month === 8) // 1일이 월요일.
    {
        week = day % 7;
        if(week === 0) {week = sun;}
        else if (week === 1) {week = mon;}
        else if (week === 2) {week = tue;}
        else if (week === 3) {week = wed;}
        else if (week === 4) {week = thu;}
        else if (week === 5) {week = fri;}
        else if (week === 6) {week = sat;}
    }
    else if(month === 3 || month === 11) // 1일이 화요일.
    {
        week = day % 7;
        if(week === 0) {week = mon;}
        else if (week === 1) {week = tue;}
        else if (week === 2) {week = wed;}
        else if (week === 3) {week = thu;}
        else if (week === 4) {week = fri;}
        else if (week === 5) {week = sat;}
        else if (week === 6) {week = sun;}
    }
    else if(month === 6) // 1일이 수요일.
    {
        week = day % 7;
        if(week === 0) {week = tue;}
        else if (week === 1) {week = wed;}
        else if (week === 2) {week = thu;}
        else if (week === 3) {week = fri;}
        else if (week === 4) {week = sat;}
        else if (week === 5) {week = sun;}
        else if (week === 6) {week = mon;}
    }
    else if(month === 9 || month === 12) // 1일이 목요일.
    {
        week = day % 7;
        if(week === 0) {week = wed;}
        else if (week === 1) {week = thu;}
        else if (week === 2) {week = fri;}
        else if (week === 3) {week = sat;}
        else if (week === 4) {week = sun;}
        else if (week === 5) {week = mon;}
        else if (week === 6) {week = tue;}
    }

    return week;
}

console.log(solution(5,24)); // TUE