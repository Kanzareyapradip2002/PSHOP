const ImagesModel = require("../../models/ImagesModel");

const getProductController = async (req, res) => {
    try {

        const allProduct = await ImagesModel.find();
    
        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getProductController;
