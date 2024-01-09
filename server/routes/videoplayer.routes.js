import express from 'express';
import { VideoPlayer, ServeVideo, customSubtitles } from '../controller/videoplayer.controller.js';


const Play_Video = express.Router();
// PLAY VIDEO WITH SUBTITLES ROUTE 
Play_Video.get('/play/:videoId',  VideoPlayer);
// SERVE VIDEO ROUTE
Play_Video.get("/video/:videoId", ServeVideo);

// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS
Play_Video.post("/custom-subtitle", customSubtitles);

export default Play_Video;
