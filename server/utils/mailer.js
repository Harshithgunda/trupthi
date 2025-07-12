const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = async (to, subject, htmlContent) => {
  const mailOptions = {
    from: `"Trupthi Meals" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Confirmation email sent to ${to}`);
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw error;
  }
};

module.exports = sendConfirmationEmail;
