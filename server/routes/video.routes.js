import express from 'express';
import { VideoUpload } from '../controller/video.controller.js';
import uploadFile from '../utils/uploadMiddleware.js';

const Upload_Video = express.Router();
// UPLOAD VIDEOS 
Upload_Video.post('/upload', uploadFile, VideoUpload);


export default Upload_Video;
