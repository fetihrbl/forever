import express from "express";
import { addToCart, updateCart, removeFromCart, getUserCart } from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.put("/update", protect, updateCart);
router.delete("/remove", protect, removeFromCart);
router.get("/", protect, getUserCart);

export default router;
