const ImageModel = require("../../models/ImagesModel");

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req.body || req.query;

        if (!category) {
            return res.status(400).json({
                message: "Category is required",
                error: true,
                success: false
            });
        }

        const products = await ImageModel.find({ category });

        res.json({
            data: products,
            message: "Products retrieved successfully",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryWiseProduct;
