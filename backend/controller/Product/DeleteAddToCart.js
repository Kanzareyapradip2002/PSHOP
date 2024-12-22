const AddToCartModel = require("../../models/AddToCartModel");
const mongoose = require("mongoose");

const deleteAddToCart = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid AddToCart ID" });
    }

    const deletedAddToCart = await AddToCartModel.findByIdAndDelete(id);

    if (!deletedAddToCart) {
      return res.status(404).json({ message: "AddToCart not found" });
    }

    res.status(200).json({ message: "AddToCart deleted successfully", deletedAddToCart });
} catch (error) {
    res.status(200).json({ message: "AddToCart deleted successfully"});
    console.error(error);
  }
};

module.exports = deleteAddToCart;
