const express=require('express')
const router=express.Router()
const userModel=require('../models/UserModel')
router.post('/adminsignup',(req,res)=>{
    const data=req.body
    const obj=new userModel({
        fname:data.fname,
        email:data.email,
        password:data.password,
        phone:data.phone,
        role:'admin'
    })
    obj.save().then((result)=>res.send({"msg":"signup succeeded","status":true})).catch((e)=>res.send({"msg":"some error occured, try again!","status":false}))
})
router.post('/usersignup',(req,res)=>{
    const data=req.body
    const obj=new userModel({
        fname:data.fname,
        email:data.email,
        password:data.password,
        phone:data.phone
    })
    obj.save().then((result)=>res.send({"msg":"signup succeeded","status":true})).catch((e)=>res.send({"msg":"some error occured, try again!","status":false}))
})
module.exports=router