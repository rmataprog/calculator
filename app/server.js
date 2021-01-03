const { readFileSync, readFile } = require('fs');
const http =  require('http');

const main = readFileSync('html/index.html', {encoding: 'utf8'});
const standard = readFileSync('html/standard.html', {encoding: 'utf8'});
const styleSheetStandard = readFileSync('css/standard.css', {encoding: 'latin1'});
const scriptStandard = readFileSync('js/standard.js');
const iconBack = readFileSync('img/icons/backspace(1).svg');
const iconList = readFileSync('img/icons/list.svg');
const iconMemory = readFileSync('img/icons/memory-card.svg');
const font = readFileSync('css/fonts/Valentine.ttf');

const server = http.createServer((req, res) => {
    if (req.url == '/' || req.url == '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(main);
        res.end();
    } else if (req.url == '/standard.html') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(standard);
        res.end();
    } else if (req.url == '/css/standard.css') {
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(styleSheetStandard);
        res.end();
    } else if (req.url == '/js/standard.js') {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        res.write(scriptStandard);
        res.end();
    } else if (req.url == '/img/icons/backspace(1).svg') {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(iconBack);
        res.end();
    } else if (req.url == '/img/icons/list.svg') {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(iconList);
        res.end();
    } else if (req.url == '/css/fonts/Valentine.ttf') {
        res.writeHead(200, {'Content-Type': 'font/ttf'});
        res.write(font);
        res.end();
    } else if (req.url == '/img/icons/memory-card.svg') {
        res.writeHead(200, {'Content-Type': 'image/svg+xml'});
        res.write(iconMemory);
        res.end();
    } else {
        res.end('invalid request');
    }
});
server.listen(5000);
console.log(`server is running in port 5000`);