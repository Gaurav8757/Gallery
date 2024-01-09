import mongoose from 'mongoose';

const subtitleSchema = new mongoose.Schema({
  videoId: String,
  subtitles: String,
  startTime: Number,
  endTime: Number,
});

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

export default Subtitle;

