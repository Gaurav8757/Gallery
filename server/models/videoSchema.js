import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  filename: String,
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
