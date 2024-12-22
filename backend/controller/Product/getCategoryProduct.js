const ImagesModel = require("../../models/ImagesModel");

const getCategoryProduct = async (req, res) => {
    try {
        const productCategories = await ImagesModel.distinct("category");

        const productsByCategory = [];
        for (const category of productCategories) {
            const products = await ImagesModel.find({ category });
            if (products.length > 0) {
                productsByCategory.push({ category,products});
            }
        }

        res.json({
            message: "Category products fetched successfully",
            data: productsByCategory,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getCategoryProduct;
    