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
    cloud_name: 'dzzixdcs1', 
    api_key: '961216453729524', 
    api_secret: 'uUbIi8ygFiiVwJJeuq8aXRqO2kk' 
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


// let arr=[
//     {
 
//       image: '1671117119175Screenshot (15).png',
    
//       auther: 'pp',
//       location: 'aqqqq',
//       description: 'gougu',
     
//     },
//     {
    
//       image: '1671120676866Screenshot (13).png',
//       auther: 'll',
//       location: 'giug',
//       description: 'bjubvi',
    
//     },
//     {
    
//       image: '1671128620724Screenshot (13).png',
//       auther: 'ppp',
//       location: 'giug',
//       description: 'gougu',
   
//     },
//     {
     
//       image: '1671132363542Screenshot (16).png',
     
//       auther: 'lord budda',
//       location: 'india',
//       description: 'he is lord budda',
   
//     }
//   ]

route.use(cors({
    origin: "*",
}))
// parse application/x-www-form-urlencoded
route.use(bodyParser.urlencoded())
route.use(bodyParser.json())




// to upload a file


// upload middleware 


// route.get("/post", (req, res) => {
//     res.json("oooo")
// })
route.delete("/delete", async (req, res) => {
    try { 
  
     
        const k = await post.deleteOne({_id:`${req.query._id}`})
console.log(k)
        res.status(200).json({
            k:"deleted"
        })
        
        // l.map(element => {
        //     arr.push({
        //         image: '1671117119175Screenshot (15).png',
        //         auther: 'pp',
        //         location: 'aqqqq',
        //         description: 'gougu',
        //     })
        // });
    //     res.status(200).json(
    //         "deleted"
    //    )
    } catch (e) {
        res.json("err bro")
        console.log(e.message)
    }

});
route.get("/post", async (req, res) => {
    try {
     console.log("coming ")
        const k = await post.find()
console.log(k)
        // res.status(200).json({
        //     ms: "created sucesfully",
        //     p: p

        // });
        
        // l.map(element => {
        //     arr.push({
        //         image: '1671117119175Screenshot (15).png',
        //         auther: 'pp',
        //         location: 'aqqqq',
        //         description: 'gougu',
        //     })
        // });
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

// route.post("/add/user",upload.single('image'), async (req, res) => {
//     try {
       
//         console.log(req.body);
   
       
//         const p = await post.create({
//             image: req.file.filename,
//             auther: req.body.auther,
//             location: req.body.location,
//             description: req.body.description
//         })
//        arr.push( {
      
//         image:req.file.filename ,
//         auther: req.body.auther,
//         location: req.body.location,
//         description:  req.body.description,
     
//       })
//         res.status(200).json({
//             ms: "created sucesfully",
            

//         });
//     } catch (e) {
//         res.json("err bro")
//         console.log(e.message)
//     }

// });
module.exports = route;

