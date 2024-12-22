const  mongoose = require("mongoose")


const WdroalaHistreySchema = new mongoose.Schema({
    AccountNumber:String,
    Balance:String
},{
   timestamps:true
})

const WdroalaHistreyModel = mongoose.model("WdroalaHistrey",WdroalaHistreySchema)

module.exports = WdroalaHistreyModel