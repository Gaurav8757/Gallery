// VIDEO UPLOAD MIDDLEWARE MULTER
import multer from "multer";
import dotenv from "dotenv";

import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";



// GET THE DIRECTORY NAME OF THE CURRENT MODULE FILE
const currentModuleFile = fileURLToPath(import.meta.url);
const __dirname = dirname(currentModuleFile);

export const videoUploadPath = path.join(__dirname, "../uploads/videos");

// DEFINE A FUNCTION TO FILTER FILES TO ONLY ACCEPT VIDEO FILES
const videoFilter = (req, file, cb) => {
  const allowedExtensions = /\.(mp4|mov|avi|mkv|webm|flv|wmv|mpeg|mpg|3gp)$/;

  if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
    return cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only video files (mp4, mov, avi, mkv, webm, flv, wmv, mpeg, mpg, 3gp) are allowed."
      ),
      false
    );
  }

  cb(null, true);
};


const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    // CONSTRUCT THE UPLOAD PATH USING PATH.JOIN
    const uploadPath = videoUploadPath;
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // USE A MORE ROBUST METHOD FOR GENERATING UNIQUE FILENAMES
    const uniqueFilename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const uploadFile = multer({
  storage: storageConfig,
  fileFilter: videoFilter, // USE THE VIDEO FILTER
}).single("filename"); // USE .single() EXPECTING A SINGLE FILE WITH FIELD NAME 'filename'

export default uploadFile;
