import mongoose from 'mongoose';

const subtitleSchema = new mongoose.Schema({
  videoId: String,
  text: String,
  specific_subtitles: String,
  time: Number,
  
});

const Subtitle = mongoose.model('Subtitle', subtitleSchema);

export default Subtitle;

