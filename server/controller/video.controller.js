import VideoModel from "../models/videoSchema.js";

// video upload controller
export async function uploadVideo(req, res) {
    const videoFile = req.file;
    const video = new VideoModel({ file: videoFile });

    try {
      await video.save();
      return res.status(200).json({ message: 'Video uploaded successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error saving video to the database.' });
    }
  
}
