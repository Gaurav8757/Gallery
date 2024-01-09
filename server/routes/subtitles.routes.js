import express from 'express';
import { addSubtitle, getSubtitle } from '../controller/subtitle.controller.js';

const subtitles = express.Router();

subtitles.post('/subtitles/:videoId', addSubtitle);
subtitles.get('/subtitles/:videoId', getSubtitle);

export default subtitles;
