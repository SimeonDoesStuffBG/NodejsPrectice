const express = require('express');

const PORT = process.env.PORT||5000;

app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`));