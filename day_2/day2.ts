let fs = require("fs")

const array = fs.readFileSync('input2.txt').toString().split('\r\n');

const parseInput = (el) => {
    const arr1 = el.split('-')
    const f = parseInt(arr1[0])
    const s = parseInt(arr1[1].split(' ')[0]);
    const c = arr1[1].split(' ')[1][0];
    const word = arr1[1].split(' ')[2];
    const length = word.split('').reduce((acc, ch) => ch === c ? acc + 1: acc, 0);
    return {f,s,c,word,length};
}

const first = (arr) => {
        return  arr.filter((el,i) => {
            if(!el) return false
            const {f,s,length} = parseInput(el)
            return (length >= f && length <= s);
        }).length;
}

const second = (arr) => {
    return  arr.filter((el,i) => {
        if(!el) return false
        let {word,f,c,s} = parseInput(el)
        f--;
        s--
        return (word[f] === c && word[s] !== c) || (word[f] !== c && word[s] === c)
    }).length;
}

console.log('first',first(array))
console.log('second',second(array));
