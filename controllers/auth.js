const userModel = require('../model/userModel')
const asyncHandler=require('../middleware/async')
const ErrorResponse=require('../utils/errorResonse')

// @desc Register User
// @route POST api/auth/register
// @access public

exports.register =asyncHandler( async (req,res,next)=>{

    //Create User 
    const {name , email , password}=req.body
    const user= await userModel.create({
        name,
        email,
        password
    })

    sendTokenResponse(user,200,res)
});


// @desc login User
// @route POST api/auth/register
// @access public

exports.login= asyncHandler( async (req,res,next)=>{
    
    const {email, password}=req.body
    //check email and password
    if(!email ||!password){
      return next(new ErrorResponse('Please Provide an email and password',400))
    }

    //check user in database
    const user =await userModel.findOne({email}).select('+password');
    
    console.log(user,email,password)

    if(!user){
        return next(new ErrorResponse('Invalid credentails',401)) 
    }


    //Match Passwords
    
    const isMatch=await user.matchPassword(password);
    if(!isMatch){ return next(new ErrorResponse('Invalid credentails',401)) 
    }


  //
  sendTokenResponse(user,200,res)
})

const sendTokenResponse =(user,statusCode, res)=>{
    const token= user.getSignedJWT();

    const options ={
        expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true
    };

    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }

    res
       .status(statusCode)
       .cookie('token',token,options)
       .json({sucess:true,data:{token}})
}

