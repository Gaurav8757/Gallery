// // Form.js
// import { AiOutlineUpload } from "react-icons/ai";
// import { useState, useRef, useEffect } from "react";


// function Form() {
//     const [videoFile, setVideoFile] = useState(null);
//     const [subtitles, setSubtitles] = useState([]);
//     const [newSubtitleText, setNewSubtitleText] = useState('');
//     const [newSubtitleTimestamp, setNewSubtitleTimestamp] = useState(0);
//     const handleVideoUpload = (file) => {
//       setVideoFile(file);
//     };
  
//     const handleSubtitlesUpdate = (newSubtitle) => {
//       setSubtitles((prevSubtitles) => [...prevSubtitles, newSubtitle]);
//     };
//     const handleVideoChange = (event) => {
//         const file = event.target.files[0];
//         setVideoFile(file);
//         onVideoUpload(file);
//       };
    
//       const handleAddSubtitle = () => {
//         const newSubtitle = {
//           timestamp: newSubtitleTimestamp,
//           text: newSubtitleText,
//         };
//         onUpdateSubtitles(newSubtitle);
//         setNewSubtitleText('');
//         setNewSubtitleTimestamp(0);
//       };

//   return (
//     <>
//       <form className="p-4 md:p-5">

//         <div className="grid gap-4 mb-4 grid-cols-2">
//           {/* UPLOADS VIDEOS */}
//           <div className="flex items-center justify-center w-full">
//             {/* UPLOAD VIDEO */}
//             <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
//                 </svg>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">MP4, 3GP, more (MAX. -----px)</p>
//               </div>
//               {/* INPUT FIELDS TO UPLOAD VIDEO */}
//               <input id="dropzone-file" type="file" accept="video/*" className="hidden" onChange={handleVideoChange} />
//             </label>
//           </div>

//           {/* SUBTITLES FIELDS */}
//           <label htmlFor="subtitleText" className="text-white">Add Subtitles:
//           <textarea
//             id="subtitleText"
//             placeholder="Subtitle text"
//             value={newSubtitleText}
//         onChange={(e) => setNewSubtitleText(e.target.value)}
//             >
//           </textarea></label>
//           {/* TIMESTAMP */}
//           <label htmlFor="timestamp">Timestamp (seconds):</label>
//       <input
//         id="timestamp"
//         type="number"
//         value={newSubtitleTimestamp}
//         onChange={(e) => setNewSubtitleTimestamp(parseFloat(e.target.value))}
//       />
//         </div>
       
//         <button
//           type="button"
//           onClick={handleAddSubtitle}
//           className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           <AiOutlineUpload size={20} className="mx-2 items-center" />
//           Add Subtitle
//         </button>
//       </form>

//       {/* {videoFile && (
//         <VideoPlayer
//           videoFile={videoFile}
//           customSubtitles={customSubtitles}
//         />
//       )} */}
//     </>
//   );
// }

// export default Form;


// import { AiOutlineUpload } from "react-icons/ai";
// import { useState } from "react";
// import axios from 'axios';

// function Form() {
//   const [videoFile, setVideoFile] = useState(null);
//   const [newSubtitleText, setNewSubtitleText] = useState('');
//   const [newSubtitleTimestamp, setNewSubtitleTimestamp] = useState(0);
// console.log(videoFile);
// console.log(newSubtitleText);
// console.log(newSubtitleTimestamp);
//   const handleFileChange = (event) => {
//     const filename = event.target.files[0];
//     setVideoFile(filename);
//   };

//   const handleUpload = async () => {
//     try {
//       if (!videoFile) {
//         console.error('Please select a video file.');
//         return;
//       }

//       // Upload video
//       const videoFormData = new FormData();
//       videoFormData.append('video', videoFile);

//       const response = await axios.post('https://upvideo.onrender.com/video/upload', videoFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

// console.log(response.data.filename);
      // Add subtitle
      // const subtitleData = {
      //   videoId: videoId,
      //   text: newSubtitleText,
      //   specific_subtitles: 'Specific subtitle data',  // Add your specific subtitle data
      //   time: newSubtitleTimestamp,
      // };

      // await axios.post(`https://upvideo.onrender.com/video/subtitles/${videoId}`, subtitleData);

      // // Update state or handle success
      // console.log('Video and subtitle added successfully');
      // setVideoFile(null);
      // setNewSubtitleText('');
      // setNewSubtitleTimestamp(0);
