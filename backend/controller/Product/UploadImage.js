const ImageModel = require("../../models/ImagesModel");

async function UploadImageProductController(req, res) {
    try {
        const { productName,ProductCode,Code, brandName,minecategory, category,productOtherImage1,productOtherImage2,productOtherImage3,productOtherImage4, productImage, description, price, selling } = req.body;

        if (!productName) {
            return res.status(400).json(
                {
                    message: "Please provide Product Name",
                    error: true,
                    success: false
                });
        }
        if (!ProductCode) {
            return res.status(400).json(
                {
                    message: "Please provide Product Name",
                    error: true,
                    success: false
                });
        }
        if (!brandName) {
            return res.status(400).json(
                {
                    message: "Please provide Brand Name",
                    error: true,
                    success: false
                });
        }
        if (!category) {
            return res.status(400).json(
                {
                    message: "Please provide Category",
                    error: true,
                    success: false
                });
        }
        if (!productImage) {
            return res.status(400).json(
                {
                    message: "Please provide Product Image",
                    error: true,
                    success: false
                });
        }
        if (!price) {
            return res.status(400).json(
                {
                    message: "Please provide Price",
                    error: true,
                    success: false
                });
        }
        if (!description) {
            return res.status(400).json(
                {
                    message: "Please provide description",
                    error: true,
                    success: false
                });
        }
        if (!minecategory) {
            return res.status(400).json(
                {
                    message: "Please provide Main category ",
                    error: true,
                    success: false
                });
        }
        if (!selling) {
            return res.status(400).json(
                {
                    message: "Please provide Discount",
                    error: true,
                    success: false
                });
        }

        const payload = {        
            productName,
            brandName,
            category,
            productImage,
            minecategory,
            productOtherImage1,
            productOtherImage2,
            productOtherImage3,
            productOtherImage4,
            description,
            price,
            selling,
            ProductCode,
            Code
        };

        const imageData = new ImageModel(payload);
        const savedImage = await imageData.save();

        res.status(201).json({
            data: savedImage,
            success: true,
            error: false,
            message: "Uploaded the Product Successfully"
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

module.exports = UploadImageProductController;
