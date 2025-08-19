const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendConfirmationEmail = (userEmail) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: 'Thank You for Contacting Us!',
    html: `
      <h2>Thank You for Reaching Out!</h2>
      <p>We have received your message and will get back to you as soon as possible.</p>
      <p>In the meantime, feel free to explore more of our website.</p>
      <br>
      <p>Best regards,<br>
      DCS</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendConfirmationEmail };