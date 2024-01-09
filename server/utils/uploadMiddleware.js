
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import path from 'path';

// // Get the directory name of the current module file
// const currentModuleFile = fileURLToPath(import.meta.url);
// const __dirname = dirname(currentModuleFile);

// export const videoUploadPath = path.join(__dirname, '../uploads/videos');

// // Define a function to filter files to only accept video files
// const videoFilter = (req, file, cb) => {
//   const allowedExtensions = /\.(mp4|mov|avi|mkv)$/;

//   if (!allowedExtensions.test(path.extname(file.originalname).toLowerCase())) {
//     return cb(new Error("Only video files (mp4, mov, avi, mkv) are allowed."), false);
//   }

//   cb(null, true);
// };

// const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // Construct the upload path
//     const uploadPath = videoUploadPath;
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
//     cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

// const uploadFile = multer({
//   storage: storageConfig,
//   fileFilter: videoFilter, // Use the video filter
// }).fields([
//   { name: "videoFile", maxCount: 1 }, // Adjust the field name if needed
// ]);

// export default uploadFile;
// Multer configuration for file upload
// multerConfig.js
import multer from "multer";

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});



const upload = multer({ storage });

export default upload;
