const express = require('express')
const {AddTodolist,
    GetTodolistById,
    DeleteTodolistById,
    DeleteTodolist,
    UpdateTodolist,
    GetTodolist,
    UpdateTodolistById}=require('../controllers/todolist')
const {protect}=require('../middleware/auth')

const router= express.Router();

router
      .post('/add',protect,AddTodolist)
      .get('/get/:id',protect,GetTodolistById)
      .get('/delete/:id',protect,DeleteTodolistById)
      .post('/delete',protect,DeleteTodolist)
      .put('/update/:id',protect,UpdateTodolistById)
      .put('/update',protect,UpdateTodolist)
      .post('/get',protect,GetTodolist)


module.exports=router