import express from 'express';
import { createSubtitles, getSubtitles } from "../controller/subtitle.controller.js";

const subtitles = express.Router();

subtitles.post('/subtitles', createSubtitles);
subtitles.get('/subtitles/:videoIndex', getSubtitles);

export default subtitles;
