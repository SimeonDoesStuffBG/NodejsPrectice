const http = require('http');

const hostname = 'localhost';
const port = 8080;
const server = http.createServer((req, res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello');
})

server.listen(hostname, port, (err)=>
{
    if (err) {
        console.log(err);
        return;
    }

    console.log('Good!');
});