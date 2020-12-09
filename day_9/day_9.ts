const fs = require('fs')

const input = fs.readFileSync('input9.txt', "utf-8").trim().split("\n");


const part1 = (arr) => {
    for(let i = 25;i < arr.length;i++){
        const set = new Set();
        for(const row of arr.slice(i-25,i)){
            for(const row2 of arr.slice(i-25,i)){
                set.add(row+row2)
            }
        }
        const row = arr[i];
        if(!set.has(row)){
            console.log(row);
            return row
        }
    }
    return 0
}

const part2 = (arr,broken) => {
    for (let i = 0; i < arr.length; i++) {
        let j = i;
        let sum = 0;
        while (j < arr.length && sum < broken) {
            sum += arr[j];
            j++;
        }
        if (sum === broken) {
            const resArr = arr.slice(i, j).sort()
            return resArr[0] + resArr[resArr.length -1]
        }
    }
}
const numInput = input.map(el => parseInt(el));
const broken = part1(numInput)
console.log('first: ',broken)
console.log('second',part2(numInput,broken))
