let fs = require("fs")

const input = fs.readFileSync('input5.txt').toString().split('\r\n');

const getSeatRow = (row) => {
    let minRow = 0;
    let maxRow = 127;

    row.split('')
        .map(i => { i === 'F' ?
                maxRow = (minRow + maxRow - 1) /2
            :
                minRow = (maxRow + minRow +1 ) /2
        });

    return minRow;
}

const getSeatColumn = (col) => {
    let minCol = 0;
    let maxCol = 7;

    col.split('')
        .map(i => { i === 'L' ?
                maxCol = (minCol + maxCol -1 ) / 2
            :
                minCol = (maxCol + minCol +1) / 2
        });
    return minCol;
}

const part1 = (arr) => {
    const seatsId = arr.map(el => {
        const rowString = el.slice(0,7);
        const colString = el.slice(7);
        const rowId = getSeatRow(rowString);
        const colId = getSeatColumn(colString)
        return rowId * 8 + colId
    })
    return [seatsId,Math.max(...seatsId)]
}

const part2 = (arr,max) => {
    const setSeats = new Set(arr);
    const min = Math.min(...arr);
    for(let i = min;i<max;i++){
        if (setSeats.has(i - 1) && setSeats.has(i + 1) && !setSeats.has(i)) {
            return i
        }
    }
}
const [seatsId,max] = part1(input)
console.log('first:',max)
console.log('second:',part2(seatsId,max));
