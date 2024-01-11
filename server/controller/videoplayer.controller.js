import express from "express";
import fs from "fs";

import Subtitle from "../models/subtitleSchema.js";
import Video from "../models/videoSchema.js";

//  SERVE VIDEO FILE API
export const ServeVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404).send("Video not found");
      return;
    }
    // const videoPath = `uploads/videos/${video.filename}`;
    const videoPath = video.cloudinaryUrl;
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    let contentType = 'video/mp4'; // Default to MP4

    // Check the file extension and set the Content-Type accordingly
    const videoExtension = path.extname(video.filename).toLowerCase();
    const allowedExtensions = /\.(mp4|webm|mkv)$/;

    if (allowedExtensions.test(videoExtension)) {
      switch (videoExtension) {
        case '.mp4':
          contentType = 'video/mp4';
          break;
        case '.webm':
          contentType = 'video/webm';
          break;
        case '.mkv':
          contentType = 'video/x-matroska'; // MKV format
          break;
        // Add more cases for additional video formats
        default:
          contentType = 'video/mp4'; // Default to MP4 if extension is not recognized
      }
    } else {
      res.status(415).send("Unsupported Media Type");
      return;
    }
    
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": contentType,
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      };

      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


// Get a list of all videos with subtitles
export const ListVideosWithSubtitles = async (req, res) => {
  try {
    const videos = await Video.find();
    const videosWithSubtitles = [];

    for (const video of videos) {
      const subtitles = await Subtitle.find({ videoId: video._id });
      videosWithSubtitles.push({
        videoId: video._id,
        // videoPath: `uploads/${video.filename}`,
        videoPath: video.cloudinaryUrl,
        fileName: video.filename, //adding video filename
        subtitles,
      });
    }

    res.json(videosWithSubtitles);
  } catch (error) {
    console.error("Error fetching videos with subtitles:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

//   save custom subtitles at specific timestamps to the "SUBTITLE" SCHEMA
export const customSubtitles = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const { specific_subtitles, startTime } = req.body;

    // Save custom subtitle to the database
    const subtitle = new Subtitle({
      videoId,
      specific_subtitles,
      startTime,
      isCustom: true,
    });
    await subtitle.save();

    return res
      .status(200)
      .json({ message: "Custom subtitle submitted successfully.", subtitle });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error", error });
  }
};




