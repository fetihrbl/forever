import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from "./config/cloudinary.js";
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRoutes from "./routes/cartRoute.js";

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// -------------------
// Database & Cloudinary
// -------------------
const startServer = async () => {
  try {
    await connectDB(); // MongoDB bağlantısı
    connectCloudinary(); // Cloudinary bağlantısı
    console.log("Server is ready!");

    // -------------------
    // API Endpoints
    // -------------------
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use("/api/cart", cartRoutes);

    // -------------------
    // Server Listen
    // -------------------
    app.listen(port, () => {
      console.log(`Server started on Port: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// Start
startServer();
