import express from "express";
import { getUserData, updateUserProfile, uploadProfilePicture } from "../controllers/userController.js";
import upload from "../config/multer.js";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

router.put("/upload-profile-picture", userAuth, upload.single("profilePicture"), uploadProfilePicture);

router.put("/update-profile", userAuth, updateUserProfile);

router.get("/data", userAuth, getUserData);


export default router;