import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";
import bcrypt from "bcrypt";

/**
 * Upload or Update Profile Picture
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const {userId} = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // if user has an old profile picture, delete it from cloudinary
    if (user.profilePicture.publicId) {
      await cloudinary.uploader.destroy(user.profilePicture.publicId);
    }

    // Upload new image to Cloudinary
    const uploadedImage = await cloudinary.uploader.upload_stream(
      { folder: "profile_pictures" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Cloudinary upload failed", error });
        }
        // Update user profile picture in the database
        user.profilePicture = {
          imageUrl: result.secure_url,
          publicId: result.public_id,
        };

        await user.save();

        res.status(200).json({
          message: "Profile picture updated successfully",
          profilePicture: user.profilePicture,
        });
      }
    );

    uploadedImage.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/*
  Update user profile textual data in the database
*/
export const updateUserProfile = async (req, res) => {
  try {
    const {userId} = req.body;
    const { firstName, lastName, username, password, phoneNumber } = req.body;

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // check if the username is already taken by another user
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username already taken" });
      }
    }

    // check if the phone number is already taken by another user
    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const existingUser = await User.findOne({ phoneNumber });
      if (existingUser) {
        return res.status(400).json({ message: "Phone number already taken" });
      }
    }

    // If password is updated , hash the new password
    let hashedPassword = user.password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update only the provided fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.username = username || user.username;
    user.password = hashedPassword;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Save the updated userdata
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error:error.message });
  }
};


export const getUserData = async (req, res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId);

    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({success:true, userData: user});
  } catch (error) {
    
  }
}