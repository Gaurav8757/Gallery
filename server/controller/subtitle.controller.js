import Subtitle from "../models/subtitleSchema.js";
import Video from "../models/videoSchema.js";
// UPLOAD SUBTITLES
export const addSubtitle = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { text, time } = req.body;

    // SAVE SUBTITLES TO THE DATABASE
    const addSubtitle = new Subtitle({ videoId, text, time});
    await addSubtitle.save();
    return res.status(200).json({ message: 'Subtitles submitted successfully.', addSubtitle });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

// FUNCTION TO GET CURRENT TIME IN HH:MM:SS FORMAT
function getCurrentTime() {
  const now = new Date();

  // Get the UTC hours
  let hoursUTC = now.getUTCHours();
  // Convert UTC hours to IST hours
  let hoursIST = (hoursUTC + 5) % 24; // Adding 5 hours for IST

  // Adjust for midnight
  if (hoursIST < 0) {
    hoursIST += 24;
  }
  const amPm = hoursIST >= 12 ? 'PM' : 'AM';

  hoursIST = hoursIST % 12 || 12; // CONVERT 24-HOUR FORMAT TO 12-HOUR FORMAT
  const minutes = now.getUTCMinutes().toString().padStart(2, '0');
  const seconds = now.getUTCSeconds().toString().padStart(2, '0');

  return `${hoursIST}:${minutes}:${seconds} ${amPm}`;
}

// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS TO THE "SUBTITLE" SCHEMA
export const customSubtitles = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { specific_subtitles } = req.body;

    // SAVE CUSTOM SUBTITLES TO THE DATABASE
    const custom_subtitle = new Subtitle({
      videoId,
      title: [
        {
          videoId,
          specific_subtitles,
          time: getCurrentTime(),
          
        },
      ],
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