const WidroleHisteryModel = require("../../models/WidroleHisteryModel")

async function AllPaymentHistory(req,res){
    try{
        
        const allUsers = await WidroleHisteryModel.find()

        res.json({
            message: " All Bank Account",
            data : allUsers,
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

module.exports = AllPaymentHistory