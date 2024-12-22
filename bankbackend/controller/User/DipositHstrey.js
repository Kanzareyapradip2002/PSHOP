const DipositHstreyModel = require("../../models/DipositHstreyModel")

async function DipositHstrey(req, res) {
    try {
        const {
            AccountNumber,
            Balance, } = req.body;

        const payload = {
            AccountNumber,
            Balance
        };

        const imageData = new DipositHstreyModel(payload);
        const savedImage = await imageData.save();

        res.status(201).json({
            data: savedImage,
            success: true,
            error: false,
            message: "Bank Account Creacted Successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while uploading the Deteles",
            error: true,
            success: false
        });
    }
}

module.exports = DipositHstrey;
