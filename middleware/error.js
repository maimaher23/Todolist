
const ErrorResponse= require('../utils/errorResonse')
const errorHandeler=(err,req,res,next)=>{
    //writ on console
    
    let error= {...err}
    error.message=err.message

    //invalid id
    if(err.name==='CastError'){
        const message =` Event not be found with id ${err.value}`
        error=new ErrorResponse(message,404)
    }

    //dublicate Key
    if(err.code==11000){
        const message ='Duplicate field value enterd'
        error=new ErrorResponse(message,404)
    }

    //validation
    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(val=>val.message)
        error=new ErrorResponse(message,404)
    }
    

   //response 
   res.status(err.statusCode||500).json({
       success:false,
       error:error.message || 'Server Error'
   })
}

module.exports= errorHandeler