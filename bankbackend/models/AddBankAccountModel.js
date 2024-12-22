const  mongoose = require("mongoose")


const AddBankAccountSchema = new mongoose.Schema({
    Bank:String,
    AccountHolderPhoto:String,  
    Date:String,
    Branch:String,
    BranchCode:String,
    AccountHolderName:String,
    MobileNo:String,
    EmailId:String,
    AccountType:String,
    AccountNumber:String,
    ProcuctCode:String,
},{
   timestamps:true
})

const AddBankAccountModel = mongoose.model("AddBankAccount",AddBankAccountSchema)

module.exports = AddBankAccountModel