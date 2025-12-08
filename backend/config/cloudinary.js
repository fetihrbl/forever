import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  cloudinary.config(); 
  console.log("Cloudinary connected using CLOUDINARY_URL");
};

export default connectCloudinary;
