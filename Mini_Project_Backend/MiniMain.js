const express=require('express')
const app=express()
const bp=require('body-parser')
const cors=require('cors')
app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(bp.json())
const cookie=require('cookie-parser')
app.use(cookie())
const jwt=require('jsonwebtoken')
const userModel=require('./Models/UserModel')
const signup=require('./Controllers/SignupController')
const others=require('./Controllers/OtherController')
const signin=require('./Controllers/SigninController')
app.use('/',signup)
app.use('/',others)
app.use('/',signin)
// app.post('/get',(req,res)=>{
//     const cookieip=req.cookies.usertoken
//     if(cookieip) {
//         userModel.find().then((result)=>{res.send({"data":result,"msg":'All users!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting data!","status":false}))
//     } else {
//         res.send({"msg":"Unauthorized!","status":false})
//     }
// })
app.get('/get',(req,res)=>{
    userModel.find().then((result)=>{res.send({"data":result,"msg":'All users!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting data!","status":false}))
})
app.get('/getCourseList/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id}).then((result)=>{res.send({"courseList":result.courses,"msg":'All courses!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting course data!","status":false}))
})
app.get('/getFavList/:id',(req,res)=>{
    userModel.findOne({_id:req.params.id}).then((result)=>{res.send({"favList":result.favourite,"msg":'All fav courses!',"status":true})}).catch((e)=>res.send({"msg":"Error occured while getting fav course data!","status":false}))
})
app.listen(3002,()=>console.log('Server started!'))