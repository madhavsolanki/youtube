import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


/**
 * @desc Sends OTP to user's email
 * @param {string} email - User's email
 * @param {string} otp - Verification code
 */
export const sendVerificationEmail = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
     service: "gmail",
     auth:{
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD
     } 
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Verification Code",
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; text-align: center; background-color: #f9f9f9;">
          <h2 style="color: #333;">Email Verification</h2>
          <p style="font-size: 16px; color: #555;">Your verification code is:</p>
          <div style="font-size: 22px; font-weight: bold; color: #4CAF50; padding: 10px; border-radius: 5px; background-color: #e8f5e9; display: inline-block;">${otp}</div>
          <p style="font-size: 14px; color: #777; margin-top: 20px;">This code is valid for a limited time. Please do not share it with anyone.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #999;">If you did not request this code, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log(error);
  }
};

/**
 * @desc Sends re-registration email if the user fails OTP verification twice
 * @param {string} email - User's email
 */
const sendReRegisterEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Re-Register Your Account",
      html: `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; padding: 20px; text-align: center; background-color: #f9f9f9;">
          <h2 style="color: #333;">Re-Register Your Account</h2>
          <p style="font-size: 16px; color: #555;">You have entered an incorrect verification code multiple times, and your account has been deleted for security reasons.</p>
          <p style="font-size: 16px; color: #555;">Please click the button below to register again:</p>
          <a href="http://yourwebsite.com/register" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; display: inline-block;">Re-Register</a>
          <p style="font-size: 14px; color: #777; margin-top: 20px;">If you did not attempt to verify an account, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

  } catch (error) {
    console.log("Error sending re-registration email: ", error);
  }
};

export default sendReRegisterEmail;


/**
 * @desc Sends an email (Verification, Password Reset, etc.)
 * @param {string} email - Recipient's email
 * @param {string} emailContent - HTML email body
 */
export const sentPasswordManagementEmai = async (email, emailContent) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth:{
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
      }
    });

    // Email Options 
    const mailOptions = {
      from : process.env.SMTP_MAIL,
      to: email,
      subject: "Forgot Password",
      html: emailContent
    };

    // Send email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

