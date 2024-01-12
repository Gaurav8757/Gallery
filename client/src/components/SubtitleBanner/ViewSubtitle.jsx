import { useState, useEffect } from 'react';
import axios from 'axios';


const ViewSubtitle = () => {
  const [messages, setMessages] = useState([]);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('https://upvideo.onrender.com/video/lists');
        setMessages(response.data.map((subtitle) => 
        subtitle.subtitles
        
        ));


        // .map((data) => data.specific_subtitles
        // )

        
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    // const intervalId = setInterval(() => {
    //   setScrollIndex((prevIndex) => (prevIndex + 1) % messages.length);
    // }, 3000); // Change the interval time as needed

    // return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [messages.length]);

  return (
    <div className="notice-board-container bg-gray-800 text-white py-4 overflow-hidden">
      <div className="notice-board whitespace-no-wrap overflow-hidden">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`notice inline-block mx-4 opacity-0 transition-opacity duration-500 ${
              index === scrollIndex ? 'opacity-100' : ''
            }`}
          >
            {message.map((data) => data.specific_subtitles)}
          </div>,
          console.log(message.map((data) => data.specific_subtitles))
          
        ))}
       
      </div>
    </div>
  );
};

export default ViewSubtitle;
