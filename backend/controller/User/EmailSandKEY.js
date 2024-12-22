const nodemailer = require('nodemailer');

async function sendKEY(req, res) {
    const { email,Code} = req.body;
    const otp = Code  

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from:email,
        to:process.env.EMAIL_USER ,
        subject: `${email}`,
        text: `${email} Seand A OTP  For Applay For The User Cahnge Role KEY ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('OTP sent successfully');
    } catch (error) {
        res.status(500).send('Error sending OTP');
    }
    

}


module.exports = sendKEY
