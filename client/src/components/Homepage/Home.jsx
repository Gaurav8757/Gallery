import { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadModals } from '../ModalForm/UploadModals.jsx';

function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://upvideo.onrender.com/video/lists');
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchVideos();

    // Set up an interval to fetch videos every, for example, 10 seconds
    const intervalId = setInterval(() => {
      fetchVideos();
    }, 1000); // Adjust the interval time as needed

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  // eslint-disable-next-line no-unused-vars
  const handleVideoClick = async (videoId) => {
    try {
      const response = await axios.get(`https://upvideo.onrender.com/video/serve/${videoId}`);
      const { videoId, videoPath, subtitles } = response.data;

      // Handle video click, e.g., navigate to the video player page with videoPath and subtitles
      console.log('Video clicked:', videoId, videoPath, subtitles);
    } catch (error) {
      console.error('Error fetching video player data:', error);
    }
  };

  return (
    <div className='bg-slate-400 h-full'>
      {videos.length === 0 ? (
        <div className="block justify-center  my-52 items-center">
          <div className='mb-20'>
            <h1 className='text-2xl font-semibold text-center'>
              No videos available. Please upload videos.
            </h1>
          </div>
          <div className='flex justify-center'>
            <UploadModals />
          </div>
        </div>
      ) : (
        <div className="flex max-w-full p-10 gap-4 bg-slate-400">
          {videos.map((video) => (
            <div
              key={video.videoId}
              className="relative grid overflow-hidden bg-gray-200 rounded-md cursor-pointer"
              onClick={() => handleVideoClick(video.videoId)}
            >
              <video controls width="900" height="400">
                <source src={`https://upvideo.onrender.com/video/serve/${video.videoId}`} type="video/mp4" />
                {video.text}
              </video>
              <div className="p-4">
                <h3 className="text-md font-semibold text-center">{video.text}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
