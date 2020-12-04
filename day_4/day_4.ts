let fs = require("fs")

const input = fs.readFileSync('input4.txt').toString().split('\r\n');
const requiredFields =
    [
        'byr',
        'iyr',
        'eyr',
        'hgt',
        'hcl',
        'ecl',
        'pid',
    ]

const allowedFields = [...requiredFields,'cid']

const eyeCollor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']

const parse = (input) => {
    const passports = [];
    let passport = {};
    for(const line of input){
        if(!line.trim()){
            passports.push(passport);
            passport = {}
        }
        for(const field of line.split(' ')){
            const [key,value] = field.split(':');
            passport[key] = value;
        }
    }
    return passports
}

const part1 = (arr) => {
    let counter = 0;
    const passports = parse(arr);
    const validPassports = [];
    for(const passport of passports){
        if(requiredFields.filter(key => key in passport).length === 7) {
            validPassports.push(passport);
            counter++;
        }

    }
    return [validPassports,counter];
}

const part2 = (valid1Passport) => {
    let counter = 0;
    for(const passport of valid1Passport){
        let {byr,iyr,eyr,hgt,hcl,ecl,pid} = passport;
        byr = parseInt(byr);
        iyr = parseInt(iyr);
        eyr = parseInt(eyr);
        const isByr = byr >= 1920 && byr <= 2002
        const isIyr = iyr >= 2010 && iyr <= 2020
        const isEyr = eyr >= 2020 && eyr <= 2030
        let isHgt ;
        if(hgt.includes('cm')) {
            const cm = parseInt(hgt.replace('cm',''))
            isHgt = cm >= 150 && cm <= 193
        }
        else {
            const inch = parseInt(hgt.replace('in',''));
            isHgt = inch >= 59 && inch <= 76
        }
        const isHcl = RegExp('#([0-9]|[a-f]){6}').test(hcl)
        const isEcl = eyeCollor.includes(ecl);
        const isPid = pid.length === 9;
        if(isByr && isIyr && isEyr && isHgt && isHcl && isEcl && isPid)
            counter ++;
    }
    return counter;
}

const [validPassports,counter] = part1(input)

console.log('first: ',counter)
console.log('second: ',part2(validPassports));

