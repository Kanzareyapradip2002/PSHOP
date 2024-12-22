const OrderProductModel = require("../../models/OrderProductModel");

const getOrderProductController = async (req, res) => {
    try {

        const allOrderProduct = await OrderProductModel.find();
    
        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allOrderProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "An error occurred",
            error: true,
            success: false
        });
    }
};

module.exports = getOrderProductController;
