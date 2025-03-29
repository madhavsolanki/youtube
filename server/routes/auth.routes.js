import express from "express";
import {
  isAuthenticated,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Verify Email
router.post("/send-verify-otp", userAuth, sendVerifyOtp);

// Verify Email
router.post("/verify-account", userAuth, verifyEmail);

// is Authenicated
router.get("/is-auth", userAuth, isAuthenticated);

// Login User
router.post("/login", loginUser);

// Logout User
router.post("/logout", logoutUser);

// Send password reset otp
router.post("/send-reset-otp", sendResetOtp);

// Reset Password
router.post("/reset-password", resetPassword);

export default router;
