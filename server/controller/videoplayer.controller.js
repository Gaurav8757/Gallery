import Subtitle from "../models/subtitleSchema.js";
import Video from "../models/videoSchema.js";

// GET A LIST OF  ALL VIDEOS WITH SUBTITLES
export const ListVideosWithSubtitles = async (req, res) => {
  try {
    const videos = await Video.find();
    const videosWithSubtitles = [];

    for (const video of videos) {
      const subtitles = await Subtitle.find({ videoId: video._id });
      videosWithSubtitles.push({
        videoId: video._id,
        videoPath: video.cloudinaryUrl,
        fileName: video.filename, 
        subtitles,
      });
    }
    res.json(videosWithSubtitles);
  } catch (error) {
    console.error("Error fetching videos with subtitles:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};






