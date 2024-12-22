const nodemailer = require('nodemailer');

async function sendOtp(req, res) {
    const { email, Code } = req.body;
    const otp = Code;

    // Create the transporter using the Gmail service
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Set up the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is: ${otp}`, // Sending OTP in the email body
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`); // Log success (for debugging)
        res.status(200).send('OTP sent successfully'); // Send success response
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).send('Error sending OTP. Please try again later.'); // Send a generic error message
    }
}

module.exports = sendOtp;
