const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserModel')
router.post('/signup',(req,res)=>{
    const data=req.body
    const obj=new userModel({
        uname:data.uname,
        password:data.password,
        email:data.email,
        fname:data.fname,
        city:data.city,
        country:data.country,
        role:data.role,
        courses:[],
        grades:[],
        otpCode:0,
        expireOtpIn:0,
        secretCode:data.secretCode,
        favourite:[]
    })
    obj.save().then((result)=>res.send({"msg":"Signup succeeded!","status":true})).catch((e)=>res.send({"msg":"Some error occured, try again!","status":false}))
})
module.exports=router