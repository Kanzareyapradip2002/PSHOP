const BankAccountModel = require("../../models/BankAccountModel");

async function DepositMoney(req, res) {
    try {
        // Destructure values from the request body
        const { accountId, Balance } = req.body;

        // Validate input data
        if (!accountId || isNaN(Balance) || Balance <= 0) {
            return res.status(400).json({
                message: "Invalid input data. Please provide a valid accountId and a positive balance.",
                success: false,
                error: true
            });
        }

        // Prepare the payload for updating the user account
        const payload = {
            ...(Balance && { Balance: Balance }),     // Update Balance if provided
        };

        // Find the account by ID and update the fields
        const updatedAccount = await BankAccountModel.findByIdAndUpdate(accountId, payload, { new: true });

        // If the account doesn't exist, send a "Not Found" response
        if (!updatedAccount) {
            return res.status(404).json({
                message: "Account not found",
                success: false,
                error: true
            });
        }

        // Respond with the updated account data
        res.json({
            data: updatedAccount,
            message: "Account updated successfully",
            success: true,
            error: false
        });

    } catch (err) {
        // Catch any unexpected errors and respond with a 500 status
        console.error(err);
        res.status(500).json({
            message: err.message || "An error occurred while updating the account",
            success: false,
            error: true
        });
    }
}

module.exports = DepositMoney;
