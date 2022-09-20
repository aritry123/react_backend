const mongoose=require('mongoose')
// mongoose.connect("mongodb+srv://aritry123:AritryMongo10@cluster0.h0xjooq.mongodb.net/?retryWrites=true&w=majority").then((res)=>console.log("connected to db")).catch((e)=>console.log("error in connection",e))
const userModel=mongoose.model("UserCollection",{
    fname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    address:{
        type:String
    },
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    }
})
module.exports=userModel