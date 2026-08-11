const { converter, guesser, spliter } = require("./core")

// let initValue = "5+2*3";
// Expected: 11

// let initValue = "-10+4*5";
// // Expected: 10

// let initValue = "100/5-7+3";
// // Expected: 16

// let initValue = "20%6+8*2";
// // Expected: 18

let initValue = "12.5*2-10/4+3";
// // Expected: 25.5

const spliting = spliter(initValue)
const converting = converter(spliting)
const result = guesser(converting)

// console.log(spliting);
// console.log(converting);
console.log(`the result of [ ${converting} ] is ==> ${result}`);
