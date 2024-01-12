## VGallery
# client
Live Link: 
```
https://ubiquitous-hotteok-f3611a.netlify.app/
```
CLIENT(Video_Show)/
|
|-- public
|
|-- src/
|    |-- assets
|    |-- components/
|    |        |-- Header/
|    |        |    |-- Header.jsx
|    |        |
|    |        |-- Homepage/
|    |        |    |-- Home.jsx
|    |        |
|    |        |-- ModalForm/
|    |        |    |-- Form.jsx
|    |        |    |-- UploadModals.jsx
|    |        |
|    |        |-- Subtitle/
|    |        |    |-- ViewSubtitle.jsx
|    |        
|    |
|    |
|    |-- App.jsx
|    |-- main.jsx
|    |-- index.css
|
|
|-- index.html
|-- tailwind.config.js
|-- vite.config.js
|-- README.md


# Server

SERVER(Video_Uploads)/
|
|-- database
|   |-- connection.js
|
|
|-- models/
|   |-- videoSchema.js
|   |-- subtitleSchema.js
|
|
|-- controllers/
|   |-- videoController.js
|   |-- subtitleController.js
|   |-- videoplayerController.js
|
|
|-- routes/
|   |-- routes.js
|           |-- subtitleRoute.js
|           |-- videoRoute.js
|           |-- videoplayer.routes.js
|
|
|-- utils/
|     |-- middleware(multer)
|
|
|-- uploads/
|        |-- videos
|
|
|-- .gitignore/
|       |-- .env
|       |-- node_modules
|
|-- index.js
|-- README.md



# Local Server
```
1. Upload Video
http://localhost:3001/video/upload

```
```
2. Upload Subtitles
http://localhost:3001/video/subtitles/:videoId

```

```
3. Add Custom Subtitles
http://localhost:3001/video/custom-subtitle/:videoId

```

```
4. List of Video url, Caption, Custom Subtitles, videoId
http://localhost:3001/video/lists

```

