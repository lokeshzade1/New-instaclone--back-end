const express = require('express')
const app = express()
const rout=require("./routes/rout")
const dotenv =require('dotenv')
dotenv.config()
const mongo=require('mongoose')
const port = process.env.PORT || 8080
app.use(express.urlencoded());


// mongo.connect(process.env.MONGO_URL)

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(express.static("public"));



// your code goes here
 mongo.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
 },()=>{console.log("connect to cloud db")});
 app.use("/",rout)

 app.get("*", (req, res) => {
    res.status(404).send("PAGE IS NOT FOUND");
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   