import mongoose from 'mongoose';

const subtitleSchema = new mongoose.Schema({
  videoIndex: String,
  text: String,
  timestamp: Number,
});

const SubtitleModel = mongoose.model('Subtitle', subtitleSchema);

export default SubtitleModel;
