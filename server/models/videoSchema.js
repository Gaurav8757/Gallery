import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  filename: String,
  cloudinaryUrl: String,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
