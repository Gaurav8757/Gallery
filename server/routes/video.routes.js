import express from 'express';
import { VideoUpload, All_Video_Lists_With_Subtitle } from '../controller/video.controller.js';
import upload from '../utils/uploadMiddleware.js';

const Upload_Video = express.Router();
// UPLOAD VIDEOS 
Upload_Video.post('/upload', upload.single('video'), VideoUpload);

// All_Video_Lists_With_Subtitle
Upload_Video.get("/videos", All_Video_Lists_With_Subtitle);
export default Upload_Video;
