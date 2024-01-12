import express from 'express';
import { addSubtitle, customSubtitles} from '../controller/subtitle.controller.js';

const subtitles = express.Router();
// add subtitle
subtitles.post('/subtitles/:videoId', addSubtitle);

// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS
subtitles.post("/custom-subtitle/:videoId", customSubtitles);

export default subtitles;
