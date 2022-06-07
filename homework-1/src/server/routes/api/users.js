const { ObjectID } = require('bson');
const express=require('express');
const mongodb = require('mongodb');
const { sendErrorResponse } = require('../../../../../../Node-Express-React-Practice/fmi-2022-10-blogs-api-express-mongo/routes/utils');
const mongoClient=mongodb.MongoClient;
const mongoID=mongodb.ObjectId;


const router=express.Router();

const dbCollection='users'

//get single member
router.get('/:id', async (req,res)=>{
    const params = req.params;
    try{
        const user = await req.app.locals.db.collection(dbCollection).findOne({_id: new ObjectID(req.params.id)});
        if(!user){
            sendErrorResponse(req, res, 404, 'User Not found');
            return;
        }
        res.json(user);
    }catch (errors){
        sendErrorResponse(req, res, 400, `Invalid user data: ${errors.map(e => e.message).join(', ')}`, errors);
    }
});

//get all members
router.get('/',async (req,res)=>{
    try {
        const users = await req.app.locals.db.collection(dbCollection).find().toArray();
        res.json(users.map(p => replaceId(p)));
    } catch (err) {
        sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
    }
});

//add user
router.post('/',async (req,res)=>{    
    
    console.log(req.body);
    const newUser=req.body;

    try{
        const user = await req.app.locals.db.collection(dbCollection).insertOne(newUser);
        if (user.result.ok && user.insertedCount === 1) {
           //delete newUser._id;
            newUser.id = user.insertedId;
            
            res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
    }else {
        sendErrorResponse(req, res, 500, `Unable to create user: ${newUser.id}`);
    }
    } catch (err) {
    console.log(`Unable to create user`);
     console.error(err);
     sendErrorResponse(req, res, 500, `Unable to create new user`, err);
    }
});

module.exports=router;