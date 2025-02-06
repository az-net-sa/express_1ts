const http = require('http');
const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const { v4:uuid} = require('uuid');
const { format } = require('date-fns');
const EventEmitter = require('events');
const logEvent = require('./logEvents');
const { de } = require('date-fns/locale');

console.log('Hello master! I am server.js');
class Emitter extends EventEmitter {};

const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileNamr) => { logEvent(msg, fileNamr) });
const PORT = process.env.PORT || 3000;

const serveFile = async (filePath, contentType , response) => {
    try {
        const rowdata  = await fsPromises.readFilef(
            filePath ,
            !contentType.includes('image') ? 'utf-8' : null
            );
        const data = contentType === 'application/json' ?
         JSON.parse(rowdata) : rowdata; 
        response.writeHead(
            filePath.includes('404.html') ? 404 : 200
            , {'Content-Type': contentType});
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data

        );

} catch (err) {
    console.error(err);
    myEmitter.emit('log', `${err.name}\t${err.message}`, 'errLog.txt' );
    response.statusCode = 500;
    response.end();
} }

const server = http.createServer((req, res) => {
    console.log('Request made');
    console.log('req.url = ' +req.url);
    console.log('req.method =' +req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt' );

    // now we will handle the request

    const extension = path.extname(req.url);

    // define the content type
    let contentType;
    switch(extension) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.webp':
            contentType = 'image/webp';
            break;
        case '.text':
            contentType = 'text/plain';
            break
        default:
            contentType = 'text/html';
            break;
    }

    // set the file path
    let filePath = 
    contentType === 'text/html' &&  req.url === '/'  ?  path.join(__dirname, 'views', 'index.html') // if the request is for the root directory index.html
    : contentType === 'text/html' && req.url.slice(-1) === '/' ? path.join(__dirname, 'views', req.url , 'index.html') // if the request is for a directory root index.html
    : contentType === 'text/html' ? path.join(__dirname, 'views', req.url) // if the request is for a html file other than index.html
    : path.join(__dirname,  req.url); // if the request is for a file other than html files such as css, js, images, etc.

    // make it as there is no need to type .html in the url
    if (!extension && req.url.slice(-1) !== '/') filePath += '.html';
    
    const fileExists = fs.existsSync(filePath);

    if (fileExists) {
        console.log('File exists');
        console.log(path.parse(filePath));
        // serve the file
        serveFile(filePath, contentType, res);
    } else {
        // serve a 404 page or redirect to a new page
        console.log('File does not exist');
        console.log(path.parse(filePath));
        switch(path.parse(filePath).base) {
            case 'old-page.html': // redirect to a new page
                res.writeHead(301, {'Location': '/new-page.html'});
                res.end();
                break;
            default:
                // serve a 404 page
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);

        }
    }
});
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});