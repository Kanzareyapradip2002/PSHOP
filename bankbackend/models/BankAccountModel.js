const  mongoose = require("mongoose")


const BankAccountSchema = new mongoose.Schema({
    Bank: String,
    AccountHolerPhoto:String,
    PanCardPhoto: String,
    AadhaarCardPhoto: String,
    SignacherPhoto: String,
    Date: String,
    ProductCode: String,
    Branch: String,
    BranchCode: String,
    AccountHolderName: String,
    DateoFBirth: String,
    Gender: String,
    MaritalStatus: String,
    AnnualIncome: String,
    Religion: String,
    Category: String,
    EducationalQualification: String,
    SourceofFunds: String,
    Nationality: String,
    PanCardNo: String,
    AadhaarCardNo: String,
    MobileNo: String,
    AltMobileNo: String,
    EmailId: String,
    AddressType: String,
    Address: String,
    City:String,
    District:String,
    PinCode:String,
    State:String,
    Country:String,
    Balance:String,
    AccountType:String,
    PIN:String,
    AccountNumber:String

},{
   timestamps:true
})

const BankAccountModel = mongoose.model("BankAccount",BankAccountSchema)

module.exports = BankAccountModel