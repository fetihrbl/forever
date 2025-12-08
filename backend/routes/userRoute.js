import express from "express";
import {
  registerUser,
  loginUser,
  adminLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

// ------------------------
// USER ROUTES
// ------------------------

// Yeni kullanıcı kaydı
// POST /api/users/register
userRouter.post("/register", registerUser);

// Kullanıcı girişi
// POST /api/users/login
userRouter.post("/login", loginUser);

// Admin girişi
// POST /api/users/admin-login
userRouter.post("/admin", adminLogin);

export default userRouter;
