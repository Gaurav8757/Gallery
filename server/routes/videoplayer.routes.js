import express from 'express';
import {  ServeVideo, customSubtitles, ListVideosWithSubtitles, PlayVideoWithSubtitles } from '../controller/videoplayer.controller.js';


const Play_Video = express.Router();
// PLAY VIDEO WITH SUBTITLES ROUTE 
Play_Video.get('/play/:videoId',  PlayVideoWithSubtitles);
// SERVE VIDEO ROUTE
Play_Video.get("/serve/:videoId", ServeVideo);

Play_Video.get("/lists", ListVideosWithSubtitles)
// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS
Play_Video.post("/custom-subtitle", customSubtitles);

export default Play_Video;
