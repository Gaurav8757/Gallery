import Video from "../models/videoSchema.js";
import Subtitle from "../models/subtitleSchema.js";
import cloudinary from "cloudinary";
// video upload controller
export const VideoUpload = async (req, res) => {
  try {
     // Upload video to Cloudinary
     const cloudinaryResult = await cloudinary.v2.uploader.upload(req.file.path, {
      resource_type: "video",
      
      // You can add more options here
    });
    // Process video file and save video details to the database
    const video = new Video({ filename: req.file.filename, cloudinaryUrl: cloudinaryResult.secure_url, });
    await video.save();

    return res
      .status(200)
      .json({ message: "File uploaded successfully.", video });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

