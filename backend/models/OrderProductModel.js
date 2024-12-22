const mongoose = require("mongoose")


const OrderProductSchema = new mongoose.Schema({
    PhoneNumber: String,
    City: String,
    Code: String,
    Confirmation: String,
    DeliveryChargePrice: String,
    Discount: String,
    DiscountPrice: String,
    FullName: String,
    HouseNo: String,
    Num: String,
    State: String,
    Pincode: String,
    ProductBrand: String,
    ProductCategory: String,
    ProductDescription: String,
    ProductImage: String,
    ProductName: String,
    ProductPrice: String,
    TotalPrice: String,
    RoadName: String,
    VerificationCodes: String,
    AccountHolderName: String,
    AccountHolderPhoto: String,
    AccountNumber: String,
    Address: String,
    AltMobileNo: String,
    Bank: String,
    Branch: String,
    BranchCode: String,
    Country: String,
    District: String,
    EmailId: String,
    MobileNo: String,
    PinCode: String,
    ProductId: String
}, {
    timestamps: true
})

const OrderProductModel = mongoose.model("OrderProduct", OrderProductSchema)

module.exports = OrderProductModel