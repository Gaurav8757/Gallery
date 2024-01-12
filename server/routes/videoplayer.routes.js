import express from "express";
import {
 
  ListVideosWithSubtitles,
} from "../controller/videoplayer.controller.js";

const Play_Video = express.Router();

// VIDEO LIST WITH SUBTITLES
Play_Video.get("/lists", ListVideosWithSubtitles);


export default Play_Video;
