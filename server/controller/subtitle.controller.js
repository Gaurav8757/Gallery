import Subtitle from "../models/subtitleSchema.js";
import Video from "../models/videoSchema.js";
// upload subtitle
export const addSubtitle = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { text, time } = req.body;

    // Save subtitles to the database
    const addSubtitle = new Subtitle({ videoId, text, time});
    await addSubtitle.save();
// print raw json 
    return res.status(200).json({ message: 'Subtitles submitted successfully.', addSubtitle });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

// Function to get current time in HH:MM:SS format
function getCurrentTime() {
  const now = new Date();
  let hours = now.getHours();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  
  // console.log(`${hours}:${minutes}:${seconds} ${amPm}`);
  return `${hours}:${minutes}:${seconds} ${amPm}`;
}

// save custom subtitles at specific timestamps to the "SUBTITLE" SCHEMA
export const customSubtitles = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { specific_subtitles } = req.body;

    // Save custom subtitle to the database
    const custom_subtitle = new Subtitle({
      videoId,
      specific_subtitles,
      time: getCurrentTime(),
      
    });
    await custom_subtitle.save();

    return res
      .status(200)
      .json({ message: "Your have added Subtitles..!", custom_subtitle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", error });
  }
};