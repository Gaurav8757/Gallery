import Subtitle from "../models/subtitleSchema.js";

// upload subtitle
export const addSubtitle = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { text, startTime, endTime } = req.body;

    // Save subtitles to the database
    const subtitle = new Subtitle({ videoId, text, startTime, endTime });
    await subtitle.save();

    res.status(200).send('Subtitles submitted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


// get subtitle
export const getSubtitle = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const subtitles = await Subtitle.find({ videoId });
    res.json(subtitles);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
