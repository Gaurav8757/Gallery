// ALL UPLOADED VIDEOS SHOWS IN A GRID LISTS ALSO PLAY
import { useState, useEffect } from 'react';
// import ViewSubtitle from '../SubtitleBanner/ViewSubtitle.jsx';
import axios from 'axios';
import { toast } from "react-toastify";

function Home() {
  const [videos, setVideos] = useState([]);
  const [customSubtitles, setCustomSubtitles] = useState("");
  const [error, setError] = useState('');
  const [hoveredVideo, setHoveredVideo] = useState(null);

  // LISTS OF VIDEO URL, SUBTITLES AS TEXT NAME , FILENAME, 
  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://upvideo.onrender.com/video/lists');
      setVideos(response.data);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
    //SET UP AN INTERVAL TO FETCH VIDEOS EVERY, FOR EXAMPLE, 900 MILISECONDS
    const intervalId = setInterval(() => {
      fetchVideos();
    }, 900); // ADJUST THE INTERVAL TIME AS NEEDED 
    //CLEAN UP THE INTERVAL WHEN THE COMPONENT IS UNMOUNTED
    return () => clearInterval(intervalId);
  }, []); // EMPTY DEPENDENCY ARRAY TO RUN THE EFFECT ONLY ONCE ON MOUNT



  // HANDLE CUSTOM-SUBTITLE ON VIDEO ADDED
  const handleSubtitle = async (videoId) => {
    try {
      // CHECK IF VIDEO FILE IS NOT SELECTED
      if (!customSubtitles) {
        setError('Please enter a subtitles');
        return;
      }
      const response = await axios.post(`https://upvideo.onrender.com/video/custom-subtitle/${videoId}`, {
        specific_subtitles: customSubtitles,

      });

      toast.success(response.data.message);
      setCustomSubtitles("");
    } catch (error) {

      toast.error("Error adding custom Subtitles");
      console.error('Error adding custom Subtitles:', error);
    }
  };


  return (
    <div className='bg-slate-400 h-screen'>
      {/* CHECK IF LENGTH OF VIDEOS IS 0 SHOW LOADING OTHERWISE LISTS OF VIDEOS */}
      {videos.length === 0 ? (
        <>
          <div className="block justify-center pt-52 items-center">
            <div role="status" className='flex justify-center  items-center '>
              <svg aria-hidden="true" className=" w-24 h-24 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className=" block sr-only">Loading.....</span>
            </div>
          </div>
          <span className=" flex justify-center items-center text-center mt-4 font-semibold text-3xl ">Loading.....</span></>
      ) : (
        <>
          <h1 className='text-center text-2xl font-semibold pt-4 text-black '>All Uploaded Videos</h1>
          <div className="block max-w-auto p-8 gap-4 bg-slate-400">
            <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4  md:grid-cols-3  sm:grid-cols-3  gap-5'>
              {/* ITERATE OVER VIDEOS API */}
              {videos.map((video) => (

                <div
                  key={video.videoId}
                  className="relative grid overflow-hidden bg-transparent border-zinc-900 border p-2 rounded-md cursor-pointer">
                  {/* HANDLE HOVER */}
                  <div className="relative  video-container "
                  >
                    <div onMouseEnter={() => setHoveredVideo(video.videoId)} onMouseLeave={() => setHoveredVideo(null)}>
                    {hoveredVideo === video.videoId && (
                      <label className="absolute text-sm z-10 text-white  font-semibold mt-4 ml-4">{video.subtitles.map((data) => data.text)} {video.fileName}</label>
                    )}
                      {/* PLAY VIDEO & SOURCE TAG */}
                      <video width="900" height="400" controls  >
                        <source src={video.videoPath} type="video/mp4" />
                        <source src={video.videoPath} type="video/wmv" />
                        <source src={video.videoPath} type="video/flv" />
                        <source src={video.videoPath} type="video/webm" />
                        <source src={video.videoPath} type="video/mkv" />
                        <source src={video.videoPath} type="video/avi" />
                        <source src={video.videoPath} type="video/mov" />
                        {video.text}
                      </video>
                    </div>
                    {/* SUBTITLES DISPLAY  ON VIDEO ON HOVER */}
                    {hoveredVideo === video.videoId && (
                      <label className=' -my-40 absolute text-yellow-100 w-full h-20 overflow-y-auto  z-10 border-slate-600 rounded-md '>
                        <h3 className='text-md text-center'>
                          {video.subtitles.map((data) =>
                            data.title.map((sub, index) => (
                              <div key={sub.time} className='flex justify-around'>
                                <span className='mx-5'>{sub.specific_subtitles}</span>
                                <span className={index === data.title.length - 1 ? 'text-right mr-3' : 'hidden'}>
                                  {sub.time}
                                </span>
                              </div>
                            ))
                          )}
                        </h3>
                      </label>
                    )}

                    {/* TEXT AREA UPLOAD CUSTOM_SUBTITLES */}
                    <p className='text-center mt-5'>Add Custom Subtitle</p>
                    <textarea
                      type="text"
                      id="custom_subtitles"
                      rows={4}
                      maxLength={100}
                      className=" rounded-md bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Subtitles"
                      name='custom_subtitles'
                      onChange={(e) => setCustomSubtitles(e.target.value)}
                    />

                    {!customSubtitles ? (
                      <p className="mt-1 text-sm text-center text-red-700">{error}</p>
                    ) : ""}
                    {/* ADD CUSTOM SUBTITLES BUTTON */}
                    <div className='flex justify-center'>
                      <button onClick={() => handleSubtitle(video.videoId)} className="text-white  mt-2 text-center inline-flex justify-center items-center bg-green-700 hover:bg-green-800 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-base px-3 py-2 me-2  dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800" >Add Subtitle</button>
                    </div>
                  </div>
                </div>

              ))}
            </div>

          </div></>
      )}
    </div>
  );
}

export default Home;
