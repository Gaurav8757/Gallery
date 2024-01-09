import express from "express";
import fs from "fs";

import Subtitle from "../models/subtitleSchema.js"
import Video from "../models/videoSchema.js"

// play video with subtitles
export const VideoPlayer = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const video = await Video.findById(videoId);
  
      if (!video) {
        res.status(404).send('Video not found');
        return;
      }
      const videoPath = `uploads/${video.filename}`;
      const subtitles = await Subtitle.find({ videoId });
  
      // Render HTML template
      res.render('videoPlayer', { videoId, videoPath, subtitles });
    } catch (error) {
      console.error(error);
      return res.status(500).send('Internal Server Error');
    }
  }


//  SERVE VIDEO FILE API
export const ServeVideo = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const video = await Video.findById(videoId);
  
      if (!video) {
        res.status(404).send('Video not found');
        return;
      }
  
      const videoPath = `uploads/${video.filename}`;
      const stat = fs.statSync(videoPath);
      const fileSize = stat.size;
      const range = req.headers.range;
  
      if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(videoPath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'video/mp4',
        };
  
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'video/mp4',
        };
  
        res.writeHead(200, head);
        fs.createReadStream(videoPath).pipe(res);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

//   save custom subtitles at specific timestamps to the database

export const customSubtitles = async (req, res) => {
    try {
      const videoId = req.params.videoId;
      const { subtitles, startTime, endTime } = req.body;
  
      // Save custom subtitle to the database
      const subtitle = new Subtitle({ videoId, subtitles, startTime, endTime, isCustom: true });
      await subtitle.save();
  
      return res.status(200).json({ message: 'Custom subtitle submitted successfully.', subtitle });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }