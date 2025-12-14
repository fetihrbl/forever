import express from "express";
import {
  createIyzicoPayment,
  iyzicoCallback,
} from "../controllers/paymentController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/iyzico/create", authMiddleware, createIyzicoPayment);
router.post("/iyzico/callback", iyzicoCallback);


export default router;
