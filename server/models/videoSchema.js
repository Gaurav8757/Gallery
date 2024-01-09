import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  file: Object,
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;
