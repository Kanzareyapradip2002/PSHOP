const AddToCartModel = require("../../models/AddToCartModel");

async function AddToCartProductController(req, res) {
    try {
        const {
            TotalPrice,
            Num,
            ProductImage,
            ProductName,
            ProductBrand,
            ProductCategory,
            ProductDescription,
            ProductPrice,
            ProductSelingPrice,
            Discount,
            FullName,
            PhoneNumber,
            AltPhoneNumber,
            Pincode,
            State,
            City,
            HouseNo,
            RoadName,
            VerificationCodes,
            DeliveryChargePrice,
            DiscountPrice,
            Code,
            Confirmation
        } = req.body;

        const payload = {
            TotalPrice,
            Num,
            ProductImage,
            ProductName,
            ProductBrand,
            ProductCategory,
            ProductDescription,
            ProductPrice,
            ProductSelingPrice,
            Discount,
            FullName,
            PhoneNumber,
            AltPhoneNumber,
            Pincode,
            State,
            City,
            HouseNo,
            RoadName,
            VerificationCodes,
            DeliveryChargePrice,
            DiscountPrice,
            Code,
            Confirmation
        };

        const imageData = new AddToCartModel(payload);
        const savedImage = await imageData.save();

        res.status(201).json({
            data: savedImage,
            success: true,
            error: false,
            message: "Add To Cart Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while uploading the product",
            error: true,
            success: false
        });
    }
}

module.exports = AddToCartProductController;