const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('../middleware/logger');

const app = express();

//logger
//app.use(logger);

//handlebars middleware
//app.engine('handlebars', exphbs());
//app.set('view engine', 'handlebars');


//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'public')));

app.use('/api/members', require('../routes/api/members'))
//app.get('/', (req, res)=>{
    //res.sendFile(path.join(__dirname, 'public', 'index.html'));
//});


const PORT = process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));