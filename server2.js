console.log('Hello World!');
console.log(global);

const os = require('os');
const path = require('path');
const math = require('./math');


console.log(os.type());
console.log(os.platform());
console.log(os.arch());

console.log(__dirname);
console.log(__filename);

console.log(path.dirname(__filename));
console.log(path.basename(__filename));
console.log(path.extname(__filename));

console.log(math.add(9, 11));
console.log(math.subtract(9, 12));
console.log(math.multiply(9, 2));
console.log(math.divide(9, 2));