import multer from 'multer';
import VideoModel from "../models/videoSchema.js";
import UploadUtils from "../models/subtitleSchema.js";

const storage = multer.diskStorage({
  destination: UploadUtils.videoUploadPath,
  filename: UploadUtils.videoFilename,
});

const upload = multer({ storage });

export async function uploadVideo(req, res) {
  upload.single('video')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading video.' });
    }

    const videoFile = req.file;
    const video = new VideoModel({ file: videoFile });

    try {
      await video.save();
      return res.status(200).json({ message: 'Video uploaded successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Error saving video to the database.' });
    }
  });
}
