import express from 'express';
import { uploadVideo } from "../controller/video.controller.js";

const Upload_Video = express.Router();

Upload_Video.post('/upload', uploadVideo);

export default Upload_Video;
