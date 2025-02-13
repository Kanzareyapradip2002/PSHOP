const nodemailer = require('nodemailer');

async function EmailOrderDetails(req, res) {
    const {
        email,
        ProductImage,
        productName,
        productBrand,
        productCategory,
        productQuantity,
        productPrice,
        discount,
        totalPrice,
        accountHolderName,
        accountNumber,
        mobileNo,
        fullName,
        altMobileNo,
        pinCode,
        city,
        state,
        houseNo,
        roadName,
        confirmation
    } = req.body;

    // Ensure transporter uses proper credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Ensure EMAIL_USER and EMAIL_PASS are set in your .env file
            pass: process.env.EMAIL_PASS, // Ensure EMAIL_PASS is set in your .env file
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Ensure this matches the sender email
        to: email,
        subject: `Order Details for Send By P-SHOP`,
        html: `
            <div style="border: 2px solid #007BFF; padding: 20px; border-radius: 8px; background-color: #f9f9f9;">
                <div style="text-align: center;">
                    <img src="cid:product_image" alt="Product Image" style="max-width: 100%; height: auto; border-radius: 8px;" />
                </div>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Dear Customer,</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Here are the details of your order:</p>

                <p style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #007BFF;">*Product Details*</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Product Name: <strong>${productName}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Product Brand: <strong>${productBrand}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Product Category: <strong>${productCategory}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Product Quantity: <strong>${productQuantity}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Discount: <strong>${discount}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">1 Product Price: <strong>${productPrice}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Total Price: <strong>${totalPrice}</strong></p>

                <p style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #007BFF;">*Account Details*</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Account Holder Name: <strong>${accountHolderName}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Account Number: <strong>${accountNumber}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Mobile No: <strong>${mobileNo}</strong></p>

                <p style="font-family: Arial, sans-serif; font-size: 16px; font-weight: bold; color: #007BFF;">*Address Details*</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Full Name: <strong>${fullName}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Alt Mobile No: <strong>${altMobileNo}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Pin Code: <strong>${pinCode}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">City: <strong>${city}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">State: <strong>${state}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">House No: <strong>${houseNo}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Road Name: <strong>${roadName}</strong></p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Thank you for your purchase at P-SHOP!</p>
                <p style="font-family: Arial, sans-serif; font-size: 14px; color: #333;">Your order is <strong>${confirmation}</strong></p>
            </div>
        `,
        attachments: [
            {
                filename: 'product_image.jpg', // Adjust the filename if necessary
                path: ProductImage, // This should be a valid file path or URL
                cid: 'product_image' // Content ID for embedding the image
            }
        ]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send('Error sending message');
    }
}

module.exports = EmailOrderDetails;
