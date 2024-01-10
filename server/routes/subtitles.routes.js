import express from 'express';
import { addSubtitle} from '../controller/subtitle.controller.js';

const subtitles = express.Router();
// add subtitle
subtitles.post('/subtitles/:videoId', addSubtitle);

export default subtitles;
