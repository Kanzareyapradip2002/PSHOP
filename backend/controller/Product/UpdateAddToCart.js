const AddToCartModel = require("../../models/AddToCartModel");

async function UpdateAddToCart(req,res){
    try {
        const {OrderId,Confirmation} = req.body
        
        const payload = {
            ...(Confirmation && {Confirmation:Confirmation}),
        }

        const updateConfirmation = await AddToCartModel.findByIdAndUpdate(OrderId,payload)

        res.json({
            data:updateConfirmation,
            success:true,
            error:false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = UpdateAddToCart