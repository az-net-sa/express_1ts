const fs = require('fs');
const fspromises = require('fs').promises;
const path = require('path');
const { text } = require('stream/consumers');

const readAndWrite = async () => {
    try {
        const data = await fspromises.readFile(path.join(__dirname , 'files' , 'Things.txt' ), 'utf8');
        console.log(data);
        console.log('Reading file...');
        await fspromises.writeFile(path.join(__dirname , 'files' , 'write.txt' ), data);
        console.log('File written!');
        await fspromises.appendFile(path.join(__dirname , 'files' , 'write.txt' ), '\nlol\n');
        console.log('File appended!');        


    } catch (err) {
        console.error(err);
    }
}

readAndWrite();



/*
fs.readFile(path.join(__dirname , 'files' , 'Things.txt' ), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log(data);
});

console.log('Reading file...');

text1 = 'hi dad\n';
fs.writeFile(path.join(__dirname , 'files' , 'write.txt' ), text1, (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('File written!');
    fs.appendFile(path.join(__dirname , 'files' , 'write.txt' ), 'hi mom\n', (err) => {
        if (err) {
            console.error(err);
            throw err;
        }
        console.log('File appended!');
    });
});
*/

