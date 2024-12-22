const OrderProductModel = require("../../models/OrderProductModel");

async function OrderProdactUpdate(req,res){
    try {
        const {OrderId,Confirmation} = req.body
        
        const payload = {
            ...(Confirmation && {Confirmation:Confirmation}),
        }

        const updateConfirmation = await OrderProductModel.findByIdAndUpdate(OrderId,payload)

        res.json({
            data:updateConfirmation,
            message:"Conformaed Order",
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

module.exports = OrderProdactUpdate