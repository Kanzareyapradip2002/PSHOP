const WidroleHisteryModel = require("../../models/WidroleHisteryModel")

async function WIderoleHisterey(req, res) {
    try {
        const {
            AccountNumber,
            Balance,Code } = req.body;

        const payload = {
            AccountNumber,
            Balance,
            Code
        };

        const imageData = new WidroleHisteryModel(payload);
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

module.exports = WIderoleHisterey;
