import Video from "../models/videoSchema.js";
import Subtitle from "../models/subtitleSchema.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
// CONFIG CLOUDNARY 
const { CLOUDNARY_CLOUD_NAME, CLOUDNARY_API_KEY, CLOUDNARY_API_SECRET } =
  process.env;
cloudinary.config({
  cloud_name: CLOUDNARY_CLOUD_NAME,
  api_key: CLOUDNARY_API_KEY,
  api_secret: CLOUDNARY_API_SECRET,
});

// UPLOAD VIDEO CONTROLLER
export const VideoUpload = async (req, res) => {
  try {
     // UPLOAD VIDEO TO CLOUDNARY
     const cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "video",
      folder:"video"
      
    });
    // PROCESS VIDEO FILE AND SAVE VIDEO DETAILS TO THE DATABASE
    const video = new Video({ filename: req.file.filename, cloudinaryUrl: cloudinaryResult.secure_url, });
    await video.save();

    return res
      .status(200)
      .json({ message: "File uploaded successfully.", video });
  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"Internal Server Error", error});
  }
};

