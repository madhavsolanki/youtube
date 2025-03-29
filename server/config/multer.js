import multer from "multer";
import path from "path";

// Configure the storage to store file temporarily imnm memory
const storage = multer.memoryStorage();

// Validate the file type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if(allowedTypes.includes(file.mimetype)){
    cb(null, true);
  }
  else{
    cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."), false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;