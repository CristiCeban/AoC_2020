let fs = require("fs")

const input = fs.readFileSync('input6.txt').toString().split('\r\n');

const part1 = (arr) => {
    let current = new Set();
    let t = 0;
    arr.map(row => {
        if(row.trim())
            {
                current = new Set([...current,...row])
            }
        else {
            t += current.size;
            current = new Set()
        }
    })
    return t
}

const part2 = (arr) => {
    let current = {};
    let c = 0,t = 0;
    arr.map(row => {
        if(row.trim()){
            [...row].map((char) => {
                if (!current.hasOwnProperty(char))
                    current[char] = 0;
                current[char] = current[char] +1;
            })
            c++;
        }
        else {
            t+=Object.keys(current).filter((key) =>
                current[key] === c
            ).length;
            current = {};
            c = 0;
        }
    })
    return t;
}

console.log('first: ',part1(input));
console.log('second: ',part2(input))
