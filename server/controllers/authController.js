import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import transporter from "../config/nodemailer.js";

dotenv.config();

/**
 * @desc Registers a new user, sends a verification code to email
 * @route POST /auth/register
 * @access Public
 */
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, phoneNumber, password } = req.body;
    if(!firstName || !lastName || !username || !email || !phoneNumber || !password) {
      return res.status(400).json({success:false, message: "All fields are required"});
    }

    // Check user already exists with the help of email or username
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({success:false, message: "email already exists" });
    }

     // check if the username is already taken by another user
     if (username && username !== User.findOne(username)) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({success:false, message: "Username already taken" });
      }
    }


     // check if the phone number is already taken by another user
     if (phoneNumber && phoneNumber !== User.findOne(phoneNumber)) {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already taken" });
      }
    }
    
    // Hash The password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crate user with is Verified set To false
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({id: newUser._id, role:newUser.role}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});

    res.cookie("token", token, {
      httpOnly: true,
      secure:  process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

     // Sending Welcome Email
     const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to our New Tube",
      text: `Welcome to our new Tube .Your account has been created successfully. with email ${email}`,
      html: `<p>Welcome to our new Tube ${newUser.username}!</p>`
    }

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully",
    });
  } catch (error) {
    console.log("Registration Error: ", error);
    return res.status(500).json({success:false, message: "Server error . Try again later" });
  }
};

/**
 * @desc Verifies the email with the OTP and generates tokens (Max 2 attempts)
 * @route POST /auth/verify-otp
 * @access Public
 */
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find user by email
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check is user is already verified
    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({success:false, mmessage: "User is alredy verified. Please login." });
    }

    const otp =  String(Math.floor(100000 + Math.random() * 900000)) ;

    user.verifyOtp = otp;
    user.verifyOtpExiredAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP for account verification is: ${otp}`,
     }
     await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success:true,
      message: "Verification code sent to your email",
    });

  } catch (error) {
    console.log("Verification Error: ", error);
    return res.status(500).json({ message: "Server error. Try again later" });
  }
};

/**
 * @desc Verifies the email with the OTP 
 * @access Public 
 */
export const verifyEmail = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    
    if(!userId || !otp){
      return res.status(400).json({ success:false, message: "Missing Details" });
    }
    
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    if(user.verifyOtp === '' || user.verifyOtp !== otp){
      return res.status(400).json({ success:false, message: "Invalid OTP" });
    }

    if(user.verifyOtpExiredAt < Date.now()){
      return res.status(400).json({ success:false, message: "OTP has expired" });
    }
   
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExiredAt = 0;

    await user.save();

    return res.status(200).json({
      success:true,
      message: "Email verified successfully",
    });
    
  } catch (error) {
    console.log("Verification Error: ", error);
    return res.status(500).json({success:false, message: "Server error. Try again later" });
  }
}


/**
 * @desc Logs in a user and generates new tokens
 * @route POST /auth/login
 * @access Public
 */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({success:false, message: "All fields are required" }); 
    }

    // Find User by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({success:false, message: "Invalid email" });
    }
    // verify the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
 
    const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});

    res.cookie("token", token, {
      httpOnly: true,
      secure:  process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

   

    return res.status(201).json({
      success: true, 
      message:
        "User Logged in successfully",
    });
}catch(error){
  console.log("Login Error: ", error);
  return res.status(500).json({ success:false, message: "Server error. Try again later" });
}
}


/**
 * @desc Logs out the user (Frontend should remove the token)
 * @route POST /auth/logout
 * @access Private (Requires Auth Middleware)
 */
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure:  process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.status(200).json({success:true, message: "Logout successful."})
  } catch (error) {
    console.log("Logout Error: ", error);
    return res.status(500).json({ message: "Server error. Try again later" });
  }
}


// Check if user is authenticated or not
export const isAuthenticated = async (req, res) => {
  try {
   
    return res.status(200).json({success:true});
  }catch(error){
    console.log(error);
    
    return res.status(500).json({success:false, message: error.message});
  }
}


// Send Reset Password OTP on mail
export const sendResetOtp = async (req, res) => {
  const {email} = req.body;

  if(!email){
    return res.status(400).json({success:false, message: "Email is required"});
  }

  try {
     
  const user = await User.findOne({email});

  if(!user){
    return res.status(404).json({success:false, message: "User not found"});
  }

  // Generate 6 Didit Random  Number
  const otp =  String(Math.floor(100000 + Math.random() * 900000)) ;

  user.resetOtp = otp;
  user.resetOtpExiredAt = Date.now() + 15 * 60 * 1000; // 15 mins from now

  await user.save();

  // Send Email with OTP
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Password Reset OTP",
    text: `Your OTP for password reset is: ${otp}.
    Use this OTP to reset your password.`,
  }

  await transporter.sendMail(mailOptions);

  return res.status(200).json({success:true, message: "Reset OTP sent to your email"});

    
  } catch (error) {
    console.log("Error sending reset OTP: ", error);
    return res.status(500).json({success:false, message: "Server error. Try again later"});  
  }
}

// Reset Your Password
export const resetPassword = async(req, res) => {
  try {
    const {email, otp, newPassword} = req.body;

    if(!email ||!otp ||!newPassword){
      return res.status(400).json({success:false, message: "All fields are required"});
    }

    const user = await User.findOne({email});

    if(!user){
      return res.status(404).json({success:false, message: "User not found"});
    }

    if(user.resetOtp === "" ||user.resetOtp !== otp){
      return res.status(400).json({success:false, message: "Invalid OTP"});
    }
    if(user.resetOtpExiredAt < Date.now()){
      return res.status(400).json({success:false, message: "OTP has expired"}); 
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExiredAt = 0;

    await user.save();

    return res.status(200).json({success:true, message: "Password reset successfully"});
  } catch (error) {
    console.log("Error resetting password: ", error);
    return res.status(500).json({success:false, message: "Server error. Try again later"});
  }
}
