import express from "express";
import {
  ServeVideo,
  ListVideosWithSubtitles,
} from "../controller/videoplayer.controller.js";

const Play_Video = express.Router();

// SERVE VIDEO ROUTE
Play_Video.get("/serve/:videoId", ServeVideo);
// VIDEO LIST WITH SUBTITLES
Play_Video.get("/lists", ListVideosWithSubtitles);


export default Play_Video;
