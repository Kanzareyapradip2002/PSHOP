const  mongoose = require("mongoose")


const ImageSchema = new mongoose.Schema({
    productName:String,
    brandName:String,
    category:String,
    minecategory:String,
    productImage:String,
    productOtherImage1:String,
    productOtherImage2:String,
    productOtherImage3:String,
    productOtherImage4:String,
    description:String,
    price:String,
    selling:String,
    ProductCode:String,
    Code:String,
    

},{
   timestamps:true
})

const ImageModel = mongoose.model("ProductImages",ImageSchema)

module.exports = ImageModel