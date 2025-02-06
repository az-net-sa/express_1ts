const { v4:uuid} = require('uuid');
const { format } = require('date-fns');
const EventEmitter = require('events');
const logEvent = require('./logEvents');

console.log('Hello master! I am index.js');


class MyEmitter extends EventEmitter {};

// Instantiate the class
const myEmitter = new MyEmitter();

// Register the event listener
myEmitter.on('log', (msg) => logEvent(msg));

// Emit the event
myEmitter.emit('log', 'YYYAAAYYY!' , "reqLog.txt");
myEmitter.emit('log', 'This is the second message!' , "reqLog.txt");


console.log('Goodbye master! I am index.js');

