const express = require('express');
const cors= require('cors');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const dbUrl = "mongodb://localhost:27017/";
const dbName='restaurant-fmi';

const app = express();
const PORT = process.env.PORT||5000;

const corsOpts={
  origin:'http://localhost:3000'
}

app.use(cors(corsOpts));


app.use('/api/users',require('./routes/api/users'));
//console.log("fuck");
//app.use('/api/recipes',require('./routes/api/recipes'));


mongoClient.connect(dbUrl,{ useUnifiedTopology: true},(err, con)=>{
  if (err) throw err;
  app.locals.db = con.db(dbName);
  console.log(`Connection extablished to ${dbName}.`);
  app.listen(PORT,()=>console.log(`Server Started on port ${PORT}`));
})
