import express from "express";
import {
  ServeVideo,
  customSubtitles,
  ListVideosWithSubtitles,
} from "../controller/videoplayer.controller.js";

const Play_Video = express.Router();

// SERVE VIDEO ROUTE
Play_Video.get("/serve/:videoId", ServeVideo);
// VIDEO LIST WITH SUBTITLES
Play_Video.get("/lists", ListVideosWithSubtitles);
// SAVE CUSTOM SUBTITLES AT SPECIFIC TIMESTAMPS
Play_Video.post("/custom-subtitle", customSubtitles);

export default Play_Video;
