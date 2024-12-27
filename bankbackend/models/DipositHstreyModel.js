const  mongoose = require("mongoose")


const DipositHstreySchema = new mongoose.Schema({
    AccountNumber:String,
    Balance:String,
    VerificationCodes:String,
    ProductId:String
},{
   timestamps:true
})

const DipositHstreyModel = mongoose.model("DipositHstrey",DipositHstreySchema)

module.exports = DipositHstreyModel
