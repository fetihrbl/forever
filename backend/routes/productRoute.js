import express from "express";

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/ProductController.js";
import { uploadSingle, uploadMultiple } from "../middlewares/multer.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const productRouter = express.Router();


// ------------------------
// PRODUCT ROUTES
// ------------------------

// GET all products
// GET /api/products
productRouter.get("/list", getAllProducts);

// GET single product by ID
// GET /api/products/:id
productRouter.get("/single/:id", getProductById);

// CREATE new product
// POST /api/products
// upload.single("image") → çoklu resim dosyası için
productRouter.post("/create", adminAuth, uploadMultiple, createProduct);

// UPDATE product by ID
// PUT /api/products/:id
productRouter.put("/update/:id", adminAuth, uploadSingle, updateProduct);

// DELETE product by ID
// DELETE /api/products/:id
productRouter.delete("/remove/:id", adminAuth, deleteProduct);

export default productRouter;
