import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allows null values while maintaining uniqueness
    },
    password: {
      type: String,
      required: true,
    },
    verifyOtp:{
      type:String,
      default:""
    },
    verifyOtpExiredAt:{
      type:Number,
      default:0
    },
    isAccountVerified:{
      type:Boolean, 
      default:false
    },
    resetOtp:{
      type:String,
      default:""
    },
    resetOtpExiredAt:{
       type:Number,
       default:0 
    },
    profilePicture: {
      imageUrl: { type: String },
      publicId: { type: String },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      unique: true, // Ensures each user can have only one channel
    },
    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    likedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
