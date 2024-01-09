// /* eslint-disable react/prop-types */
// // VideoPlayer.js
// import { useRef} from 'react';

// const VideoPlayer = ({   customSubtitles }) => {
//   const videoRef = useRef(null);

// //   useEffect(() => {
// //     const video = videoRef.current;
// //     const videoUrl = URL.createObjectURL(videoFile);

// //     video.src = videoUrl;

// //     return () => {
// //       // Clean up resources
// //       URL.revokeObjectURL(videoUrl);
// //     };
// //   }, [videoFile]);

//   return (
//     <div>
//       <video ref={videoRef} controls width="640" height="360">
//         {customSubtitles.map((subtitle, index) => (
//           <track
//             key={index}
//             label={`Custom-${index + 1}`}
//             kind="subtitles"
//             srcLang="en"
//             src={`data:text/vtt;charset=utf-8,WEBVTT\n${subtitle.timestamp.toFixed(
//               3
//             )} --> ${(subtitle.timestamp + 2).toFixed(3)}\n${
//               subtitle.text
//             }\n\n`}
//           />
//          ))} 
//         <track
//           label="Uploaded"
//           kind="subtitles"
//           srcLang="en"
//           src={URL.createObjectURL(customSubtitles)}
//           default
//         />
//         Your browser does not support the video tag.
//       </video>
//     </div>
//   );
// };

// export default VideoPlayer;
