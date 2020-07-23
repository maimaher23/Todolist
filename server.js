const http =require('http')
const dotEnv=require('dotenv')
const path= require('path')
const app=require('./app')

//load env  vars 
dotEnv.config({path:'./config/config.env'})


//port 
const port = process.env.PORT || 5000

const server =http.createServer(app);

server.listen(port,
    console.log(process.env.PORT)
)