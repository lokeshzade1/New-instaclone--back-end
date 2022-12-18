const express = require('express');

const cloudinary=require("cloudinary").v2
const  fileupload= require("express-fileupload")
const route = express.Router()
const bodyParser = require("body-parser");


route.use(express.json())
route.use(fileupload({
    useTempFiles:true,
    limits:{fileSize :50*2024*1024}
}))

cloudinary.config({ 
    cloud_name: 'dhny7m2kk', 
    api_key: '541471156151785', 
    api_secret: 'B9XbtAdD8ukEVdW05S1tQvMMXhg' 
  });

// const multer = require("multer");
const cors = require("cors")
// const post = require("../model/model")
const { string, date } = require('joi');
const mongooose = require('mongoose');


const postschema = new mongooose.Schema({
    image: { type: String, required: true },
    auther: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },


})

const post = mongooose.model('post', postschema);


route.use(cors({
    origin: "*",
}))
// parse application/x-www-form-urlencoded
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())


route.get("/post", async (req, res) => {
    try {
     console.log("coming ")
        const k = await post.find()
console.log(k)
        res.json({
            p:k.reverse()
        })
    } catch (e) {
        res.json("err bro")
        console.log(e.message)
    }

});

route.post("/add/user", async (req, res) => {
    try {
       
        console.log(req.files.image);
        console.log(req.body)
   
       const file=req.files.image;
       const result =await cloudinary.uploader.upload(file.tempFilePath,{
        public_id:`${Date.now()}`,
        resource_type:"auto",
        folder:"images"
       })
       console.log(result.url,req.body.auther)
        const p = await post.create({
            image: result.url,
            auther: req.body.auther,
            location: req.body.location,
            description: req.body.description
        })
    
        res.status(200).json({
            ms: "created sucesfully",
           p: p

        });
    } catch (e) {
        console.log(e)
        res.status(400).json({
            err:e.message
        })
        
    }

});

module.exports = route;

