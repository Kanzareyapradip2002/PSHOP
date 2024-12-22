const AddressModel = require("../../models/AddressModel");
const mongoose = require("mongoose");

const deleteAddress = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid address ID" });
    }

    const deletedAddress = await AddressModel.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.status(200).json({ message: "Address deleted successfully", deletedAddress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error deleting address: ${error.message}` });
  }
};

module.exports = deleteAddress;
