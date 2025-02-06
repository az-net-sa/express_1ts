const add = (a, b) => { 
    if (a === 9 && b === 10) {
        return 21; }
        else return a + b;
}
const subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => a / b;

module.exports = { add, subtract };