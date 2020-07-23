const userModel = require('../model/userModel')
const todolistModel = require('../model/todolistModel')
const asyncHandler=require('../middleware/async')
const ErrorResponse=require('../utils/errorResonse')

const mongoose = require('mongoose');
var objectId = mongoose.Types.ObjectId

// @desc Add list
// @route POST api/todolist/add
// @access public

exports.AddTodolist =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }

      const {name , description ,status }=req.body
      const todolist= await todolistModel.create({
          name,
          description,
          status,
          owner:objectId(req.user._id)

      })
      res.status(200).json({success:true,data:{name,description}})


});


// @desc get list by id
// @route POST api/todolist/get/id
// @access public

exports.GetTodolistById =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }

      const { id }=req.params
      const todolist= await todolistModel.findById(id);
      res
      .status(200)
      .json({success:true,data:{
          name:todolist.name,
          status:todolist.status,
          description:todolist.description}})


});


// @desc get list by id
// @route POST api/todolist/get/id
// @access public

exports.GetTodolist =asyncHandler( async (req,res,next)=>{
  if(!req.user&&req.user._id){
      return next(new ErrorResponse('Invalid credentails',401));
  }
  
  var{indexStart,limit,sort}=req.body
//check if user enter index to start from it or not
  var indexStart=(indexStart&&parseInt(indexStart)&&indexStart>0) ?indexStart:0;
  //check how many row user want to appear
  var limit=(limit&&parseInt(limit)&&limit>0)?limit:30;
 

  
  
  
    const todolist= await todolistModel
    .find({owner:objectId(req.user._id),status:{$ne:"archvied"}})
    .skip(indexStart)
    .limit(limit)
    .sort({"name":1});
   
   
    res
    .status(200)
    .json({success:true,data:{todolist}})


});



// @desc delete list by id
// @route POST api/todolist/delete/id
// @access public

exports.DeleteTodolistById =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }

      const { id }=req.params
      const isUpdatetTodolist= await todolistModel.updateOne({_id:id},{status:'archvied'});
      if(isUpdatetTodolist.nModified){
      res
      .status(200)
      .json({success:true,message:'Todolist be deleted'})
      }else{
        res
        .status(200)
        .json({success:false,message:'Todolist can not be deleted'})
      }

});



// @desc delete many  list by options('id',status)
// @route POST api/todolist/delete/id
// @access public

exports.DeleteTodolist =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }
      const deleteOption ={}
      const { ids , status }=req.body

      if(ids&& ids instanceof Array ) deleteOption._id ={$in:ids};
      if(status) deleteOption.status=status

      if(Object.keys(deleteOption).length==0){
        return next(new ErrorResponse('Invalid data to update',400));   
      }
      const todolist= await todolistModel.updateMany(deleteOption,{status:'archvied'});
    
      console.log(todolist)

      if(todolist.nModified){
        res
        .status(200)
        .json({success:true,message:'Todolist be deleted'})
        }else{
          res
          .status(200)
          .json({success:false,message:'Todolist can not be deleted'})
        }

});




// @desc update list by id
// @route PUT api/todolist/Update/id
// @access public

exports.UpdateTodolistById =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }

      const { id }=req.params
      
      if(Object.keys(req.body).length==0)
      return next(new ErrorResponse('Invalid data to update',400)); 
   
    
      const isUpdatetTodolist= await todolistModel.updateOne({_id:id},req.body);
      if(isUpdatetTodolist.nModified){
      res
      .status(200)
      .json({success:true,message:'Todolist be updated'})
      }else{
        res
        .status(200)
        .json({success:false,message:'Todolist can not be updated'})
      }

});



// @desc update many  list 
// @route PUT api/todolist/update
// @access public

exports.UpdateTodolist =asyncHandler( async (req,res,next)=>{
    if(!req.user&&req.user._id){
        return next(new ErrorResponse('Invalid credentails',401));
    }
      
      const { updateCondition , updateData }=req.body

      if(updateCondition instanceof Object 
        && Object.keys(updateCondition).length ==0 ) 
        return next(new ErrorResponse('Invalid data to update',400)); 

     
      const todolist= await todolistModel.updateMany(updateCondition,updateData);
    
      console.log(todolist)

      if(todolist.nModified){
        res
        .status(200)
        .json({success:true,message:'Todolist be updated'})
        }else{
          res
          .status(200)
          .json({success:false,message:'Todolist can not be updated'})
        }

});