const fs = require('fs');

const input = fs.readFileSync('input13.txt', 'utf8').trim().split('\r\n')


const part1 = (input) =>{
    const startTime = parseInt(input[0]);
    let busses = input[1].split(',').filter((e) => e != 'x').map(el => parseInt(el));
    let bid = 0;
    let timeToWait = 0;

    busses.map((busId) => {
        let diff = Math.ceil(startTime / busId) * busId - startTime;
        if (timeToWait === 0 || diff < timeToWait) {
            bid = busId;
            timeToWait = diff;
        }
    });

    return bid * timeToWait;
}

const part2 = (input) => {
    const busses = input[1].split(',').map((el, i) => [parseInt(el), i]).filter((el) => !isNaN(el[0]));
    let inc = busses[0][0];
    const product = busses.map((el) => el[0]).reduce((a, b) => a * b,1);
    let p2 = true;
    let start = 100000000000000;
    let res = 0;
    while (p2) {
        for (let t = start; t < product; t += inc) {
            const m = busses.
            filter(el => {
                    if ((t + el[1]) % el[0] == 0) {
                        return el;
                    }})
            .map((el) => el[0]);

            //finish
            if (m.length == busses.length) {
                res = t;
                p2 = false;
                t = product;
                break;
            }
            //checked reddit hints for this one
            if (m.length > 1) {
                const gcd = (a, b) => (a ? gcd(b % a, a) : b);
                const lcm = m.reduce((a, b) => (a * b) / gcd(a, b));
                start = t + lcm;
                inc = lcm;
                break;
            }

        }
    }

    return res;
}

console.log('First: ' + part1(input));
console.log('Second: ' + part2(input));
