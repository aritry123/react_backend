const express=require('express')
const app=express()
const bp=require('body-parser')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const userCredentials=require('./data/credentials')
app.use(cors())
app.use(bp.json())
app.post('/signin',(req,res)=>{
    const data=req.body
    const result=userCredentials.find((item)=>item.email===data.email)
    if(result===undefined) {
        res.send({"msg":' not authenticated',"status":false})
        return
    }
    if(data.password===result.password){
        const token=jwt.sign({email:data.email},'aritry')
        res.send({"msg":'authenticated',"status":true,"accesstoken":token})
    } else {
        res.send({"msg":' not authenticated',"status":false})
    }
})
// john---"accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiaWF0IjoxNjYxMzI1ODk5fQ.d_41CgcFDTyKwQmg8uVIgyyfzwpFUviyt4hT6vpcLTk"
app.post('/delete',(req,res)=>{
    const inputtoken=req.headers.authorization
    const token=inputtoken.replace('Bearer ','')
    console.log(inputtoken)
    try{
        const result=jwt.verify(token,'aritry')
        console.log(result)
        res.send({"msg":'deleted successfully'})
    }
    catch(e){
        res.send({"msg":'you are not authorized'})
    }
})
app.listen(3001,()=>console.log('server started at port 3001'))