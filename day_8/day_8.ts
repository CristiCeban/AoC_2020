const fs = require("fs");

const input = fs.readFileSync('input8.txt', "utf-8").trim().split("\n");


const executeInstruction = (instruction, index, acc) => {
    let [operation, a] = instruction.split(" ");
    a = parseInt(a);
    switch (operation) {
        case "acc":
            acc += a;
            index++;
            break;
        case "jmp":
            index += a;
            break;
        case "nop":
            index++;
            break;
    }
    return [index, acc];
};

const part1 = (arr) =>{
    let infiniteLoop = false;
    let visited = [...Array(arr.length)].fill(false);
    let index = 0;
    let acc=0;

    while (index < arr.length) {
        if (visited[index]) {
            infiniteLoop = true;
            break;
        }
        visited[index]=true;
        [index, acc] = executeInstruction(arr[index], index, acc);
    }

    return [acc, infiniteLoop];
};


const findNop = () =>{
    let infiniteLoop = true;
    let nopIndex = 0;
    let acc = 0;
    //brute force
    while (nopIndex < input.length) {
        let altInstr = input.slice();
        if (altInstr[nopIndex].includes("jmp"))
            altInstr[nopIndex] = altInstr[nopIndex].replace(/jmp/, "nop");
        else {
            nopIndex++;
            continue;
        }

        // @ts-ignore
        [acc, infiniteLoop] = part1(altInstr);

        if (!infiniteLoop) {
            console.log("nop found: ", nopIndex);
            break;
        }
        nopIndex++;
    }

    return acc;
};

let [acc] = part1(input);
console.log('first: ',acc);
console.log('second: ',findNop());
