// Import necessary dependencies
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://upvideo.onrender.com/video/videos');
        setVideos(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleVideoClick = async (videoId) => {
    try {
      const response = await axios.get(`https://upvideo.onrender.com/video/serve/${videoId}`);
      const { videoPath, subtitles } = response.data;
console.log(videoPath);
      // Handle video click, e.g., navigate to the video player page with videoPath and subtitles
      console.log('Video clicked:', videoId, videoPath, subtitles);
    } catch (error) {
      console.error('Error fetching video player data:', error);
    }
  };

  return (
    <section className='p-4 bg-slate-400 h-screen'>
      <h1 className='text-center font-semibold text-3xl mb-20'>All Uploaded Videos</h1>
      <div className=' flex justify-center items-center  '>
      
        
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center">
      {videos.map((video) => (
        <div
          key={video._id}
          className="relative overflow-hidden bg-gray-200 rounded-md cursor-pointer"
          onClick={() => handleVideoClick(video._id)}
        >
          <video
            src={video.videoPath} // Assuming you have a property named videoPath
            controls
            autoPlay
            className="w-full h-48 object-cover"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
          <div className="p-4">
            <h3 className="text-md font-semibold text-center">{video.text}</h3>
          </div>
        </div>
      ))}
    </div></div>
    </section>
  );
}

export default Home;
