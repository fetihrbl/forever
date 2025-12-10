import express from "express";
import { addToCart, updateCart, getUserCart } from "../controllers/cartController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Sepete ürün ekleme
router.post("/add", authMiddleware, addToCart);

// Sepet güncelleme (miktar arttır / azalt)
router.post("/update", authMiddleware, updateCart);

// Kullanıcının sepetini çekme
router.get("/get", authMiddleware, getUserCart);

export default router;
