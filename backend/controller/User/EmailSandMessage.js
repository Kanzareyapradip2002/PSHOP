const nodemailer = require('nodemailer');

async function sendMessage(req, res) {
    const { email,Code} = req.body;
    const Message = Code  

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from:email,
        to: process.env.EMAIL_USER,
        subject: `${email}`,
        text: `${email} Seand By Message: ${Message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Message sent successfully');
    } catch (error) {
        res.status(500).send('Error sending Message');
    }
    

}


module.exports = sendMessage
