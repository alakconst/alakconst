require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Generate a random 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// Send the OTP via SMS
function sendOTP(mobileNumber, otp) {
  return client.messages.create({
    body: `Your OTP is: ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: mobileNumber
  });
}

// Define the endpoint for mobile number verification
app.post('/verify', (req, res) => {
  const { mobileNumber } = req.body;
  const otp = generateOTP();

  sendOTP(mobileNumber, otp)
    .then(() => {
      res.json({ success: true, message: 'OTP sent successfully.' });
    })
    .catch((error) => {
      console.error('Error sending OTP:', error);
      res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    });
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});