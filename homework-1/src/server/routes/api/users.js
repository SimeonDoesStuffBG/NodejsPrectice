const { ObjectID } = require('bson');
const express=require('express');
const mongodb = require('mongodb');
const mongoClient=mongodb.MongoClient;
const mongoID=mongodb.ObjectId;


const router=express.Router();
const dbUrl = "mongodb://localhost:27017/";
const dbName='restaurant-fmi';
const dbCollection='users'

//get single member
router.get('/:id',(req,res)=>{
   MongoClient.connect(dbURl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async client=>{
    console.log("Database Connected");
    const db = client.db(dbName);
    const prod = await db.collection(dbCollection)
    .findOne({_id: new ObjectID(`${req.id}`)});
    console.log(prod);
    res.json(prod);
    client.close();
})
});

//get all members
router.get('/',(req,res)=>{
    mongoClient.connect(dbUrl,{
        useNewUrlParser:true,
        useUnifiedTopology:true    
    }).then(connection=>{
        const db=connection.db(dbName);
        prods = db.collection(dbCollection)
                .find()
                .sort({username:-1})
                .toArray().then(prod=>{
                    res.json(prod);
                    connection.close();
                }).finally(()=>connection.close());
    })
});

//add user
router.post('/',(req,res)=>{
    console.log(req.body);
    const newUser={
        username:req.username,
        name:req.name,
        password:req.password,
        gender:req.gender,
        role:'User',
        status:'Active',
        dateOfReg:req.dateOfReg,
        dateOfLast:req.dateOfLast
    }

    mongoClient.connect(dbUrl, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    }, (err,connection)=>{
        if(err) throw err;
        
        const db=connection.db(dbName);
        db.collection(dbCollection).insertOne(newUser,(err, res)=>{
            if(err) throw err;

            connection.close();
        })
    });
});

module.exports=router;