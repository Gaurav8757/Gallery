import express from "express";
import fs from "fs";

import Subtitle from "../models/subtitleSchema.js";
import Video from "../models/videoSchema.js";

// play video with subtitles
export const VideoPlayer = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404).send("Video not found");
      return;
    }
    const videoPath = `uploads/${video.filename}`;
    const subtitles = await Subtitle.find({ videoId });

    // Render HTML template
    res.json( { videoId, videoPath, subtitles });
  } catch (error) {
    console.error(
      error,
      "Render template needed so it can change in react path when connect"
    );
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


export const ServeVideo = async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Validate the videoId (e.g., check if it's a valid ObjectId)
    if (!isValidObjectId(videoId)) {
      res.status(400).send("Invalid videoId");
      return;
    }

    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404).send("Video not found");
      return;
    }

    const videoPath = `uploads/videos/${video.filename}`;
    const subtitles = await Subtitle.find({ videoId }); // Fetch subtitles associated with the video
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    let contentType = 'video/mp4'; // Default to MP4

    // Check the file extension for webm and set the Content-Type accordingly
    if (video.filename.endsWith('.webm')) {
      contentType = 'video/webm';
    } else if (video.filename.endsWith('.mkv')) {
      contentType = 'video/x-matroska';
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

    // Send subtitles along with the video
    res.json({
      subtitles: subtitles.map(subtitle => subtitle.text),
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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


// Get a list of all videos with subtitles
export const ListVideosWithSubtitles = async (req, res) => {
  try {
    const videos = await Video.find();
    const videosWithSubtitles = [];

    for (const video of videos) {
      const subtitles = await Subtitle.find({ videoId: video._id });
      videosWithSubtitles.push({
        videoId: video._id,
        videoPath: `uploads/${video.filename}`,
        subtitles,
      });
    }

    res.json(videosWithSubtitles);
  } catch (error) {
    console.error("Error fetching videos with subtitles:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Play a specific video with subtitles
export const PlayVideoWithSubtitles = async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const video = await Video.findById(videoId);

    if (!video) {
      res.status(404).json({ message: "Video not found" });
      return;
    }

    const videoPath = `uploads/${video.filename}`;
    const subtitles = await Subtitle.find({ videoId });

    // Return video details along with subtitles
    res.json({ videoId, videoPath, subtitles });
  } catch (error) {
    console.error("Error playing video with subtitles:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};