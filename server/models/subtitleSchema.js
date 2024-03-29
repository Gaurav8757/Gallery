import mongoose from "mongoose";
// SUBTITLES SCHEMA
const subtitleSchema = new mongoose.Schema({
  videoId: String,
  text: String,
  title: [
    {
      videoId: String,
      specific_subtitles: String,
      time: String,
    },
  ],
});

const Subtitle = mongoose.model("Subtitle", subtitleSchema);

export default Subtitle;
