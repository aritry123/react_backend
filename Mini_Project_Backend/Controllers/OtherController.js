const express=require('express')
const router=express.Router()
const userModel=require('../Models/UserModel')
const jwt=require('jsonwebtoken')
router.post('/updatePassword/:id',(req,res)=>{
    const data=req.body
    userModel.updateOne({_id:req.params.id},{
        $set:{
            password:data.password
        }
    }).then((result)=>res.send({"data":result,"msg":"Password is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating password!","status":false}))
})
router.post('/updateCourseList/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.usertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        userModel.updateOne({_id:req.params.id},{
            $push: {
                courses: data.data
            }
        }).then((result)=>res.send({"data":result,"msg":"Course list is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating course list!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'you are not authorized',"reason":e.message,"status":false})
    }
})
router.post('/deleteItem/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.usertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        userModel.updateOne({_id:req.params.id},{
            $pull: {
                courses: {id:data.id}
            }
        }).then((result)=>res.send({"data":result,"msg":"Course list item is deleted successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating course list item deletion!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'you are not authorized',"reason":e.message,"status":false})
    }
})
router.post('/updateFavList/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.usertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        userModel.updateOne({_id:req.params.id},{
            $push: {
                favourite: data.data
            }
        }).then((result)=>res.send({"data":result,"msg":"Favourite list is updated successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating favourite list!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'you are not authorized',"reason":e.message,"status":false})
    }
})
router.post('/deleteFav/:id',(req,res)=>{
    const data=req.body
    const cookieip=req.cookies.usertoken
    try{
        const decodedtoken=jwt.verify(cookieip,'aritry')
        userModel.updateOne({_id:req.params.id},{
            $pull: {
                favourite: {id:data.id}
            }
        }).then((result)=>res.send({"data":result,"msg":"Favourite list item is deleted successfully!","status":true})).catch((e)=>res.send({"msg":"Error in updating favourite list item deletion!","status":false}))
    }
    catch(e){
        res.status(404).send({"msg":'you are not authorized',"reason":e.message,"status":false})
    }
})
module.exports=router