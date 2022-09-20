const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserModel')
const jwt=require('jsonwebtoken')
router.post('/signin',(req,res)=>{
    const data=req.body
    userModel.findOne({email:data.email}).then((result)=>{
        if(result){
            if(data.password===result.password){
                const token=jwt.sign({email:data.email,role:result.role},'aritry')
                res.status(200).cookie('usertoken',token,{sameSite:'strict',httpOnly:true}) // ,maxAge:60000
                res.send({"msg":'You are authenticated!',"status":true,"role":result.role,"email":result.email}) // ,"tokenTime":60000
            } else {
                res.send({"msg":'Password is wrong, authentication failed!',"status":false})
            }
        }
        else{
            res.send({"msg":"Email id doesn't exist!","status":false})
        }
    }).catch((e)=>res.send({"msg":"Some error has occured!","status":false}))
})
router.post('/signout',(req,res)=>{
    const cookieip=req.cookies.usertoken
    if(cookieip){
        try{
            const decodedtoken=jwt.verify(cookieip,'aritry')
            res.clearCookie('usertoken').status(200).send({"msg":"Token is seen and removed from Cookie Storage!","status":true})
        }
        catch(e){
            res.status(404).send({"msg":"Unauthorized!","status":false})
        }
    }
})
module.exports=router