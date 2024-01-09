import SubtitleModel from "../models/subtitleSchema.js";

export async function createSubtitles(req, res) {
  const { videoIndex, text, timestamp } = req.body;
  const newSubtitle = new SubtitleModel({ videoIndex, text, timestamp });

  try {
    await newSubtitle.save();
    return res.status(200).json({ message: 'Subtitles created and stored.' });
  } catch (error) {
    return res.status(500).json({ error: 'Error saving subtitles to the database.' });
  }
}

export async function getSubtitles(req, res) {
  const videoIndex = req.params.videoIndex;

  try {
    const videoSubtitles = await SubtitleModel.find({ videoIndex });
    return res.status(200).json({ subtitles: videoSubtitles });
  } catch (error) {
    return res.status(500).json({ error: 'Error retrieving subtitles from the database.' });
  }
}
