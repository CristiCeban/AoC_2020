const fs = require('fs')
const input = fs.readFileSync('input10.txt', "utf-8")
    .trim().split("\r\n").map(el =>
        parseInt(el)).sort((a,b) => a-b)

const part1 = (arr) => {
    arr.sort((a,b)=>a-b);
    arr.push(arr[arr.length-1]+3);
    arr.unshift(0);
    let diff1 = 0;
    let diff3 = 0;
    for (let i = 1; i < arr.length; i++) {
        const diff = arr[i] - arr[i - 1];
        if (diff === 1) diff1++;
        if (diff === 3) diff3++;
    }
    return diff1 * diff3;
};


const part2 = (input) => {
    let maxAdapter = Math.max(...input) + 3;
    const arr = [];
    arr[0] = true;
    arr[maxAdapter] = true;
    input.map(el => arr[el] = true)
    arr[1] = !!arr[1];
    arr[2] = arr[2] ? (arr[1] + 1) : false;
    for (let i = 3; i <= maxAdapter; i++) {
        arr[i] = arr[i] ? (arr[i-1] + arr[i-2] + arr[i-3]) : false;
    }
    return arr[maxAdapter];
}

console.log('first: ', part1(input));
console.log('part2: ', part2(input));
