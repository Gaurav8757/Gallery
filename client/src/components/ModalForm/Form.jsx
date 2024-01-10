import { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
const Form = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // HANDLE FILES
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        console.error('Please select a file');
        return;
      }
      const formData = new FormData();
      formData.append('filename', selectedFile);

      const response = await axios.post('https://upvideo.onrender.com/video/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      if (response.status === 200) {
        toast.success(`${response.data.video.filename} uploaded successfully!!`)
        console.log('Video uploaded successfully');
        // Handle success, update state, etc.
      } else {
        toast.warn("Failed to upload video");
        console.error('Failed to upload file');
        // Handle error
      }
    } catch (error) {
      toast.error("Error during video upload");
      console.error('Error during file upload:', error);
    }
  };


  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default Form;
