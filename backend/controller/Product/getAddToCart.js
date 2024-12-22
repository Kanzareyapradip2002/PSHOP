const AddToCartModel = require("../../models/AddToCartModel")

const getAddToCartController = async (req, res) => {
    try {

        const allAddToCartProduct = await AddToCartModel.find();
    
        res.json({
            message: "All Add To Cart Products",
            success: true,
            error: false,
            data: allAddToCartProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getAddToCartController;
