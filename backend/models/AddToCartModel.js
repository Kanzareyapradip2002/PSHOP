const  mongoose = require("mongoose")


const AddToCartSchema = new mongoose.Schema({
    TotalPrice:String,
    Num:String,
    ProductImage:String,
    ProductName:String,
    ProductBrand:String,
    ProductCategory:String,
    ProductDescription:String,
    ProductPrice:String,
    ProductSelingPrice:String,
    Discount:String,
    SelectedAddress:String,
    VerificationCodes:String,
    FullName:String,
    PhoneNumber:String,
    AltPhoneNumber:String,
    Pincode:String,
    State:String,
    City:String,
    HouseNo:String,
    RoadName:String,
    DiscountPrice:String,
    DeliveryChargePrice:String,
    Code:String,
    Confirmation:String
},{
   timestamps:true
})

const AddToCartModel = mongoose.model("AddToCart",AddToCartSchema)

module.exports = AddToCartModel