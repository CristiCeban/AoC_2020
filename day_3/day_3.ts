let fs = require("fs")

const array = fs.readFileSync('input3.txt').toString().split('\r\n');

//new version
const path = (arr, right, down) => {
    let counter = 0;
    let x = 0;
    for(let i = 0;i<arr.length;i+=down){
        if(arr[i][x % arr[i].length] === '#')
            counter++;
        x+=right;
    }
    return counter
}


const part1 = (arr) => {
    return path(arr,3,1);

    //first version

    // let x = 0
    // let counter = 0
    // for (const row of arr) {
    //     if (row[x%row.length] === '#') {
    //         counter++
    //     }
    //     x += 3
    // }
    // return counter;
}

const part2 = (arr) =>{
    return [
        [1,1],
        [3,1],
        [5,1],
        [7,1],
        [1,2]
    ].reduce((a,[right,down]) => a*path(arr,right,down),1)
}

// first  version (naive)
// function part2 (arr){
//
//     //First 4 with 1 tree down
//     const counts = []
//     for (const inc of [1, 3, 5, 7]) {
//         let x = 0
//         let counter = 0
//         for (const row of arr) {
//             if (row.charAt(x % row.length) === '#') {
//                 counter += 1
//             }
//             x += inc
//         }
//         counts.push(counter)
//     }
//
//     let x = 0
//     let count = 0
//     //last one with 2 trees down
//     for (const [idx, row] of arr.entries()) {
//         if ((idx + 1) % 2 === 0) { continue }
//         if (row.charAt(x % row.length) === '#'   ) {
//             count += 1
//         }
//         x += 1
//     }
//     counts.push(count)
//
//     console.log(counts)
//
//     return counts.reduce((acc, curr) => acc * curr,1)
// }

console.log('first', part1(array))
console.log('second',part2(array))
