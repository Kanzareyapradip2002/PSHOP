const ImagesModel = require("../../models/ImagesModel");

const getMainCategoryProduct = async (req, res) => {
    try {
        // Get distinct main categories
        const productMainCategories = await ImagesModel.distinct("minecategory");

        const productsByMainCategory = []; // Initialize the array to hold categorized products

        // Loop through each main category to fetch products
        for (const minecategory of productMainCategories) {
            const products = await ImagesModel.find({ minecategory });

            // Only push categories with products into the array
            if (products.length > 0) {
                productsByMainCategory.push({ minecategory, products });
            }
        }

        // Send response with categorized products
        res.json({
            message: "MainCategory products fetched successfully",
            data: productsByMainCategory,
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

module.exports = getMainCategoryProduct;
