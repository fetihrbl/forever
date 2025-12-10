import express from "express";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/orderController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminAuth.js";

const router = express.Router();

// USER ROUTES
router.post("/create", authMiddleware, createOrder);
router.get("/my-orders", authMiddleware, getMyOrders);

// ADMIN ROUTES
router.get("/all", adminAuth, getAllOrders);
router.put("/update-status/:orderId", adminAuth, updateOrderStatus);

export default router;
