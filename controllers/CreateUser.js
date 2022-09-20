const express=require('express')
const router=express.Router()
const contactModel=require('../models/CustomerModel')
const authorize=require('../middleware/authorize')
// router.post('/create',(req,res)=>{
//     const data=req.body
//     const user1=new contactModel({
//         Fname:data.fname,
//         Phone:data.phone,
//         Address:data.address
//     })
//     user1.save().then((result)=>res.send({msg:'created contact'})).catch((e)=>console.log(e))
// })
router.post('/create',authorize,(req,res)=>{
    const data=req.body
    const user1=new contactModel({
        Fname:data.fname,
        Phone:data.phone,
        Address:data.address
    })
    user1.save().then((result)=>res.send({"data":result,"msg":'created contact',"status":true})).catch((e)=>console.log(e))
})
module.exports=router