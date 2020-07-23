const express= require('express')
const bodyparser=require('body-parser')
const mongoose = require('mongoose');
const cookieParser=require('cookie-parser')

const morgan =require('morgan')
const connectDB= require('./config/db')
const errorHandeler= require('./middleware/error')
const app=express();



connectDB();

//routes array

const routes=['auth','todolist']

//middleware 
app.use(morgan('dev'));
app.use(cookieParser())
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json())

//cors 
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","Origin , X-Requested-With ,Accept ,Authorization");
  if(req.method==="OPTIONS"){
    res.header("Access-Control-Allow-Methods","PUT,POST,DELETE,PATCH,GET")
    return res.status(200).json({})
  }
next();

})


routes.forEach(element => {
  var pathRoute=require(`./routes/${element}`)
  app.use(`/api/${element}`,pathRoute)
});

//handle error middlware
app.use(errorHandeler);

module.exports=app;