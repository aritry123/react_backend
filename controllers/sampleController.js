const express=require('express')
const router=express.Router()
router.get('/sample',(req,res)=>{
    res.send("this is from a controller")
})
module.exports=router