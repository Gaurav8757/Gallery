import Subtitle from "../models/subtitleSchema.js";

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
