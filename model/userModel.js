const mongoose =require('mongoose');
const bcrypt =require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
name :{
type: String ,
required:[true,'Please enter a name']
},
email:{
    type:String,
    required:[true,'Please enter a email'],
    unique:true,
    match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please add valid email']
},
password:{
    type:String,
    required:[true,'Please add a password'],
    select:false,
    minlength:8
},
todolist:[{
  type:mongoose.Types.ObjectId,
  ref:"todolist"
}],
createdAt:{
    type:Date,
    default:Date.now()
}
})
//Encrypt password 
userSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
})

// Get sign JWT
userSchema.methods.getSignedJWT=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRED})
}

// Match entered password with hashed password in database

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


module.exports =mongoose.model('user',userSchema)