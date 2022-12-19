const cors=require('cors')
require('dotenv').config();
const express=require('express');
const routes=require('./routes/authen');
const userroute=require("./routes/user");
const postroute=require('./routes/post');
const domainroute=require("./routes/domains")




const mongoose=require('mongoose');
const Users = require('./models/Users');

const dbString=process.env.DATABASE_URL;
mongoose.connect(dbString);
const db=mongoose.connection

db.on('error',(error)=>{
    console.log(error)
})


db.once('connected',()=>{
    console.log("Database Connected");
})


const app=express();

app.use(express.json());

app.use(cors());
app.use('/authen',routes)
app.use('/users',userroute)
app.use('/post',postroute)
app.use('/domain',domainroute)


app.listen(5000,()=>{
console.log(`server starts at local host ${5000}`)

});

