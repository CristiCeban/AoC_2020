let fs = require("fs")
const sum = 2020;
// parse input file,create array of values.(int)
const array = fs.readFileSync('input1.txt').toString().split('\r\n').map((el:string) => parseInt(el))

// set approach
const find2Coins = (arr : number[],sum:number) => {
    const set = new Set()
    for(let i = 0;i<arr.length;i++){
        const temp = sum - arr[i]
        if(set.has(temp))
            return [arr[i],temp];
        set.add(arr[i])
    }
    return [0,0];
}

// set approach
const find3Coins = (arr: number[],sum:number) => {
    for(let i = 0;i < arr.length-1;i++){
        const set = new Set();
        const currentSum = sum - arr[i];
        for(let j = i+1;j<arr.length;j++){
            if(set.has(currentSum - arr[j]))
                return [arr[i], arr[j], currentSum - arr[j]]
            set.add(arr[j])
        }
    }
    return [0,0,0];
}
const [first1,second1] = find2Coins(array,sum);
console.log('First: ',first1*second1);
const [first2,second2,third2] = find3Coins(array,sum)
console.log('Second: ',first2*second2*third2)
