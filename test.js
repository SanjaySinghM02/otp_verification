const express = require('express');
const bodyParser = require('body-parser');
const { generateOtp, sendOtpEmail } = require('./otpService');
const app = express();
app.use(bodyParser.json());

const otps = new Map(); // To store OTPs temporarily

app.use(express.static('public'));
app.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  const otp = generateOtp();
  otps.set(email, otp);

  try {
    await sendOtpEmail(email, otp);
    res.status(200).send('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP email:', error);
    res.status(500).send('Failed to send OTP');
  }
});

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otps.get(email);

  if (storedOtp && storedOtp === otp) {
    otps.delete(email);
    res.status(200).send('OTP verified successfully');
  } else {
    res.status(400).send('Invalid OTP');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
