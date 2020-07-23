const mongoose =require('mongoose');


const TodoListSchema = new mongoose.Schema({
name :{
type: String ,
required:[true,'Please enter a name']
},
description:String,
status:{
    type:String,
    enum:['complete','uncomplete','archvied'],
    default:'uncomplete'
},
owner:{
    type:mongoose.Types.ObjectId,
    ref:'user'
},
createdAt:{
    type:Date,
    default:Date.now()
}
})


module.exports =mongoose.model('todolist',TodoListSchema)