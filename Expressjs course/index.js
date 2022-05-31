const express = require('express');
const path = require('path');
const moment = require('moment');
const members = require('./members');

const app = express();

const logger = (req,res, next) =>{
    console.log('Hello there.', `${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().format()}`);
    next();
}

app.use(logger);

app.get('/api/members',(req,res)=>{
    res.json(members);

});

app.use(express.static(path.join(__dirname,'public')));

//app.get('/', (req, res)=>{
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


const PORT = process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));