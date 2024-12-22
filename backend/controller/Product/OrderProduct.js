const OrderProductModel = require("../../models/OrderProductModel");

async function OrderProductController(req, res) {
    try {
        const {
            PhoneNumber,
            City,
            Code,
            Confirmation,
            DeliveryChargePrice,
            Discount,
            DiscountPrice,
            FullName,
            HouseNo,
            Num,
            State,
            Pincode,
            ProductBrand,
            ProductCategory,
            ProductDescription,
            ProductImage,
            ProductName,
            ProductPrice,
            TotalPrice,
            RoadName,
            VerificationCodes,
            AccountHolderName,
            AccountHolderPhoto,
            AccountNumber,
            Address,
            AltMobileNo,
            Bank,
            Branch,
            BranchCode,
            Country,
            District,
            EmailId,
            MobileNo,
            PinCode,
            ProductId
        } = req.body;

        const payload = {
            PhoneNumber,
            City,
            Code,
            Confirmation,
            DeliveryChargePrice,
            Discount,
            DiscountPrice,
            FullName,
            HouseNo,
            Num,
            State,
            Pincode,
            ProductBrand,
            ProductCategory,
            ProductDescription,
            ProductImage,
            ProductName,
            ProductPrice,
            TotalPrice,
            RoadName,
            VerificationCodes,
            AccountHolderName,
            AccountHolderPhoto,
            AccountNumber,
            Address,
            AltMobileNo,
            Bank,
            Branch,
            BranchCode,
            Country,
            District,
            EmailId,
            MobileNo,
            PinCode,
            ProductId
        };

        const imageData = new OrderProductModel(payload);
        const savedImage = await imageData.save();

        res.status(201).json({
            data: savedImage,
            success: true,
            error: false,
            message: "Order Successfully Sand To Processing "
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

module.exports = OrderProductController;