import express from 'express';
import { uploadVideo } from "../controller/video.controller.js";
import uploadFile from "../utils/uploadMiddleware.js"

const Upload_Video = express.Router();

Upload_Video.post('/upload', uploadFile, uploadVideo);

export default Upload_Video;
