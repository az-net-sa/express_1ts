const { v4:uuid} = require('uuid');
const { format } = require('date-fns');
const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');  

console.log('Hello master! I am logEvents.js');

const logEvent = async (message, logName) => {
    const datetime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')} `;
    const logItem = `${datetime} ${uuid()} ${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, '..','logs'))) {
            fs.mkdirSync(path.join(__dirname, '..','logs'));
        }
        await fspromises.appendFile(path.join(__dirname, '..','logs' , "reqLog.txt"), logItem);
    } catch (error) {
        console.error(error);
    }
}

logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
    console.log('Request URL:', req.url);
    next();
}

console.log('Goodbye master! I am logEvents.js');

module.exports = { logEvent, logger };

