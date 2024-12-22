const AddressModel = require("../../models/AddressModel")

async function allAddress(req,res){
    try{
        
        const allAddress = await AddressModel.find()

        res.json({
            message: " All Address",
            data : allAddress,
            success:true,
            error:false
        })
    }catch(error){
       res.status(400).json({
        message:error.message || error,
        error:true,
        success:false
       })
    }
}

module.exports = allAddress