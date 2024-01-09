import express from 'express';
import subtitles from './subtitles.routes.js';
import Upload_Video from './video.routes.js';
const router = express.Router();

// UPLOAD SUBTITLE ROUTE
router.use("/video", subtitles);
// UPLOAD VIDEO ROUTE
router.use("/video", Upload_Video);


export default router;