import express from 'express';
import cors from 'cors';
import connectDB from './connection/connection.js';
import router from "./routes/routes.js";
const app = express();
const port = 3001 || process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use('/videos', express.static('uploads/videos'));
app.use(express.json());
// CALL DB CONNECTION
connectDB();


// CALL ROUTES
app.use('/', router);

// SERVER RUNNING ON GIVEN PORT NUMBER
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
