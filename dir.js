const fs = require('fs');

// if (!fs.existsSync('files3')) {
//     fs.mkdir('files3', (err) => {
//     if (err) {
//         console.error(err);
//         throw err;
//     }
//     console.log('Directory created!');
// });} else {
//     console.log('Directory already exists!');
// }

if (fs.existsSync('files2')) {
    fs.rmdir('files2', (err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    console.log('Directory deleted!');
});}