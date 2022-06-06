const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use('/api/users',require('./routes/api/users'));
//console.log("fuck");
//app.use('/api/recipes',require('./routes/api/recipes'));


const PORT = process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));