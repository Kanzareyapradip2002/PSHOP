const AddressModel = require("../../models/AddressModel")

async function AddressController(req, res) {
    try {
        const { fullName,phoneNumber,altPhoneNumber,pincode,state,city,houseNo,roadName,verificationCode} = req.body;

        if (!fullName) {
            return res.status(400).json(
                {
                    message: "Please provide Product Name",
                    error: true,
                    success: false
                });
        }
        if (!phoneNumber) {
            return res.status(400).json(
                {
                    message: "Please provide Brand Name",
                    error: true,
                    success: false
                });
        }
        if (!altPhoneNumber) {
            return res.status(400).json(
                {
                    message: "Please provide Category",
                    error: true,
                    success: false
                });
        }
        if (!pincode) {
            return res.status(400).json(
                {
                    message: "Please provide Product Image",
                    error: true,
                    success: false
                });
        }
        if (!state) {
            return res.status(400).json(
                {
                    message: "Please provide Price",
                    error: true,
                    success: false
                });
        }
        if (!city) {
            return res.status(400).json(
                {
                    message: "Please provide description",
                    error: true,
                    success: false
                });
        }
        if (!houseNo) {
            return res.status(400).json(
                {
                    message: "Please provide Main category ",
                    error: true,
                    success: false
                });
        }
        if (!roadName) {
            return res.status(400).json(
                {
                    message: "Please provide Discount",
                    error: true,
                    success: false
                });
        }


        const payload = {        
            fullName,
            phoneNumber,
            altPhoneNumber,
            pincode,
            state,
            city,
            houseNo,
            roadName,
            verificationCode
        };

        const imageData = new AddressModel(payload);
        const savedImage = await imageData.save();

        res.status(201).json({
            data: savedImage,
            success: true,
            error: false,
            message: "Uploaded the Product Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while uploading the product",
            error: true,
            success: false
        });
    }
}

module.exports = AddressController;
