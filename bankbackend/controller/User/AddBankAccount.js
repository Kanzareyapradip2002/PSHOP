const AddBankAccountModel = require("../../models/AddBankAccountModel")

async function AddBankAccount(req, res) {
    try {
        const {
            Bank,
            AccountHolderPhoto,  // Default to empty string if no photo
            Date,
            Branch,
            BranchCode,
            AccountHolderName,
            MobileNo,
            EmailId,
            AccountType,
            AccountNumber,
             } = req.body;

        const payload = {
            Bank,
            AccountHolderPhoto,  // Default to empty string if no photo
            Date,
            Branch,
            BranchCode,
            AccountHolderName,
            MobileNo,
            EmailId,
            AccountType,
            AccountNumber,
        };

        const imageData = new AddBankAccountModel(payload);
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

module.exports = AddBankAccount;
