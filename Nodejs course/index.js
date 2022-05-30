/*const Logger = require('./logger');

const logger = new Logger();

logger.on('message',(data)=>console.log(`Called Listener: `,data));
logger.log('Hello World');*/

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res)=>{

});

const PORT = process.env.PORT||5000;

server.listen(PORT,()=>console.log(`Server running on port ${PORT}`))