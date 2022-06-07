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
    const user=JSON.parse(req.body);
    console.log(user);
    const newUser={
        username:req.body.username,
        name:req.body.name,
        password:req.body.password,
        gender:req.body.gender,
        role:'User',
        status:'Active',
        dateOfReg:req.body.dateOfReg,
        dateOfLast:req.body.dateOfLast
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