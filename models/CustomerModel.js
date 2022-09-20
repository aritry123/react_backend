const mongoose=require('mongoose')
// mongoose.connect("mongodb+srv://aritry123:AritryMongo10@cluster0.h0xjooq.mongodb.net/?retryWrites=true&w=majority").then((res)=>console.log("connected to db")).catch((e)=>console.log("error in connection",e))
const contactModel=mongoose.model("ContactsCollection",{
    Fname:String,
    Phone:Number,
    Address:String
})
// creating a document
// const user1=contactModel({
//     Fname:'john',
//     Phone:2938283,
//     Address:"IND"
// })
// user1.save().then((res)=>console.log("created one user in db")).catch((e)=>console.log(e))
module.exports=contactModel