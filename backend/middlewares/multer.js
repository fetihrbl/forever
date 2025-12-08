// middlewares/upload.js
import multer from "multer";

const storage = multer.diskStorage({});
const upload = multer({ storage });

export const uploadSingle = upload.single("image");
export const uploadMultiple = upload.array("images", 4);
