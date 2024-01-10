import express from 'express';
import { VideoPlayer, ServeVideo, customSubtitles, ListVideosWithSubtitles } from '../controller/videoplayer.controller.js';


const Play_Video = express.Router();
// PLAY VIDEO WITH SUBTITLES ROUTE 
Play_Video.get('/play/:videoId',  VideoPlayer);
// SERVE VIDEO ROUTE
Play_Video.get("/serve/:videoId", ServeVideo);

Play_Video.get("/lists", ListVideosWithSubtitles)
// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS
Play_Video.post("/custom-subtitle", customSubtitles);

export default Play_Video;
