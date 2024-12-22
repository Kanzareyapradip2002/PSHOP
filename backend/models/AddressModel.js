const  mongoose = require("mongoose")


const AddressSchema = new mongoose.Schema({
    fullName:String,
    phoneNumber:String,
    altPhoneNumber:String,
    pincode:String,
    state:String,
    city:String,
    houseNo:String,
    roadName:String,
    verificationCode:String
},{
   timestamps:true
})

const AddressModel = mongoose.model("Address",AddressSchema)

module.exports = AddressModel