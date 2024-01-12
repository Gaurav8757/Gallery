import { useState } from 'react';
import axios from "axios";

import { toast } from "react-toastify";
import { PiUploadSimpleBold } from "react-icons/pi";
import { RiVideoUploadLine } from "react-icons/ri";
import {
  CircularProgressbar,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [subtitles, setSubtitles] = useState("");
  const [error, setError] = useState('');
  const [videoerror, setVideoError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoPreview, setVideoPreview] = useState(null);

  // HANDLE UPLOAD VIDEO 
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);


    // DISLAY VIDEO PREVIEW
    if (file && file.type.includes('video')) {
      const reader = new FileReader();
      reader.onload = () => {
        setVideoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setVideoPreview(null);
    }
  }

  // HANDLE UPLOAD VIDEOS
  const handleUpload = async () => {
    try {

      // CHECK IF VIDEO FILE IS NOT SELECTED
      if (!subtitles) {
        setError('Please enter a subtitles');
        return;
      }

      // CHECK IF VIDEO FILE IS NOT SELECTED
      if (!selectedFile) {
        setVideoError('Please select a video file to upload');
        return;
      }
// ADD VIDEO TO UPLOAD VIDEO API
      const formData = new FormData();
      formData.append('filename', selectedFile);
     
      const response = await axios.post('https://upvideo.onrender.com/video/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted); // UPDATE UPLOAD PROGRESS
          if (percentCompleted === 100) {
            // RESET THE UPLOAD PROGRESS ONCE IT REACHES 100%
            setUploadProgress(0);
            toast.info(`Acquring Video Caption...!!`);
          }
        },
      });

      // HANDLE SUCCESSFULLY UPLOAD VIDEO
      if (response.status === 200) {
        
        // Fetch the videoId from the response
        const videoId = response.data.video._id;

        // Add subtitles if the subtitles state is not empty
        if (subtitles.trim() !== '') {
          const subtitleResponse = await axios.post(`https://upvideo.onrender.com/video/subtitles/${videoId}`, {
            text: subtitles.trim(),
          });

          // Handle subtitle addition success
          if (subtitleResponse.status === 200) {
            toast.success(`Video uploaded successfully!!`);
            setSubtitles("");
           
          } else {
            toast.warn("Failed to add subtitles");
          }
        }
      } else {
        toast.warn("Failed to upload video");
        setVideoError("Failed to upload video. Please try again.");
      }
    } catch (error) {
      toast.error("Error during video upload");
      console.error('Error during file upload:', error);
    }
  };
  return (
    <section className='mt-5'>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* UPLOAD VIDEO INPUT */}
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-00 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {videoPreview ? (
              <div className="relative inset-x-0 flex items-center justify-center">
                <video  className='w-auto h-auto' >
                  <source src={videoPreview} type={selectedFile.type} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <RiVideoUploadLine size={80} className="text-green-400" />
                <p className="mb-2 text-base text-gray-500 dark:text-gray-400">drag and drop</p>
                <span className="text-black bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2 text-center me-2 mb-2">
                  Click to upload
                </span>
                <p className="text-xs text-gray-500 dark:text-gray-400">webm, mp4, mkv, wvm </p>
              </div>
            )}
            <input id="dropzone-file" accept='videos/*' type="file" className="hidden" onChange={handleFileChange} />

          </label>


          {/* UPLOAD PROGRESS BAR */}
          {uploadProgress > 0 && uploadProgress <= 100 && (
            <div className="flex justify-center items-center mt-4">
              <span className='text-white mr-2'>Uploading Video:</span>
              <div className='w-16   h-16'>
                <CircularProgressbar styles={buildStyles({
                  textColor: '#3CD79F ', // Text color
                  pathColor:  '#1F3D', // Circular progress bar color
                  trailColor: 'white', // Background trail color
                  textSize: '23px', // Text size
                })} value={uploadProgress} text={`${uploadProgress}%`} />


              </div>
            </div>
          )}

          {/* ERROR HANDLE INPUT VIDEO */}
          {!selectedFile ? (
            <p className="mt-2 text-sm text-center text-red-500">{videoerror}</p>
          ) : ""}
        </div>
        <div>

          {/* SUBTITLES INPUT*/}
          <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Caption:
          </label>
          <div className="flex">

            <textarea
              type="text"
              id="website"
              rows={6}
              maxLength={200}
              className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Caption"
              value={subtitles}
              name='subtitles'
              onChange={(e) => setSubtitles(e.target.value)}
            />
          </div>
          {!subtitles ? (
            <p className="mt-2 text-sm text-center text-red-500">{error}</p>
          ) : ""}
        </div>
      </div>
      {/* UPLOAD BUTTON */}
      <div className='flex justify-center items-center'>
        <button className="text-white mt-10 text-center inline-flex justify-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-base px-6 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleUpload}><PiUploadSimpleBold size={20} className='mr-2' />Upload</button>
      </div>
    </section>
  );
};
export default Form;
