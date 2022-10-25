const express = require('express');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const PORT = process.env.PORT||5000;

const main = async()=>{
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended:false}));

    await mongoose.connect('mongodb://localhost:27017/CharacterCreator');

    const userSchema = new Schema({
        username:String,
        password:String,
        email:String,
        dateOfReg:Date,
        dateOfLast:Date
    });
    
    const characterSchema = new Schema({
        name:String,
        creatorId:Number,
        gender:String,
        description:String,
        createdOn:Date,
        updatedOn:Date
    });

    const plotpointSchema = new Schema({
        title:String,
        creatorId:Number,
        storyId:Number,
        timeIndex:Number,
        description:String,
        featuredChars:[Number],
        createdOn:Date,
        updatedOn:Date
    });

    const storySchema = new Schema({
        title:String,
        creatorId:Number,
        characters:[Number]
    });

    const relationshipShcema = new Schema({
        plotpointId:Number,
        character1Id:Number,
        character2Id:Number,
        type:String
    });

    app.listen(PORT,()=>console.log(`Server Started on Port ${PORT}`));
}