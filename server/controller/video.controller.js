import Video from "../models/videoSchema.js";

// video upload controller

export const VideoUpload = async (req, res) => {
  try {
    // Process video file and save video details to the database
    const video = new Video({ filename: req.file.filename });
    await video.save();

    return res
      .status(200)
      .json({ message: "File uploaded successfully.", video });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

//  API endpoint to get all videos with subtitles using aggregation
export const All_Video_Lists_With_Subtitle = async (req, res) => {
  try {
    const videosWithDetails = await Subtitle.aggregate([
      {
        $lookup: {
          from: "videos",
          localField: "filename",
          foreignField: "videoId",
          as: "filename", //same as filename
        },
      },
      {
        $addFields: {
          filename: {
            $first: "$filename.filename", // list with subtitles and filename and videoId
          },
        },
      },
    ]);

    res.json(videosWithDetails);
    //   console.log(videosWithDetails);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
