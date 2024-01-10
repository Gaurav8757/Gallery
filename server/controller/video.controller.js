import Video from "../models/videoSchema.js";
import Subtitle from "../models/subtitleSchema.js";
// video upload controller
export const VideoUpload = async (req, res) => {
  try {
    // Process video file and save video details to the database
    const video = new Video({ filename: req.file.filename });
    await video.save();

    return res
      .status(200)
      .json({ message: "File uploaded successfully.", video });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

