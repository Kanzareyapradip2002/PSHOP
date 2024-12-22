const ImageModel = require("../../models/ImagesModel");

async function updateProductController(req,res){
   try{
      const {_id,...resBody } = req.body

      const updateProduct = await ImageModel.findByIdAndUpdate(_id,resBody)

      res.json({
        message:"Product update successfully",
        data:updateProduct,
        success:true,
        error:false
      })
   }catch(error){
    res.status(400).json({
        message: err.message || err,
        error: true,
        success: false
    })
   }

}

module.exports = updateProductController