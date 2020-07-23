

const  connectDB= function(){
const mongoose = require("mongoose");
//load env  vars 
const dotEnv=require('dotenv')
const path= require('path')
dotEnv.config({path:'./config/config.env'})
const dbPath = process.env.MONGO_URI
console.log(dbPath)
mongoose.connect(dbPath, {
    useNewUrlParser: true,
    seUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log('nnn'));



}
module.exports =connectDB