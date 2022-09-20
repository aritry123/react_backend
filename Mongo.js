const express=require('express')
const app=express()
const bp=require('body-parser')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const contactModel=require('./models/CustomerModel')
const userCredentials=require('./data/credentials')
const createContact=require('./controllers/CreateUser')
const authorize=require('./middleware/authorize')
app.use(cors())
app.use(bp.json())
app.use('/',createContact)
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
app.get('/get',(req,res)=>{
    contactModel.find().then((result)=>res.send({"data":result,"msg":'all contacts',"status":true})).catch((e)=>console.log(e))
})
app.post('/delete/:id',authorize,(req,res)=>{
    contactModel.remove({_id:req.params.id}).then((result)=>res.status(200).send({"data":result,"msg":"deleted successfully","status":true})).catch((err)=>res.status(500).send({"msg":"error in deleting","status":false}))
})
app.post('/update/:id',authorize,(req,res)=>{
    const data=req.body
    contactModel.updateOne({_id:req.params.id},{
        $set:{
            Fname:data.fname,
            Phone:data.phone,
            Address:data.address
        }
    }).then((result)=>res.send({"data":result,"msg":"updated successfully","status":true})).catch((e)=>res.send({"msg":"error in updating","status":false}))
})
app.listen(3001,()=>console.log('server started at port 3001'))