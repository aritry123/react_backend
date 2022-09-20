const express=require('express')
const app=express()
const bp=require('body-parser')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const userCredentials=require('./data/credentials')
const authorize=require('./middleware/authorize')
app.use(cors({origin:'http://localhost:3000',credentials:true}))
app.use(cookieparser())
app.use(bp.json())
app.post('/signin',(req,res)=>{
    const data=req.body
    const result=userCredentials.find((item)=>item.email===data.email)
    if(result===undefined) {
        res.send({"msg":' not authenticated',"status":false})
        return
    }
    if(data.password===result.password){
        const token=jwt.sign({email:data.email},'aritry') // ,{expiresIn:'60'}
        res.send({"msg":'authenticated',"status":true,"accesstoken":token})
    } else {
        res.send({"msg":' not authenticated',"status":false})
    }
})
app.post('/login',(req,res)=>{
    const data=req.body
    const result=userCredentials.find((item)=>item.email===data.email)
    if(result) {
        if(data.password===result.password){
            const token=jwt.sign({email:data.email},'aritry')
            res.status(200).cookie('tokenvalue',token,{sameSite:'strict',httpOnly:true})
            res.send({"msg":'authenticated',"status":true})
        } else {
            res.send({"msg":' not authenticated',"status":false})
        }
    }
})
app.post('/seecookie',(req,res)=>{
    console.log(req)
    const inputtoken=req.cookies.tokenvalue
    console.log(inputtoken)
    if(inputtoken){
        try{
            const result=jwt.verify(inputtoken,'aritry')
            console.log(result)
            res.status(200).send({"msg":"cookie is seen and verified","status":true})
        }
        catch(e){
            res.status(404).send({"msg":"cookie error","status":false})
        }
    }else{
        res.status(404).send({"msg":"cookie error","status":false})
    }
    // res.send('cookie is seen')
   //res.clearCookies().send("cookie is seen!")
})
app.post('/clearcookie',(req,res)=>{
    const inputtoken=req.cookies.tokenvalue
    if(inputtoken){
        try{
            const result=jwt.verify(inputtoken,'aritry')
            res.clearCookie('tokenvalue').status(200).send({"msg":"cookie is seen and removed","status":true})
        }
        catch(e){
            res.status(404).send({"msg":"cookie error","status":false})
        }
    }
    console.log("this is token",inputtoken)
})
app.post('/delete',authorize,(req,res)=>{
    res.send({"msg":'deleted successfully'})
})
app.post('/update',authorize,(req,res)=>{
    res.send({"msg":"you are authorized"})
 })
app.listen(3001,()=>console.log('server started at port 3001'))