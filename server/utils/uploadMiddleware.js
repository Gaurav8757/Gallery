import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import mongoose from "mongoose";

// Get the directory name of the current module file
const currentModuleFile = fileURLToPath(import.meta.url);
const __dirname = dirname(currentModuleFile);

export const videoUploadPath = path.join(__dirname, "../uploads/videos");

// Define a function to filter files to only accept video files
const videoFilter = (req, file, cb) => {
  const allowedExtensions = /\.(mp4|mov|avi|mkv)$/;

  if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
    return cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only video files (mp4, mov, avi, mkv) are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // Construct the upload path using path.join
    const uploadPath = videoUploadPath;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use a more robust method for generating unique filenames
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const uploadFile = multer({
  storage: storageConfig,
  fileFilter: videoFilter, // Use the video filter
}).single("filename"); // Use .single() if you are expecting a single file with the field name 'filename'

export default uploadFile;