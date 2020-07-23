const jwt = require('jsonwebtoken');
const ErrorResponse= require('../utils/errorResonse')
const asyncHandler= require('./async')
const user = require('../model/userModel')

exports.protect=asyncHandler(async (req,res,next)=>{
    let token;
    console.log(req.header)
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){
            token=req.headers.authorization.split(' ')[1]
        }
    if(!token){
        return next(new ErrorResponse('Not Authorize To Access This Route',401))
    }
    try {
        const decode= jwt.verify(token,process.env.JWT_SECRET)
        req.user= await user.findById(decode.id);
        next();
        
    } catch (err) {
        return next(new ErrorResponse('Not Authorize To Access This Route',401))  
    }
})