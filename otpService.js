// otpService.js
const { MailtrapClient } = require("mailtrap");
const crypto = require('crypto');
require('dotenv').config();

// Load Mailtrap API token from environment variables
const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = "https://send.api.mailtrap.io/";

// Create a new MailtrapClient instance
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

// Define sender email and name
const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};

// Function to generate a 6-digit OTP
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Function to send an OTP email
const sendOtpEmail = (email, otp) => {
  const recipients = [{ email }];

  return client.send({
    from: sender,
    to: recipients,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
    category: "OTP Verification",
  });
};

// Export the functions for use in other modules
module.exports = {
  generateOtp,
  sendOtpEmail
};
