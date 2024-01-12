import mongoose from "mongoose";
// VIDEO SCHEMA
const videoSchema = new mongoose.Schema({
  filename: String,
  cloudinaryUrl: String,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
