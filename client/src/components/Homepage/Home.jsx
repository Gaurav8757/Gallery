import { useState, useEffect } from 'react';
import axios from 'axios';


function Home() {
  const [videos, setVideos] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get('https://upvideo.onrender.com/video/lists');
      setVideos(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
// console.log(videos);
  useEffect(() => {
    fetchVideos();

    // Set up an interval to fetch videos every, for example, 8 seconds
    const intervalId = setInterval(() => {
      fetchVideos();
    }, 8000); // Adjust the interval time as needed

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount


  return (

    <div className='bg-slate-400 h-screen'>

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
          <h1 className='text-center text-2xl font-semibold pt-4 '>All Uploaded Videos</h1>
          <div className="flex max-w-full p-10 gap-4 bg-slate-400">

            <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-4  md:grid-cols-3  sm:grid-cols-3  gap-5'>
              {videos.map((video) => (
                <div
                  key={video.videoId}
                  className="relative grid overflow-hidden bg-gray-200 rounded-md cursor-pointer"
                >
                  <video controls width="900" height="400">
                    <source src={video.videoPath} type="video/mp4" />
                    {video.text}
                  </video>
                  <div className="p-2">
                    <h3 className="text-md font-semibold text-center">{video.subtitles.map((data) => data.text)}</h3>
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
