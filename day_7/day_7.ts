const fs = require("fs");

const input = fs.readFileSync("input7.txt").toString().trim().split("\n");

const parseInput = (data) => {
    const keys = data.map((el) => el.split(/ bags/)[0]);
    const values = data.map((el) => el.match(/\d \w+ \w+/g));
    return [keys, values];
};

const createRulesMap = (keys, values) => {
    const map = new Map();
    keys.forEach((key, index) => map.set(key, values[index]));
    return map;
};

const checkColor = (data, color, referenceColor) => {
    let counter = 0;
    if (visited1.has(color)) {
        return visited1.get(color);
    } else {
        const values = data.get(color);
        if (values) {
            values.forEach((value) => {
                const newColor = value.substring(2);
                if (newColor === referenceColor) counter++;
                counter += checkColor(data, newColor, referenceColor) ? 1 : 0;
            });
            const hasColor = !!counter;
            visited1.set(color, hasColor);
            return hasColor;
        } else {
            return false;
        }
    }
};

const part1 = (map, referenceColor) => {
    for (let color of map.keys()) {
        if (!visited1.has(color)) {
            checkColor(map, color, referenceColor);
        }
    }
    let count = 0;
    visited1.forEach((value) => (value === true ? count++ : undefined));
    return count;
};

const part2 = (data, color, referenceColor) => {
    let counter = 0;
    const values = data.get(color);
    if (values) {
        values.forEach((value) => {
            const newColor = value.substring(2);
            const numberOfBags = parseInt(value.match(/\d+/)[0], 10);
            counter += numberOfBags;
            counter += numberOfBags * part2(data, newColor, referenceColor);
        });
    }
    return counter;
};

const [keys, values] = parseInput(input);
const colorRules = createRulesMap(keys, values);
const visited1 = new Map();

console.log("First: ", part1(colorRules, "shiny gold"));
console.log("Second: " + part2(colorRules, "shiny gold", "shiny gold"));