//     } catch (error) {
//       console.error('Error adding video and subtitle:', error);
//     }
//   };

//   return (
//     <>
//       <form className="p-4 md:p-5">
//         <div className="grid gap-4 mb-4 grid-cols-2">
//           {/* UPLOADS VIDEOS */}
//           <div className="flex items-center justify-center w-full">
//             {/* UPLOAD VIDEO */}
//             <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//               <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 {/* ... (Your existing SVG and text) */}
//               </div>
//               {/* INPUT FIELDS TO UPLOAD VIDEO */}
//               <input id="dropzone-file" type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
//             </label>
//           </div>

//           {/* SUBTITLES FIELDS */}
//           <label htmlFor="subtitleText" className="text-white">Add Subtitles:
//             <textarea
//               id="subtitleText"
//               placeholder="Subtitle text"
//               value={newSubtitleText}
//               onChange={(e) => setNewSubtitleText(e.target.value)}
//             />
//           </label>
//           {/* TIMESTAMP */}
//           <label htmlFor="timestamp">Timestamp (seconds):</label>
//           <input
//             id="timestamp"
//             type="number"
//             value={newSubtitleTimestamp}
//             onChange={(e) => setNewSubtitleTimestamp(parseFloat(e.target.value))}
//           />
//         </div>

//         <button
//           type="button"
//           onClick={handleUpload}
//           className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           <AiOutlineUpload size={20} className="mx-2 items-center" />
//           Upload Video & Add Subtitle
//         </button>
//       </form>
//     </>
//   );
// }

// export default Form;


import { AiOutlineUpload } from "react-icons/ai";
import { useState } from "react";
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

function Form() {
  const [videoFile, setVideoFile] = useState(null);
  const [newSubtitleText, setNewSubtitleText] = useState('');
  const [newSubtitleTimestamp, setNewSubtitleTimestamp] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (acceptedFiles) => {
    setVideoFile(acceptedFiles[0]);
  };

  const handleAddSubtitle = async () => {
    try {
      if (!videoFile) {
        console.error('Please select a video file.');
        return;
      }

      // Upload video
      const videoFormData = new FormData();
      videoFormData.append('video', videoFile);

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      };

      const { data: { videoId } } = await axios.post('https://upvideo.onrender.com/video/upload', videoFormData, config);

      // Add subtitle
      const subtitleData = {
        videoId: videoId,
        text: newSubtitleText,
        specific_subtitles: 'Specific subtitle data',  // Add your specific subtitle data
        time: newSubtitleTimestamp,
      };

      await axios.post(`https://upvideo.onrender.com/video/subtitles/${videoId}`, subtitleData);

      // Update state or handle success
      console.log('Video and subtitle added successfully');
      setVideoFile(null);
      setNewSubtitleText('');
      setNewSubtitleTimestamp(0);
    } catch (error) {
      console.error('Error adding video and subtitle:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    accept: 'video/*',
  });

  return (
    <>
      <form className="p-4 md:p-5">
        <div className="grid gap-4 mb-4 grid-cols-2">
          {/* UPLOADS VIDEOS */}
          <div className="flex items-center justify-center w-full" {...getRootProps()}>
            {/* UPLOAD VIDEO */}
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {/* ... (Your existing SVG and text) */}
              </div>
              {/* INPUT FIELDS TO UPLOAD VIDEO */}
              <input id="dropzone-file" type="file" accept="video/*" className="hidden" {...getInputProps()} />
            </label>
          </div>

          {/* SUBTITLES FIELDS */}
          <label htmlFor="subtitleText" className="text-white">Add Subtitles:
            <textarea
              id="subtitleText"
              placeholder="Subtitle text"
              value={newSubtitleText}
              onChange={(e) => setNewSubtitleText(e.target.value)}
            />
          </label>
          {/* TIMESTAMP */}
          <label htmlFor="timestamp">Timestamp (seconds):</label>
          <input
            id="timestamp"
            type="number"
            value={newSubtitleTimestamp}
            onChange={(e) => setNewSubtitleTimestamp(parseFloat(e.target.value))}
          />
        </div>

        <button
          type="button"
          onClick={handleAddSubtitle}
          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <AiOutlineUpload size={20} className="mx-2 items-center" />
          Upload Video & Add Subtitle
        </button>

        {uploadProgress > 0 && <div>Upload Progress: {uploadProgress}%</div>}
      </form>
    </>
  );
}

export default Form;
